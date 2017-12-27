<template>
    <div class="main">
       
        <div class="message" v-scroll-bottom="messages">
            <ul v-if="messages">
                <li v-for="item in  messages">
                    <p class="time">
                        <span>{{ item.date | time }}</span>
                    </p>
                    <div class="main" :class="{ self: item.self }">
                        <img class="avatar" width="40" height="40" :src="item.avatar" />
                        <div class="text">{{ item.content }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="text">
            <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
        </div>
    </div>
</template>
<style lang="less" scoped>
  #app {
    margin: 20px auto;
    width: 800px;
    height: 800px;

    overflow: hidden;
    border-radius: 3px;
 
    .main {
        height:100%;
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text {
        position: absolute;
       
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 60px)';
    }
}

    .message {
        padding: 10px 15px;
        overflow-y: scroll;

        li {
            margin-bottom: 15px;
        }
        .time {
            margin: 7px 0;
            text-align: center;

            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }
        .avatar {
            float: left;
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 40px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }
            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }

    .text {
        height: 60px;
        border-top: solid 1px #ddd;

        textarea {
            padding: 10px;
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
    }
</style>


<script>

    const now = new Date();
 
  
    export default {
        data() {
            return {
                im_token: App.im_token,
                order_im_token: App.order_im_token,
                messages: [],
                instance: null,
                content: '',
                order: App.order,
                callbacks:{}
            }
        },
        filters: {
            // 将日期过滤为 hour:minutes
            time(date) {
                return 33;
                // if (typeof date === 'string') {
                //     date = new Date(date);
                // }
                // return date.getHours() + ':' + date.getMinutes();
            }
        },
        directives: {
            // 发送消息后滚动到底部
            'scroll-bottom' (el, bindings, vnode) {
                
   // vnode.context is the scope where the directive is rendered.
                const vm = vnode.context
                 vm.$nextTick(() => {
                    el.scrollTop =  el.scrollHeight -  el.clientHeight;
                });
            }
        },
        created() {
            var _vm = this;
            this.callbacks = {

                getHistory: function () {
                    _vm.$http.post('/chat/message/history', {order_id: App.order.id})
                        .then((response) => {

                            var messages = response.data.data.data.data.reverse();
                            console.log(messages)
                            messages.forEach(function (message) {
                                callbacks.receiveNewMessage(JSON.parse(message.message));
                            })
                            //toastr.success('You publish the comment success!')
                        }).catch(({response}) => {
                        //this.isSubmiting = false
                        //stack_error(response)
                    })

                },
                receiveNewMessage: function (message) {
                //console.log(message)
                //alert([message.content.extra.order_id,_vm.order.id])
                // var chatcontent = "";
                if (message.content.extra.order_id != _vm.order.id) {
                    return false;
                }
                var item = {}

                if (message.senderUserId == _vm.im_token.userId) {
                    item.self = true
                    item.avatar = _vm.im_token.avatar;

                } else {
                    item.self = false
                    item.avatar = _vm.order_im_token.avatar;
                }
                item.date = message.sentTime;
                if (message.messageType == "ImageMessage") {
                    item.content = "<a>adf</a>"


                } else if (message.messageType == "TextMessage") {
                    item.content = message.content.content

                }
                console.log(item)
                _vm.messages.push(item)

            },

                getInstance: function (ist) {
                    _vm.instance = ist;

                    return ist
                }
            }
            

            BeeChat.init(this.callbacks)
            //callbacks.getHistory();

        },
        methods: {
            
            onKeyup(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.sendMessage(this.content);
                    this.content = '';
                }
            },
            sendMessage() {
                var _vm = this;
                var content = {
                    content: this.content,
                    extra: {
                        "order_id": App.order.id
                    }
                };

                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
                var msg = new RongIMLib.TextMessage(content);

                this.instance.sendMessage(conversationtype, this.order_im_token.userId, msg, {
                    onSuccess: function (message) {
                        _vm.callbacks.receiveNewMessage(message)
                        //callbacks.receiveNewMessage(message)
                        _vm.content = '';

                        _vm.$http.post('/chat/message/send', message)
                            .then(function (res) {

                            })
                            .catch(function (err) {
                                console.log(err);
                            });


                    },
                    onError: function (errorCode, message) {
                        console.log("发送文字消息失败");
                        console.log(errorCode);
                    }
                });

            }
        }
    }

</script>