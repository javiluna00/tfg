<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'slug'
    ];

    public function beats()
    {
        return $this->belongsToMany(Beat::class, 'beat_type')->withTimestamps();
    }

    public function findSimilar(int $limit = 5)
    {
        // 1. Obtener los IDs de los beats asociados al type beat actual.
        $thisBeatIds = $this->beats->pluck('id')->toArray();
        $thisBeatIdsCount = count($thisBeatIds);

        if ($thisBeatIdsCount === 0) {
            return collect(); // Si el tipo actual no tiene beats, no hay similitud.
        }

        // 2. Obtener todos los demás Type Beats (excluyendo el actual).
        // Optimizamos para cargar solo los IDs de beats asociados a cada type para el cálculo.
        $otherTypes = Type::where('id', '!=', $this->id)
                          ->with('beats:id') // Carga solo el ID de los beats relacionados
                          ->get();

        $similarities = [];

        foreach ($otherTypes as $otherType) {
            $otherBeatIds = $otherType->beats->pluck('id')->toArray();
            $otherBeatIdsCount = count($otherBeatIds);

            if ($otherBeatIdsCount === 0) {
                continue; // Si el otro tipo no tiene beats, no se puede calcular similitud.
            }

            // Calcular la intersección (beats en común)
            $intersection = count(array_intersect($thisBeatIds, $otherBeatIds));

            // Calcular la unión (todos los beats únicos entre ambos tipos)
            $union = $thisBeatIdsCount + $otherBeatIdsCount - $intersection;

            // Evitar división por cero
            if ($union === 0) {
                $jaccardSimilarity = 0;
            } else {
                $jaccardSimilarity = $intersection / $union;
            }

            // Almacenar la similitud si es mayor que cero
            if ($jaccardSimilarity > 0) {
                $similarities[$otherType->id] = $jaccardSimilarity;
            }
        }

        // 3. Ordenar por similitud de forma descendente y tomar los top $limit
        arsort($similarities); // Ordena el array manteniendo las claves (IDs del type)
        $topSimilarTypeIds = array_slice(array_keys($similarities), 0, $limit);

        // 4. Cargar los modelos de Type correspondientes a los IDs encontrados,
        // ordenados por su similitud calculada.
        return Type::findMany($topSimilarTypeIds)
            ->sortBy(fn($type) => array_search($type->id, $topSimilarTypeIds));
            // sortBy para mantener el orden exacto de similitud
    }

}
