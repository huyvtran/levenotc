<?php

use App\Twig\AssetExtension;
use App\Twig\CsrfExtension;
use Awurth\SlimValidation\Validator;
use Awurth\SlimValidation\ValidatorExtension;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use Cartalyst\Sentinel\Native\SentinelBootstrapper;
use Illuminate\Database\Capsule\Manager;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Slim\Csrf\Guard;
use Slim\Flash\Messages;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Twig\Extension\DebugExtension;
use Interop\Container\ContainerInterface;

use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\Loader\PhpFileLoader;
use Symfony\Component\Translation\MessageSelector;
use Monolog\Formatter\JsonFormatter;

$config = C();
$capsule = new Manager();
$capsule->addConnection($config['settings']['eloquent']);
$capsule->setAsGlobal();
$capsule->bootEloquent();


$container['secret-key'] = 'sa9328343nd774788dhdhd-884747jjj99387jjhd-09';
$container["jwt"] = function ($container) {
    return new StdClass;
};
$container["config"] = function () {
    $config = [];
    $config['constants'] = ['ORDER_STATUS' => [
        "CREATED" => 0,
        "PAY" => 1,
        "RELEASE" => 2,
        "COMMENT" => 3,
        "COMPLAINT" => 4,
        "CANCEL" => 8,
        "FINISH" => 9,

    ]];
    return new Illuminate\Config\Repository($config);
};

$container['auth'] = function (ContainerInterface $c) {
    $sentinel = new Sentinel(new SentinelBootstrapper($c->get('settings')['sentinel']));
    return $sentinel->getSentinel();
};

$container['flash'] = function () {
    return new Messages();
};

$container['csrf'] = function (ContainerInterface $c) {
    $guard = new Guard();
    $guard->setFailureCallable($c->get('csrfFailureHandler'));

    return $guard;
};

// https://github.com/awurth/SlimValidation
$container['validator'] = function () {
    return new Validator();
};

$container['translator'] = function (ContainerInterface $container) {
//        $loader = new FileLoader(new Filesystem(), $container->get('settings')['translations_path']);
//        // Register the Dutch translator (set to "en" for English)
//        $translator = new Translator($loader, "nl");
//        return $translator;

//    $translator = new Translator('zh_CN');
//    $translator->addLoader('array', new ArrayLoader());
//    $translator->addResource('array', array(
//        'Symfony is great!' => 'J\'aime Symfony!',
//    ), 'zh_CN');

    $translator = new Translator("zh_CN", new MessageSelector());
// Set a fallback language incase you don't have a translation in the default language
    $translator->setFallbackLocales(['zh_CN']);
// Add a loader that will get the php files we are going to store our translations in
    $translator->addLoader('php', new PhpFileLoader());
// Add language files here
    $translator->addResource('php', C('root') . '/translations/zh_cn/message.php', 'zh_CN'); // Norwegian

    //$translator->addResource('php', './translations/en_US.php', 'en_US'); // English
    return $translator;

};

$container['monolog'] = function (ContainerInterface $c) {
    $config = $c->get('settings')['monolog'];

    $logger = new Logger($config['name']);
    $file_stream = new  StreamHandler($config['path'] . date("Y-m-d") . getenv('APP_ENV') . '.log', Logger::INFO);
    $file_stream->setFormatter(new  JsonFormatter());

    $logger->pushHandler($file_stream);

    $logger->pushProcessor(new UidProcessor());

    return $logger;
};
$container['cache'] = function (ContainerInterface $c) {
    $config = $c->get('settings')['redis'];

    $redis = [
        'schema' => $config['schema'],
        'host' => $config['host'],
        'port' => $config['port'],
        // other options
    ];
    $connection = new Predis\Client($redis);
    return new Symfony\Component\Cache\Adapter\RedisAdapter($connection);
};

$container['redis'] = function (ContainerInterface $c) {
    $config = $c->get('settings')['redis'];

    $redis = [
        'schema' => $config['schema'],
        'host' => $config['host'],
        'port' => $config['port'],
        // other options
    ];

    $client = new Predis\Client($redis);
    return $client;
};


$container['twig'] = function (ContainerInterface $c) {

    $config = $c->get('settings')['twig'];
    $twig = new Twig($config['path'], $config['options']);

    $twig->addExtension(new TwigExtension($c->get('router'), $c->get('request')->getUri()));
    $twig->addExtension(new DebugExtension());
    $twig->addExtension(new CsrfExtension($c->get('csrf')));
    $twig->addExtension(new ValidatorExtension($c->get('validator')));
    $twig->addExtension(new AssetExtension($c->get('request')));

    $twig->getEnvironment()->addGlobal('flash', $c->get('flash'));
    $twig->getEnvironment()->addGlobal('auth', $c->get('auth'));

    return $twig;
};


return $container;