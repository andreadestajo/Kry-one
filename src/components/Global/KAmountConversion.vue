<template>
    <span>
        <span v-if="coin !== 'USD'">
            PHP {{ $_convertRate(amount, coin, 'PHP', { decimal: 2 })}}
            <q-icon name="fa fa-exchange-alt"></q-icon>
        </span>
        USD {{ $_convertRate(amount, coin, 'USD', { decimal: 2 })}}
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
