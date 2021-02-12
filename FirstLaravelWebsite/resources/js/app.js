const todoListContent = document.getElementById('todo-list');
const addItemButton = document.getElementById('add-item');
const newItemInput = document.getElementById('new-item-input');
const errorBox = document.getElementById('error-box');

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
    /**
     * Initial content render
     */
}

async function addItem(){
    const value = newItemInput.value;

    if(!value){
        alert("Please enter a value");
        return;
    }

    const _item = {...item, message: value};

    items.push(_item);
    newItemInput.value = "";

    await sendRequest("POST", "add-item", {
        item: _item
    });

    //render();
}

async function sendRequest(method, route, data = null){

    const fetchData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
    }

    if(!!data) fetchData.body = JSON.stringify(data);

    const response = await fetch(
        'http://localhost:8000/' + route,
        fetchData
        );

    if(method === "GET") {
        /*
        const json = await response.json();

        if(json.length > 0) {
            json.forEach(element => items.push(element));
        }
        */
    }

    if(method === "POST") {
        //const json = await response.json();

        //items[data.itemIndex] = json.item;
        //render();
    }

    const json = await response.json();

    errorBox.innerHTML = json.errors.message;
}

init();
