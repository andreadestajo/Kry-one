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
                                <div class="group-value">{{$_formatNumber(wallet_amount || 0, {currency: this.form.payment_currency})}}</div>
                            </div>
                        </div>

                        <k-field label="Choose Nobility">
                            <q-select   outlined class="input" dense
                                        option-value="code"
                                        option-label="name">
                            </q-select>
                        </k-field>

                        <k-field label="Amount to Pay" class="q-mt-md">
                            <q-input v-model="form.email" dense placeholder="0.0" class="input" outlined stack-label>
                                <template v-slot:append>
                                    <div class="currency-append">BTC</div>
                                </template>
                            </q-input>
                        </k-field>
                        <k-field label="You will get" class="q-mt-md">
                            <q-input v-model="form.email" dense placeholder="0.0" class="input" outlined stack-label>
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
                        <div class="value">Baron  &nbsp; <q-icon name="fa fa-arrow-right"></q-icon> &nbsp; <span class="blue">Viscount</span></div>
                    </div>

                    <div class="group">
                        <div class="label">You are paying</div>
                        <div class="value">0.00000324 BTC</div>
                    </div>

                    <div class="group">
                        <div class="label">You will receive</div>
                        <div class="value">0.00000145 UNIQ</div>
                    </div>
                    <q-btn @click="success_dialog = true" class="step-button next full-width q-mt-md" unelevated color="primary"><q-icon class="icon" name="fa fa-check"></q-icon> &nbsp; Process Purchase </q-btn>
                    <q-btn @click="step = 2" class="step-button back full-width q-mt-sm" outline color="gray"> Back</q-btn>
                </q-step>
            </q-stepper>
        </k-card>

        <!-- SUCCESS DIALOG -->
        <q-dialog v-model="success_dialog">
            <div class="buy__dialog">
                <q-card class="q-pa-lg" style="max-width: 450px;">
                    <div class="title">Payment Successful!</div>
                    <div class="detail q-mb-md">Congratulations! You have been<br>promoted to <b>BARON</b></div>
                    <q-btn unelevated color="primary" class="full-width" v-close-popup>Proceed</q-btn>
                </q-card>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader';
import KCard from '../../../components/Member/KCard';
import KField from '../../../components/Member/KField';
import styles from './PMBuy.scss';
import DB_USER_WALLET from "../../../models/DB_USER_WALLET";

export default
{
    components: { KHeader, KCard, KField },
    filters: { },
    data:() =>
    ({
        step: 1,
        form:
        {
            payment_currency: ''
        },
        success_dialog: false,
        wallet_amount: null
    }),
    methods:
    {
        async choosePayment(currency)
        {
            this.$_showPageLoading();
            this.form.payment_currency = currency;

            // Get wallet based on selected current
            const wallet = await DB_USER_WALLET.doc(this.$_current_user_data.id, currency).get()
                .then(doc => doc.exists ? doc.data().wallet : null);

            if(wallet === null) {return 0}

            // assign wallet amount
            this.wallet_amount = wallet;

            this.step = 2;
            this.$_hidePageLoading();
        }
    },
    mounted() { },
    payment_options:
    [
        { key: 'btc', abb: 'BTC', label: 'Bitcoin', image: '../../statics/bitcoin.png' },
        { key: 'eth', abb: 'ETH', label: 'Ethereum', image: '../../statics/ethereum.png' },
    ]

}
</script>
