<template>
    <div class="buy">
        <k-header icon="" detail="Purchase UniQ in order to pledge">Buy UniQ</k-header>
        <k-card class="q-mt-md">
           <q-stepper  class="buy__step" v-model="step" ref="stepper" alternative-labels color="primary" animated>
               <!-- STEP 1: CHOOSE PAYMENT -->
                <q-step class="step one" :name="1" title="Payment" icon="fa fa-bitcoin" :done="step > 1">
                    <div class="question">How would you like to pay?</div>
                    <div class="choices">
                        <div v-for="payment in $options.payment_options" :key="payment.key" class="choices-choice">
                            <div @click="choosePayment(payment.abb)" class="image"><q-img class="img" :src="payment.image"></q-img></div>
                            <div @click="choosePayment(payment.abb)" class="label">{{ payment.label }}</div>
                        </div>
                    </div>
                </q-step>

                <!-- STEP 2: CHOOSE NOBILITY -->
                <q-step class="step two" :name="2" title="Nobility" icon="fa fa-crown" :done="step > 2">
                    <q-form class="form">
                        <div class="form-info">
                            <div class="group">
                                <div class="group-label">Your {{this.form.payment_currency}} Wallet</div>
                                <div class="group-value">{{$_formatNumber(walletAmount, {currency: this.form.payment_currency})}}</div>
                            </div>
                        </div>

                        <k-field label="Choose Nobility">
                            <q-select  outlined class="input" dense
                                       v-model="form.nobility"
                                       :options="nobility_options"
                                       @input="computeTotalAmount"
                                       option-value="value"
                                       option-label="label">
                            </q-select>
                        </k-field>

                        <k-field label="Amount to Pay" class="q-mt-md">
                            <q-input debounce="500" @input="computeNobility" v-model.lazy="form.amount" dense placeholder="0.0" class="input" outlined stack-label>
                                <template v-slot:append>
                                    <div class="currency-append">{{form.payment_currency}}</div>
                                </template>
                            </q-input>
                        </k-field>
                        <k-field label="You will get" class="q-mt-md">
                            <q-input :value="uniqAmount" dense placeholder="0.0" class="input" outlined stack-label readonly>
                                <template v-slot:append>
                                    <div class="currency-append">UNIQ</div>
                                </template>
                            </q-input>
                        </k-field>
                    </q-form>
                    <q-btn @click="step = 3" class="step-button next full-width q-mt-md" unelevated color="primary">Next <q-icon class="icon" name="fa fa-arrow-right"></q-icon></q-btn>
                    <q-btn class="step-button back full-width q-mt-sm" outline color="primary"> View Pricing</q-btn>
                    <q-btn @click="step = 1" class="step-button back full-width q-mt-sm" outline color="gray"> Back</q-btn>
                </q-step>

                <!-- STEP 3: CONFIRM PURCHASE -->
                <q-step class="step three" :name="3" title="Confirm" icon="fa fa-question">
                    <div class="question">Confirm Your Purchase!</div>
                    <div class="group">
                        <div class="label">Rank Promotion</div>
                        <div class="value">{{$_current_user_data.nobility_info.title.toUpperCase()}}
                        <q-icon name="fa fa-arrow-right"></q-icon> &nbsp;
                        <span class="blue">{{this.form.nobility.label.toUpperCase()}}</span></div>
                    </div>

                    <div class="group">
                        <div class="label">You are paying</div>
                        <div class="value">{{$_formatNumber(form.amount, {currency: form.payment_currency})}}</div>
                    </div>

                    <div class="group">
                        <div class="label">You will receive</div>
                        <div class="value">{{uniqAmount}} UNIQ</div>
                    </div>
                    <q-btn @click="processPurchase" class="step-button next full-width q-mt-md" unelevated color="primary"><q-icon class="icon" name="fa fa-check"></q-icon> &nbsp; Process Purchase </q-btn>
                    <q-btn @click="step = 2" class="step-button back full-width q-mt-sm" outline color="gray"> Back</q-btn>
                </q-step>
            </q-stepper>
        </k-card>

        <!-- SUCCESS DIALOG -->
        <q-dialog v-model="success_dialog" persistent>
            <div class="buy__dialog">
                <q-card class="q-pa-lg" style="max-width: 450px;">
                    <div class="title">Payment Successful!</div>
                    <div class="detail q-mb-md">Congratulations! You have been<br>promoted to <b>{{this.form.nobility.label.toUpperCase()}}</b></div>
                    <q-btn unelevated color="primary" class="full-width" @click="$router.push({name: 'member_dashboard'})">Proceed</q-btn>
                </q-card>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import './PMBuy.scss';

