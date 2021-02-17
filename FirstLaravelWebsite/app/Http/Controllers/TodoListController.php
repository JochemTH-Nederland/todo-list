<?php

namespace App\Http\Controllers;

use App\TodoListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoListController extends Controller
{

    public function listItems(){
        $items = file_get_contents(storage_path("app/todolist.json"));
        return response()->json([
            'items' => json_decode($items)
        ]);
     }

    public function addItem(Request $request){

        /*
        $validator = Validator::make($request->all(), [
            'item.message' => "required|string|max:255",
        ]);

        if ($validator->fails()) {
           return response()->json(['errors' => $validator->errors()], 422);
        }

        $todoListItem = TodoListItem::create($request->all());

        return response()->json([
            "id" => $todoListItem->id
        ]);
        */

        $items = [];
        $items = json_decode(file_get_contents(storage_path("app/todolist.json")));

        $validator = Validator::make($request->all(), [
            'item.message' => "required|string|max:255",
            'item.editing' => "required|boolean"
        ])->validate();

        array_push($items, $validator["item"]);

        file_put_contents(storage_path("app/todolist.json"), json_encode($items,true));
    }

    public function removeItem($index){
        dd($index);
    }

    public function updateItem($index){

    }

}
