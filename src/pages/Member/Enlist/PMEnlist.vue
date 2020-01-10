<template>
    <div class="enlist">
        <k-header icon="fa fa-chess-knight" detail="Purchase for your friends">Enlist Knight</k-header>
        <q-form @submit="confirmEnlist()">
            <k-card class="q-mt-md q-pa-md q-px-lg">
                <!-- NAME -->
                <k-field label="Full Name">
                    <q-input v-model="form.full_name"
                             :error="$v.form.full_name.$error"
                             :error-message="'Full name is required.'"
                             @blur="$v.form.full_name.$touch()"
                             dense placeholder="Enter name of person you'll invite" class="input" outlined stack-label></q-input>
                </k-field>


                <!-- E-MAIL ADDRESS -->
                <k-field label="E-mail Address">
                    <q-input debounce="500"
                             v-model.lazy="form.email"
                             :error="$v.form.email.$error"
                             :error-message="emailError"
                             @blur="$v.form.email.$touch()"
                             :loading="$v.form.email.$pending"
                             dense placeholder="Enter e-mail of person you'll invite" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- SPONSOR -->
                <k-field label="Sponsor">
                    <q-input debounce="500"
                             v-model.lazy="form.sponsor"
                             :error="$v.form.sponsor.$error"
                             :error-message="$v.form.sponsor.$pending ? '' : sponsorError"
                             :hint="$v.form.sponsor.$pending ? '' : sponsorError"
                             @blur="$v.form.sponsor.$touch()"
                             :loading="$v.form.sponsor.$pending"
                             dense placeholder="M6U3V3" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- CHOOSE METHOD OF PAYMENT -->
                <k-field label="Payment Method">
                    <q-select  outlined class="input" dense
                                v-model="form.payment_method"
                                :options="payment_options"
                                @input="computeTotalAmount"
                                error-message="Please choose a payment method."
                                option-value="value"
                                option-label="label">
                    </q-select>
                </k-field>

                <!-- CHOOSE NOBILITY -->
                <k-field label="Choose Nobility">
                    <q-select  outlined class="input" dense
                                v-model="form.nobility"
                                :options="nobility_options"
                                @input="computeTotalAmount"
                                error-message="Please choose a nobility."
                                option-value="value"
                                option-label="label">
                    </q-select>
                </k-field>

                <!-- AMOUNT -->
                <k-field label="You will pay">
                    <q-input  :value="form.amount"
                              readonly
                              :error="$v.form.amount.$error"
                              :error-message="amountError"
                              dense placeholder="You will pay" class="input" outlined stack-label>
                        <template v-slot:append>
                            <div class="currency-append">{{form.payment_method.abb}}</div>
                        </template>
                    </q-input>
                </k-field>
                <div class="conversion">
                    <k-amount-conversion :amount="parseFloat(form.amount)" :coin="form.payment_method.abb"/>
                </div>

                <div class="q-pt-lg">
                    <q-btn unelevated label="ENLIST KNIGHT" type="submit" color="primary" class="full-width"></q-btn>
                    <q-btn outline :label="`VIEW PENDING ENLIST (${pending_enlist_count})`"
                           type="button" color="primary" class="full-width q-mt-sm"
                           @click="viewPendingEnlist"></q-btn>
                </div>
            </k-card>
        </q-form>

        <!-- CONFIRM DIALOG -->
        <q-dialog v-model="confirm_dialog">
            <div class="enlist__dialog">
                <q-card class="q-pa-lg" style="max-width: 450px;">
                    <div class="form">
                        <div class="form-title">Confirm Enlist Knight</div>
                        <div class="form-group">
                            <div class="label">You need to pay</div>
                            <div class="value">{{this.form.amount}} {{this.form.payment_method.abb}}</div>
                            <div class="conversion"><k-amount-conversion :amount="parseFloat(this.form.amount)" :coin="this.form.payment_method.abb"/></div>
                        </div>
                        <div class="form-group">
                            <div class="label">You are registering</div>
                            <div class="value">{{form.email}}</div>
                            <div class="detail">Please take note that the owner of this e-mail address will receive an e-mail which will allow him/her to create an account.</div>
                        </div>
                    </div>

                    <q-btn @click="submitEnlist()" unelevated color="primary">Enlist Knight!</q-btn>
                    <q-btn @click="confirm_dialog = false" class="q-ml-sm" outline color="primary">Cancel</q-btn>
                </q-card>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import './PMEnlist.scss';
import KHeader  from '../../../components/Member/KHeader'
import KField   from '../../../components/Member/KField'
import KCard    from '../../../components/Member/KCard'

import {FN_ENLIST_KNIGHT} from "../../../references/refs_functions";
import {fbCall}           from "../../../utilities/Callables";

import DB_NOBILITY      from "../../../models/DB_NOBILITY";
import DB_USER          from "../../../models/DB_USER"
import DB_ENLIST_KNIGHT from "../../../models/DB_ENLIST_KNIGHT"

import {required, email, maxValue, minValue, not, sameAs}  from "vuelidate/src/validators";

