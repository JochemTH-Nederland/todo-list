<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

$items = file_get_contents(__DIR__."/todolist.json");

if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    $items = json_decode($items, true);
    $json = json_decode(file_get_contents('php://input'), true);

    array_push($items, $json);

    $items = json_encode($items,true);
    WriteToJSON($items);


} else if($_SERVER['REQUEST_METHOD'] == "GET"){

    echo $items;

} else {
    die("die");
}

function WriteToJSON($inputJson) {

    $file = __DIR__ ."/todolist.json";

    if(file_exists($file)) {
        unlink($file);
    }

    file_put_contents(__DIR__."/todolist.json", $inputJson);

}