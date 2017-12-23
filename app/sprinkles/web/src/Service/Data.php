<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Date: 2017/12/17
 * Time: 上午10:22
 */
namespace UserFrosting\Sprinkle\Web\Service;

use UserFrosting\Sprinkle\Web\Database\Models\Navigation;
use UserFrosting\Sprinkle\Web\Common\ArrayToolkit;
use UserFrosting\Sprinkle\Web\Helpers\CoinHelpers;

class Data
{

    use CoinHelpers;
   public static function ok(){

       return ['a'=>33];
   }

   public static function Announcement(){

       return ['a'=>33];
   }

   public static function coins(){

       return  $coins = CoinHelpers::get();
   }

   public static function NavigationsTree(){


       $navigations=Navigation::all()->toArray();


       $navigations = ArrayToolkit::index($navigations, 'id');

       foreach ($navigations as $index => $nav) {
           //只显示Open菜单
           // if (empty($nav['isOpen']) || $nav['isOpen'] != 1) {
           //     unset($navigations[$index]);
           //     continue;
           // }

           //一级菜单 - 保留
           if ($nav['parentId'] == 0) {
               continue;
           }

           //二级菜单

           //如果父菜单不存在(被删除)，子菜单不显示
           if (!isset($navigations[$nav['parentId']])) {
               unset($navigations[$index]);
               continue;
           }

           //如果父菜单是close的，子菜单不显示
           $parent = $navigations[$nav['parentId']];

           if ((empty($parent['isOpen']) || $parent['isOpen'] != 1)) {
               unset($navigations[$index]);
               continue;
           }

           //初始化父菜单的children数组
           if (empty($navigations[$nav['parentId']]['children'])) {
               $navigations[$nav['parentId']]['children'] = array();
           }

           //子菜单是open的，放到父菜单中
           if ($nav['isOpen']) {
               $navigations[$nav['parentId']]['children'][] = $nav;
               unset($navigations[$index]);
           }
       }

       return $navigations;

   }
}