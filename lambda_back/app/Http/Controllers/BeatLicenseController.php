<?php

namespace App\Http\Controllers;

use App\Http\Resources\BeatLicenseResource;
use App\Models\BeatLicense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class BeatLicenseController extends Controller
{
    public function getOne(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'beat_id' => 'required|exists:beats,id',
            'license_id' => 'required|exists:licenses,id'
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->messages()], 422);
        }

        $beat_license = BeatLicense::where('beat_id', $request->beat_id)->where('license_id', $request->license_id)->first();
        return response()->json(BeatLicenseResource::make($beat_license), 201);

    }
}
