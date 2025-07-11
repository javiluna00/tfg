<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BeatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->load('licenses', 'moods', 'genres');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'active' => $this->active,
            'scale' => $this->scale,
            'bpm' => $this->bpm,
            'cover_path' => $this->cover_path,
            'tagged_path' => $this->tagged_path,
            'stock' => $this->stock,
            'slug' => $this->slug,
            'still_exclusive' => $this->still_exclusive,
            'types' => $this->types(),
            'moods' => $this->moods,
            'genres' => $this->genres,
            'licenses' => $this->licenses('_client')->get()->each(function ($license) {
                $license->pivot->makeHidden(['file_url']);
            }),
            'types' => $this->types,
            'saves' => count($this->saves),
            'purchases' => $this->purchases(),
            'is_new' => $this->isNew(),
            'plays' => count($this->plays),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
