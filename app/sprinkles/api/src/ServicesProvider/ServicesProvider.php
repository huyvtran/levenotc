<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */

namespace UserFrosting\Sprinkle\Api\ServicesProvider;

use App\Service\AuthService;
use Monolog\Formatter\JsonFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Predis\Client;
use Pusher\Pusher;
use Slim\Middleware\JwtAuthentication;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\Translation\Loader\YamlFileLoader;
use UserFrosting\I18n\MessageTranslator;

class ServicesProvider
{


    /**
     * Register extended user fields services.
     *
     * @param Container $container A DI container implementing ArrayAccess and container-interop.
     */
    public function register($container)
    {


        $container['parse']=function($container){
            $config = $container->get('settings')['parse'];

            \Parse\ParseClient::initialize( $config['appid'], null, $config['marst_key'] );

            \Parse\ParseClient::setServerURL($config['server_url'],$config['mount']);


        };
        $container['pusher']=function($container){


            $pusher = new  Pusher(getenv('PUSHER_APP_KEY'), getenv('PUSHER_APP_SECRET'), getenv("PUSHER_APP_ID"), array('cluster' => getenv('PUSHER_APP_CLUSTER')));
            return $pusher;

        };

        $container['cache'] = function ( $c) {

            $redis = [
                'schema' => getenv('REDIS_SCHEMA'),
                'host' => getenv('REDIS_HOST'),
                'port' => getenv('REDIS_PORT'),
                // other options
            ];
            $connection = new Client($redis);
            return new  RedisAdapter($connection);
        };

        $container['redis'] = function ( $c) {
            $redis = [
                'schema' => getenv('REDIS_SCHEMA'),
                'host' => getenv('REDIS_HOST'),
                'port' => getenv('REDIS_PORT'),
                // other options
            ];
            $connection = new Client($redis);
            return $connection;
        };



        // https://github.com/awurth/SlimValidation
        $container['validator'] = function () {
            return new Validator();
        };
        $container->extend('classMapper', function ($classMapper, $c) {
            $classMapper->setClassMapping('user', 'App\Model\User');
            return $classMapper;
        });


        $controllers = require $container->locator->findResource('config://controllers.php', true, false);
        foreach ($controllers as $key => $class) {
            $container[$key] = $class;
        }
//        $container['translator'] = function ($c) {
//            // Load the translations
//            $paths = $c->localePathBuilder->buildPaths();
//
//            $loader = new \UserFrosting\Support\Repository\Loader\YamlFileLoader($paths);
//
//            // Create the $translator object
//            $translator = new MessageTranslator($loader->load());
//
//            return $translator;
//        };


        $container['apiTokenAuth'] = function ($c) {

            $config = $c->config;

            $apiTokenAuth = new JwtAuthentication([
                "algorithm" => $config['tokeniser']['algorithm'],
                "attribute" => $config['tokeniser']['attribute'],
                "error" => function ($request, $response, $arguments) {
                    throw new InvalidCredentialsException();
                },
                "ignore" => $config['tokeniser']['ignore'],
                "path" => $config['tokeniser']['path'],
                "relaxed" => $config['tokeniser']['relaxed'],
                "secret" => $config['tokeniser']['secret'],
                "secure" => $config['tokeniser']['secure']
            ]);

            return $apiTokenAuth;
        };

        $container['auth'] = function ($c) {
            $auth = new AuthService($c);

            return $auth;
        };

        $container['monolog'] = function ($c) {
            $config = $c->get('settings')['monolog'];

            $logger = new Logger($config['name']);

            $logFile = $c->locator->findResource('log://info.'.date("Y-m-d") .'.log', true, true);

            $file_stream = new  StreamHandler($logFile, Logger::INFO);

            $file_stream->setFormatter(new  JsonFormatter());

            $logger->pushHandler($file_stream);

            $logger->pushProcessor(new UidProcessor());

            return $logger;
        };


        $container['jwt.middleware'] = function ($container) {

            return new JwtAuthentication([
                "secret" => getenv('UF_API_SECRET'),
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
                'message' => '认证失败',
                "callback" => function ($request, $response, $arguments) use ($container) {

                    $container['monolog']->info('Requst:', [$request->getHeaders()]);

                    $container['jwt']= $arguments["decoded"];
                    if(!$container['auth']->checkUser()){
                        return false;
                    } ;

                    $container['monolog']->info('Auth:', $arguments);


                },
                "error" => function ($request, $response, $arguments) {
                    $data["status"] = "401";
                    $data["message"] = $arguments["message"];
                    return $response
                        ->withHeader("Content-Type", "application/json")
                        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
                }
            ]);

        };


    }
}
