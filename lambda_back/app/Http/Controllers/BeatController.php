<?php

namespace App\Http\Controllers;

use App\Jobs\CreateWatermarkOnBeat;
use App\Http\Resources\BeatResource;
use App\Models\Beat;
use App\Models\BeatLicense;
use App\Models\Mood;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class BeatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getActives', 'getOne', 'testWaterMark']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        if(!auth()->user()->isAdmin())
        {
            return response()->json(['message' => "No autorizado"], 401);
        }
        $beats = Beat::all();
        return response()->json(BeatResource::collection($beats), 200);
    }

    public function getActives()
    {
        $beats = Beat::where('active', 1)->get();
        return response()->json(BeatResource::collection($beats), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'scale' => 'string|max:255',
            'active' => 'required',
            'cover_file' => 'required',
            'stock' => 'required|integer',
            'bpm' => 'required|integer',
            'mp3_file' => 'required',
            'tagged_file' => 'required',
            'mp3_price' => 'required',
            'wav_file' => 'required',
            'wav_price' => 'required',
            'stems_file' => 'required',
            'stems_price' => 'required',
            'exclusive_price' => 'required',
            'exclusive' => 'required',
            'moods' => 'required',
            'genres' => 'required',
        ]);



        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $portada = $request->cover_file;

        $beat = new Beat();

        if($portada != null){
            $portada = $request->cover_file->store('images', 'public');
            $image_url = asset('storage/' . $portada);
            $beat->cover_path = $image_url;
        }

        $beat->name = $request->name;
        $beat->scale = $request->scale;
        $beat->active = $request->active;
        $beat->stock = $request->stock;
        $beat->bpm = $request->bpm;
        $beat->still_exclusive = $request->exclusive == true ? 1 : 0;


        $tagged_file = $request->tagged_file->store('tagged', 'public');
        $tagged_url = asset('storage/' . $tagged_file);
        $beat->tagged_path = $tagged_url;


        $beat->save();

        $mp3License = new BeatLicense();
        $mp3License->beat_id = $beat->id;
        $mp3License->license_id = 1;
        $mp3License->price = $request->mp3_price;
        $mp3_file = $request->mp3_file->store('mp3', 'public');
        $mp3_url = asset('storage/' . $mp3_file);
        $mp3License->file_url = $mp3_url;
        $mp3License->save();

        CreateWatermarkOnBeat::dispatch($mp3_url);



        $wavLicense = new BeatLicense();
        $wavLicense->beat_id = $beat->id;
        $wavLicense->license_id = 2;
        $wavLicense->price = $request->wav_price;
        $wav_file = $request->wav_file->store('wav', 'public');
        $wav_url = asset('storage/' . $wav_file);
        $wavLicense->file_url = $wav_url;
        $wavLicense->save();

        $stemsLicense = new BeatLicense();
        $stemsLicense->beat_id = $beat->id;
        $stemsLicense->license_id = 3;
        $stemsLicense->price = $request->stems_price;
        $stems_file = $request->stems_file->store('stems', 'public');
        $stems_url = asset('storage/' . $stems_file);
        $stemsLicense->file_url = $stems_url;
        $stemsLicense->save();



        if($request->exclusive){
            $exclusiveLicense = new BeatLicense();
            $exclusiveLicense->beat_id = $beat->id;
            $exclusiveLicense->license_id = 4;
            $exclusiveLicense->price = $request->exclusive_price;
            $exclusiveLicense->file_url = $stems_url;
            $exclusiveLicense->save();
        }

        if($request->moods){
            foreach($request->moods as $mood){
                $currentMood = Mood::where('name', $mood)->first();
                if($currentMood){
                    $beat->moods()->attach($currentMood->id);
                }
            }
        }
        if($request->genres){
            foreach($request->genres as $genre){
                $currentGenre = Genre::where('name', $genre)->first();
                if($currentGenre){
                    $beat->genres()->attach($currentGenre->id);
                }
            }
        }



        return response()->json([
            'message' => 'Beat creado correctamente',
            'beat' => $beat
        ], 201);

    }

    public function testWaterMark($id)
    {
        $beat = Beat::where('id', $id)->first();

        $mp3_license = BeatLicense::where('beat_id', $beat->id)->where('license_id', 1)->first();

        CreateWatermarkOnBeat::dispatch($mp3_license->file_url, $beat->name);
    }

    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {
        if($id){
            $beat = Beat::where('id', $id)->first();
            if($beat){
                return response()->json(BeatResource::make($beat), 200);
            }
            else{
                return response()->json([
                    'message' => 'Beat no encontrado'
                ], 404);
            }
        }
        else{
            return response()->json([
                'message' => 'Id no suministrado'
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Beat $beat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if(!auth()->user()->isAdmin()){
            return response()->json([
                'message' => 'No autorizado'
            ], 401);
        }
        $beat = Beat::where('id', $id)->first();
        if(!$beat){
            return response()->json([
                'message' => 'Beat no encontrado'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'active' => 'boolean',
            'scale' => 'string',
            'bpm' => 'integer',
            'cover_path' => 'string',
            'tagged_path' => 'string',
            'stock' => 'boolean',
            'still_exclusive' => 'boolean',
            'moods' => 'array',
            'genres' => 'array',
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }


        $beat->update($request->all());


        return response()->json([
            'message' => 'Beat actualizado',
            'beat' => $beat
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if($id){
            $beat = Beat::where('id', $id)->first();
            if($beat){
                $beat->delete();
                return response()->json([
                    'message' => 'Beat eliminado'
                ], 200);
            }
            else{
                return response()->json([
                    'message' => 'Beat no encontrado'
                ], 404);
            }
        }
        else{
            return response()->json([
                'message' => 'Id no suministrado'
            ], 404);
        }
    }
}
