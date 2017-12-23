
# 获取全局定义的启动信息
 
GET /bootstrappers
```

#### 响应

```
Status: 200 OK
```
```json
 
{
    "status": 200,
    "data": {
        "app_name": "beeotc",
        "coin_type": [
            {
                "id": 1,
                "label": "比特币",
                "name": "BTC"
            },
            {
                "id": 2,
                "label": "以太坊",
                "name": "ETH"
            },
            {
                "id": 3,
                "label": "路印",
                "name": "LRC"
            },
            {
                "id": 4,
                "label": "达世",
                "name": "DASH"
            },
            {
                "id": 5,
                "label": "莱特币",
                "name": "LTC"
            }
        ],
        "payment_provider": [
            {
                "1": "支付宝"
            },
            {
                "2": "微信"
            },
            {
                "4": "银联转账"
            }
        ]
    }
}

```
 




# 获取价格

 
 

```
POST /ticket
```

#### 响应

```
Status: 200 OK
```
```json
{
    "status": 200,
    "message": "发送成功",
    "data": {
        "btc_cny": 12345678.22,
        "eth_cny": 4022.33
    }
}
```

| 字段 | 描述 |
|:----:|----|
| btc_cny | 比特币对人民币价格 |
| eth_cny | 以太币对人民币价格|
