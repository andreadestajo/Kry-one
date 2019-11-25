<template>
    <span>
        <span v-if="coin !== 'USD'">
            {{$_current_user_data.currency}}
            {{$_convertRate(parseFloat(amount), coin, $_current_user_data.currency, { decimal: 2 })}}
            <q-icon name="fa fa-exchange-alt"></q-icon>
        </span>

        USD {{ $_convertRate(parseFloat(amount), coin, 'USD', { decimal: 2 })}}
    </span>
</template>

<script>
    export default {
        name: "KAmountConvertion",
        props:
        {
            amount : {type: Number, default: 0},
            coin   : {type: String, default: 'BTC'}
        }
    }
</script>

<style scoped>

</style>
