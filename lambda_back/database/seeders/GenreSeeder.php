<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class GenreSeeder extends Seeder
{
    public function run()
    {

        $genres = [['name' => 'Boom bap', 'slug' => 'boom-bap'], ['name' => 'Trap', "slug" => 'trap'], ['name' => 'New jazz', 'slug' => 'new-jazz'], ['name' => 'House', 'slug' => 'house'], ['name' => 'Pluggnb', 'slug' => 'pluggnb'], ['name' => 'Detroit', 'slug' => 'detroit'], ['name' => 'Reggaeton', 'slug' => 'reggaeton']];

        foreach ($genres as $genre) {
            Genre::create($genre);
        }


    }
}

