<template>
    <div class="send">
        <k-header detail="Send wallet to and address">Wallet Send</k-header>
        <q-form class="send__form">
            <k-card class="q-mt-md q-pa-lg">
                <!-- SOURCE WALLET -->
                <k-field label="Source Wallet">
                    <div class="source" @click="is_wallet_dialog_open = true">
                        <div class="source-icon"><q-icon name="fa fa-wallet"></q-icon></div>
                        <div class="source-value" v-if="active_wallet.abb">{{active_wallet.abb}} ({{active_wallet.amount}})</div>
                        <div class="source-dropdown"><q-icon name="fa fa-caret-down"></q-icon></div>
                    </div>
                </k-field>
                <!-- AMOUNT -->
                <k-field label="Amount">
                    <q-input v-model="send_wallet_form.amount"
                             dense placeholder="0.0000000" class="input" outlined stack-label
                             :error="$v.send_wallet_form.amount.$error"
                             :error-message="amountError"
                             @blur="$v.send_wallet_form.amount.$touch()">
                    </q-input>
                </k-field>
                <!-- TO -->
                <k-field label="To">
                    <q-input v-model="send_wallet_form.send_to"
                             dense placeholder="Enter BTC Address" class="input" outlined stack-label
                             :error="$v.send_wallet_form.send_to.$error"
                             :error-message="'This field is required.'"
                             @blur="$v.send_wallet_form.send_to.$touch()">
                    </q-input>
                </k-field>
                <!-- REMARKS -->
                <k-field label="Remarks">
                    <q-input type="textarea" v-model="send_wallet_form.remarks" dense placeholder="(optional)" class="input" outlined stack-label></q-input>
                </k-field>

                <q-btn @click="showConfirmDialog" unelevated :label="`SEND ${active_wallet.abb}`" type="submit" color="primary" class="full-width"></q-btn>
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
                            <div class="right-value">{{ currency.amount }}</div>
                            <div class="right-conversion">
                                {{ $_convertRate(currency.amount, currency.abb, 'PHP', {decimal: '2'}) }}
                                <q-icon name="fa fa-exchange-alt"></q-icon>
                                {{ $_convertRate(currency.amount, currency.abb, 'USD', {decimal: '2'}) }}
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <!-- CONFIRMATION PAGE DIALOG -->
        <q-dialog v-model="is_confirmation_dialog_open">
            <q-card v-if="is_confirmation_dialog_open" style="min-width: 350px;" class="send__confirmation">
                <q-toolbar class="toolbar">
                    <q-toolbar-title>Confirm Transaction</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <div class="content">
                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Recipient</div>
                        <div class="value">{{send_wallet_form.send_to}}</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Charge</div>
                        <div class="value">{{$_formatNumber(0, {currency: active_wallet.abb})}}</div>
                        <div class="conversion">PHP 0.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 0.00</div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">To Be Sent</div>
                        <div class="value">{{$_formatNumber(send_wallet_form.amount, {currency: active_wallet.abb})}}</div>
                        <div class="conversion">
                            {{ $_convertRate(send_wallet_form.amount, active_wallet.abb, 'PHP', {decimal: '2'}) }}
                            <q-icon name="fa fa-exchange-alt"></q-icon>
                            {{ $_convertRate(send_wallet_form.amount, active_wallet.abb, 'USD', {decimal: '2'}) }}
                        </div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">Total Amount Needed</div>
                        <div class="value">{{$_formatNumber(totalAmountNeeded, {currency: active_wallet.abb})}}</div>
                        <div class="conversion">
                            {{ $_convertRate(totalAmountNeeded, active_wallet.abb, 'PHP', {decimal: '2'}) }}
                            <q-icon name="fa fa-exchange-alt"></q-icon>
                            {{ $_convertRate(totalAmountNeeded, active_wallet.abb, 'USD', {decimal: '2'}) }}
                        </div>
                    </div>

                    <div class="content-group q-pt-md">
                        <div class="label text-weight-medium">From Wallet</div>
                        <div class="value">{{$_formatNumber(active_wallet.amount, {currency: active_wallet.abb})}}</div>
                        <div class="conversion">
                            {{ $_convertRate(active_wallet.amount, active_wallet.abb, 'PHP', {decimal: '2'}) }}
                            <q-icon name="fa fa-exchange-alt"></q-icon>
                            {{ $_convertRate(active_wallet.amount, active_wallet.abb, 'USD', {decimal: '2'}) }}
                        </div>
                    </div>

                    <q-btn unelevated @click="confirmTransaction" type="submit" color="primary" class="full-width q-mt-md">
                        <q-icon size="18px" class="q-mr-sm" name="fa fa-check"></q-icon>Confirm Transaction
                    </q-btn>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import styles from      './PMWalletSend.scss';

import DB_USER  from "../../../models/DB_USER";

import KHeader from '../../../components/Member/KHeader';
import KCard   from '../../../components/Member/KCard';
import KField  from '../../../components/Member/KField';

