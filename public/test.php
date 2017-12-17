<?php

class Data
{
    public function __construct(){

    }
    public static function ok(){

        return ['a'=>33];
    }

    public static function Announcement(){

        return ['a'=>33];
    }

    public static function NavigationsTree($params){
        echo 444;

        var_dump($params);



    }
}
$method="NavigationsTree";
$service =new Data();
$reflectionClass = new \ReflectionClass($service);

  $reflectionClass->getMethod($method)->invokeArgs($service, ["a"=>333]);