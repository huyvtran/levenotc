# 广告

## 获取全部广告
```
POST /advert
```

#### 请求参数

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
|coin_type|Number|币种 (1为比特币，2为以太币)|
|trade_type|Number|交易类型 (0为出售 1为购买)|
| limit | Number | 这次请求获取的条数，默认为 `20` 条，为了避免过大或者错误查询，设置了一个修正值，最大 `50` 最小 `1` 。 |
| page | Number | 页码|
| order_by | String | 排序字段(默认为price) |
| desc | Boolean | desc 是否降序排列(默认为1) |

#### 响应

```
Status: 200 OK
```
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 79,
            "user_id": 1,
            "coin_type": 1,
            "trade_type": "0",
            "country_code": null,
            "currency": null,
            "margin": "1.00",
            "price": "76114.44",
            "min_price": null,
            "min_amount": 100,
            "max_amount": 5000,
            "payment_window_minutes": null,
            "payment_provider": null,
            "message": null,
            "require_identification": 0,
            "require_trusted_by_advertiser": 0,

            "view_count": 0,
            "status": 0,
            "published_at": null,
            "created_at": "2017-12-04 14:41:34",
            "updated_at": "2017-12-04 14:41:34",
            "deleted_at": null,
            "user": {
                "id": 1,
                "username": "admin",
                "email": "admin@admin.com",
                "last_name": null,
                "first_name": null,
                "permissions": {
                    "user.delete": 0
                },
                "last_login": "2017-12-10 14:26:14",
                "created_at": "2017-12-10 12:00:55",
                "updated_at": "2017-12-10 14:26:14"
            }
        },
        {
            "id": 80,
            "user_id": 2,
            "coin_type": 1,
            "trade_type": "0",
            "country_code": "btc",
            "currency": "CNY",
            "margin": "1.00",
            "price": "75612.05",
            "min_price": null,
            "min_amount": 100,
            "max_amount": 2000,
            "payment_window_minutes": 10,
            "payment_provider": "CNY",
            "message": null,
            "require_identification": 0,
            "require_trusted_by_advertiser": 0,
            "opening_hours_0_0": -1,
            "view_count": 0,
            "status": 0,
            "published_at": null,
            "created_at": "2017-12-04 18:58:20",
            "updated_at": "2017-12-04 18:58:20",
            "deleted_at": null,
            "user": null
        }
    ],
    "first_page_url": "/?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "/?page=1",
    "next_page_url": null,
    "path": "/",
    "per_page": 20,
    "prev_page_url": null,
    "to": 2,
    "total": 2
}
```

| 字段 | 描述 |
|:----:|----|
| id | 广告ID |
| user_id | 用户ID |
| coin_type | |
| trade_type | 广告类型ONLINE_BUY为卖出ONLINE_SELL为买入 |
| country_code | 所在国家编号 |
| currency | |
| margin | 溢价 |
| price | 价格 |
| min_price | 最低价格 |
| min_amount | 最小限额 |
| max_amount | 最大限额 |
| payment_window_minutes | 付款期限 |
| payment_provider | 付款方式 |
| message | 广告留言 |
| require_identification | 是否启用安全选项 |
| require_trusted_by_advertiser | 仅限受信任的交易者 |
| opening_hours_0_0 | |
| view_count | 浏览次数 |
| status | 状态 |
| published_at | |
| created_at | |
| updated_at | |
| deleted_at | |


其中user对像为广告发布者用户信息

## 获取单个广告信息

```
POST /advert/get/{id}
```

#### 请求参数

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| id | 数字 | 广告id |

#### 响应

```
Status: 200 OK
```
```json
{
    "id": 79,
    "user_id": 1,
    "coin_type": 1,
    "trade_type": "0",
    "country_code": null,
    "currency": null,
    "margin": "1.00",
    "price": "76114.44",
    "min_price": null,
    "min_amount": 100,
    "max_amount": 5000,
    "payment_window_minutes": null,
    "payment_provider": null,
    "message": null,
    "require_identification": 0,
    "require_trusted_by_advertiser": 0,
    "opening_hours_0_0": -1,
    "view_count": 0,
    "status": 0,
    "published_at": null,
    "created_at": "2017-12-04 14:41:34",
    "updated_at": "2017-12-04 14:41:34",
    "deleted_at": null,
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@admin.com",
        "last_name": null,
        "first_name": null,
        "permissions": {
            "user.delete": 0
        },
        "last_login": "2017-12-11 05:31:23",
        "created_at": "2017-12-10 12:00:55",
        "updated_at": "2017-12-11 05:31:23"
    }
}
```
| 字段 | 描述 |
同上
## 用户个人广告
```
POST /user/advert
```

#### 请求参数

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
|coin_type|Number|币种 (1为比特币，2为以太币)|
|trade_type|Number|交易类型 (0为出售 1为购买)|
| limit | Number | 这次请求获取的条数，默认为 `20` 条，为了避免过大或者错误查询，设置了一个修正值，最大 `50` 最小 `1` 。 |
| page | Number | 页码|
| order_by | String | 排序字段(默认为price) |
| desc | Boolean | desc 是否降序排列(默认为1) |

#### 响应

```
Status: 200 OK
```
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 79,
            "user_id": 1,
            "coin_type": 1,
            "trade_type": "0",
            "country_code": null,
            "currency": null,
            "margin": "1.00",
            "price": "76114.44",
            "min_price": null,
            "min_amount": 100,
            "max_amount": 5000,
            "payment_window_minutes": null,
            "payment_provider": null,
            "message": null,
            "require_identification": 0,
            "require_trusted_by_advertiser": 0,

            "view_count": 0,
            "status": 0,
            "published_at": null,
            "created_at": "2017-12-04 14:41:34",
            "updated_at": "2017-12-04 14:41:34",
            "deleted_at": null,
            "user": {
                "id": 1,
                "username": "admin",
                "email": "admin@admin.com",
                "last_name": null,
                "first_name": null,
                "permissions": {
                    "user.delete": 0
                },
                "last_login": "2017-12-10 14:26:14",
                "created_at": "2017-12-10 12:00:55",
                "updated_at": "2017-12-10 14:26:14"
            }
        },
        {
            "id": 80,
            "user_id": 2,
            "coin_type": 1,
            "trade_type": "0",
            "country_code": "btc",
            "currency": "CNY",
            "margin": "1.00",
            "price": "75612.05",
            "min_price": null,
            "min_amount": 100,
            "max_amount": 2000,
            "payment_window_minutes": 10,
            "payment_provider": "CNY",
            "message": null,
            "require_identification": 0,
            "require_trusted_by_advertiser": 0,
            "opening_hours_0_0": -1,
            "view_count": 0,
            "status": 0,
            "published_at": null,
            "created_at": "2017-12-04 18:58:20",
            "updated_at": "2017-12-04 18:58:20",
            "deleted_at": null,
            "user": null
        }
    ],
    "first_page_url": "/?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "/?page=1",
    "next_page_url": null,
    "path": "/",
    "per_page": 20,
    "prev_page_url": null,
    "to": 2,
    "total": 2
}
```


