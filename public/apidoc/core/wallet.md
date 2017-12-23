# 钱包 API

和用户资金相关的信息 单位 为wei


接口不给现实数字，而是给出以wei为单位的数字，客户端展示时需作转化处理

## 用户钱包地址获取

 
```
POST /wallet/address
```

#### 响应

```
Status: 200 OK
```

```json5
[
    {
        "id": 29,
        "user_id": 1,
        "coin_type": "1",
        "name": "333",
        "address": "234324324",
        "created_at": "2017-12-11 12:44:10",
        "updated_at": "2017-12-11 12:44:10",
        "status": 0,
        "deleted_at": null
    },
    {
        "id": 30,
        "user_id": 1,
        "coin_type": "1",
        "name": "333",
        "address": "234324324",
        "created_at": "2017-12-11 12:55:52",
        "updated_at": "2017-12-11 12:55:52",
        "status": 0,
        "deleted_at": null
    }
]
```
字段说明：

| 字段  | 类型 | 描述 |
|----|:----:|:----:|
| user_id |  int | 用户id  |
| coin_type | int | coin类型 |
| name | string | 钱包名称 |
| address | string |钱包名地址 |

## 钱包地址添加
```
POST /wallet/address/store
```
### 输入
```json5
{
	"coin_type":1,
	"address":"abdfadfasdfadf",
	"name":"我的钱包"
}

```
| 字段 | 必须 | 类型 | 描述 |
|----|:----:|:----:|:----:|
| coin_type | 是 | int | 币类型 |
| address | 是 | string | 钱包地址 |
| name | 否 | string | 钱包名称) |

###输出

```json5
{
    "coin_type": 1,
    "address": "abdfadfasdfadf",
    "name": "我的钱包",
    "user_id": 1,
    "updated_at": "2017-12-11 13:38:14",
    "created_at": "2017-12-11 13:38:14",
    "id": 44
}
```
## 钱包充值


```
POST /wallet/deposit/{coin_type}
```

### 输入

| 字段 | 必须 | 类型 | 描述 |
|----|:----:|:----:|:----:|
| coin_type | 是 | int | 币类型 |
 
 

#### 响应

```
Status: 200
```
```json5
{
    "id": 2002,
    "coin_type": 2,
    "user_id": 1,
    "status": 0,
    "address": "5a2e9d6f7f6aa346188",
    "created_at": null,
    "updated_at": null
}
```
 

## 提现申请

```
POST /wallet/withdraw
```

### Input 

| 字段 | 必须 | 类型 | 描述 |
|----|:----:|:----:|:----:|
| user_id | 是 | int | 用户id | 
| coin_type | 是 | int | 提币币种 | 
| address | 是 | int | 提币地址 | 
| amount | 是 | int | 提币数量 | 
| order_code | 是 | int | 订单编号 | 
| finish_time | 是 | int | 交易结束时间 | 
| status | 是 | int | 状态：0 - 处理中，1 - 已审批，2 - 已完成 | 
| created_at | 是 | int |  创建时间 |
| updated_at | 是 | int | 修改时间 | 


```json5
{
	"coin_type":1,
	"address":"324234adfasdf",
	"amount":"333"
}
```
  
##### Headers

```
Status: 200 Created
```

##### Body

```json5
{
    "coin_type": 1,
    "address": "324234adfasdf",
    "amount": "333",
    "user_id": 1,
    "order_code": 1513005521,
    "id": 20
}
```

字段说明：

| 字段  | 类型 | 描述 |
|----|:----:|:----:|:----:|
| order_code |  string | 订单号  |
 

## 提现申请列表

```
POST /wallet/withdraw/history
```


| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| limit | Number | 这次请求获取的条数，默认为 `20` 条，为了避免过大或者错误查询，设置了一个修正值，最大 `50` 最小 `1` 。 |
| page | Number | 页码|
| order_by | String | 排序字段(默认为 created_at) |
| desc | Boolean | desc 是否降序排列(默认为1) |


#### Headers

```
Status: 200 OK
```

#### Body

```json5
{
    "current_page": 1,
    "data": [
        {
            "id": 23,
            "user_id": 1,
            "coin_type": "1",
            "address": "324234adfasdf",
            "amount": 333,
            "order_code": "1513006108",
            "finish_time": null,
            "status": 0,
            "created_at": null,
            "updated_at": null
        },
        ……
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
```
