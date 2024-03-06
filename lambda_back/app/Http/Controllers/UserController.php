<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getOne']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }


    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'message' => 'Usuario encontrado',
            'user' => UserResource::make($user)
        ], 201);
    }

    public function getPurchases()
    {

        $user = auth()->user();
        $purchases = $user->purchases;
        return response()->json(PurchaseResource::collection($purchases), 201);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->update($request->only(['name', 'email', 'artist_name', 'password']));
        return response()->json($user);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
