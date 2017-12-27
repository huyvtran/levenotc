<template>
    <el-container>
        <el-header style='height:100px;'>
            <el-row :gutter="20">
                <el-col>

                    <div class="user_info">
                            <div>
                                <ul class="ul_add">
                                    <li class="li_new">
                                        <img src="/images/px.png" alt="">
                                        <br>
                                        已拍下
                                    </li>
                                    <li class="li_new1">→</li>
                                    <template v-if='order.status==status.CREATED'>
                                         <li class="li_new"  >
                                            <img src="/images/fk1.png" alt="">
                                            <br>待付款
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/sh1.png" alt="">
                                            <br>待收货
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/pj1.png" alt="">
                                            <br>待评价
                                        </li>
                                    </template>
                                    <template v-if='order.status==status.PAY'>
                                         <li class="li_new"  >
                                            <img src="/images/fk.png" alt="">
                                            <br>已付款
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/sh1.png" alt="">
                                            <br>待放行
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/pj1.png" alt="">
                                            <br>待评价
                                        </li>
                                    </template>

                                    <template v-if='order.status==status.RELEASE'>
                                         <li class="li_new"  >
                                            <img src="/images/fk.png" alt="">
                                            <br>已付款
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/sh.png" alt="">
                                            <br>已放行
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/pj1.png" alt="">
                                            <br>待评价
                                        </li>
                                    </template>
                                    <template v-if='order.status==status.COMMENT'>
                                         <li class="li_new"  >
                                            <img src="/images/fk.png" alt="">
                                            <br>已付款
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/sh.png" alt="">
                                            <br>已放行
                                        </li>
                                        <li class="li_new1">→</li>
                                        <li class="li_new">
                                            <img src="/images/pj.png" alt="">
                                            <br>已评价
                                        </li>
                                    </template>

                                    <template v-if='order.status==status.CLOSE'> 
                                        <li class="li_new">
                                            <img src="/images/pj.png" alt="">
                                            <br>已关闭
                                        </li>
                                    </template>

                                    <template v-if='order.status==status.COMPLAINT'>  
                                        <li class="li_new">
                                            <img src="/images/pj.png" alt="">
                                            <br>审诉中
                                        </li>
                                    </template>
                                    
                                   
                                </ul>
                                <p class="p_container"><span
                                            style="font-size: 20px;">已拍下&nbsp;&nbsp;|&nbsp;&nbsp;</span>订单将在托管中保存60分钟，逾期未付款将自动取消
                                </p>
                            </div>
                        </div>
                    
                     
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col>
                    已拍下&nbsp;&nbsp;|&nbsp;&nbsp;</span>订单将在托管中保存60分钟，逾期未付款将自动取消
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col>
                    <div class="table_div">
                        <span style="font-weight: bold;color:#108ee9;">订单信息</span>
                        <span>交易价格:&nbsp;&nbsp; 54550.88CNY </span>
                        <span>交易数量: &nbsp;&nbsp;0.03666301BTC </span>
                        <span>交易金额:&nbsp;&nbsp; 2000.00CNY</span>
                    </div>
                </el-col>
            </el-row>


        </el-header>
        <el-container>

            <el-main >
                <div class="wechat">
                <div class="chat  ">

                    <section class="chatlist" v-scroll-bottom="messages"
                             :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">
                        <ul>
                            <template v-for="item in messages">
                                <li class="chat-mine" v-if="item.system==1">

                                    <div class="chat-text-system" v-html="(item.content)"></div>
                                </li>
                                <li class="chat-mine" v-if="item.self&&!item.system">
                                    <div class="chat-user"><img :src="item.avatar"></div>
                                    <div class="time"><cite>
                                        <timeago :since="item.time" locale="zh-CN"></timeago>
                                    </cite></div>
                                    <div class="chat-text" v-html="(item.content)"></div>
                                </li>
                                <li v-if="!item.self&&!item.system">
                                    <div class="chat-user"><img :src="item.avatar"></div>
                                    <div class="time"><cite>
                                        <timeago :since="item.time" locale="zh-CN"></timeago>
                                    </cite></div>
                                    <div class="chat-text" v-html="(item.content)"></div>
                                </li>
                            </template>
                        </ul>
                    </section>


                    <section class="foot">
                        <el-input placeholder="请输入内容" @keyup.native='onKeyup' v-model="content"
                                  class="input-with-select">
                            <el-upload slot="prepend"
                                       class="avatar-uploader"
                                       action=""
                                       :show-file-list="false"
                                       :on-success="uploadSuccess"
                                       :before-upload="beforeUpload">

                                <i class="el-icon-picture"></i>
                            </el-upload>

                            <el-button slot="append" type="success" v-on:click="sendMessage">发送</el-button>
                        </el-input>


                    </section>


                </div>
            </div>
            </el-main>

            <el-aside width="400px">
                <div class="ad_right">
                    <div class="form-title pt-30">
                        <span class="form-name">交易操作</span>
                    </div>
                    <div class="line mt-20 mb-20"></div>
                    <p class="p_new">
                        <span class="span_new">订单编号</span>
                        15111641502253593 </p>
                    <p class="p_new">
                        <span class="span_new">付款方式<br></span>
                        现金存款 </p>
                    <p class="p_new">
                        <span class="span_new">买家留言<br></span>
                    </p>
                    <p class="p_new"><span class="span_new">交易条款</span><br>交易</p>
                    <div>
                        <!-- 交易订单单子只有买家可以付款取消 -->
                        <p class="p_new">
                            <span class="span_new">交易提醒</span><br>
                            1.对方的币已经被托管锁定，您需要在规定时间内完成付款并点击“标记为付款完成”，否则交易将被自动取消。<br>
                            2.转账时请在留言里面附上订单编号，否则对方可能无法识别您的付款。<br>
                            3.若您已经付款，如果对方未响应，不确认或者交易条款发生纠纷，您可以申诉此交易，申诉期内，币将有平台托管。
                        </p>

                         <el-button type="success" @click='pay' v-show="showpay">标记已付款完成</el-button>
                         <el-button type="info" @click='cancel' v-show="showcancel">取消交易</el-button>

                         <el-button type="success" @click='release' v-show="showrelease">放行</el-button>

                        <template v-if="showcomment">
                         <el-input 
                              type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              v-model="comment">
                            </el-input>
                             <el-button type="primary" @click="save_comment">评价</el-button>
                        </template>

                         <el-button type="primary" v-if="showcomplaint" @click="show_complaint=true">审诉</el-button>


                         <template v-if="show_complaint">
                         <el-input 
                              type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              v-model="complaint">
                            </el-input>
                              <el-button type="primary"  @click="save_complaint">审诉</el-button>
                        </template>
                        
                        <p class="p_new">交易遇到问题？如果对方未响应，不确认或者对交易条款发生纠纷，您可以申诉此交易，申诉期内，比特币将由平台托管。
                        </p>
                        <!-- 我是买家已经付款了 但是卖家不释放比特币 我要投诉 -->
                        <!-- 我是卖家 对方已经打款我需要释放比特币 -->
                        <!-- 相互评价区域 -->
                    </div>
                </div>
            </el-aside>
        </el-container>
    </el-container>

