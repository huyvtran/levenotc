<?php

namespace UserFrosting\Sprinkle\Web\Queries;


use App\Model\Advert;
use Illuminate\Contracts\Pagination\Paginator;

class SearchTrade
{
    /**
     */
    public static function get(  $request, int $perPage = 20): Paginator
    {


        return Advert::with("user")
            ->where(function ($query) use ($request) {

                $trade_type = $request->getParam('trade_type', 1);
                $query->where('trade_type', $trade_type);

            })
            ->paginate($perPage);


    }
}
