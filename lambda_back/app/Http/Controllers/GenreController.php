<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GenreController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify', ['except' => ['index', 'getOne']]);
    }

    public function index()
    {
        $genres = Genre::all();
        foreach ($genres as $genre) {
            $genre->beatsCount = $genre->beats()->count();
        }
        return response()->json($genres, 200);
    }

    public function getOne($slug)
    {

        $genre = Genre::where('slug', $slug)->first();

        if(!$genre){
            return response()->json(['message' => 'Genero no encontrado'], 404);
        }

        return response()->json($genre, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $genre = Genre::create($request->all());
        return response()->json(['message' => 'Genero creado', 'genre' => $genre], 201);
    }

    public function destroy($id)
    {
        $validator = Validator::make(['id' => $id],[
            'id' => 'required|exists:genres,id',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $genre = Genre::find($id);
        $genre->delete();
        return response()->json(['message' => 'Genero eliminado'], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $genre = Genre::find($id);
        $genre->update($request->all());
        return response()->json(['message' => 'Genero actualizado', 'genre' => $genre], 200);
    }

}
