<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MixMasterProject extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'url_unmixed',
        'url_mixed',
        'active'
    ];
}
