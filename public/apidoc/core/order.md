


## 创建订单
/order/store
### 表字段说明

| 名称 | 需求 | 类型 | 描述 |
|:----:|:----:|:----:|----|
| id | 是 | int | | 
| order_code | 否 | int | 订单编号 自动生成 | 
| coin_type | 是 | int | | 
| trade_type | 是 | int | | 
| ad_id | 是 | int | 广告ID | 
| ad_user_id | 是 | int | 广告发布者用户ID | 
| user_id | 是 | int | 购买者用户ID | 
| ad_price | 是 | int | 广告单价 | 
| amount | 是 | int | 交易金额 | 
| qty | 是 | int | 交易数量 | 
| finish_time | 是 | int | 交易结束时间 | 
| status | 是 | int | 状态：  | 
| order_desc | 是 | int | 交易描述 | 
| buyer_estimate | 是 | int | 买方评价 | 
| seller_estimate | 是 | int | 卖方评价 | 



### 输入参考

```json

{
  	  "advert_id":"1",
	  "coin_type":1,
	  
	  "amount":"333",
	  "qty":"100"
}
```
| 名称 | 需求 | 类型 | 描述 |
|:----:|:----:|:----:|----| 
| coin_type | 是 | int | | 
| trade_type | 是 | int | | 
| ad_id | 是 | int | 广告ID |  
| user_id | 是 | int | 购买者用户ID |  
| amount | 是 | int | 交易金额 | 
| qty | 是 | int | 交易数量 | 

>输出
```json
{
    "status": 200,
    "message": "",
    "data": {
        "coin_type": 1,
        "amount": "333",
        "qty": "100",
        "user_id": 2,
        "order_code": 1513184618,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "buyer_estimate": "",
        "seller_estimate": "",
        "status": 0,
        "id": 5
    }
}
```

## 用户订单列表

>POST {{apiurl}}/user/order

#### 请求参数

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
|coin_type|Number|币种 (1为比特币，2为以太币)|
|trade_type|Number|交易类型 (0为出售 1为购买)|
| limit | Number | 这次请求获取的条数，默认为 `20` 条，为了避免过大或者错误查询，设置了一个修正值，最大 `50` 最小 `1` 。 |
| page | Number | 页码|
| order_by | String | 排序字段(默认为ID) |
| desc | Boolean | desc 是否降序排列(默认为1) |

#### 响应

```json
{
    "status": 200,
    "message": "",
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 4,
                "order_code": "1513182879",
                "coin_type": 1,
                "trade_type": 0,
                "ad_id": 1,
                "ad_code": "",
                "ad_user_id": 1,
                "user_id": 2,
                "ad_price": 0,
                "amount": 333,
                "qty": 100,
                "payterm": 30,
                "finish_time": null,
                "status": 0,
                "order_desc": null,
                "buyer_estimate": "",
                "seller_estimate": "",
                "created_at": null,
                "updated_at": null,
                "coin_name": "BTC"
            },
            .....
        ],
        "first_page_url": "/?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "/?page=1",
        "next_page_url": null,
        "path": "/",
        "per_page": 20,
        "prev_page_url": null,
        "to": 4,
        "total": 4
    }
}
```

## 订单详情

>Post {{apiurl}}/order/detail/{id}


```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 0,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": null
    }
}
```
## 订单付款
>POST {{apiurl}}/order/pay
### 输入

```json
{
  "order_id":1 
}
```
### 输出

```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 1,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": "2017-12-14 10:08:56"
    }
} 
```


## 订单取消
>POST {{apiurl}}/order/cancel
### 输入

```json
{
  "order_id":1 
}
```
### 输出

```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 1,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": "2017-12-14 10:08:56"
    }
} 
```

## 订单释放

>POST {{apiurl}}/order/release
### 输入

```json
{
  "order_id":1 
}
```
### 输出

```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 1,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": "2017-12-14 10:08:56"
    }
} 
```


## 订单评价

>POST {{apiurl}}/order/comment
### 输入

```json
{
  "order_id":1 
}
```
### 输出

```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 1,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": "2017-12-14 10:08:56"
    }
} 
```


## 订单审诉

>POST {{apiurl}}/order/complaint
### 输入

```json
{
  "order_id":1 
}
```
### 输出

```json
{
    "status": 200,
    "message": "",
    "data": {
        "id": 1,
        "order_code": "1513182636",
        "coin_type": 1,
        "trade_type": 0,
        "ad_id": 1,
        "ad_code": "",
        "ad_user_id": 1,
        "user_id": 2,
        "ad_price": 0,
        "amount": 333,
        "qty": 100,
        "payterm": 30,
        "finish_time": null,
        "status": 1,
        "order_desc": null,
        "buyer_estimate": "",
        "seller_estimate": "",
        "created_at": null,
        "updated_at": "2017-12-14 10:08:56"
    }
} 
```






