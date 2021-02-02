<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

/**
 * Retrieve the current stored todo list
 */
$todoList = json_decode(file_get_contents("todolist.json"), true);

$newTodoList = [];

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $requestData = &$_POST;

} else if($_SERVER['REQUEST_METHOD'] == "GET"){
    $requestData = &$_GET;

} else {
    die("die");
}

//Code here
var_dump($requestData);


/**
 * Store the new todo list
 */
file_put_contents("todolist.json", json_encode($newTodoList));

echo "Script executed";
