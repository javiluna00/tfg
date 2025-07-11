<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MixMasterProject;

class MixMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mixMasterProjects = [
            [
                'name' => 'Mix Master 1',
                'description' => 'Mix Master 1',
                'url_unmixed' => '',
                'url_mixed' => '',
                'active' => true
            ],
            [
                'name' => 'Mix Master 2',
                'description' => 'Mix Master 2',
                'url_unmixed' => '',
                'url_mixed' => '',
                'active' => true,
            ],
            [
                'name' => 'Mix Master 3',
                'description' => 'Mix Master 3',
                'url_unmixed' => '',
                'url_mixed' => '',
                'active' => true
            ]
            ];

        foreach ($mixMasterProjects as $mixMasterProject) {
            MixMasterProject::create($mixMasterProject);
        }
    }
}
