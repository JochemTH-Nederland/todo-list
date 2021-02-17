<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

const JSON_FILE_PATH = __DIR__."/todolist.json";

// Get all items from JSON
$items = file_get_contents(JSON_FILE_PATH);

if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    //Decode all items to arrays
    $items = json_decode($items, true);
    $json = json_decode(file_get_contents('php://input'), true);
    //If you want to add or change items
    if(!array_key_exists('removeItems', $json)) {

        if(count($items) == $json['itemIndex']) {
            $json['item']['createDate'] = date("Y-m-d h:i:sa");
        } else {
            $json['item']['createDate'] = $items[$json['itemIndex']]['createDate'];
        }
        
        $json['item']['updateDate'] = date("Y-m-d h:i:sa");

        if($json['item']['message'] != null) array_splice($items, $json['itemIndex'], 1, [$json['item']]);
        else array_splice($items, $json['itemIndex'], 1);
        
        file_put_contents(JSON_FILE_PATH, json_encode($items,true));

        $response = [
            "item" => $items[$json['itemIndex']]
        ];

        echo json_encode($response);
        
        //If you want to remove items
    } else {

        array_splice($items, $json['itemIndex'], 1);

        $items = json_encode($items,true);
        file_put_contents(JSON_FILE_PATH, $items);

    }

    //If you want to get all items
} else if($_SERVER['REQUEST_METHOD'] == "GET"){

    echo $items;

} else {
    die("die");
}
