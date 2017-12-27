<template>
    <vue-form :title="$t('form.edit_discussion')">

        <div slot="content">
            <ad-form :ad="ad"></ad-form>
        </div>
    </vue-form>
</template>

<script>
import AdForm from './Form'

export default {
    components: { AdForm },
    props: {

        adid:{
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            ad: undefined,
        }
    },
    mounted() {

        this.loadAd()
    },
    methods: {
        loadAd() {
            console.log(this.route)
            this.$http.get('ad/' + this.adid + '')
                .then((response) => {
                    this.ad = response.data.data
                })
        },
    }
}
</script>
