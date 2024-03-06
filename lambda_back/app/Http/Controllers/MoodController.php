<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;

class MoodController extends Controller
{

    public function index()
    {
        return response()->json(Mood::all(), 200);
    }
}
