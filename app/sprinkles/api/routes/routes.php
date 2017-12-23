<?php

 


$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});



$app->group('/api/v2', function () use ($container) {
    $this->group('/test', function () use ($container) {
        $this->map(['GET', 'POST'], '/ok', 'App\Controller\test:ok')->add('jwt.middleware');;;
    });//->add('jwt.middleware') ;;
    $this->get('/bootstrappers', function ($request, $response) {
        $data = [
            'app_name' => 'beeotc',
            'coin_type' => \App\Service\BaseService::getCoinType(),

            'payment_provider' => [
                ['1' => '支付宝'],
                ['2' => '微信'],
                ['4' => '银联转账']

            ]
        ];
        return $response->withJson(['status' => 200, 'data' => $data]);
    });


   // $this->map(['GET', 'POST'], '/ticket', 'App\Controller\common', 'getPrice']);

    $this->post('/upload', 'App\Controller\UploadController:upload')->add('jwt.middleware');;
    $this->get('/upload', 'App\Controller\UploadController:index');


    $this->post('/user/login', 'App\Controller\UserController:login');
    $this->post('/user/register', 'App\Controller\UserController:register');
    $this->group('/user', function () {
        $this->post('/profile', 'App\Controller\UserController:profile');
        $this->post('/logout', 'App\Controller\UserController:logout');
        $this->post('/safe/check', 'App\Controller\UserController:check');
        $this->post('/advert', 'App\Controller\AdvertController:getByUser');
        $this->post('/order', 'App\Controller\OrderController:getByUser');

        $this->post('/balance', 'App\Controller\UserController:getBalances');


    })->add('jwt.middleware');




    $this->group('/wallet', function () {
        $this->post('/address', 'App\Controller\WalletController:address');
        $this->post('/address/store', 'App\Controller\WalletController:storeAddress');
        $this->post('/deposit/{id}', 'App\Controller\WalletController:deposit');
        $this->post('/withdraw', 'App\Controller\WalletController:withdraw');
        $this->post('/withdraw/history', 'App\Controller\WalletController:history');

    })->add('jwt.middleware');


    $this->group('/advert', function () use ($container) {
        $this->post('', 'App\Controller\AdvertController:overview');
        $this->post('/store', 'App\Controller\AdvertController:store')->add('jwt.middleware');
        $this->post('/detail/{id}', 'App\Controller\AdvertController:show');
    });


    $this->group('/verifycodes', function () {
        $this->post('', 'App\Controller\CommonController:captcha');
        $this->post('/register', 'App\Controller\CommonController:captchaReg');
    });

    $this->group('/order', function () {
        $this->post('/detail/{id}', 'App\Controller\OrderController:show');
        $this->post('/store', 'App\Controller\OrderController:store');
        $this->post('/pay', 'App\Controller\OrderController:pay');
        $this->post('/cancel', 'App\Controller\OrderController:cancel');
        $this->post('/release', 'App\Controller\OrderController:release');
        $this->post('/comment', 'App\Controller\OrderController:comment');
        $this->post('/complaint', 'App\Controller\OrderController:complaint');

    })->add('jwt.middleware');

    $this->group('/im', function () {
        $this->post('/message/send', 'App\Controller\ImController:send');
        $this->post('/message/history', 'App\Controller\ImController:history');
        $this->map(['POST', 'GET'], '/auth', 'App\Controller\ImController:auth');
    })->add('jwt.middleware');

});