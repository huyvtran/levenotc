<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */

/**
 * This route overrides the main `/` route, so that users are taken directly to the registration page.
 */
$app->get('/', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('homepage');

//$app->get('/trade', 'UserFrosting\Sprinkle\Web\Controller\TradeController:index')
//    ->setName('trade');

$app->get('/advert/create', 'UserFrosting\Sprinkle\Web\Controller\AdvertController:create')
    ->setName('advert_create');

$app->group('/trade', function () {
    $this->get('', 'UserFrosting\Sprinkle\Web\Controller\TradeController:overview');
//    $this->post('/buy/{coin}', 'UserFrosting\Sprinkle\Web\Controller\TradeController:buy');
//    $this->post('/sell/{coin}', 'UserFrosting\Sprinkle\Web\Controller\TradeController:sell');



});




$app->get('/my_coin', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('my_coin');

$app->get('/my_cards', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('my_cards');

$app->get('/settings', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('settings');

$app->get('/setting_approval_submit', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('setting_approval_submit');

$app->get('/settings_security', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('settings_security');

$app->get('/teacher_audit_submit', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('teacher_audit_submit');
$app->get('/course_set_archive', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('course_set_archive');


$app->get('/login_ajax', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('login_ajax');


$app->get('/file_upload', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('file_upload');

$app->get('/file_img_crop', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('file_img_crop');
$app->get('/jstranslation_js', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('jstranslation_js');

$app->get('/announcement_global_show', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('announcement_global_show');
$app->get('/user_show', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('user_show');

$app->get('/my', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('my');
$app->get('/notification', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('notification');



$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/message', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('message');

$app->get('/logout', 'UserFrosting\Sprinkle\Web\Controller\HomeController:index')
    ->setName('logout');

$app->get('/test', function ($request, $response) {

    return $this->view->render($response, 'pages/test.html.twig');

})->setName('register2');


$app->group('/account1', function () {
    // Redirect to registration page on index
    $this->get('/register', function ($request, $response) {
        $target = $this->router->pathFor('register');
        return $response->withRedirect($target, 301);
    })->setName('register');

    /**
     * This route overrides the `/account/register` route, to create a new group for each demo user.
     */
    $this->post('/register', 'UserFrosting\Sprinkle\Web\Controller\DemoController:register');
});

