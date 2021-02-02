<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

/**
 * Retrieve the current stored todo list
 */
$todoList = json_decode(file_get_contents("todolist.json"), true);

$newTodoList = [];


switch ($_SERVER['REQUEST_METHOD']){
    case "POST": //Add or update a list item
        $requestData = $_POST;
        break;
    case "GET": //Retrieve all or a single list item
        $requestData = $_GET;
        break;
}

//Code here



/**
 * Store the new todo list
 */
file_put_contents("todolist.json", json_encode($newTodoList));

echo "Script executed";
