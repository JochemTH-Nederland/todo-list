var id = 0;

function addInput() {
    //Haal de waarde op uit het input field
    var inputVal = document.getElementById("todo-input").value;

    id++;

    //Maak een div aan om het item in op te slaan
    var node = document.createElement("div");
    node.setAttribute("id", "todo-item" + id);

    //Maak een item aan
    var item = document.createElement("p");
    item.setAttribute("id", "todo-item" + id);

    //Geef de tekst aan het item
    item.innerHTML = inputVal;

    //Voeg een knop toe aan het item
    var button = document.createElement("div");
    button.innerHTML = "<button onclick='deleteItem(" + id + ");' >Delete</button>";

    //Voeg het item en de knop toe aan de div
    node.appendChild(item);
    node.appendChild(button);

    //Laat deze items zien
    document.getElementById("todo-items").appendChild(node);
}

//Verwijder een item
function deleteItem(delete_id) {
    var list = document.getElementById("todo-items");
    var item = document.getElementById("todo-item" + delete_id)
    list.removeChild(item);
}