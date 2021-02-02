<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

$items = json_decode(file_get_contents(__DIR__."/todolist.json"), true);

if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    $newTodoList = [];
    $json = json_decode(file_get_contents('php://input'), true);

    array_push($items, $json);

    $items = json_encode($items,true);

    WriteToJSON($items);


} else if($_SERVER['REQUEST_METHOD'] == "GET"){
    //Return all items
/**
 * Retrieve the current stored todo list
 */

    //$todoList = json_decode(file_get_contents("todolist.json"), true);

} else {
    die("die");
}

function WriteToJSON($inputJson) {

    $file = __DIR__ ."/todolist.json";

    if(file_exists($file)) {
        unlink($file);
    }

    file_put_contents(__DIR__."/todolist.json", $inputJson);
    echo "Success";
}