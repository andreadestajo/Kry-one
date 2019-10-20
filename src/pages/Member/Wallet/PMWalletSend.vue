<template>
    <div class="send">
        <k-header detail="Send wallet to and address">Wallet Send</k-header>
        <q-form class="send__form">
            <k-card class="q-mt-md q-pa-lg">
                <!-- SOURCE WALLET -->
                <k-field label="Source Wallet">
                    <div class="source" @click="is_wallet_dialog_open = true">
                        <div class="source-icon"><q-icon name="fa fa-wallet"></q-icon></div>
                        <div class="source-value">BTC (0.0000000234)</div>
                        <div class="source-dropdown"><q-icon name="fa fa-caret-down"></q-icon></div>
                    </div>
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

                <q-btn @click="is_confirmation_dialog_open = true" unelevated label="SEND BTC" type="submit" color="primary" class="full-width"></q-btn>
            </k-card>
        </q-form>

        <!-- CHOOSE WALLET DIALOG -->
        <q-dialog v-model="is_wallet_dialog_open">
            <q-card class="send__cwallet">
                <q-toolbar class="toolbar">
                    <q-avatar>
                        <q-img spinner-size="0" :ratio="1" src="../../statics/wallet.png"></q-img>
                    </q-avatar>

                    <q-toolbar-title>Choose Wallet</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <div class="content">
                    <div v-for="currency in $options.currency_options" :key="currency.key" class="content-group" @click="chooseWallet(currency)">
                        <div class="left">{{ currency.abb }}</div>
                        <div class="right">
                            <div class="right-value">0.00000345</div>
                            <div class="right-conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30</div>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <!-- CONFIRMATION PAGE DIALOG -->
        <q-dialog v-model="is_confirmation_dialog_open">
            <q-card  style="min-width: 350px;" class="send__confirmation">
                <q-toolbar class="toolbar">
                    <q-toolbar-title>Confirm Transaction</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <div class="content">
                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Recipient</div>
                        <div class="value">sampleaDdreSs123kckvksdkdb</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Charge</div>
                        <div class="value">0.0000002345 BTC</div>
                        <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">To Be Sent</div>
                        <div class="value">0.0000002345 BTC</div>
                        <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Total Amount Needed</div>
                        <div class="value">0.0000002345 BTC</div>
                        <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">From Wallet</div>
                        <div class="value">0.0000002345 BTC</div>
                        <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30</div>
                    </div>

                    <q-btn unelevated type="submit" color="primary" class="full-width q-mt-md"><q-icon size="18px" class="q-mr-sm" name="fa fa-check"></q-icon>  Confirm Transaction</q-btn>
                </div>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
import KHeader from     '../../../components/Member/KHeader';
import KCard from       '../../../components/Member/KCard';
import KField from      '../../../components/Member/KField';
import styles from      './PMWalletSend.scss';
import ref_currencies from '../../../references/refs_currencies';

export default
{
    components: { KHeader, KCard, KField },
    filters: { },
    data:() =>(
    {
        form: {},
        is_wallet_dialog_open: false,
        is_confirmation_dialog_open: false,
        active_wallet: null,
    }),
    mounted()
    {
        this.active_wallet = this.$route.params.currency ;
    },
    methods: {
        chooseWallet(wallet)
        {
            this.active_wallet          = wallet.key;
            this.is_wallet_dialog_open  = false;
        }
    },
    computed: { },
    currency_options: ref_currencies,
}
</script>