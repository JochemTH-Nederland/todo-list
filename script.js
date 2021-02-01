var id = -1;
var items = [];
var buttons = [];
var brs = [];

var editMode = false;

function addInput() {
    //Haal de waarde op uit het input field
    var inputVal = document.getElementById("todo-input").value;

    id++;

    //Maak een div aan om het item in op te slaan
    var node = document.createElement("div");
    node.classList.add("row", "mt-3");
    node.setAttribute("id", "todo-item" + id);

    var nodeParent = document.getElementById("card").appendChild(node);
    
    var node2 = document.createElement("div");
    node2.classList.add("col-md-6", "col-sm-6");

    var nodeParent2 = nodeParent.appendChild(node2);

    var item = document.createElement("p");
    item.className = "d-inline-block";
    item.innerText = inputVal;

    nodeParent2.appendChild(item);

    var node2b = document.createElement("div");
    node2b.classList.add("col-md-6", "col-sm-6");

    var nodeParent2b = nodeParent.appendChild(node2b);

    var node3b = document.createElement("div");
    node3b.className("btn-group");

    var nodeParent3b = nodeParent2.appendChild(node3b);
    
    //Voeg een verwijder knop toe aan het item
    var deleteButton = document.createElement("div");
    deleteButton.innerHTML = '<button type="button" class="btn btn-danger d-inline-block" onclick="deleteItem(' + id + ');">Delete <i class="far fa-trash-alt"></i></button>'
    //"<button class='btn btn-danger d-inline-block ml-auto' onclick='deleteItem(" + id + ");' >Delete</button>";
    deleteButton.className = "side-button";
    deleteButton.setAttribute("class", "side-button");
    
    //Voeg een bewerk knop toe aan het item
    var editButton = document.createElement("div");
    editButton.innerHTML = '<button type="button" class="btn btn-warning d-inline-block" onclick="editItem(' + id + ');">Edit <i class="fas fa-pencil-alt"></i></button>'
    //"<button class='btn btn-secondary d-inline-block ml-auto' onclick='editItem(" + id + ");' >Edit</button>";
    editButton.className = "side-button";
    editButton.setAttribute("class", "side-button");

    
    nodeParent3b.appendChild(editButton);
    nodeParent3b.appendChild(deleteButton);

    /*
    //Maak een item aan
    var item = document.createElement("p");
    item.className = "d-inline-block";
    //Geef de tekst aan het item
    item.innerText = inputVal;

    //Voeg een verwijder knop toe aan het item
    var deleteButton = document.createElement("div");
    deleteButton.innerHTML = '<button type="button" class="btn btn-danger d-inline-block" onclick="deleteItem(' + id + ');">Delete <i class="far fa-trash-alt"></i></button>'
    //"<button class='btn btn-danger d-inline-block ml-auto' onclick='deleteItem(" + id + ");' >Delete</button>";
    deleteButton.className = "side-button";
    deleteButton.setAttribute("class", "side-button");
    
    //Voeg een bewerk knop toe aan het item
    var editButton = document.createElement("div");
    editButton.innerHTML = '<button type="button" class="btn btn-warning d-inline-block" onclick="editItem(' + id + ');">Edit <i class="fas fa-pencil-alt"></i></button>'
    //"<button class='btn btn-secondary d-inline-block ml-auto' onclick='editItem(" + id + ");' >Edit</button>";
    editButton.className = "side-button";
    editButton.setAttribute("class", "side-button");

    //Voeg een knop toe aan het item
    var editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.setAttribute("id", "edit-input" + id);

    //Voeg het item en de knop toe aan de div
    node.appendChild(item);
    node.appendChild(editInput);
    
    var group = document.createElement("div");
    group.className = "btn-group";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Basic example");

    //group.innerHTML = '<div class="btn-group" role="group" aria-label="Basic example>';

    group.appendChild(editButton);
    group.appendChild(deleteButton);

    editInput.style.display = 'none';

    //Laat deze items zien
    document.getElementById("todo-items").appendChild(node);
    document.getElementById("todo-buttons").appendChild(group);

    */
    //Voeg het item toe aan de array
    items.push(node);
    buttons.push(group)
}

//Verwijder een item
function deleteItem(delete_id) {

    console.log(delete_id);

        //Ga alle items langs
        for(i = 0; i < items.length; i++) {

            let element = items[i];
            let element2 = buttons[i];
        
            console.log(element.id);

            //alert(element);

            //Kijk of het todo item het geselecteerde item is en verwijder hem daarna
            if(!!element && element.id == ("todo-item" + delete_id)) {
                items[i].remove();
                buttons[i].remove();


//alert(items.length);
//alert(buttons.length);

                items.splice(i,i+1);
                buttons.splice(i,i+1);
        }
    }
}

///Bewerk een item
function editItem(edit_id) {

    //Haal het lijstje met todo items op
    var list = document.getElementById("todo-items");

    //Ga alles items langs
    for(i = 0; i < list.length; i++) {

        //Kijk of edit mode aan staat (Maak de input field zichtbaar)
        if(!editMode) {

                //Haal de elementen op
                let element = list.childNodes[i];
                let text = element.childNodes[0];
                let inputField = element.childNodes[1];

                //Kijk of het todo item het geselecteerde item is en maak het input field zichtbaar
                if(!!element && element.id == ("todo-item" + edit_id)) {
                    inputField.style.display = 'inline-block';
                    inputField.value = text.innerText;

                    //Zet edit modus aan
                    editMode = true;
                }
                
            //Als edit mode aan staat veranderd hij het geselecteerde item
            } else {

                //Haal de elementen op
                let element= list.childNodes[i];
                let text = element.childNodes[0];
                let inputField = element.childNodes[1];

                //Kijk of het todo item het geselecteerde item is en verander deze
                if(!!element && element.id == ("todo-item" + edit_id)) {

                    text.innerText = inputField.value;
                    inputField.style.display = 'none';

                    editMode = false;
            }
        }
    }
}