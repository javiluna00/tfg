<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mood extends Model
{
    use HasFactory;



    protected $fillable = [
        'name',
        'slug'
    ];

    public function beats()
    {
        return $this->belongsToMany(Beat::class, 'beat_mood')->withTimestamps();
    }


}
