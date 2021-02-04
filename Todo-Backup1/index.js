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

    loadItemsFromJSON("http://localhost:8000/index.php");

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
function addItem(){
    const value = newItemInput.value;

    if(!value){
        alert("Please enter a value");
        return;
    }

    const _item = {...item, message: value};

    items.push(_item);
    newItemInput.value = "";
    render();

    postItemToJSON("http://localhost:8000/index.php", _item, items.length - 1);
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

        fetch(url,fetchData)
        .then(response => {
            response.json().then(json => {
            
                if(json.length > 0) {
                    json.forEach(element => items.push(element));
                    render();
                }

          });
        });
    }

/**
 * Save the new value of the item
 * @param index
 */
function saveItem(index){
    const value = document.getElementById('input-item-' + index).value;
    const _item = {message: value, editing: false};

    items.splice(index, 1, _item);

    removeItemFromJSON("http://localhost:8000/index.php", index);
    postItemToJSON("http://localhost:8000/index.php", _item, index);

    render();
}

/**
 * Remove item at the given index
 * @param index
 */
function removeItem(index){
    
    items.splice(index, 1);

    removeItemFromJSON("http://localhost:8000/index.php", index);

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
    <div class="col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6 pt-1 rounded items small-box-shadow pt-3">  
    ${item.editing ? '<input class="input-width" id="input-item-'+index+'" type="text" value="'+item.message+'">' : '<span class="todo-text">'+item.message+'</span>'}
    </div>
    <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start pt-3">
        <div ${!item.editing && 'hidden'} pb-3>
           <button class="btn btn-success" onclick="saveItem(${index})">Save <i class="fas fa-save"></i></button>
           <button class="btn btn-danger" onclick="toggleEditItem(${index})">Cancel <i class="fas fa-times"></i></button>
        </div>
        <div ${item.editing && 'hidden'} pb-3>
        <div class="input-group mb-3">
        <div class="input-group-prepend">
           <button class="btn btn-warning type="button onclick="toggleEditItem(${index})">Edit <i class="fas fa-pencil-alt"></i></button>
           </div>
           <button class="btn btn-danger type="button" onclick="removeItem(${index})">Remove <i class="fas fa-trash-alt"></i></i></button>
           </div>
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