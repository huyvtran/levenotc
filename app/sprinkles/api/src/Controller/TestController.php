<?php

namespace App\Controller\Api;

use App\Entity\Post;
use App\Model\User;
use App\Model\WalletAddress;
use App\Repositories\AdvertRepository;
use App\Service\AdvertService;
use App\Service\BaseService;
use App\Service\OrderService;
use App\Service\TestService;
use App\Validator\UserRegister;

use Carbon\Carbon;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Cartalyst\Sentinel\Native\SentinelBootstrapper;
use Cartalyst\Sentinel\Sentinel;
use Firebase\JWT\JWT;
use JsonSchema\Validator;
use Leven\Container;
use Leven\Log;
use Leven\View;
use Monolog\Formatter\JsonFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Respect\Validation\Validator as V;
use Slim\Http\Request;
use Slim\Http\Response;

use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\Translation\Loader\ArrayLoader;
use Symfony\Component\Translation\Loader\PhpFileLoader;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

use Psr\Http\Message\ResponseInterface;
use DI\Annotation\Inject;
use Slim\Views\Twig;

use Coinbase\Wallet\Client;
use Coinbase\Wallet\Configuration;


class TestController extends Controller
{

    use UserRegister;
    /**
     * Annotation combined with phpdoc:
     *
     * @ Inject
     * @var Translator
     */
    protected $translator;




    public function delete($request, $response)
    {


        $user=$this->user->findOrfail(3);
        dump($user);

        return $this->twig->render($response, 'home.twig');
    }

    public function test(Request $request,Response $response)
    {
         for($i=0;$i<1000;$i++){
             $data['coin_type']=2;
             $data['address']=uniqid().generate_code();

             WalletAddress::create($data);
         }
    }


    public function ok( ){


        echo 3333;
        exit;
        $configuration = Configuration::apiKey(getenv('API_Key'), getenv('API_Secret'));
        $client = Client::create($configuration);


        $accounts = $client->getAccounts();



        $addresses = $client->getAccountAddresses($account);







       // $data = json_decode(file_get_contents($this->app->getRootDir().'/src/Schema/test.json'));

// Validate
        $validator = new Validator();
        $data['id']=[
            "name"=>333,
            "price"=>4444
        ];// stdClass;

        $validator->validate($data, (object)['$ref' => 'file://' . $this->app->getRootDir().'/src/Schema/message.json']);

        if ($validator->isValid()) {
            echo "The supplied JSON validates against the schema.\n";
        } else {
            echo "JSON does not validate. Violations:\n";
            foreach ($validator->getErrors() as $error) {
                echo sprintf("[%s] %s\n", $error['property'], $error['message']).'<br>';
            }
        }
        exit;

        Container::get('redis')->hset('hset', "aa",\GuzzleHttp\json_encode(['a'=>3333]));
        Log::info('aafasdfsdf');
        $item = $this->redis->hget('hset' ,"aa");

       return View::fetch('home.twig',["item"=>$item]);
        dump($item);
        exit;

         //dump($this->cache);
         //$item = $this->redis->command('hset', ['monitoring_order', 333,Carbon::now()]);
         $item = $this->redis->hset('hset', "aa",\GuzzleHttp\json_encode(['a'=>3]));
         $item = $this->redis->hget('hset' ,"aa");


         dump($item);
         exit;
        if ($item->isHit()) {
            return 'I was previously called at ' . $item->get();
        }
        else {
            $item->set(time());
            $item->expiresAfter(3600);
            $this->cache->save($item);

            return 'I am being called for the first time, I will return results from cache for the next 3600 seconds.';
        }



        $data=[
            "username"=>''
        ];
//        $validator = Validation::createValidator();
//        $violations = $validator->validate('asdf', array(
//
//            new IsTrue(['message'=>'asdfasfdafd']),
//            new Email(['message'=>'234234'])
//        ));
//
//
//
//
//        $violations = $validator->validate($author);
        $violations=$this->inputCheck($request);


//        $translator = new Translator('zh_CN');
//        $translator->addLoader('array', new ArrayLoader());
//        $translator->addResource('array', array(
//            'hello33' => 'J\'aime Symfony!',
//        ), 'zh_CN');
//
//        $translator->addLoader('php', new PhpFileLoader());
//// Add language files here
//
//        $translator->addResource('php', C('root').'/translations/zh_cn/message.php', 'zh_CN'); // Norwegian

        //dump($this->translator->trans('hello'));
//        $validator = Validation::createValidator();
//        $violations = $validator->validate('asdf', array(
//
//            new IsTrue(['message'=>'asdfasfdafd']),
//            new Email(['message'=>'234234'])
//        ));
//
//        $author = new Post();
//
//
//        $errors = $validator->validate($author);
//
       //dump($errors[0]->getMessage());
//
//
        if (0 !== count($violations)) {


            // there are errors, now you can show them
            foreach ($violations as $violation) {
                dump($violation);
                //echo $violation->getMessage().'<br>';
            }
        }
    }

}
