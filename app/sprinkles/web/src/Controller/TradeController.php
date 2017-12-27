<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */
namespace UserFrosting\Sprinkle\Web\Controller;

use App\Helpers\CoinHelpers;
use UserFrosting\Sprinkle\Api\Facades\Response;
use UserFrosting\Sprinkle\Web\Facades\View;
use UserFrosting\Sprinkle\Web\Queries\SearchTrade;


class TradeController extends SimpleController
{

    /**
     * Display the articles resource.
     *
     * @return mixed
     */
    public function overview( $request, $response)
    {
        // $ads = $this->ad->page(config('trade.ad.number'), config('trade.ad.sort'), config('trade.ad.sortColumn'));
        $ads=SearchTrade::get($request);

//        $coins=CoinHelpers::getIds();
//
//        foreach ($ads as $k=>$v){
//            $ads[$k]["coin_name"]=$coins[$v['coin_type']]["name"];
//        }

        //leven($request->all());

        dump($ads);

        return View::render($response, 'trade/overview.html.twig') ;
    }



    public function buy(Requests\AdRequest $request,$coin){

        //  dump($request);


        // $search = request('search');//$search ? SearchAds::get($search) :
        $ads =  Ad::feedPaginated();
        //dump($ads);

        return view('trade.buy', compact('ads'));

    }




    /**
     * Display the article resource by article slug.
     *
     * @param  string $slug
     * @return mixed
     */
    public function show($slug)
    {
        $article = $this->article->getBySlug($slug);

//        $article->content = collect(json_decode($article->content))->get('html');

        return view('article.show', compact('article'));
    }
}