import KHeader from '../../../components/Member/KHeader';
import KCard   from '../../../components/Member/KCard';
import KField  from '../../../components/Member/KField';

import DB_USER_WALLET from "../../../models/DB_USER_WALLET";
import DB_NOBILITY    from "../../../models/DB_NOBILITY";

import {required} from "vuelidate/src/validators";
import {fbCall} from "../../../utilities/Callables";
import {FN_UPGRADE_ACCOUNT} from "../../../references/refs_functions";

export default
{
    components: { KHeader, KCard, KField },
    filters: { },
    data:() =>
    ({
        step: 1,
        form:
        {
            payment_currency : '',
            nobility         : {label: '', value: null},
            amount           : ''
        },
        success_dialog: false,
        wallet_amount: 0,

        // Binds
        nobilities  : [],
        user_wallet : null
    }),
    computed:
    {
        nobility_options()
        {
            return this.nobilities.filter(n => parseFloat(n.price) !== 0).map(n => ({
                label: n.title,
                value: n.id
            }))
        },
        walletAmount()
        {
            return this.user_wallet ? this.user_wallet.wallet : 0
        },
        uniqAmount()
        {
            return this.form.payment_currency ? this.$_convertRate(this.form.amount || 0, this.form.payment_currency , 'UNIQ', {decimal: 8}) : 0
        }
    },
    methods:
    {
        async choosePayment(currency)
        {
            this.$_showPageLoading();
            this.form.payment_currency = currency;

            // bind wallet based on selected current
            await DB_USER_WALLET.bindWalletById(this, this.$_current_user_data.id, currency, 'user_wallet');

            if(!this.user_wallet)
            {
                this.$_hidePageLoading();
                return 0
            }

            this.step = 2;
            this.$_hidePageLoading();
        },
        computeTotalAmount()
        {
            const nobility = this.nobilities.filter(n => n.id === this.form.nobility.value)[0];

            if(!nobility) {return 0}

            // Set amount
            this.form.amount = this.$_convertRate(nobility.price, 'XAU', this.form.payment_currency);
            console.log(this.$_formatNumber(this.form.amount, {currency: this.form.payment_currency}))
        },
        computeNobility()
        {
            const matched_nobilities = this.nobilities.filter(n => {
                return parseFloat(n.price) <= this.uniqAmount && parseFloat(n.price) !== 0
            });

            if(!matched_nobilities.length)
            {
                this.form.nobility = {label: '', value: null};
                return 0;
            }

            this.form.nobility = {
                label: matched_nobilities[matched_nobilities.length - 1].title,
                value: matched_nobilities[matched_nobilities.length - 1].id
            }
        },
        async processPurchase()
        {
            this.$_showPageLoading();

            const upgrade_account                 = {};

            upgrade_account.target_nobility     = this.form.nobility.value;
            upgrade_account.amount              = parseFloat(this.form.amount);
            upgrade_account.payment_method      = this.form.payment_currency;

            try
            {
                await fbCall(FN_UPGRADE_ACCOUNT, upgrade_account);
                this.success_dialog = true;
            }
            catch(err)
            {
                this.$q.notify({ message: err.message, mode: 'negative' });
            }

            this.$_hidePageLoading();
        }
    },
    async mounted()
    {
        this.$_showPageLoading();

        // Get nobility options
        await DB_NOBILITY.bindNobilities(this);
        this.$_hidePageLoading();
    },
    validations()
    {
        return {
            form:
            {
                payment_currency : {required},
                nobility         : {required},
                amount           : {required},
                uniq             : {required}
            }
        }
    },
    payment_options:
    [
        { key: 'btc', abb: 'BTC', label: 'Bitcoin', image: '../../statics/bitcoin.png' },
        { key: 'eth', abb: 'ETH', label: 'Ethereum', image: '../../statics/ethereum.png' },
    ]

}
</script>
