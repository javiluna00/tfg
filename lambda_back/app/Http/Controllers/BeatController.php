<?php

namespace App\Http\Controllers;

use App\Jobs\CreateWatermarkOnBeat;
use App\Http\Resources\BeatResource;
use App\Models\Beat;
use App\Models\BeatLicense;
use App\Models\License;
use App\Models\Mood;
use App\Models\Genre;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Collection; // Importar Collection para el type-hinting

class BeatController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify', ['except' => ['getPaginatedBeats', 'getOne', 'testWaterMark', 'getRandom', 'getTrendingBeats', 'getBeatsByGenre', 'getBeatsByTypeBeat', 'getRelatedBeats']]); // Añade 'getRelatedBeats'
    }

    /**
     * Display a listing of the resource for admins (unpaginated).
     */
    public function getAll(Request $request)
    {
        if(!auth()->user()->isAdmin())
        {
            return response()->json(['message' => "No autorizado"], 401);
        }
        $beats = Beat::all();
        return response()->json(BeatResource::collection($beats), 200);
    }

    /**
     * Get a paginated list of active beats, with optional filters.
     * This method will replace the previous getActives.
     */
    public function getPaginatedBeats(Request $request)
    {
        $perPage = $request->query('per_page', 12); // Número de beats por página, por defecto 12
        $page = $request->query('page', 1);         // Página actual, por defecto 1

        $query = Beat::where('active', 1)->where('stock', '>', 0);

        // Filtrar por category_id
        if ($request->has('genre_id')) {
            $genreId = $request->query('genre_id');
            $query->whereHas('genres', function ($q) use ($genreId) {
                $q->where('genres.id', $genreId);
            });
        }

        // Filtrar por type_beat_id
        if ($request->has('type_beat_id')) {
            $typeBeatId = $request->query('type_beat_id');
            $query->whereHas('types', function ($q) use ($typeBeatId) {
                $q->where('types.id', $typeBeatId);
            });
        }

        if($request->has('mood_id')){
            $moodId = $request->query('mood_id');
            $query->whereHas('moods', function ($q) use ($moodId) {
                $q->where('moods.id', $moodId);
            });
        }

        // Ordenar los beats (puedes añadir lógica de ordenación aquí, ej. por fecha, popularidad, etc.)
        // Por defecto, se ordenarán por la clave primaria ascendente
        $beats = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        // Retorna la respuesta paginada de Laravel, que ya viene con la estructura necesaria
        // BeatResource::collection($beats) automáticamente mapeará la paginación
        return BeatResource::collection($beats);
    }

    /**
     * Get related beats based on shared genres, moods, and types.
     *
     * @param int $beatId The ID of the beat to find related ones for.
     * @param int $limit The maximum number of related beats to return.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRelatedBeats(int $beatId, int $limit = 5)
    {
        try {
            $targetBeat = Beat::with(['genres:id,name', 'moods:id,name', 'types:id,name'])->find($beatId);

            if (!$targetBeat) {
                return response()->json(['message' => 'Beat not found.'], 404);
            }

            // Get IDs of target beat's genres, moods, and types
            $targetGenreIds = $targetBeat->genres->pluck('id')->toArray();
            $targetMoodIds = $targetBeat->moods->pluck('id')->toArray();
            $targetTypeIds = $targetBeat->types->pluck('id')->toArray();

            // Query for other active and in-stock beats, excluding the target beat
            $candidateBeats = Beat::where('id', '!=', $targetBeat->id)
                                  ->where('active', 1)
                                  ->where('stock', '>', 0)
                                  ->with(['genres:id,name', 'moods:id,name', 'types:id,name']) // Eager load relations for scoring
                                  ->get();

            $scoredBeats = [];

            foreach ($candidateBeats as $candidateBeat) {
                $score = 0;

                // Score based on shared genres
                $candidateGenreIds = $candidateBeat->genres->pluck('id')->toArray();
                $score += count(array_intersect($targetGenreIds, $candidateGenreIds));

                // Score based on shared moods
                $candidateMoodIds = $candidateBeat->moods->pluck('id')->toArray();
                $score += count(array_intersect($targetMoodIds, $candidateMoodIds));

                // Score based on shared types
                $candidateTypeIds = $candidateBeat->types->pluck('id')->toArray();
                $score += count(array_intersect($targetTypeIds, $candidateTypeIds));

                if ($score > 0) {
                    $scoredBeats[$candidateBeat->id] = [
                        'beat' => $candidateBeat,
                        'score' => $score
                    ];
                }
            }

            // Sort by score in descending order
            usort($scoredBeats, function($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            // Extract the top N beats
            $relatedBeats = collect();
            $existingBeatIds = []; // To track IDs already added to relatedBeats

            foreach ($scoredBeats as $item) {
                if ($relatedBeats->count() < $limit) {
                    $relatedBeats->push($item['beat']);
                    $existingBeatIds[] = $item['beat']->id;
                } else {
                    break;
                }
            }

            // If not enough related beats are found, fill the remaining slots with random beats
            if ($relatedBeats->count() < $limit) {
                $missingCount = $limit - $relatedBeats->count();
                $randomBeats = Beat::where('active', 1)
                                   ->where('stock', '>', 0)
                                   ->whereNotIn('id', array_merge($existingBeatIds, [$targetBeat->id])) // Exclude already added and target beat
                                   ->inRandomOrder()
                                   ->take($missingCount)
                                   ->get();
                $relatedBeats = $relatedBeats->concat($randomBeats);
            }

            // Ensure unique beats and limit to the desired count
            $relatedBeats = $relatedBeats->unique('id')->take($limit);

            return response()->json(BeatResource::collection($relatedBeats), 200);

        } catch (\Exception $e) {
            Log::error('Error fetching related beats: ' . $e->getMessage(), ['beat_id' => $beatId]);
            return response()->json(['message' => 'Could not retrieve related beats.'], 500);
        }
    }

    // --- Métodos existentes (sin cambios significativos) ---

    public function getRandom($id)
    {
        $beat = Beat::find($id);
        if($beat == null){
            return response()->json(['message' => "Canción no encontrada"], 404);
        }
        $beats = Beat::where('active', 1)->where('id', '!=', $id)->where('stock', '>', 0)->inRandomOrder()->take(5)->get();
        return response()->json(BeatResource::collection($beats), 200);
    }

    public function getTrendingBeats(Request $request)
    {
        // ... (Tu implementación actual de getTrendingBeats)
        $days = $request->query('days', 30);
        $startDate = Carbon::now()->subDays($days);

        $limit = $request->query('limit', 5); 

        try {
            $trendingBeats = Beat::select('beats.*')
                ->join('beat_licenses', 'beats.id', '=', 'beat_licenses.beat_id')
                ->join('beat_license_user_purchases', 'beat_licenses.id', '=', 'beat_license_user_purchases.beat_license_id')
                ->where('beat_license_user_purchases.created_at', '>=', $startDate)
                ->groupBy('beats.id')
                ->orderByRaw('COUNT(beat_license_user_purchases.id) DESC')
                ->limit($limit) 
                ->get();

            if ($trendingBeats->count() < $limit) {
                $missingCount = $limit - $trendingBeats->count();
                
                $existingBeatIds = $trendingBeats->pluck('id')->toArray();

                $randomBeats = Beat::whereNotIn('id', $existingBeatIds)
                                   ->inRandomOrder() 
                                   ->limit($missingCount) 
                                   ->get();
                
                $popularBeats = $trendingBeats->concat($randomBeats);
            } else {
                $popularBeats = $trendingBeats;
            }

            $popularBeats = $popularBeats->unique('id')->take($limit);

            return response()->json(BeatResource::collection($popularBeats));

        } catch (\Exception $e) {
            \Log::error('Error fetching popular/trending beats with fallback: ' . $e->getMessage());

            try {
                $fallbackRandomBeats = Beat::inRandomOrder()->limit($limit)->get();
                return response()->json($fallbackRandomBeats);
            } catch (\Exception $e2) {
                 \Log::error('Critical error fetching any beats, even random: ' . $e2->getMessage());
                 return response()->json(['error' => 'Server temporarily unavailable. Please try again later.'], 500);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ... (Tu implementación actual de store)
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'scale' => 'string|max:255',
            'active' => 'required',
            'cover_file' => 'required',
            'stock' => 'required|integer',
            'bpm' => 'required|integer',
            'slug' => 'required|string',
            'mp3_file' => 'required',
            'tagged_file' => 'required',
            'mp3_price' => 'required',
            'wav_file' => 'required',
            'wav_price' => 'required',
            'stems_file' => 'required',
            'stems_price' => 'required',
            'exclusive' => 'required',
            'moods' => 'required',
            'genres' => 'required',
            'types' => 'array'
        ]);




        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cover = $request->cover_file;

        $beat = new Beat();

        if($cover != null){
            $coverName = Str::uuid(). '.'. $request->cover_file->getClientOriginalExtension();
            $coverPath = $request->cover_file->storeAs('covers', $coverName, 'public');
            $beat->cover_path = $coverPath;
        }



        $beat->name = $request->name;
        $beat->scale = $request->scale;
        $beat->active = $request->active;
        $beat->stock = $request->stock;
        $beat->bpm = $request->bpm;
        $beat->slug = $request->slug;
        $beat->still_exclusive = $request->exclusive === "true" ? 1 : 0;


        $taggedName = Str::uuid(). '.'. $request->tagged_file->getClientOriginalExtension();
        $taggedPath = $request->tagged_file->storeAs('tagged', $taggedName, 'public');
        $beat->tagged_path = $taggedPath;


        $beat->save();

        if($request->types) {

            

            foreach($request->types as $type)
            {
                $typeObject = Type::where(['name' => trim(strtolower($type))])->first();
                if(!$typeObject){
                    $typeObject = new Type();
                    $typeObject->name = trim(strtolower($type));
                    $typeObject->slug = strtolower(trim(str_replace(' ', '-', $type))) . '-type-beats';
                    $typeObject->save();
                }
                $beat->types()->attach($typeObject->id);
            }
        }


        $mp3License = new BeatLicense();
        $mp3License->beat_id = $beat->id;
        $mp3License->license_id = 1;
        $mp3License->price = $request->mp3_price;
        $mp3License->download_key = Uuid::uuid4();
        $mp3Name = Str::uuid(). '.'. $request->mp3_file->getClientOriginalExtension();
        $mp3Path = $request->mp3_file->storeAs('mp3', $mp3Name, 'beats');
        $mp3License->file_url = $mp3Path;
        $mp3License->save();


        $wavLicense = new BeatLicense();
        $wavLicense->beat_id = $beat->id;
        $wavLicense->license_id = 2;
        $wavLicense->price = $request->wav_price;
        $wavLicense->download_key = Uuid::uuid4();
        $wavName = Str::uuid(). '.'. $request->wav_file->getClientOriginalExtension();
        $wavPath = $request->wav_file->storeAs('wav', $wavName, 'beats');
        $wavLicense->file_url = $wavPath;
        $wavLicense->save();

        $stemsLicense = new BeatLicense();
        $stemsLicense->beat_id = $beat->id;
        $stemsLicense->license_id = 3;
        $stemsLicense->price = $request->stems_price;
        $stemsLicense->download_key = Uuid::uuid4();
        $stemsName = Str::uuid() . '.' . $request->stems_file->getClientOriginalExtension();
        $stemsPath = $request->stems_file->storeAs('stems', $stemsName, 'beats');
        $stemsLicense->file_url = $stemsPath;
        $stemsLicense->save();



        if($request->exclusive == "true"){
            $exclusiveLicense = new BeatLicense();
            $exclusiveLicense->beat_id = $beat->id;
            $exclusiveLicense->license_id = 4;
            $exclusiveLicense->price = $request->exclusive_price;
            $exclusiveLicense->download_key = Uuid::uuid4();
            // Ojo: $stems_url no está definida aquí en este bloque.
            // Si la licencia exclusiva usa el mismo archivo que stems, deberías reusar $stemsPath o guardarlo
            // Asegúrate de que $stems_url se pase correctamente o sea el path al archivo.
            $exclusiveLicense->file_url = $stemsPath; // Asumo que quieres usar el path de stems
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
    public function getOne(Request $request, string $slug)
    {
        // ... (Tu implementación actual de getOne)
        if($slug){
            if($request->input('_mode') == "full" && auth()->user() && auth()->user()->isAdmin())
            {
                $beat = Beat::where('slug', $slug)->first();
                if($beat){

                    $returnedBeat = [
                        'id' => $beat->id,
                        'name' => $beat->name,
                        'active' => $beat->active,
                        'scale' => $beat->scale,
                        'bpm' => $beat->bpm,
                        'cover_path' => $beat->cover_path,
                        'tagged_path' => $beat->tagged_path,
                        'mp3_file' => $beat->mp3_path(),
                        'mp3_download_key' => $beat->mp3_download_key(),
                        'mp3_price' => $beat->mp3_price(),
                        'wav_file' => $beat->wav_path(),
                        'wav_download_key' => $beat->wav_download_key(),
                        'wav_price' => $beat->wav_price(),
                        'stems_file' => $beat->stems_path(),
                        'stems_download_key' => $beat->stems_download_key(),
                        'stems_price' => $beat->stems_price(),
                        'still_exclusive' => $beat->still_exclusive,
                        'exclusive_price' => $beat->exclusive_price(),
                        'stock' => $beat->stock,
                        'licenses' => $beat->licenses('_full')->get()->map(function ($license) {
                            $license->pivot->makeHidden(['file_url']);
                            return $license;
                        }),
                        'moods' => $beat->moods,
                        'genres' => $beat->genres,
                        'purchases' => $beat->purchases(),
                    ];

                    return response()->json($returnedBeat, 200);
                }
                else{
                    return response()->json([
                        'message' => 'Beat no encontrado'
                    ], 404);
                }
            }
            else if ($request->input('_mode') == "client"){
                $beat = Beat::where('slug', $slug)->first();

                if($beat && $beat->active == 1){
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
                    'message' => 'token_not_found'
                ], 401);
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
        // ... (Tu implementación actual de update)
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
            'active' => 'integer',
            'scale' => 'string',
            'bpm' => 'integer',
            'stock' => 'boolean',
            'still_exclusive' => 'integer',
            'moods' => 'array',
            'genres' => 'array',
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }


        $beat->update($request->all());

        if($request->moods)
        {
            $mood_ids = Mood::whereIn('name', $request->moods)->pluck('id')->toArray();
            $beat->moods()->sync($mood_ids);
        }

        if($request->genres)
        {
            $genre_ids = Genre::whereIn('name', $request->genres)->pluck('id')->toArray();
            $beat->genres()->sync($genre_ids);
        }

        if($request->cover_file){
            $path = str_replace(asset('storage/'), '', $beat->cover_path);
            Storage::disk('public')->delete($path);
            $cover_path = $request->cover_file->store('covers', 'public');
            $cover_url = asset("storage/{$cover_path}");
            $beat->update([
                'cover_path' => $cover_url
            ]);
        }

        if($request->tagged_file){
            $path = str_replace(asset('storage/'), '', $beat->tagged_path);
            Storage::disk('public')->delete($path);
            $tagged_path = $request->tagged_file->store('tagged', 'public');
            $tagged_generated_url = asset("storage/{$tagged_path}");
            $beat->update([
                'tagged_path' => $tagged_generated_url
            ]);

        }

        if($request->mp3_file){
            $licenciaMP3 = BeatLicense::where('beat_id', $beat->id)->where('license_id', 1)->first();
            Storage::disk('public')->delete(str_replace(asset('storage/'), '', $licenciaMP3->file_url));
            $mp3_path = $request->mp3_file->store('mp3', 'public');
            $mp3_url = str_replace("http://localhost:8000/storage", "", asset("storage/{$mp3_path}"));
            $licenciaMP3->update([
                'file_url' => $mp3_url
            ]);
        }


        if($request->wav_file){
            $licenciaWAV = BeatLicense::where('beat_id', $beat->id)->where('license_id', 2)->first();
            Storage::disk('public')->delete(str_replace(asset('storage/'), '', $licenciaWAV->file_url));
            $wav_path = $request->wav_file->store('wav', 'public');
            $wav_url = str_replace("http://localhost:8000/storage", "", asset("storage/{$wav_path}"));
            $licenciaWAV->update([
                'file_url' => $wav_url
            ]);
        }

        if($request->stems_file){
            $licenciaStems = BeatLicense::where('beat_id', $beat->id)->where('license_id', 3)->first();
            Storage::disk('public')->delete(str_replace(asset('storage/'), '', $licenciaStems->file_url));
            $stems_path = $request->stems_file->store('stems', 'public');
            $stems_url = str_replace("http://localhost:8000/storage", "", asset("storage/{$stems_path}"));
            $licenciaStems->update([
                'file_url' => $stems_url
            ]);
            $licenciaExclusiva = BeatLicense::where('beat_id', $beat->id)->where('license_id', 4)->first();
            $licenciaExclusiva->update([
                'file_url' => $stems_url
            ]);
        }

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
        // ... (Tu implementación actual de destroy)
        if($id){
            $beat = Beat::where('id', $id)->first();
            if($beat){
                $beat->delete();

                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->cover_path));
                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->mp3_path()));
                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->tagged_path));
                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->mp3_path()));
                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->wav_path()));
                Storage::disk('public')->delete(str_replace(asset('storage/'), '', $beat->stems_path()));

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