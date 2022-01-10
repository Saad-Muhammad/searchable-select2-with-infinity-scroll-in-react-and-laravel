<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Aricles;

class AriclesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ini_set('memory_limit', '-1');
        $article = Factory(App\Aricles::class,10000)->create();
    }
}
