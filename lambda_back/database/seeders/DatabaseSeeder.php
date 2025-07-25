<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(MoodSeeder::class);
        $this->call(GenreSeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(LicenseSeeder::class);
        $this->call(BeatSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(MixMasterSeeder::class);
    }
}
