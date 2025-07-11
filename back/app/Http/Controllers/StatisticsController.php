<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function __construct(){
        $this->middleware('jwt.verify', ['except' => []]);
    }
    public function index() {
        if(!auth()->user()->isAdmin())
        {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $data = [];
        $soldBeats = Purchase::all()->count();
        $data['soldBeats'] = $soldBeats;
        $totalMoney = Purchase::all()->sum('price');
        $data['totalMoney'] = $totalMoney;

        $thisMonthBeats = Purchase::whereMonth('created_at', date('m'))->count();
        $lastMonthBeats = Purchase::whereMonth('created_at', date('m')-1)->count();

        if($lastMonthBeats == 0)
        {
            $lastMonthBeats = 1;
        }

        $thisMonthMoney = Purchase::whereMonth('created_at', date('m'))->sum('price');
        $lastMonthMoney = Purchase::whereMonth('created_at', date('m')-1)->sum('price');

        if($lastMonthMoney == 0)
        {
            $lastMonthMoney = 1;
        }

        $mensualGrowthByNumberOfPurchases = ($thisMonthBeats - $lastMonthBeats) / $lastMonthBeats * 100;
        $mensualGrowthByMoney = ($thisMonthMoney - $lastMonthMoney) / $lastMonthMoney * 100;
        $data['mensualGrowthByNumberOfPurchases'] = $mensualGrowthByNumberOfPurchases;
        $data['mensualGrowthByMoney'] = $mensualGrowthByMoney;

        $soldBeatsByMonthLastSixMonths = [];

        $monthNames = ["1" => 'Enero', "2" => 'Febrero', "3" => 'Marzo', "4" => 'Abril', "5" => 'Mayo', "6" => 'Junio', "7" => 'Julio', "8" => 'Agosto', "9" => 'Septiembre', "10" => 'Octubre', "11" => 'Noviembre', "12" => 'Diciembre'];

        for ($i = 0; $i < 6; $i++) {
            $month = date('m', strtotime('-' . $i . ' months'));
            $beats = Purchase::whereMonth('created_at', $month)->count();
            $soldBeatsByMonthLastSixMonths[] = $beats;
        }

        $data['soldBeatsByMonthLastSixMonths'] = $soldBeatsByMonthLastSixMonths;

        $earnsByMonthLastSixMonths = [];

        for ($i = 0; $i < 6; $i++) {
            $month = date('m', strtotime('-' . $i . ' months'));
            $money = Purchase::whereMonth('created_at', $month)->sum('price');
            $earnsByMonthLastSixMonths[] = (float) $money;
        }

        $data['earnsByMonthLastSixMonths'] = $earnsByMonthLastSixMonths;
        return response()->json($data, 200);

    }
}
