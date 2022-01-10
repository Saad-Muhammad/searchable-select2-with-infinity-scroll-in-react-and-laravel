<?php

namespace App\Http\Controllers;

use App\Aricles;
use Illuminate\Http\Request;

class AriclesController extends Controller
{

    public function getArticles(Request $request)
    {
        return Aricles::where('title', 'LIKE', "%". $request->query('query') ."%")->paginate(10);
    }
}