import ref_currencies  from '../../../references/refs_currencies';
import DB_USER_WALLET  from '../../../models/DB_USER_WALLET'
import {arrayToObject} from "../../../utilities/ObjectUtils";

import {FN_TRANSFER_WALLET, FN_TRANSFER_CRYPTO} from "../../../references/refs_functions";
import {fbCall}             from "../../../utilities/Callables";

import {
    required,
    maxValue,
    minValue
} from "vuelidate/src/validators";

export default
{
    components: { KHeader, KCard, KField},
    data:() => (
    {
        form: {},
        is_wallet_dialog_open: false,
        is_confirmation_dialog_open: false,
        active_wallet: {abb: ''},
        send_wallet_form:
        {
            amount        : 0,
            send_to       : '',
            remarks       : ''
        }
    }),
    computed:
    {
        amountError()
        {
            return !this.$v.send_wallet_form.amount.required
                ? 'Amount is required'
                    : !this.$v.send_wallet_form.amount.maxValue
                ? 'Insufficient balance '
                    : !this.$v.send_wallet_form.amount.minValue
                ? 'Amount must be greater than 0' : ''
        },
        totalAmountNeeded()
        {
            // To add service charge soon
            if(!this.send_wallet_form.amount && !this.active_wallet) {return 0}
            return this.send_wallet_form.amount
        }
    },
    methods: {
        chooseWallet(wallet)
        {
            this.active_wallet          = {
                abb     : wallet.abb,
                amount  : wallet.amount
            };

            this.is_wallet_dialog_open  = false;
        },
        showConfirmDialog()
        {
            this.$v.send_wallet_form.$touch();
            if(this.$v.send_wallet_form.$error) {return 0}

            this.is_confirmation_dialog_open = true;
        },
        async confirmTransaction()
        {
            this.$_showPageLoading();

            // Get user details
            const user = await DB_USER.getUserByFilters({search_text: this.send_wallet_form.send_to});

            if (user)
            {
                this.send_wallet_form.send_to_id = user.id;
                this.transferWallet();
            }
            else if (this.active_wallet.abb === 'BTC' || this.active_wallet.abb === 'ETH') // BTC AND ETH
            {
                this.transferCrypto();
            }
            else
            {
                this.$q.notify({ message: 'Address not found', color: 'red' });
                this.$_hidePageLoading();
            }
        },
        async transferCrypto()
        {
            let send_wallet            = {};
            send_wallet.amount         = this.send_wallet_form.amount;
            send_wallet.currency       = this.active_wallet.abb;
            send_wallet.remarks        = this.send_wallet_form.remarks;
            send_wallet.address        = this.send_wallet_form.send_to;
            
            try
            {
                let res = await fbCall(FN_TRANSFER_CRYPTO, send_wallet);
                this.$q.notify({ message: res.data.message, color: 'green' });
                this.$router.push({name: 'member_wallet'})
            }
            catch(err)
            {
                this.$q.notify({ message: err.message, color: 'red' });
            }

            this.$_hidePageLoading();
        },
        async transferWallet()
        {
            let send_wallet            = {};
            send_wallet.amount         = this.send_wallet_form.amount;
            send_wallet.send_to        = this.send_wallet_form.send_to_id;
            send_wallet.currency       = this.active_wallet.abb;
            send_wallet.remarks        = this.send_wallet_form.remarks;

            console.log(send_wallet);

            try
            {
                let res = await fbCall(FN_TRANSFER_WALLET, send_wallet);
                this.$q.notify({ message: res.data.message, color: 'green' });
                this.$router.push({name: 'member_wallet'})
            }
            catch(err)
            {
                this.$q.notify({ message: err.message, color: 'red' });
            }

            this.$_hidePageLoading();
        },
    },
    async mounted()
    {
        // Get user wallet
        const user_wallet_arr = await DB_USER_WALLET.getMany(this.$_current_user_data.id);
        const user_wallet_obj = !!user_wallet_arr.length ? arrayToObject(user_wallet_arr, 'key') : null;

        //add random value for now (temporary)
        this.$options.currency_options.forEach((currency) =>
        {
            const key = currency.abb === 'UNIQ' ? 'XAU' : currency.abb;
            currency.amount = this.$_formatNumber(user_wallet_obj[key].wallet || 0, { decimal: currency.decimals })

            // Set active wallet
            if(this.$route.params.currency === currency.key)
            {
                this.active_wallet =
                {
                    abb     : currency.abb,
                    amount  : currency.amount
                };
            }
        });
    },
    validations()
    {
        return {
            send_wallet_form:
            {
                amount   :
                {
                    required,
                    maxValue: maxValue(this.active_wallet ? this.active_wallet.amount : 0),
                    minValue: minValue(0)
                },
                send_to  : {required}
            }
        }
    },
    currency_options: ref_currencies,
}
</script>
