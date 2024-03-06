<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Action;
use Illuminate\Database\Eloquent\SoftDeletes;

class Beat extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'scale',
        'bpm',
        'cover_path',
        'stock',
        'still_exclusive',
    ];

    public function clicks()
    {
        return $this->hasMany(BeatClick::class);
    }

    public function plays()
    {
        return $this->hasMany(BeatPlay::class);
    }

    public function saves()
    {
        return $this->belongsToMany(User::class, 'beat_saves')->withTimestamps();
    }


    public function licenses()
    {
        return $this->belongsToMany(License::class, 'beat_licenses')->withPivot('price', 'file_url')->withTimestamps();
    }

    public function moods()
    {
        return $this->belongsToMany(Mood::class, 'beat_mood')->withTimestamps();
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'beat_genre')->withTimestamps();
    }
}
