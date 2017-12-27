<template>
    
    <div class="row">
        <form class="form-horizontal col-md-9 col-md-offset-1" @submit.prevent="onSubmit">
            <el-form-item label="交易币种">
                <el-select v-model="form.crypto_currency" placeholder="交易币种">

                    <el-option v-for='(coin, index) in coin_type'
                               :key="coin.value"
                               :label="coin.label"
                               :value="coin.value"
                    ></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="交易类型">
                <el-radio-group v-model="form.trade_type">
                    <el-radio label="0">在线出售比特币</el-radio>
                    <el-radio label="1">在线购买比特币</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="所在国家">
                <el-select v-model="form.country_code" placeholder="所在国家">
                    <el-option label="中国" value="btc"></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="货币">
                <el-select v-model="form.currency" placeholder="货币">
                    <el-option label="人民币" value="CNY"></el-option>

                </el-select>
                您希望交易付款的货币类型。
            </el-form-item>

            <el-form-item label="溢价">
                <el-input v-model="form.margin"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="最低价">
                <el-input v-model="form.min_price"></el-input>
            </el-form-item>


            <el-form-item label="最小限额">
                <el-input v-model="form.min_amount"></el-input>
            </el-form-item>

            <el-form-item label="最大限额">
                <el-input v-model="form.max_amount"></el-input>
            </el-form-item>

            <el-form-item label="付款期限">
                <el-input v-model="form.payment_window_minutes"></el-input>
            </el-form-item>


            <el-form-item label="收款方式">
                <el-select v-model="form.payment_provider" placeholder="收款方式">
                    <el-option label="支付宝" value="CNY"></el-option>
                    <el-option label="微信" value="CNY"></el-option>

                </el-select>
            </el-form-item>



            <el-form-item label="广告留言">
                <el-input type="message" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-info">{{ ad.id ? $t('form.edit') : $t('form.create') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { stack_error } from 'config/helper'
import { default as SimpleMDE } from 'simplemde/dist/simplemde.min'
import Multiselect from 'vue-multiselect'

export default {
    components: { Multiselect },
    props: {
        coins: {
            type: String,
            default() {
                return ''
            }
        },
        ad: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            
            coin_type:[],
            form: {
                crypto_currency: 1,
                trade_type: "0",
                country_code: '',
                currency: '',
                margin: '',
                price: '',
                min_price: '',
                min_amount: '',
                max_amount:'',
                payment_window_minutes:'',
                payment_provider:'',
                message:'',
            }
        }
    },
    computed: {
        mode() {
            return this.ad.id ? 'update' : 'create'
        },
    },
    created() {

        this.coin_type=JSON.parse(this.coins)

        
    },
    watch: {
        ad() {
            this.tags       = this.ad.tags.data
            this.simplemde.value(this.ad.content_raw)
        },
    },
    mounted() {
        
    },
    methods: {
        
        onSubmit() {
            if (this.tags.length == 0) {
                toastr.error('Tag must select one or more.')
                return;
            }

            let tagIDs = []
            let url = 'ad' + (this.ad.id ? '/' + this.ad.id : '')
            let method = this.ad.id ? 'patch' : 'post'

            for(var i = 0 ; i < this.tags.length ; i++) {
                tagIDs[i] = this.tags[i].id
            }

            this.ad.tags = JSON.stringify(tagIDs)
            this.ad.content = this.simplemde.value()

            this.$http[method](url, this.ad)
                .then((response) => {
                    toastr.success('You ' + this.mode + 'd the ad success!')

                    this.$router.push('/dashboard/ads')
                }).catch(({response}) => {
                    stack_error(response)
                })
        }
    }
}
</script>
