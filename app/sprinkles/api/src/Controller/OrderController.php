<?php
/**
 * Created by PhpStorm.
 * User: genv
 * Date: 2017/12/12
 * Time: 上午10:19
 */

namespace App\Controller;


use App\Helpers\CoinHelpers;
use App\Model\Order;
use App\Model\OrderComment;
use App\Model\UserBalance;
use App\Service\AdvertService;
use App\Service\ChatService;
use App\Service\OrderService;
use App\Validator\Advert;
use Carbon\Carbon;

use Slim\Http\Request;
use Slim\Http\Response;
use UserFrosting\Sprinkle\Api\Facades\Auth;
use UserFrosting\Sprinkle\Api\Facades\Log;
use UserFrosting\Sprinkle\Api\Facades\Redis;

class OrderController extends Controller
{

    use Advert;
    use CoinHelpers;

    public function getOrder()
    {
        $params = Request::getParams();
        $user = Auth::getUser();
        $order = Order::with('aduser')->where('user_id', $user->id)
            ->where('id', $params["order_id"])
            ->first();
        return $order;

    }

    public function store(Request $request, Response $response)
    {


        Log::info('info', $request->getParams());
        $advert = AdvertService::get($request->getParam("advert_id"));
        if (!$advert) {
            $this->error('广告不存在');
            return $this->fail($response);
        }
        Log::info('Leven:user', [Auth::getUser()]);


        $data = array_merge($request->getParams(), [
            'user_id' => Auth::getUser()->id,
            'order_code' => time(),
            'ad_id' => $advert->id,
            'ad_code' => "",
            'ad_user_id' => $advert->user_id,
            'buyer_estimate' => '',
            'seller_estimate' => '',
            'status' => 0,
            'coin_type' => $advert->coin_type,
        ]);

        if ($advert->user_id == Auth::getUser()->id) {
            $this->error('不能自己给自己下单');
        }


        //获取可用余额
        $balance = UserBalance::where('user_id', $advert->user_id)
            ->where('coin_type', $advert->coin_type)
            ->first();
        if (!$balance) {
            $this->error('用户账户信息丢失');
        }


        $can_balance = $balance->total_balance - $balance->block_balance - $balance->pending_balance;

        if ($data["qty"] > $can_balance) {
            $this->error('此广告账户余额不足');
        }


        $order = OrderService::store($data);

        $orderService = new OrderService($order, $this->logger);
        $orderService->sellerlockOrder();

        //放入监控
        Redis::hset('monitoring_order', $order->id, Carbon::now());
        Log::info('monitoring_order: ' . $order->id);
        ChatService::setMessage($order, 'CREATED');
        return $this->json($order);





    }


    public function getByUser(Request $request, Response $response)
    {

        $user = Auth::getUser();
        $adverts = OrderService::getByUser($request, $user);
        $coins = CoinHelpers::getIds();
        foreach ($adverts as $k => $v) {
            $adverts[$k]->coin_name = $coins[$v->coin_type]['name'];
        }

        return $this->json($adverts);

    }

    public function show(Request $request, Response $response, $id)
    {
        $advert = OrderService::get($id);

        return $this->json($advert);
    }


    /**
     * 付款完成
     * @param Request $request
     */
    public function pay(Request $request)
    {
        $order = $this->getOrder();

        if ($order) {
            //更新订单状态
            $order->status = Config::get('constants.ORDER_STATUS.PAY');
            $order->save();
            OrderService::log([
                "order_id" => $order->id,
                "message" => json_decode(["message" => 'created']),
                "status" => Config::get('constants.ORDER_STATUS.PAY')
            ]);
            ChatService::setMessage($order, 'PAY');
        }
        return $this->setData($order)->toJson();


    }

    /**
     * 取消定单
     * @param Request $request
     */
    public function cancel(Request $request)
    {
        $order = $this->getOrder();

        if ($order) {

            //更新订单状态
            $order->status = Config::get('constants.ORDER_STATUS.CANCEL');
            $order->save();

            $orderService = new OrderService($order);
            OrderService::log([
                "order_id" => $order->id,
                "message" => json_encode(["message" => 'cancel']),
                "status" => Config::get('constants.ORDER_STATUS.CANCEL')
            ]);
            //Log::info('order_status_cancel: ' . Config::get('constants.ORDER_STATUS.CANCEL'));
            ChatService::setMessage($order, 'CANCEL');
            $orderService->sellerUnlockOrder();
        }
        return $this->setData($order)->toJson();


    }


    /**
     * 放行定单
     * @param Request $request
     */
    public function release(Request $request)
    {
        $order = $this->getOrder();


        if ($order) {
            //更新订单状态
            $order->status = Config::get('constants.ORDER_STATUS.RELEASE');
            $order->save();

            //Log::info('order_status_release: ' . Config::get('constants.ORDER_STATUS.RELEASE'));

            $orderService = new OrderService($order);
            $orderService->orderRelease();

            OrderService::log([
                "order_id" => $order->id,
                "message" => json_encode(["message" => 'RELEASE']),
                "status" => Config::get('constants.ORDER_STATUS.RELEASE')
            ]);
            ChatService::setMessage($order, 'CANCEL');

        }

        return $this->setData($order)->toJson();


    }

    /**
     * 评价订单
     * @param Request $request
     */
    public function comment(Request $request)
    {
        $order = $this->getOrder();

        if ($order) {
            //更新订单状态
            $comment = [
                'order_id' => $order->id,
                'message' => $request->getParam('message')
            ];
            OrderComment::create($comment);

            $order->status = Config::get('constants.ORDER_STATUS.COMMENT');
            $order->save();

            OrderService::log([
                "order_id" => $order->id,
                "message" => json_encode(["message" => 'comment'])

            ]);
            ChatService::setMessage($order, 'COMMENT');


        }
        return $this->setData($order)->toJson();


    }

    /**
     * 审诉定单
     * @param Request $request
     */
    public function complaint(Request $request)
    {
        $order = $this->getOrder();
        if ($order) {
            //更新订单状态
            $order->status = Config::get('constants.ORDER_STATUS.COMPLAINT');
            $order->save();
            OrderService::log([
                "order_id" => $order->id,
                "message" => json_encode(["message" => 'complaint'])
            ]);

            ChatService::setMessage($order, 'COMPLAINT');


        }
        return $this->setData($order)->toJson();


    }


}