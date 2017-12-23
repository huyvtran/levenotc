<?php

namespace App\Controller;

use App\Controller\Controller;
use App\Model\User;
use App\Model\UserBalance;
use App\Service\UserService;
use App\Service\UserWalletService;
use App\Validator\UserRegister;
use Firebase\JWT\JWT;

use Slim\Http\Request;
use Slim\Http\Response;
use UserFrosting\Fortress\RequestDataTransformer;
use UserFrosting\Fortress\RequestSchema;
use UserFrosting\Fortress\ServerSideValidator;
use UserFrosting\Sprinkle\Account\Authenticate\Exception\InvalidCredentialsException;
use UserFrosting\Sprinkle\Account\Controller\Exception\SpammyRequestException;
use UserFrosting\Sprinkle\Account\Facades\Password;
use UserFrosting\Sprinkle\Api\Facades\Auth;
use UserFrosting\Sprinkle\Api\Facades\Log;
use UserFrosting\Sprinkle\Core\Controller\SimpleController;
use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Facades\Debug;
use UserFrosting\Sprinkle\Core\Mail\EmailRecipient;
use UserFrosting\Sprinkle\Core\Mail\TwigMailMessage;

class UserController extends Controller
{

    use UserRegister;

    public function jwtGenerator($user)
    {
        $token = [
            "iss" => "http://pf.local",
            "iat" => time(),
            "nbf" => time(),
            'exp' => strtotime("+12 month"),
            "data" => [
                'id' => $user->id,
                'user' => $user
            ],
        ];

        $jwt = JWT::encode($token, getenv('JWT_SECRET'));

        return $jwt;
    }


    public function login($request, $response, $args)
    {

        $params = $request->getParams();

        Log::info("params", [$params]);

        /** @var UserFrosting\Sprinkle\Core\MessageStream $ms */
        $ms = $this->ci->alerts;

        /** @var UserFrosting\Sprinkle\Account\Database\Models\User $currentUser */
        $currentUser = $this->ci->currentUser;

        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
//        if ($authenticator->check()) {
//            $ms->addMessageTranslated('warning', 'LOGIN.ALREADY_COMPLETE');
//            return $response->withStatus(200);
//        }


        /** @var UserFrosting\Config\Config $config */
        $config = $this->ci->config;

        // Get POST parameters

        Log::info("params", [$params]);
        // Load the request schema
        $schema = new RequestSchema('schema://requests/login.yaml');

        // Whitelist and set parameter defaults
        $transformer = new RequestDataTransformer($schema);
        $data = $transformer->transform($params);

        // Validate, and halt on validation errors.  Failed validation attempts do not count towards throttling limit.
        $validator = new ServerSideValidator($schema, $this->ci->translator);

        Log::info("ok", [$data]);
        if (!$validator->validate($data)) {

            foreach ($validator->errors() as $idx => $field) {
                foreach ($field as $eidx => $error) {
                    //$this->addMessage("danger", $error);
                    Log::info("error", [$error]);
                    return $this->error($error);
                }
            }
        }


        // Determine whether we are trying to log in with an email address or a username
        $isEmail = filter_var($data['username'], FILTER_VALIDATE_EMAIL);

        // Throttle requests

        /** @var UserFrosting\Sprinkle\Core\Throttle\Throttler $throttler */
        $throttler = $this->ci->throttler;

        $userIdentifier = $data['username'];

        $throttleData = [
            'user_identifier' => $userIdentifier
        ];

        $delay = $throttler->getDelay('sign_in_attempt', $throttleData);


        if ($delay > 0) {
            $ms->addMessageTranslated('danger', 'RATE_LIMIT_EXCEEDED', [
                'delay' => $delay
            ]);
            Debug::info("throttler:", [$delay]);

            return $this->error('访问受限',429);
            //return $response->withStatus(429);
        }

        // Log throttleable event
        $throttler->logEvent('sign_in_attempt', $throttleData);

        // If credential is an email address, but email login is not enabled, raise an error.
        // Note that we do this after logging throttle event, so this error counts towards throttling limit.
        if ($isEmail && !$config['site.login.enable_email']) {
            $ms->addMessageTranslated('danger', 'USER_OR_PASS_INVALID');

            return $this->error('不允许邮箱登录',403);


        }


        // Try to authenticate the user.  Authenticator will throw an exception on failure.
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;



        try {
            $currentUser = $authenticator->attempt(($isEmail ? 'email' : 'username'), $userIdentifier, $data['password'], $data['rememberme']);

        } catch (InvalidCredentialsException $e) {

            return $this->error('用户名或者密码不正确');
        } catch (AccountDisabledException $e){


            return $this->error('用户受限禁止登录');
        } catch (AccountNotVerifiedException $e){
            dump($e);
            exit;
            return $this->error('用户未验证');
        }catch (AuthExpiredException $e){
            return $this->error('登录过期请重新登录');
        }catch (\Exception $e){
            dump($e);
            Log::info('error',[$e]);
            return $this->error($e->getMessage());
        }


        $data = [
            "user" => $currentUser,
            "token" => $this->jwtGenerator($currentUser)
        ];
        return $this->json($data);

    }

