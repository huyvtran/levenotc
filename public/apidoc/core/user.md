## 用户登录

```
POST /user/login
```

```json
{
	"username":"admin",
	"password":"admin"
}
```
### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| username | 字符串 | **必须**，用户名 可以是email 或者mobile |
| password | 字符串 | **必须** |


#### 响应

```
Status: 200
```
```json
{
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@admin.com",
        "last_name": null,
        "first_name": null,
        "permissions": {
            "user.delete": 0
        },
        "last_login": {
            "date": "2017-12-11 05:31:23.954910",
            "timezone_type": 3,
            "timezone": "UTC"
        },
        "created_at": "2017-12-10 12:00:55",
        "updated_at": "2017-12-11 05:31:23"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMjk3MDI4MywibmJmIjoxNTEyOTcwMjgzLCJleHAiOjE1NDQ1MDYyODMsImRhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyeSQxMCRUNXkxeE8xaU1vOFhDXC9pZzNXcUM5T1wvbVg1b2llNEhnQXlCeVhJcFMzZm1yMFVmd2M3RXF5Iiwicm9sZXMiOm51bGx9fQ.EnTOTq30dAKiGjEQQiSO-tOfQ7-r5nC9dt592_0cIJM"
}
```


## 用户注册

```
POST /user/register
```

```json

{
	"username":"admin2",
	"password":"123456",

	"mobile":"15810042722",
	"verifiable_code":"4444"

}
```
### 输入

| 名称 | 类型 | 描述 |
|:----:|:----:|----|
| username | 字符串 | **必须**，用户名 |
| password | 字符串 | **必须**，密码。 |
| mobile | 字符串 | **必须**，手机 |
| verifiable_code | 字符串或数字 | **必须**，用户收到的验证码。 |

#### 响应

```
Status: 200
```
```json
{
    "user": {
        "username": "admin2333",
        "email": "leven.zsh3333@gmail.com",
        "permissions": {
            "user.delete": 0
        },
        "updated_at": "2017-12-11 06:40:15",
        "created_at": "2017-12-11 06:40:15",
        "id": 5
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMjk3NDQxNSwibmJmIjoxNTEyOTc0NDE1LCJleHAiOjE1NDQ1MTA0MTUsImRhdGEiOnsiaWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yMzMzIiwicGFzc3dvcmQiOiIkMnkkMTAkRlJcL1RpZkgyQWFMRTdHTS5TWGNhSGVka1Vhak1kUEI5QUJMTnljQU5iczA2YThsclpwVDJtIiwicm9sZXMiOm51bGx9fQ.mi9n8gsZf2Yh6pW9MGxSmxBf9QQD-XeJWRiGuf_YJKI"
}
```




## 用户个人信息

```
POST /user/profile
```

 
 
#### 响应

```
Status: 200
```
```json
{
    "user": {
        "username": "admin2333",
        "email": "leven.zsh3333@gmail.com",
        "permissions": {
            "user.delete": 0
        },
        "updated_at": "2017-12-11 06:40:15",
        "created_at": "2017-12-11 06:40:15",
        "id": 5
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMjk3NDQxNSwibmJmIjoxNTEyOTc0NDE1LCJleHAiOjE1NDQ1MTA0MTUsImRhdGEiOnsiaWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yMzMzIiwicGFzc3dvcmQiOiIkMnkkMTAkRlJcL1RpZkgyQWFMRTdHTS5TWGNhSGVka1Vhak1kUEI5QUJMTnljQU5iczA2YThsclpwVDJtIiwicm9sZXMiOm51bGx9fQ.mi9n8gsZf2Yh6pW9MGxSmxBf9QQD-XeJWRiGuf_YJKI"
}
```



## 用户余额


POST /user/balance





```
Status: 200
```
```json
{
    "status": 200,
    "message": "",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "coin_type": 1,
            "coin_name": "BTC",
            "block_balance": 2107806,
            "pending_balance": 0,
            "total_balance": 2122823,
            "created_at": "2017-12-13 16:27:15",
            "updated_at": "2017-12-14 17:26:03"
        },
        {
            "id": 2,
            "user_id": 1,
            "coin_type": 2,
            "coin_name": "ETH",
            "block_balance": 0,
            "pending_balance": 0,
            "total_balance": 123123123,
            "created_at": "2017-12-13 16:27:15",
            "updated_at": "2017-12-13 16:27:15"
        },
        {
            "id": 5,
            "user_id": 1,
            "coin_type": 3,
            "coin_name": "LRC",
            "block_balance": 0,
            "pending_balance": 0,
            "total_balance": 0,
            "created_at": "2017-12-18 13:12:23",
            "updated_at": "2017-12-18 13:12:23"
        },
        {
            "id": 6,
            "user_id": 1,
            "coin_type": 4,
            "coin_name": "DASH",
            "block_balance": 0,
            "pending_balance": 0,
            "total_balance": 0,
            "created_at": "2017-12-18 13:12:23",
            "updated_at": "2017-12-18 13:12:23"
        },
        {
            "id": 7,
            "user_id": 1,
            "coin_type": 5,
            "coin_name": "LTC",
            "block_balance": 0,
            "pending_balance": 0,
            "total_balance": 0,
            "created_at": "2017-12-18 13:12:23",
            "updated_at": "2017-12-18 13:12:23"
        }
    ]
}
```