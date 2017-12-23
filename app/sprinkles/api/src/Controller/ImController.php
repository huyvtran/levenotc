<?php

namespace App\Controller;


use App\Leven;
use App\Model\Chat;
use App\Model\Order;
use App\Service\ChatService;
use Carbon\Carbon;


use Slim\Http\Request;
use Slim\Http\Response;
use UserFrosting\Sprinkle\Api\Facades\Auth;
use UserFrosting\Sprinkle\Api\Facades\Log;
use UserFrosting\Sprinkle\Api\Facades\Pusher;

class ImController extends Controller
{

    public function send(Request $request)
    {
        $params = $request->getParams();
        $message = ChatService::getMessage();
        $message = (object)array_merge((array)$message, (array)$params);

        $ret = ChatService::store($message);

        return $this->json($message);

    }

    public function history(Request $request)
    {

        $messages = Chat::where(function ($query) use ($request) {
            $order_id = $request->getParam('order_id', 0);

            Log::info('id', [$order_id]);
            $query->where('order_id', $order_id);
        })->orderBy('id', 'desc')->get();


        $temp = [];

        foreach ($messages as $message) {
            $temp[] = \GuzzleHttp\json_decode($message['message']);
        }

        return $this->json($temp);

    }

    public function auth(Request $request, Response $response)
    {

        $user = Auth::getUser();
        Log::info('user', [$user->toArray()]);

        $order_id = str_replace('private-chat-', '', $request->getParam('channel_name'));
        $order = Order::find($order_id);
        if ($order && in_array($user->id, [$order->ad_user_id, $order->user_id])) {
            $auth = Pusher::socket_auth($request->getParam('channel_name'), $request->getParam('socket_id'));

            header('Content-Type: application/javascript');
            echo($auth);
        } else {

            return $response->withJson(['status' => 403, 'message' => 'Access denied, the user does not have access to this section'], 403);

            //return $this(403)->getBody()->write();

        }
    }


}