    public function register(Request $request, Response $response, $args)
    {
        /** @var MessageStream $ms */
        $ms = $this->ci->alerts;

        /** @var UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
        $classMapper = $this->ci->classMapper;

        /** @var UserFrosting\Config\Config $config */
        $config = $this->ci->config;

        // Get POST parameters: username, first_name, last_name, email, password, passwordc, captcha, spiderbro, csrf_token
        $params = $request->getParsedBody();


        // Check if registration is currently enabled
        if (!$config['site.registration.enabled']) {
           return $this->error('禁止登录',403);

        }
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Prevent the user from registering if he/she is already logged in
//        if ($authenticator->check()) {
//            $ms->addMessageTranslated('danger', 'REGISTRATION.LOGOUT');
//            return $response->withStatus(403);
//        }

        // Load the request schema
        $schema = new RequestSchema('schema://requests/register_app.yaml');

        // Whitelist and set parameter defaults
        $transformer = new RequestDataTransformer($schema);
        $data = $transformer->transform($params);

        $error = false;

        // Validate request data
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



        /** @var UserFrosting\Sprinkle\Core\Throttle\Throttler $throttler */
        $throttler = $this->ci->throttler;
        $delay = $throttler->getDelay('registration_attempt');

        // Throttle requests
        if ($delay > 0) {

            return $this->error('访问受限',429);

         }
        // Check if username or email already exists
        if ($classMapper->staticMethod('user', 'findUnique', $data['username'], 'username')) {

            return $this->error('用户名已存在',429);

        }


        if ($classMapper->staticMethod('user', 'findUnique', $data['email'], 'email')) {
            return $this->error('邮箱已存在',400);

        }


        if ($config['site.registration.require_email_verification']) {
            $data['flag_verified'] = false;
        } else {
            $data['flag_verified'] = true;
        }

        // Load default group
        $groupSlug = $config['site.registration.user_defaults.group'];
        $defaultGroup = $classMapper->staticMethod('group', 'where', 'slug', $groupSlug)->first();

        if (!$defaultGroup) {
            $e = new HttpException("Account registration is not working because the default group '$groupSlug' does not exist.");
            $e->addUserMessage('ACCOUNT.REGISTRATION_BROKEN');
            throw $e;
        }

        // Set default group
        $data['group_id'] = $defaultGroup->id;

        // Set default locale
        $data['locale'] = $config['site.registration.user_defaults.locale'];

        // Hash password
        $data['password'] = Password::hash($data['password']);
        $data['first_name'] = '';
        $data['last_name'] = '';

        // All checks passed!  log events/activities, create user, and send verification email (if required)
        // Begin transaction - DB will be rolled back if an exception occurs
        $data = Capsule::transaction(function () use ($classMapper, $data, $ms, $config, $throttler, $response) {
            // Log throttleable event
            $throttler->logEvent('registration_attempt');

            // Create the user
            $user = $classMapper->createInstance('user', $data);

            // Store new user to database
            $user->save();


            UserService::checkWallet($user);


            // Create activity record
            $this->ci->userActivityLogger->info("User {$user->username} registered for a new account.", [
                'type' => 'sign_up',
                'user_id' => $user->id
            ]);
            Log::info("users",[$user]);

            // Load default roles
            $defaultRoleSlugs = $classMapper->staticMethod('role', 'getDefaultSlugs');
            $defaultRoles = $classMapper->staticMethod('role', 'whereIn', 'slug', $defaultRoleSlugs)->get();
            $defaultRoleIds = $defaultRoles->pluck('id')->all();

            // Attach default roles
            $user->roles()->attach($defaultRoleIds);


            $data = [
                "user" => $user,
                "token" => $this->jwtGenerator($user)
            ];


//            // Verification email
//            if ($config['site.registration.require_email_verification']) {
//                // Try to generate a new verification request
//                $verification = $this->ci->repoVerification->create($user, $config['verification.timeout']);
//
//                // Create and send verification email
//                $message = new TwigMailMessage($this->ci->view, 'mail/verify-account.html.twig');
//
//                $message->from($config['address_book.admin'])
//                    ->addEmailRecipient(new EmailRecipient($user->email, $user->full_name))
//                    ->addParams([
//                        'user' => $user,
//                        'token' => $verification->getToken()
//                    ]);
//
//                $this->ci->mailer->send($message);
//
//                $ms->addMessageTranslated('success', 'REGISTRATION.COMPLETE_TYPE2', $user->toArray());
//            } else {
//                // No verification required
//                $ms->addMessageTranslated('success', 'REGISTRATION.COMPLETE_TYPE1');
//            }

            return $data;
        });


       return $this->json( $data);
        //return $response->withStatus(200);
    }


    public function logout(Request $request, Response $response)
    {
        $this->auth->logout();

        return $this->redirect($response, 'home');
    }


    public function profile(Request $request, Response $response)
    {


        $user = Auth::getUser();
        return $this->json( $user);
    }
    public function getBalances(Request $request, Response $response){
        $user=Auth::getUser();
        UserWalletService::checkWallet($user);
        $balance = UserBalance::where('user_id', $user->id)
            ->get();
        return $this->json( $balance);
    }

}
