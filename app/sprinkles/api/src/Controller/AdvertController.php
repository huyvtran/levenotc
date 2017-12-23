<?php

namespace App\Controller;

use App\Helpers\CoinHelpers;

use App\Service\AdvertService;
use App\Validator\Advert;
use Slim\Http\Request;
use Slim\Http\Response;
use UserFrosting\Sprinkle\Api\Facades\Auth;
use UserFrosting\Sprinkle\Api\Facades\Log;

class AdvertController extends Controller
{

    use Advert;


    public function overview(Request $request, Response $response)
    {

        $adverts = AdvertService::search($request, 20);
        return $this->json($adverts);
    }

    public function show(Request $request, Response $response, $id)
    {

        $advert = AdvertService::get($id);

        return $this->json($advert);
    }


    public function getByUser(Request $request, Response $response)
    {


        $adverts = AdvertService::getByUser($request, $this->user);
        $coins = CoinHelpers::getIds();
        foreach ($adverts as $k => $v) {
            $adverts[$k]->coin_name = $coins[$v->coin_type]['name'];
        }

        return $this->json($adverts);

    }


    public function store(Request $request, Response $response)
    {


        Log::info('request', [$request->getParams()]);
        $violations = $this->inputCheck($request);

        if (0 !== count($violations)) {
            return $this->error($violations[0]->getMessage());
        }
        $data = $request->getParams();

        $data["user_id"] = Auth::getUser()->id;


        $advert = AdvertService::store($data);
        return $this->json($advert);


    }


}
