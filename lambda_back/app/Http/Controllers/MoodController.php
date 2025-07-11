<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MoodController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify', ['except' => ['index', 'getOne']]);
    }

    public function index()
    {
        $moods = Mood::all();
        foreach ($moods as $mood) {
            $mood->beatsCount = $mood->beats()->count();
        }
        return response()->json($moods, 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $mood = Mood::create($request->all());
        return response()->json(['message' => 'Mood creado', 'mood' => $mood], 201);
    }

    public function getOne($slug)
    {

        $mood = Mood::where('slug', $slug)->first();

        if(!$mood){
            return response()->json(['message' => 'Mood no encontrado'], 404);
        }
        return response()->json($mood, 200);
    }

    public function destroy($id)
    {

        $validator = Validator::make(['id' => $id],[
            'id' => 'required|exists:moods,id',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $mood = Mood::find($id);
        $mood->delete();
        return response()->json(['message' => 'Mood eliminado'], 200);

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $mood = Mood::find($id);
        $mood->update($request->all());
        return response()->json(['message' => 'Mood actualizado', 'mood' => $mood], 200);
    }
}
