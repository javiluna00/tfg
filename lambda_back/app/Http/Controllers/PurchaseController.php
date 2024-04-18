<?php

namespace App\Http\Controllers;
use App\Http\Resources\PurchaseResource;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function __construct(){
        $this->middleware('jwt.verify', ['except' => []]);
    }
    public function index ()
    {
        if(!auth()->user()->isAdmin())
        {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json(PurchaseResource::collection(Purchase::all()), 200);
    }
}
