<?php

use App\Middleware\AuthMiddleware;
use App\Middleware\GuestMiddleware;
use Slim\Middleware\JwtAuthentication;

use Interop\Container\ContainerInterface;


$container->set('guest.middleware',function (ContainerInterface $container) {
    //return new GuestMiddleware($container->get('router'), $container->get('auth'));
});

$container->set('auth.middleware',function ( ContainerInterface $container) {
    return function ($role = null) use ($container) {
        //return new AuthMiddleware($container->get('router'), $container->get('flash'), $container->get('auth'), $role);
    };
});

$container->set('jwt.middleware',  function (ContainerInterface $container) {

    return new JwtAuthentication([
        "secret" => $container->get('secret-key'),
        "secure" => false,
        "path" => "/api/v2",
        "algorithm" => ["HS256"],
        "passthrough" => ["/api/v2/user/login"],
        "rules" => [

            new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
                "passthrough" => ["OPTIONS"]
            ])
        ],
        "attribute" => "jwt",
        'message'=>'认证失败',
        "callback" => function ($request, $response, $arguments)use($container)   {

            $container->get('monolog')->info('Requst:',[$request->getHeaders()]);

            $container->set('jwt',$arguments["decoded"]);
            $user= $container->get('auth')->authenticate((array)$arguments["decoded"]->data->credentials,true);
            $container->get('monolog')->info('Auth:',[$arguments]);
            if(!$user){
                return false;
            }
            $container->get('monolog')->info('Auth:',[$arguments]);


        },
        "error" => function ($request, $response,$arguments) {
            $data["status"] = "401";
            $data["message"] = $arguments["message"];
            return $response
                ->withHeader("Content-Type", "application/json")
                ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    ]);

});
//$app->add($container['csrf']);
return $container;

