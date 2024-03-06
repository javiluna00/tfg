<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LicenseSeeder extends Seeder
{
    public function run()
    {
       $licenses = [
           [
               'name' => 'Licencia mp3',
               'description' => 'Licencia mp3, la más básica',
               'conditions' => 'Licencia mp3, la más basica',
               'legal_file_url' => 'https://www.rollingstone.com/wp-content/uploads/2022/11/Beat-1-1.jpg',
           ],
           [
            'name' => 'Licencia wav',
            'description' => 'Licencia wav, la más básica',
            'conditions' => 'Licencia wav, la más basica',
            'legal_file_url' => 'https://www.rollingstone.com/wp-content/uploads/2022/11/Beat-1-1.jpg',
            ],
            [
                'name' => 'Licencia stems',
                'description' => 'Licencia stems, la más básica',
                'conditions' => 'Licencia stems, la más basica',
                'legal_file_url' => 'https://www.rollingstone.com/wp-content/uploads/2022/11/Beat-1-1.jpg',
            ],
            [
                'name' => 'Licencia exclusiva',
                'description' => 'Licencia exclusiva',
                'conditions' => 'Licencia exclusiva',
                'legal_file_url' => 'https://www.rollingstone.com/wp-content/uploads/2022/11/Beat-1-1.jpg',
            ]
        ];

        DB::table('licenses')->insert($licenses);
    }
}

