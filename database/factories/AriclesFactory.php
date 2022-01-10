<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Aricles;
use Faker\Generator as Faker;

$factory->define(Aricles::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(10)
    ];
});
