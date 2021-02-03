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

    loadItems("http://localhost:8000/index.php");

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

    postItemToJSON("http://localhost:8000/index.php", _item);
}

// Example POST method implementation:
    function postItemToJSON(url = '', data = {}) {

    let fetchData = {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    fetch(url, fetchData)
      .then(response => console.log(response.json));
    };

    function removeItemFromJSON(url = '', id) {

        let fetchData = {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemIndex: id})
        };
    
        fetch(url, fetchData)
          .then(response => console.log(response.json));
        };


    async function loadItems(url = '') {
    
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
    items.splice(index, 1, {message: value, editing: false});
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
    <div class="col-md-6 item-text">
    ${item.editing ? '<input id="input-item-'+index+'" type="text" value="'+item.message+'">' : item.message}
    </div>
    <div class="col-md-6 item-actions">
        <div ${!item.editing && 'hidden'}>
           <button class="btn btn-success" onclick="saveItem(${index})">Save</button>
           <button class="btn btn-danger" onclick="toggleEditItem(${index})">Cancel</button>
        </div>
        <div ${item.editing && 'hidden'}>
           <button class="btn btn-warning" onclick="toggleEditItem(${index})">Edit</button>
           <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
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

    todoListContent.append(`${items.length} items`)

    items.forEach((item, index) => {
        const wrapper = document.createElement('template');
        wrapper.innerHTML = itemHtml(index, item);
        todoListContent.appendChild(wrapper.content.cloneNode(true));
    });

}



init();