<?php

namespace App\Http\Controllers;

use App\Models\MensajeContacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MensajeContactoController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify', ['except' => ['store', 'getOne']]);
    }

    public function index() {

        $mensajes = MensajeContacto::all();
        return response()->json(['data' => $mensajes], 200);

    }

    public function getOne($id)
    {

        $mensaje = MensajeContacto::find($id);

        if(!$mensaje){
            return response()->json(['message' => 'El mensaje no existe.'], 404);
        }
        return response()->json(['data' => $mensaje], 200);


    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'read' => 'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $mensaje = MensajeContacto::find($id);

        if(!$mensaje){
            return response()->json(['message' => 'El mensaje no existe.'], 404);
        }

        $mensaje->update([
            'read' => $request->read
        ]);
        return response()->json(['message' => 'Mensaje actualizado', 'data' => $mensaje], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required|string',
            'artistic_name' => 'nullable|string',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $mensaje = new MensajeContacto([
            'email' => $request->email,
            'name' => $request->name,
            'subject' => $request->subject,
            'message' => $request->message,

        ]);

        if($request->has('artistic_name')){
            $mensaje->artistic_name = $request->artistic_name;
        }

        $mensaje->save();
        return response()->json(['message' => 'Mensaje enviado correctamente.', 'data' => $mensaje], 200);

    }

}
