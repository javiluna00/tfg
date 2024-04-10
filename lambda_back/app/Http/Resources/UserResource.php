<?php

namespace App\Http\Resources;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'google_id' => $this->google_id,
            'roles' => $this->roles,
            'artist_name' => $this->artist_name,
            'purchases' => PurchaseResource::collection($this->purchases),
            //'saved_beats' => $this->savedBeats
        ];
    }
}
