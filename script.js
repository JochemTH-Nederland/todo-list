var id = 0;
var items = [];

var editMode = false;

function addInput() {
    //Haal de waarde op uit het input field
    var inputVal = document.getElementById("todo-input").value;

    id++;

    //Maak een div aan om het item in op te slaan
    var node = document.createElement("span");
    node.setAttribute("id", "todo-item" + id);

    //Maak een item aan
    var item = document.createElement("p");

    //Geef de tekst aan het item
    item.innerText = inputVal;

    //Voeg een verwijder knop toe aan het item
    var deleteButton = document.createElement("span");
    deleteButton.innerHTML = "<button onclick='deleteItem(" + id + ");' >Delete</button>";
    deleteButton.className = "side-button";
    deleteButton.setAttribute("class", "side-button");
    
    //Voeg een bewerk knop toe aan het item
    var editButton = document.createElement("span");
    editButton.innerHTML = "<button onclick='editItem(" + id + ");' >Edit</button>";
    editButton.className = "side-button";
    editButton.setAttribute("class", "side-button");

    //Voeg een knop toe aan het item
    var editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.setAttribute("id", "edit-input" + id);

    var br = document.createElement("br");

    //Voeg het item en de knop toe aan de div
    node.appendChild(item);
    node.appendChild(editInput);
    node.appendChild(editButton);
    node.appendChild(deleteButton);
    node.appendChild(br);
    
    editInput.style.display = 'none';

    //Laat deze items zien
    document.getElementById("todo-items").appendChild(node);

    //Voeg het item toe aan de array
    items.push(node);
}

//Verwijder een item
function deleteItem(delete_id) {

    //Haal het lijstje met todo items op
    var list = document.getElementById("todo-items");

        //Ga alle items langs
        for(i = 0; i < items.length; i++) {
            let element= list.childNodes[i];
        
            //Kijk of het todo item het geselecteerde item is en verwijder hem daarna
            if(!!element && element.id == ("todo-item" + delete_id)) {
                list.removeChild(element);
                id--;
        }
    }
}

///Bewerk een item
function editItem(edit_id) {

    //Haal het lijstje met todo items op
    var list = document.getElementById("todo-items");

    //Ga alles items langs
    for(i = 0; i < items.length; i++) {

        //Kijk of edit mode aan staat (Maak de input field zichtbaar)
        if(!editMode) {

                //Haal de elementen op
                let element= list.childNodes[i];
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