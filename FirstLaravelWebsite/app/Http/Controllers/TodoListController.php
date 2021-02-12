<?php

namespace App\Http\Controllers;

use App\TodoListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoListController extends Controller
{


    public function listItems(){
        return response()->json([
            "items" => TodoListItem::all()
        ]);
    }

    public function addItem(Request $request){
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
    }

    public function removeItem($index){
        dd($index);
    }

    public function updateItem($index){

    }

}
