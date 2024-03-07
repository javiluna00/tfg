<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proyectos = Project::all();
        return response()->json($proyectos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'yt_link' => 'required|url',
            'spotify_link' => 'required|url',
            'image' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $proyecto = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'yt_link' => $request->yt_link,
            'spotify_link' => $request->spotify_link,
            'image' => $request->image,
        ]);

        return response()->json(['message' => "Proyecto creado",'data' => $proyecto], 201);


    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = array_merge($request->all(), ['id' => $id]);
        // Valida el arreglo combinado
        $validator = Validator::make($data, [
            'id' => 'required|exists:projects',
            // Añade aquí las reglas de validación para los otros campos del $request
            'name' => 'string', // Ejemplo para 'name', excluyendo el proyecto actual por su ID
            'description' => 'string',
            'yt_link' => 'url',
            'spotify_link' => 'url',
            'image' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $proyecto = Project::find($id);
        $proyecto->fill($request->all())->save();

        return response()->json(['message' => "Proyecto actualizado",'data' => $proyecto], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|exists:projects,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $proyecto = Project::find($id);
        $proyecto->delete();

        return response()->json(['message' => "Proyecto eliminado"], 200);
    }
}
