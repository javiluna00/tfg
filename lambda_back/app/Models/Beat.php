<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Action;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Beat extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'scale',
        'bpm',
        'slug',
        'cover_path',
        'stock',
        'still_exclusive',
        'active',
        'tagged_path'
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

    public function isNew()
    {
        $createdAt = $this->created_at;
        $currentTime = Carbon::now();
        $difference = $currentTime->diffInDays($createdAt);
        return $difference <= 7;
    }

    public function purchases()
    {
        $beatLicenses = $this->licenses->pluck('id');
        $numberOfPurchases = Purchase::whereIn('beat_license_id', $beatLicenses)->count();
        return $numberOfPurchases;
    }


    public function mp3_path()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 1)->first()->file_url;
    }

    public function wav_path()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 2)->first()->file_url;
    }

    public function stems_path()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 3)->first()->file_url;
    }

    public function mp3_price()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 1)->first()->price;
    }

    public function wav_price()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 2)->first()->price;
    }

    public function stems_price()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 3)->first()->price;
    }

    public function exclusive_price()
    {
        if($this->still_exclusive){
            $licenseExclusive = BeatLicense::where('beat_id', $this->id)->where('license_id', 4)->first();
            if($licenseExclusive){
                return $licenseExclusive->price;
            }
        }

        return null;

    }

    public function mp3_download_key()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 1)->first()->download_key;
    }

    public function wav_download_key()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 2)->first()->download_key;
    }

    public function stems_download_key()
    {
        return BeatLicense::where('beat_id', $this->id)->where('license_id', 3)->first()->download_key;
    }

    public function licenses($mode = '_client')
    {   
        if($mode == '_full')
        {
            return $this->belongsToMany(License::class, 'beat_licenses')
                        ->withPivot('price', 'file_url', 'download_key')
                        ->withTimestamps();
        }
        else
        {
            return $this->belongsToMany(License::class, 'beat_licenses')
                        ->withPivot('price', 'file_url', 'id')
                        ->withTimestamps();
        }
    }

    public function moods()
    {
        return $this->belongsToMany(Mood::class, 'beat_mood')->withTimestamps();
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'beat_genre')->withTimestamps();
    }

    public function types()
    {
        return $this->belongsToMany(Type::class, 'beat_type')->withTimeStamps();
    }

}