</template>

<script>

    const now = new Date();


    export default {
        data() {
            return {
                status:App.ORDER_STATUS,
                user:App.user,
                showSelBox: 0,
                im_token: App.im_token,
                order_im_token: App.order_im_token,
                messages: [],
                instance: null,
                content: '',
                order: App.order,
                callbacks: {},
                imageUri: null,
                steps:[],
                step_active:1,
                system:0,
                comment:'',
                complaint:"",
                show_complaint:false
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
            'scroll-bottom'(el, bindings, vnode) {

                // vnode.context is the scope where the directive is rendered.
                const vm = vnode.context
                vm.$nextTick(() => {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                });
            }
        },
        computed: {
          showpay: function () {
            var buyer=this.user.id==this.order.user.id;
            return  buyer&&this.order.status==this.status.CREATED
          },
          showcancel: function () {
             var buyer=this.user.id==this.order.user.id;
             return  buyer&&(this.order.status==this.status.PAY||this.order.status==this.status.CREATED)  
          },
          showcomplaint:function(){
             var buyer=this.user.id==this.order.user.id;
            // alert(this.order.status==this.status.PAY)
             return  buyer&&(this.order.status==this.status.PAY)  
          },
          showcomment: function () {
             var buyer=this.user.id==this.order.user.id;
             return  buyer&&(this.order.status==this.status.RELEASE)  
          },
          showrelease:function(){
               
             var seller=this.user.id==this.order.ad_user_id;
            return  seller&&(this.order.status==this.status.PAY)
          }

        },
        created() {
              
            var _vm = this;
            this.callbacks = {

                getHistory: function () {
                    _vm.$http.post('/chat/message/history', {order_id: App.order.id})
                        .then((response) => {
                            console.log(response)
                            var messages = response.data.data.data.reverse();
                            if(messages.length==0){
                                _vm.system=1
                                _vm.content='系统消息: 买家拍下未付款<br>买家已拍下，等待买家付款'
                                
                                _vm.sendMessage()
                            }    
                            messages.forEach(function (message) {
                                _vm.callbacks.receiveNewMessage(JSON.parse(message.message));
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
                    item.time = message.sentTime;
                    item.system = 0;

                    if (message.content.extra.system) {
                        item.system = message.content.extra.system;


                    }
                    console.log(message)
                    console.log(item)
                    if (message.messageType == "ImageMessage") {
                        item.content = "<img src=" + message.content.imageUri + " class='msgimg'>"


                    } else if (message.messageType == "TextMessage") {
                        item.content = message.content.content

                    }
                    _vm.order.status=message.content.extra.status;

                    _vm.messages.push(item)

                },

                getInstance: function (ist) {
                    _vm.instance = ist;
                    this.getHistory();
                    return ist
                }
            }


            BeeChat.init(this.callbacks)
           

        },
        methods: { 

            pay(){
               var _vm=this;
               this.$http.post('/chat/order/pay', {orderid:this.order.id})
                    .then(function (res) {
                        var data=res.data;
                        if(data.code==200){
                            _vm.order.status=_vm.status.PAY;
                            _vm.system=1
                            _vm.content='系统消息: 买家标记已付款，等待卖家确认收款后释放'
                            _vm.sendMessage()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 
            },
            cancel(){
                   var _vm=this;
                   this.$http.post('/chat/order/cancel', {orderid:this.order.id})
                    .then(function (res) {
                        var data=res.data;
                        if(data.code==200){
                            
                            _vm.order.status=_vm.status.CLOSE;
                            _vm.system=1
                            _vm.content='系统消息:  买家关闭了交易'
                            _vm.sendMessage()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 

            },
             release(){
                 var _vm=this;
                   this.$http.post('/chat/order/release', {orderid:this.order.id})
                    .then(function (res) {
                        var data=res.data;
                        if(data.code==200){
                         
                            _vm.order.status=_vm.status.RELEASE;
                            _vm.system=1
                            _vm.content='系统消息: 卖家已放行'
                            _vm.sendMessage()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 

            },
             save_comment(){
                 var _vm=this;
                   this.$http.post('/chat/order/comment', {orderid:this.order.id})
                    .then(function (res) {
                        var data=res.data;
                        if(data.code==200){
                         
                            _vm.order.status=_vm.status.COMMENT;
                            _vm.system=1
                            _vm.content='系统消息: 买家已评论'
                            _vm.sendMessage()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 

            },
             save_complaint(){
                 var _vm=this;
                   this.$http.post('/chat/order/complaint', {orderid:this.order.id})
                    .then(function (res) {
                        var data=res.data;
                        if(data.code==200){
                         
                            _vm.order.status=_vm.status.COMPLAINT;
                            _vm.system=1
                            _vm.content='系统消息:买家已审诉'
                            _vm.sendMessage()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 

            },
            uploadSuccess(file) {

                this.selfForm.shareImg = file
            },
            beforeUpload(file) {
                var vm = this;
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;


                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                const formData = new FormData();


                formData.append('upchatpic', file);
                formData.append('orderid', this.order.id);

                this.$http.post('/chat/upload', formData).then(json => {
                    var data = json.data
                    if (data.code == 0) {
                        vm.imageUri = data.file;
                        vm.sendMessage();
                    }
                })
                return false;
            },
            onKeyup(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.sendMessage();
                    this.content = '';
                }
            },
            sendMessage() {
                var _vm = this;
                var content = {
                    content: this.content,
                    extra: {
                        "order_id": this.order.id,
                        "system":this.system,
                        "status":this.order.status
                    }
                };

                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
                var msg = new RongIMLib.TextMessage(content);
                if (this.imageUri) {
                    content.imageUri = this.imageUri;
                    msg = new RongIMLib.ImageMessage(content);
                }
               
                _vm.content = '';

                console.log(this.order_im_token.userId)
                                console.log(msg)

                this.instance.sendMessage(conversationtype, this.order_im_token.userId, msg, {
                    onSuccess: function (message) {
                        alert(1)
                        console.log(message)
                      _vm.system=0;
                        _vm.callbacks.receiveNewMessage(message)
                        //callbacks.receiveNewMessage(message)
                        
                       

                        _vm.$http.post('/chat/message/send', message)
                            .then(function (res) {

                            })
                            .catch(function (err) {
                                console.log(err);
                            });


                    },
                    onError: function (errorCode, message) {
                         alert(2)
                        console.log("发送文字消息失败");
                        console.log(errorCode);
                    }
                });

            }
        }
    }

</script>