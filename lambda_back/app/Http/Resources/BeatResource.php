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
            'scale' => $this->scale,
            'bpm' => $this->bpm,
            'cover_path' => $this->cover_path,
            'stock' => $this->stock,
            'still_exclusive' => $this->still_exclusive,
            'moods' => $this->moods->pluck('name'),
            'genres' => $this->genres->pluck('name'),
            'licenses' => $this->licenses->each(function ($license) {
                $license->pivot->makeHidden(['file_url']);
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
