const todoListContent = document.getElementById('todo-list');
const addItemButton = document.getElementById('add-item');
const newItemInput = document.getElementById('new-item-input');

/**
 * Array of items
 * example item: { message: "An item", editing: false}
 *
 * @type {*[]}
 */
let items = [];

/**
 * Example item
 * @type {{message: string, editing: boolean}}
 */
const item = {
    message: "",
    editing: false,
    createDate: 0,
    updateDate: 0
}

/**
 * Init the todo list
 */
async function init(){
    /**
     * Add event listener to the button
     */
    addItemButton.addEventListener('click', (event) => addItem());

    await sendRequest("GET", null);

    /**
     * Initial content render
     */
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

    await sendRequest("POST", {
        itemIndex: items.length - 1,
        item: _item
    });

    render();
}

    async function sendRequest(method, data = null){

        const fetchData = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if(!!data) fetchData.body = JSON.stringify(data);

        const response = await fetch('http://localhost:8000/index.php', fetchData);

        if(method === "GET") {
            const json = await response.json();

            if(json.length > 0) {
                json.forEach(element => items.push(element));
                render();
            }
        }

        if(method === "POST") {
            const json = await response.json();

            items[data.itemIndex] = json.item;
            render();
        }
    }
    
/**
 * Save the new value of the item
 * @param index
 */
async function saveItem(index){
    const value = document.getElementById('input-item-' + index).value;
    const _item = {message: value, editing: false};

    items.splice(index, 1, _item);

    await sendRequest("POST", {
        itemIndex: index,
        item: _item
    });
    
    render();
}

/**
 * Remove item at the given index
 * @param index
 */
async function removeItem(index){
    
    items.splice(index, 1);

    await sendRequest("POST", {
        itemIndex: index,
        item: null
    });

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
 * @param _item
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

    items.sort(function(a, b)
    {
       if (a.updateDate > b.updateDate) return -1;
       if (a.updateDate < b.updateDate) return 1;
    })

    console.log(items);

    todoListContent.innerHTML = "";

    if(items.length <= 0){
        todoListContent.innerHTML = "No items in this list";
        return;
    }

    items.forEach((item, index) => {
        const wrapper = document.createElement('template');
        wrapper.innerHTML = itemHtml(index, item);
        todoListContent.appendChild(wrapper.content.cloneNode(true));
    });

}



init();