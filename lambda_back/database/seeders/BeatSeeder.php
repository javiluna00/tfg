<?php

namespace Database\Seeders;

use App\Models\Beat;
use App\Models\BeatLicense;
use App\Models\Genre;
use App\Models\License;
use App\Models\Mood;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BeatSeeder extends Seeder
{
    public function run()
    {
       $beats = [
           [
               'name' => 'Beat 1',
               'scale' => 'C',
               'bpm' => 120,
               'cover_path' => 'https://i.pinimg.com/564x/cc/b9/18/ccb918bec9cec5c1baec3d4f827529e3.jpg',
               'tagged_path' => "http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3",
               'stock' => 5,
               'still_exclusive' => true,
               'created_at' => now(),
               'updated_at' => now()
           ],
           [
            'name' => 'Beat 2',
            'scale' => 'D',
            'bpm' => 80,
            'cover_path' => 'https://i.pinimg.com/564x/88/de/38/88de383fb46f344b4f5b84836733a2ea.jpg',
            'stock' => 5,
            'tagged_path' => "http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 3',
            'scale' => 'E',
            'bpm' => 140,
            'cover_path' => 'https://i.pinimg.com/564x/78/ab/80/78ab809c799d2b0eb24e266be47a0a11.jpg',
            'stock' => 5,
            'still_exclusive' => false,
            'tagged_path' => "http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3",
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 4',
            'scale' => 'F',
            'bpm' => 120,
            'cover_path' => 'https://i.pinimg.com/564x/41/f9/01/41f901f5ead0160204dde9fb422e6bf6.jpg',
            'stock' => 5,
            'tagged_path' => "http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 5',
            'scale' => 'G',
            'bpm' => 120,
            'cover_path' => 'https://i.pinimg.com/564x/8b/a1/e4/8ba1e42a1844cecbe1b674a4c312f8b9.jpg',
            'stock' => 5,
            'tagged_path' => "http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ]
        ];

        foreach ($beats as $beatData) {
            $beat = Beat::create($beatData);

            // Asignar géneros aleatorios
            $genres = Genre::inRandomOrder()->limit(rand(1, 3))->get();
            $beat->genres()->attach($genres);

            // Asignar moods aleatorios
            $moods = Mood::inRandomOrder()->limit(rand(1, 2))->get();
            $beat->moods()->attach($moods);

            // Asignar todas las licencias disponibles
            for ($i = 0; $i < 4; $i++) {
                BeatLicense::create([
                    'beat_id' => $beat->id,
                    'license_id' => $i + 1,
                    'price' => rand(1, 100),
                    'file_url' => 'http://localhost:8000/storage/mp3/BAYyXcGvKa8dhYRMx65i7Ic3oONY5O5BsNQEMl43.mp3',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }


        }

    }
}

