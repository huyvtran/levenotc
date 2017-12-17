<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Date: 2017/12/10
 * Time: ä¸???11:08
 */

namespace UserFrosting\Sprinkle\Web\Service;


use App\Model\Advert;
use App\Model\User;
use App\Repositories\AdvertRepository;
use Illuminate\Contracts\Pagination\Paginator;
use Slim\Http\Request;

class TestService extends BaseService
{


    public   function store($data)
    {


        $this->logger->info(3333);

    }

}