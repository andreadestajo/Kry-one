<template>
    <div class="wallethistory">
        <k-header detail="Bitcoin wallet transaction history">Transaction History</k-header>
    </div>
</template>

<script>
import KHeader from     '../../../components/Member/KHeader';
import KCard from       '../../../components/Member/KCard';
import KField from      '../../../components/Member/KField';
import styles from      './PMWalletHistory.scss';

export default
{
    components: { KHeader, KCard },
    filters: { },
    data:() =>(
    {
    }),
    mounted() { },
    methods: { },
    computed: { }
}
</script>