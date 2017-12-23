# Beeotc api使用说明

测试环境域名(apiurl): http://cms.71an.com/api/v2

>api请求路径 如：Post {{apiurl}}/order/detail/{id}
替换路径中的变量:id为请求参数


> api返回类型

```json5
{
    "status": 200,
    "message": "",
    "data": {
    }
}
```
status:为状态码 成功为200,非200的为异常类型
message:为异常信息
data:为json    

>需要验证个人身份的请求

header部分加上
Authorization:
值为 Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMzEyNjkyOCwibmJmIjoxNTEzMTI2OTI4LCJleHAiOjE1NDQ2NjI5MjgsImRhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjpudWxsLCJwYXNzd29yZCI6IiQyeSQxMCRUNXkxeE8xaU1vOFhDXC9pZzNXcUM5T1wvbVg1b2llNEhnQXlCeVhJcFMzZm1yMFVmd2M3RXF5Iiwicm9sZXMiOm51bGx9fQ.AdwkVbdFSH302e6kTz1zMKDoc3oM3sKmTS8QNVrx2So


>全局结构体说明：

# 分页
 page
```json5
{
    "current_page": 1, 
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
|字段|说明|
|:----:|:----:|
|current_page|当前页|
|total|总数据量|
|per_page|每页数据|

>其它字段为网页版用，客户端不用处理

