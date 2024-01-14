<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Filesystem\Filesystem;

class RestartCommand extends Command
{

    protected $signature = 'restart:proyect';


    protected $description = 'Ejecuta varios comando seguidos para restaurar el proyecto desde cero';

    public function handle()
    {

        $this->output->progressStart(6);
        // migracion
        Artisan::call('migrate:fresh', [
            '--force' => true,
        ]);
        $this->info(" 🎯 Migraciones ejecutadas!");
        $this->output->progressAdvance();
        // Seeder
        Artisan::call('db:seed', [
            '--force' => true,
        ]);
        $this->info(" 🧩 Seeders ejecutados!");
        $this->output->progressAdvance();


        // optimize
        Artisan::call('optimize');
        $this->output->progressAdvance();
        $this->info(" 📦 Proyecto optimizado!");

        // Borrar
        $file = new Filesystem;
        $file->cleanDirectory('storage/app');
        $this->output->progressAdvance();
        $this->info(" ✨ Storage vacio!");

        // disks
        Artisan::call('storage:link');
        $this->output->progressAdvance();
        $this->info(" 💿 Discos linkeados!");

        $this->output->progressFinish();
        $this->info("Proyecto restaurado 🎉🎉🎉");
    }
}
