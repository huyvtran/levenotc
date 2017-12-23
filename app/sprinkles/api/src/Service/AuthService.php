<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Date: 2017/11/30
 * Time: 下午8:21
 */

namespace App\Service;


use App\Helpers\CoinHelpers;

use App\Model\User;
use App\Model\UserBalance;
use App\Model\UserWallet;
use App\Model\WalletAddress;
use App\Model\UserWithdraw;
use Illuminate\Contracts\Pagination\Paginator;
use Slim\Container;
use Slim\Http\Request;


class AuthService
{
    protected $user;
    protected $container;
     public function __construct(Container $container)
     {
         //$this->user=$user;
         $this->container=$container;

     }
     public function setUser($user){
         $this->user=$user;

     }
     public function getUser(){
        return $this->user;
     }

     public function checkUser(){

         $user_id=$this->container['jwt']->data->id;

         $user = User::find($user_id);

         if($user){
             $this->user=$user;
             return $user;
         }
         return false;
     }


}