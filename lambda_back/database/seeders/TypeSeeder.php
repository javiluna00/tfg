<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TypeSeeder extends Seeder
{
    public function run()
    {

        $types = [
            [
                'name' => 'yung beef',
                'description' => 'Discover exclusive Yung Beef type beats – gritty, dark, and experimental trap instrumentals. Get the authentic sound for your tracks, inspired by Spanish urban music. High-quality production for artists.',
                'slug' => 'yung-beef-type-beats',
            ],
            [
                'name' => 'kanye west',
                'description' => 'Kanye West type beats are a fusion of hip-hop and trap, with a unique sound that is both catchy and electrifying. Get the authentic sound for your tracks, inspired by his music. High-quality production for artists.',
                'slug' => 'kanye-west-type-beats',
            ],
            [
                'name' => 'kendrick lamar',
                'description' => 'Kendrick Lamar type beats are a fusion of hip-hop and trap, with a unique sound that is both catchy and electrifying. Get the authentic sound for your tracks, inspired by his music. High-quality production for artists.',
                'slug' => 'kendrick-lamar-type-beats',
            ]
            ];
            foreach ($types as $type) {
                
                Type::create($type);
            }


    }
}

