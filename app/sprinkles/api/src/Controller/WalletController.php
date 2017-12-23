<?php

namespace App\Controller;

use App\Service\UserWalletService;
use Interop\Container\ContainerInterface;
use Respect\Validation\Validator as V;
use Slim\Http\Request;
use Slim\Http\Response;
use UserFrosting\Fortress\RequestDataTransformer;
use UserFrosting\Fortress\RequestSchema;
use UserFrosting\Fortress\ServerSideValidator;
use UserFrosting\Sprinkle\Api\Facades\Auth;
use UserFrosting\Sprinkle\Api\Facades\Log;

class WalletController extends Controller
{
    public function __construct(ContainerInterface $container)
    {
        parent::__construct($container);
    }


    public function address(Request $request, Response $response)
    {

        $address = UserWalletService::address($this->auth->getUser());
        return $this->json($address);
    }


    public function storeAddress(Request $request, Response $response)
    {


        $params = $request->getParams();
        $schema = new RequestSchema('schema://address.yaml');

        $transformer = new RequestDataTransformer($schema);
        $data = $transformer->transform($params);

        $validator = new ServerSideValidator($schema, $this->ci->translator);

        if (!$validator->validate($data)) {

            foreach ($validator->errors() as $idx => $field) {
                foreach ($field as $eidx => $error) {
                    //$this->addMessage("danger", $error);
                    Log::info("error", [$error]);
                    return $this->error($error);
                }
            }
        }

        $params["user_id"] = Auth::getUser()->id;


        if (UserWalletService::isExistAddress($params) != null) {
            $this->error('已存在此地址');
        }


        $address = UserWalletService::storeAddress($params);
        return $this->json($address);


    }

    public function deposit(Request $request, Response $args)
    {

        $coin_type = $args['id'];
        $user_id = $this->auth->getUser()->getUserId();


        $address = UserWalletService::getWalletAddress($user_id, $coin_type);
        return $this->json($address);

    }


    public function withdraw(Request $request, Response $response)
    {


        $params = $request->getParams();


        $schema = new RequestSchema('schema://address.yaml');

        $transformer = new RequestDataTransformer($schema);
        $data = $transformer->transform($params);

        $validator = new ServerSideValidator($schema, $this->ci->translator);

        if (!$validator->validate($data)) {

            foreach ($validator->errors() as $idx => $field) {
                foreach ($field as $eidx => $error) {
                    //$this->addMessage("danger", $error);
                    Log::info("error", [$error]);
                    return $this->error($error);
                }
            }
        }

        $params["user_id"] = Auth::getUser()->id;
        $params['order_code'] = time();


        Log::info("with",[$params]);
        $address = UserWalletService::storeWithdraw($params);
        return $this->json($address);


    }


    public function history(Request $request, Response $response)
    {


        $withdraws = UserWalletService::getHistory($request, $this->auth->getUser());
        return $this->json($withdraws);

    }


}
