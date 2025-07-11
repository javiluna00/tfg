<?php

namespace Database\Seeders;

use App\Models\Mood;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MoodSeeder extends Seeder
{
    public function run()
    {

        $moods = [
            ['name' => 'Happy', 'slug' => 'happy'],
            ['name' => 'Aggressive', 'slug' => 'aggressive'], 
            ['name' => 'Dark', 'slug' => 'dark'],
            ['name' => 'Sad', 'slug' => 'sad'],
            ['name' => 'Sentimental', 'slug' => 'sentimental'],
            ['name' => 'Epic', 'slug' => 'epic']
        ];

        foreach ($moods as $mood) {
            Mood::create($mood);
        }


    }
}

