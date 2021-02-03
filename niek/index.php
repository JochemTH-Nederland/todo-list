<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

// Get all items from JSON
$items = file_get_contents(__DIR__."/todolist.json");

if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    //Decode all items to arrays
    $items = json_decode($items, true);
    $json = json_decode(file_get_contents('php://input'), true);

    //If you want to add or change items
    if(!array_key_exists('removeItems', $json)) {

        array_splice($items, $json['itemIndex'], 0, [$json]);
        
        $items = json_encode($items,true);
        WriteToJSON($items);
        
        //If you want to remove items
    } else {

        array_splice($items, $json['itemIndex'], 1);

        $items = json_encode($items,true);
        WriteToJSON($items);

    }

    //If you want to get all items
} else if($_SERVER['REQUEST_METHOD'] == "GET"){

    echo $items;

} else {
    die("die");
}

//Write the object arrays to JSON
function WriteToJSON($inputJson) {

    $file = __DIR__ ."/todolist.json";

    if(file_exists($file)) {
        unlink($file);
    }

    file_put_contents(__DIR__."/todolist.json", $inputJson);

}