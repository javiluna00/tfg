<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MixMasterProject;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MixMasterProjectController extends Controller
{
    public function getAll (Request $request) {
        $mixMasterProjects = MixMasterProject::all();
        return response()->json($mixMasterProjects);
    }
    public function getOne (Request $request, $id) {
        $mixMasterProject = MixMasterProject::find($id);
        return response()->json($mixMasterProject);
    }
    public function store (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'active' =>'required|boolean',
            'description' =>'required|string',
            'unmixed_file' =>'required|file',
            'mixed_file' =>'required|file',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $mixMasterProject = new MixMasterProject();
        $mixMasterProject->name = $request->name;
        $mixMasterProject->description = $request->description;
        $mixMasterProject->url_unmixed = $request->unmixed_file->store('mix-master-projects', 'public');
        $mixMasterProject->url_mixed = $request->mixed_file->store('mix-master-projects', 'public');
        $mixMasterProject->active = $request->active ? 1 : 0;
        $mixMasterProject->save();
        return response()->json($mixMasterProject);
    }
    public function destroy (Request $request, $id) {
        $mixMasterProject = MixMasterProject::find($id);
        if (!$mixMasterProject) {
            return response()->json(['message' => 'Mix Master Project not found'], 404);
        }

        $mixed_file = $mixMasterProject->url_mixed;
        $unmixed_file = $mixMasterProject->url_unmixed;
        // Delete the files from the storage
        Storage::delete($mixed_file); // Replace 'storage' with your storage disk name
        Storage::delete($unmixed_file); // Replace 'storage' with your storage disk name
        // Delete the record from the database

        $mixMasterProject->delete();
        return response()->json(MixMasterProject::all());
    }
}