## 发布广告

/advert/store

| 名称 | 需求 | 类型 | 描述 |
|:----:|:----:|:----:|----|
| id | 是 | int | 广告ID | 
| user_id | 是 | int | 用户ID | 
| coin_type | 是 | int | | 
| trade_type | 是 | int |   | 
| country_code | 是 | int | 所在国家编号 | 
| currency | 是 | int | | 
| margin | 是 | int | 溢价 | 
| price | 是 | decimal | 价格 | 
| min_price | 否 | decimal | 最低价格 | 
| min_amount | 是 | decimal | 最小限额 | 
| max_amount | 是 | decimal | 最大限额 | 
| payment_window_minutes | 非 | int | 付款期限 | 
| payment_provider | 非 | int | 付款方式 | 
| message | 非 | string | 广告留言 | 
| require_identification | 非 | int | 是否启用安全选项 | 
| require_trusted_by_advertiser | 非 | int | 仅限受信任的交易者 | 
 

输入

```json5
{
  "coin_type":1,
  "trade_type":1,
  "margin":12.3,
  "price":"234234.44",
  "min_amount":"234",
  "max_amount":"23434" 
}
```

输出

```json5
{
    "status": 200,
    "message": "",
    "data": {
        "coin_type": 1,
        "trade_type": 1,
        "margin": 12.3,
        "price": "234234.44",
        "min_amount": "234",
        "max_amount": "23434",
        "user_id": 1,
        "updated_at": "2017-12-13 02:38:58",
        "created_at": "2017-12-13 02:38:58",
        "id": 82
    }
}
```