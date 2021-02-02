<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

/**
 * Retrieve the current stored todo list
 */
$todoList = json_decode(file_get_contents("todolist.json"), true);


if($_SERVER['REQUEST_METHOD'] == "POST"){
    $newTodoList = [];
    $json = file_get_contents('php://input');
    var_dump(json_decode($json, true));

    /**
     * Store the new todo list
     */
    file_put_contents("todolist.json", json_encode($newTodoList));
} else if($_SERVER['REQUEST_METHOD'] == "GET"){
    //Return all items

} else {
    die("die");
}
