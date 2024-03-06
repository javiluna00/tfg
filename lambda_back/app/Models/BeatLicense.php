<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeatLicense extends Model
{
    use HasFactory;

    protected $table = 'beat_licenses';

    protected $fillable = [
        'beat_id',
        'license_id',
        'price',
        'file_url',
        'created_at',
        'updated_at'
    ];

    public function beat()
    {
        return $this->belongsTo(Beat::class);
    }

    public function license()
    {
        return $this->belongsTo(License::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class);
    }

}
