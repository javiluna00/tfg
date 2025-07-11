<?php

namespace Database\Seeders;

use App\Models\Beat;
use App\Models\BeatLicense;
use App\Models\Genre;
use App\Models\License;
use App\Models\Mood;
use App\Models\Type;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class BeatSeeder extends Seeder
{
    public function run()
    {
       $beats = [
           [
               'name' => 'Beat 1',
               'scale' => 'C',
               'bpm' => 120,
               'cover_path' => 'covers/6rjTChJJzQsHYwBQHcNR9OFMvMkhjaqZWiITo3eX.jpg',
               'tagged_path' => "tagged/V4pclZjktsFpvJGW8kF7rRMZASHWGuIOZbroxQcV.mp3",
               'stock' => 5,
               'still_exclusive' => true,
               'created_at' => now(),
               'updated_at' => now()
           ],
           [
            'name' => 'Beat 2',
            'scale' => 'D',
            'bpm' => 80,
            'cover_path' => 'covers/GlEKhK6DzDpc3n87RK4xxCrKdyvzT5o0hzQ6KOTS.png',
            'stock' => 5,
            'tagged_path' => "tagged/91a876f8-bf65-41b7-8c44-8eaa4281ad6d.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 3',
            'scale' => 'E',
            'bpm' => 140,
            'cover_path' => 'covers/m9jQ9EllVqtT5qa9pc80bKvmpbe10V7Y1zH7VxOp.png',
            'stock' => 5,
            'still_exclusive' => false,
            'tagged_path' => "tagged/p5uFdzUGDQK0MwS66ORc1FnTuPM9QIorzN4AOp8S.mp3",
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 4',
            'scale' => 'F',
            'bpm' => 120,
            'cover_path' => 'covers/thyir0XMFzlYegm7B0IQrLMo6mzG4w9JNOCLYvk5.jpg',
            'stock' => 5,
            'tagged_path' => "tagged/V4pclZjktsFpvJGW8kF7rRMZASHWGuIOZbroxQcV.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ],
           [
            'name' => 'Beat 5',
            'scale' => 'G',
            'bpm' => 120,
            'cover_path' => 'covers/yqlYibPqzUwI4fefpc7xVBBGBxIfeIsuEUwbUIA1.jpg',
            'stock' => 5,
            'tagged_path' => "tagged/0Djyb1tuJCxTfrtoXgWCfjxfI6Z0wuCkNnMf5NA5.mp3",
            'still_exclusive' => true,
            'created_at' => now(),
            'updated_at' => now()
           ]
        ];

        foreach ($beats as $beatData) {
            $beat = Beat::create($beatData);

            // Asignar géneros aleatorios
            $generosAleatorios = Genre::inRandomOrder()->limit(3)->get(); // Obtener 3 géneros aleatorios
            foreach ($generosAleatorios as $genero) {
                $beat->genres()->attach($genero->id); // Suponiendo que existe una relación muchos a muchos entre beats y géneros
            }

            $moodsAleatorios = Mood::inRandomOrder()->limit(3)->get(); // Obtener 3 moods aleatorios
            foreach ($moodsAleatorios as $mood) {
                $beat->moods()->attach($mood->id); // Suponiendo que existe una opción muchos a muchos entre beats y moods
            }
            $slug = strtolower(str_replace(' ', '-', $beat->name));

            $typesAleatorios = Type::inRandomOrder()->limit(3)->get(); // Obtener 3 types aleatorios
            foreach ($typesAleatorios as $type) {
                $beat->types()->attach($type->id); // Suponiendo que existe una opción muchos a muchos entre beats y types
                $slug .= '-' . str_replace(' ', '-', $type->name);
            }
            
            $beat->slug = strtolower($slug);
            $beat->save();
            
            

            // Asignar todas las licencias disponibles
            $licencias = License::all(); // Obtener todas las licencias disponibles

            foreach ($licencias as $licencia) {
                BeatLicense::create([
                    'beat_id' => $beat->id,
                    'license_id' => $licencia->id, // Usar el ID de la licencia actual en la iteración
                    'price' => rand(1, 100),
                    'download_key' => Uuid::uuid4(),
                    'file_url' => 'mp3/2TBUIuZG2dd5QLcICsAYV1xoljJVw94OsYLYEkfq.mp3',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }


        }

    }
}

