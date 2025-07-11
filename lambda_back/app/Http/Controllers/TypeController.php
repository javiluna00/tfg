<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TypeController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify', ['except' => ['index', 'getOne']]);
    }

    public function index()
    {
        $types = Type::all();
        foreach ($types as $type) {
            $type->beatsCount = $type->beats()->count();
            $type->similars = $type->findSimilar();
        }
        return response()->json($types, 200);
    }
    public function getOne($slug)
    {
        $type = Type::where('slug', $slug)->first();
        $type->beatsCount = $type->beats()->count();
        $type->similars = $type->findSimilar();
        if (!$type) {
            return response()->json(['message' => 'Type not found'], 404);
        }
        return response()->json($type, 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $type = Type::create($request->all());
        return response()->json(['message' => 'Type creado', 'type' => $type], 201);
    }

    public function destroy($id)
    {

        $validator = Validator::make(['id' => $id],[
            'id' => 'required|exists:types,id',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $type = Type::find($id);
        $type->delete();
        return response()->json(['message' => 'Type eliminado'], 200);

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $type = Type::find($id);
        $type->update($request->all());
        return response()->json(['message' => 'Type actualizado', 'type' => $type], 200);
    }
}
