const todoListContent = document.getElementById('todo-list');
const addItemButton = document.getElementById('add-item');
const newItemInput = document.getElementById('new-item-input');

/**
 * Array of items
 * example item: { message: "An item", editing: false}
 *
 * @type {*[]}
 */
const items = [];

/**
 * Example item
 * @type {{message: string, editing: boolean}}
 */
const item = {
    message: "",
    editing: false
}

/**
 * Init the todo list
 */
function init(){
    /**
     * Add event listener to the button
     */
    addItemButton.addEventListener('click', (event) => addItem());

    loadItemsFromJSON("http://localhost:9000/index.php");

    /**
     * Initial content render
     */
    render();
}

/**
 * add the item to the array.
 * reset the input value
 * render the content
 */
async function addItem(){
    const value = newItemInput.value;

    if(!value){
        alert("Please enter a value");
        return;
    }

    const _item = {...item, message: value};

    items.push(_item);
    newItemInput.value = "";
    render();

    await sendRequest("POST", {
        itemIndex: items.length - 1,
        item: _item
    });
}

    async function sendRequest(method, data = null){

        const fetchData = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: !!data && JSON.stringify(data)
        }

        const response = await fetch('http://localhost:9000/index.php', fetchData);
        const json = await response.json();

        if(method === "GET" && json.length > 0) {
            json.forEach(element => items.push(element));
            render();
        } else {
            console.log(json);
        }

    }

    /**
     * Post item to JSON
     * @type {{url: string, data: object, id: int}}
     */
    function postItemToJSON(url = '', data = {}, id) {

    let fetchData = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            itemIndex: id,
            ...data
        })
    };

    fetch(url, fetchData)
      .then(response => console.log(response.json));
    };

    /**
     * Remove item to JSON
     * @type {{url: string, id: int}}
     */
    function removeItemFromJSON(url = '', id) {

        let fetchData = {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemIndex: id,
                removeItems: true
            })
        };
    
        fetch(url, fetchData)
          .then(response => console.log(response.json));
        };

    /**
     * Load items from JSON
     * @type {{url: string}}
     */
    async function loadItemsFromJSON(url = '') {
    
        let fetchData = {
            method: 'GET', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url,fetchData);
        const json = await response.json();

        if(json.length > 0) {
            json.forEach(element => items.push(element));
            render();
        }

    }

/**
 * Save the new value of the item
 * @param index
 */
function saveItem(index){
    const value = document.getElementById('input-item-' + index).value;
    const _item = {message: value, editing: false};

    items.splice(index, 1, _item);

    removeItemFromJSON("http://localhost:9000/index.php", index);
    postItemToJSON("http://localhost:9000/index.php", _item, index);

    render();
}

/**
 * Remove item at the given index
 * @param index
 */
function removeItem(index){
    
    items.splice(index, 1);

    removeItemFromJSON("http://localhost:9000/index.php", index);

    render();
}

/**
 * Toggle editing of the item
 * @param index
 */
function toggleEditItem(index){
    const item = items[index];
    items.splice(index, 1, {...item, editing: !item.editing});
    render();
}


/**
 * Single item HTML content
 * @param index
 * @param item
 * @returns {string}
 */
function itemHtml(index, item){
    return `<div class="row item">
    <div class="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 pt-1 rounded items small-box-shadow pt-3">  
    ${item.editing ? '<input class="input-width edit-input mt-4 mt-sm-4 mt-md-1 mt-lg-1 mt-xl-1" id="input-item-'+index+'" type="text" value="'+item.message+'">' : '<span class="todo-text">'+item.message+'</span>'}
    </div>
    <div class="col-3 col-sm-3 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-start align-self-center justify-content-sm-start justify-content-md-start justify-content-lg-start justify-content-xl-start pt-3">
        <div ${!item.editing && 'hidden'} class="pb-3">
           <button class="side-btn btn-success" onclick="saveItem(${index})"><i class="fas fa-save btn-icon"></i></button>
           <button class="side-btn btn-danger" onclick="toggleEditItem(${index})"><i class="fas fa-times btn-icon"></i></button>
        </div>
        <div ${item.editing && 'hidden'} class="pb-3">
           <button class="side-btn btn-warning type="button" onclick="toggleEditItem(${index})"><i class="fas fa-pencil-alt btn-icon"></i></button>
           <button class="side-btn btn-danger type="button" onclick="removeItem(${index})"><i class="fas fa-trash-alt btn-icon"></i></i></button>
           </div>
        </div>
    </div>`;
}

/**
 * Render the items
 *  - Clear todo list content
 *  - Check for items
 *  - Append items
 */
function render(){
    todoListContent.innerHTML = "";

    if(items.length <= 0){
        todoListContent.innerHTML = "No items in this list";
        return;
    }

    //todoListContent.append(`${items.length} items`)

    items.forEach((item, index) => {
        const wrapper = document.createElement('template');
        wrapper.innerHTML = itemHtml(index, item);
        todoListContent.appendChild(wrapper.content.cloneNode(true));
    });

}



init();