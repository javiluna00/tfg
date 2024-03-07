<?php

namespace App\Http\Controllers;

use App\Http\Resources\BeatResource;
use App\Models\Beat;
use App\Models\BeatLicense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class BeatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'getOne']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $beats = Beat::all();
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
            'cover_path' => 'required|string|max:255',
            'stock' => 'required|integer',
            'bpm' => 'required|integer',
            'mp3_path' => 'required|string|max:255',
            'mp3_price' => 'required|integer',
            'wav_path' => 'required|string|max:255',
            'wav_price' => 'required|integer',
            'stems_path' => 'required|string|max:255',
            'stems_price' => 'required|integer',
            'exclusive_price' => 'required|integer',
            'still_exclusive' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $beat = new Beat();

        $beat->name = $request->name;
        $beat->scale = $request->scale;
        $beat->cover_path = $request->cover_path;
        $beat->stock = $request->stock;
        $beat->bpm = $request->bpm;
        $beat->still_exclusive = $request->still_exclusive;


        $beat->save();

        $mp3License = new BeatLicense();
        $mp3License->beat_id = $beat->id;
        $mp3License->license_id = 1;
        $mp3License->price = $request->mp3_price;
        $mp3License->file_url = $request->mp3_path;
        $mp3License->save();

        $wavLicense = new BeatLicense();
        $wavLicense->beat_id = $beat->id;
        $wavLicense->license_id = 2;
        $wavLicense->price = $request->wav_price;
        $wavLicense->file_url = $request->wav_path;
        $wavLicense->save();

        $stemsLicense = new BeatLicense();
        $stemsLicense->beat_id = $beat->id;
        $stemsLicense->license_id = 3;
        $stemsLicense->price = $request->stems_price;
        $stemsLicense->file_url = $request->stems_path;
        $stemsLicense->save();

        $exclusiveLicense = new BeatLicense();
        $exclusiveLicense->beat_id = $beat->id;
        $exclusiveLicense->license_id = 4;
        $exclusiveLicense->price = $request->exclusive_price;
        $exclusiveLicense->file_url = $request->stems_path;
        $exclusiveLicense->save();


        return response()->json([
            'message' => 'Successfully created beat',
            'beat' => $beat
        ], 201);

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
    public function update(Request $request, Beat $beat)
    {
        //
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
