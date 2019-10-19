<template>
    <div class="send">
        <k-header detail="Send wallet to and address">Wallet Send</k-header>
        <k-card class="q-mt-md q-pa-lg">
            <!-- SOURCE WALLET -->
            <k-field label="Source Wallet">
                <q-input v-model="form.full_name" dense placeholder="BTC 0.00000000" class="input" outlined stack-label></q-input>
            </k-field>
            <!-- AMOUNT -->
            <k-field label="Amount">
                <q-input v-model="form.full_name" dense placeholder="0.0000000" class="input" outlined stack-label></q-input>
            </k-field>
            <!-- TO -->
            <k-field label="To">
                <q-input v-model="form.full_name" dense placeholder="Enter BTC Address" class="input" outlined stack-label></q-input>
            </k-field>
            <!-- REMARKS -->
            <k-field label="Remarks">
                <q-input type="textarea" v-model="form.full_name" dense placeholder="(optional)" class="input" outlined stack-label></q-input>
            </k-field>

            <q-btn unelevated label="SEND BTC" type="submit" color="primary" class="full-width"></q-btn>
        </k-card>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader';
import KCard from '../../../components/Member/KCard';
import KField from '../../../components/Member/KField';
import styles from './PMWalletSend.scss';

export default
{
    components: { KHeader, KCard, KField },
    filters: { },
    data:() =>(
    {
        form: {},
    }),
    mounted() { },
    methods: { },
    computed: { }
}
</script>