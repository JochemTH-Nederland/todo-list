<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoListItem extends Model
{

    public $table = "todolist_items";

    public $fillable = [
        "message"
    ];

}
