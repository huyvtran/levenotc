<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Email:leven.zsh@gmail.com
 * Date: 2017/12/11
 * Time: 下午6:02
 */

$this->get('/', ['admin','home'])->setName('admin.home');

$app->group('', function () {
    $this->map(['GET', 'POST'], '/login', 'auth:login')->setName('login');
    $this->map(['GET', 'POST'], '/register', 'auth:register')->setName('register');
});//->add($container->get('guest.middleware'));

$app->get('/logout', 'auth:logout')
    ->add($container->get('auth.middleware')())
    ->setName('logout');

$app->group('/admin', function () {
    $this->get('', 'admin:home')->setName('admin.home');
})->add($container->get('guest.middleware'));
