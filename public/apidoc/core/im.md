## 聊天室上传图片接口

Post  /upload

[测试实例参考](http://192.168.7.164:8000/api/v2/upload)

上传表单 名称  chatUpload
订单 id orderId
```html

 
 
        <form method="POST" action="/upload" enctype="multipart/form-data">
            <label>Select file to upload:</label>
            <input type="file" name="chatUpload">
            <input type="input" name="orderId" value="1">
            <button type="submit">Upload</button>
        </form>
     

```


## Pusher 客户端用法说明


```html

<script src="https://js.pusher.com/4.1/pusher.min.js"></script>
<script>
    var pusher = new Pusher('e79dd55af42ae0916961', {
        cluster: 'ap1',
        authEndpoint: 'http://192.168.7.164:8000/api/v2/im/auth',
        auth: {
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZi5sb2NhbCIsImlhdCI6MTUxMzkyNTc3OSwibmJmIjoxNTEzOTI1Nzc5LCJleHAiOjE1NDU0NjE3NzksImRhdGEiOnsiaWQiOjEsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjEyMzQ1NiJ9fX0.V_nE5dXlunVUonYwYDovbtKiPjnjy1nzGxPUfvI07TI"
            }
        }
    }); 
    var channel = pusher.subscribe('private-chat-1');
    channel.bind('Order', function(data) {
        console.log( data);
    });
    
</script>


```
请求验证服务端api http://192.168.7.164:8000/api/v2/im/auth

需要在headers里增加：Authorization

频道名称：private-chat-1 ：private-chat-为前缀，1为订单号
事件名称:Order





## 消息结构体(jsonSchema)

```json5
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Product set",
  "type": "object",
  "items": {
    "title": "Message",
    "type": "object",
    "properties": {
      "order_id": {
        "description": "订单编号",
        "type": "number"
      },
      "from": {
        "type": "number",
        "description": "消息发送者ID"
      },
      "to": {
        "type": "number",
        "description": "消息接收者ID"
      },
      "public": {
        "type": "number",
        "description": "是否系统消息"
      },
      "message": {
        "type": "object",
        "properties": {
          "content": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "url": {
            "type": "string"
          }
        },
        "required": [
          "content",
          "type"
        ]
      }
    },
    "required": [
      "order_id",
      "from",
      "to",
      "message"
    ]
  }
}

```
客户端与服务器端以此结构传送消息
message.type 分为两种1、Text；2、Image;
当为Image的时候必须传 url;

### 用户发送消息

>Post {{apiurl}}/im/message/send

### 输入
```json
{
  "order_id":1,
  "from":1,
  "to":12,
  "content":{
  	"type":"Text",
  	"content":"adsf"
  } 
  
}
```

```json
{
  "order_id":1,
  "from":1,
  "to":12,
  "content":{
  	"type":"Image",
  	"content":"http://img.url/random.jpg"
  } 
  
}
```
| 名称 | 需求 | 类型 | 描述 |
|:----:|:----:|:----:|----|
| order_id | 是 | int |订单Id| 
| from | 是 | int | 消息发送者Id | 
| to | 是 | int | 消息接收者id | 
| content | 是 | object | 消息体 |

### 发送成功返回
```json
{
    "status": 200,
    "message": "",
    "data": {
        "order_id": 1,
        "from": 1,
        "to": 12,
        "public": 0,
        "content": {
            "type": "Image",
            "content": "adsf",
            "url": "http://asdfasf"
        },
        "sendtime": 1513246537
    }
}
``` 

## 消息历史

>Post {{apiurl}}/im/message/history

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
        "current_page": 1,
        "data": [
              {
                       "order_id": 1,
                       "from": 2,
                       "to": 1,
                       "public": 1,
                       "content": {
                           "type": "Text",
                           "content": "评价",
                           "url": ""
                       },
                       "sendtime": 1513246066
                   },
                     {
                               "order_id": 1,
                               "from": 1,
                               "to": 12,
                               "public": 0,
                               "content": {
                                   "type": "Text",
                                   "content": "adsf"
                               },
                               "sendtime": 1513246069
                           },
            ...
        ],
        "first_page_url": "/?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "/?page=1",
        "next_page_url": null,
        "path": "/",
        "per_page": 20,
        "prev_page_url": null,
        "to": 8,
        "total": 8
    }
}
```