export default
{
    components: { KHeader, KField, KCard },
    data:() =>(
    {
        form:
        {
            full_name       : '',
            email           : '',
            payment_method  : { label: 'Bitcoin'  , value: 'btc', abb: 'BTC'},
            sponsor         : '',
            nobility        : '',
            amount          : ''
        },
        sponsor_name: '',
        nobilities: [],
        confirm_dialog: false,
        is_eligible   : false,
        payment_options: [
            { label: 'Bitcoin'  , value: 'btc', abb: 'BTC' },
            { label: 'Ethereum' , value: 'eth', abb: 'ETH' },
        ],
        pending_enlist_count: 0
    }),
    computed:
    {
        nobility_options()
        {
            return this.nobilities
            .filter(n => parseFloat(n.price) !== 0)
            .map(n => ({label: n.title, value: n.id, data: n}))
        },
        emailError()
        {
            return !this.$v.form.email.required
                ? 'Email is required'
                    : !this.$v.form.email.email
                ? 'Invalid E-mail Address'
                    : !this.$v.form.email.isUnique
                ? 'E-mail Address already exists' : ''
        },
        sponsorError()
        {
            return !this.$v.form.sponsor.$dirty
                ? null
                    : !this.$v.form.sponsor.required
                ? 'Sponsor is required.'
                    : !this.$v.form.sponsor.doesExists
                ? 'Sponsor not found.'
                    : !this.$v.form.sponsor.isEligible
                ? 'Not Eligible to be a sponsor.'
                    : `${this.sponsor_name}`
        },
        amountError()
        {
            return !this.$v.form.amount.required
                ? 'Amount is required'
                    : !this.$v.form.amount.maxValue
                ? 'Insufficient balance'
                    : !this.$v.form.amount.minValue
                ? 'Amount must be greater than 0' : ''
        }
    },
    methods:
    {
        confirmEnlist()
        {
            this.$v.form.$touch();

            if(this.$v.form.$error || this.$v.form.$pending) {return 0}

            this.confirm_dialog = true;
        },
        async submitEnlist()
        {
            this.$_showPageLoading();

            const data = Object.assign({}, this.form);
            data.nobility             = this.form.nobility.value;
            data.nobility_title       = this.form.nobility.label;
            data.nobility_badge_color = this.form.nobility.data.badge_color;
            data.payment_method       = this.form.payment_method.value;
            data.created_at           = new Date();

            await fbCall(FN_ENLIST_KNIGHT, JSON.stringify(data))
            .then(() =>
            {
                this.confirm_dialog = false;
                this.clearForm();
                this.$_notify({message: 'Successfully Enlisted a Knight', mode: 'positive'});
                this.$router.push({name: 'member_dashboard'})
            })
            .catch(error =>
            {
                this.$_notify({message: error.message, mode: 'negative'})
            });

            this.$_hidePageLoading();
        },
        computeTotalAmount()
        {
            const nobility = this.nobilities.filter(n => n.id === this.form.nobility.value)[0];

            if(!nobility) {return 0}

            // Set amount
            this.form.amount = this.$_convertRate(nobility.price, 'XAU', this.form.payment_method.abb);
            this.$v.form.amount.$touch();
        },
        clearForm()
        {
            this.form.full_name = '';
            this.form.email     = '';
            this.$v.form.$reset();
        },
        viewPendingEnlist()
        {
            this.$router.push({name: "member_enlist_pending"})
        }
    },
    async mounted()
    {
        this.form.sponsor = this.$_current_user_data.referral_code;
        this.$_showPageLoading();

        // Get nobility options
        this.form.payment_method = this.payment_options[0];
        await DB_NOBILITY.bindNobilities(this);
        this.form.nobility = this.nobility_options[0];

        this.$v.form.sponsor.$touch();

        // Initial Computation
        this.computeTotalAmount();

        // Pending enlist count
        const pending_enlists = await DB_ENLIST_KNIGHT.getPendingEnlistments(this.$_current_user_data.id);
        this.pending_enlist_count = pending_enlists ? pending_enlists.length : 0;

        this.$_hidePageLoading();
    },
    validations()
    {
        return {
            form:
            {
                full_name: {required},
                email:
                {
                    required,
                    email,
                    isUnique(email)
                    {
                        if(email === '') {return true}

                        return new Promise((resolve) => {
                            setTimeout(async () =>
                            {
                                const user = await DB_USER.getUserByEmailAddress(email);
                                const enlistKnight = await DB_ENLIST_KNIGHT.getEnlistmentByEmailAddress(email);

                                resolve(!user || !enlistKnight)
                            }, 500)
                        });
                    }
                },
                sponsor :
                {
                    required,
                    doesExists(sponsor) {
                        if(sponsor === '') {return true}

                        return new Promise((resolve) => {
                            setTimeout(() =>
                            {
                                DB_USER.getUserByReferralCode(sponsor).then(user =>
                                {
                                    // check if eligible
                                    this.is_eligible  = user && !user.error ? user.nobility_info.rank_order > 1 : false;
                                    this.sponsor_name = this.is_eligible ? user.full_name : null;
                                    resolve(!!user)
                                });
                            }, 500)
                        })
                    },
                    isEligible(sponsor) {
                        if(sponsor === '') {return true}
                        if(this.$v.form.sponsor.doesExists.$pending) {return true}

                        return this.is_eligible
                    }
                },
                amount:
                {
                    required,
                    maxValue: maxValue(this.$_current_user_wallet[this.form.payment_method.abb].wallet || 0),
                    minValue: minValue(0.00000000000001)
                }
            }
        }
    },
    position_options: [
        { label: 'Left' , value: 'left' },
        { label: 'Right', value: 'right' },
    ],
}
</script>
