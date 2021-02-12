<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{

    /**
     * Home view
     */
    public function home(Request $request){
        return view('welcome');
    }

}
