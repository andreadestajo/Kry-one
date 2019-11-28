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
                    <q-input v-model.lazy="form.email"
                             :error="$v.form.email.$error"
                             :error-message="emailError"
                             @blur="$v.form.email.$touch()"
                             debounce="500" dense placeholder="Enter e-mail of person you'll invite" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- SPONSOR -->
                <k-field label="Sponsor">
                    <q-input v-model.lazy="form.sponsor"
                             :error="$v.form.sponsor.$error"
                             :error-message="sponsorError"
                             :hint="sponsorError"
                             @blur="$v.form.sponsor.$touch()"
                             debounce="500" dense placeholder="M6U3V3" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- CHOOSE METHOD OF PAYMENT -->
                <k-field label="Payment Method">
                    <q-select  outlined class="input" dense
                                v-model="form.payment_method"
                                :options="payment_options" 
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
                                error-message="Please choose a nobility."
                                option-value="value"
                                option-label="label">
                    </q-select>
                </k-field>

                <q-btn unelevated label="ENLIST KNIGHT" type="submit" color="primary" class="full-width"></q-btn>
                <q-btn outline label="VIEW PENDING ENLIST (0)" type="button" color="primary" class="full-width q-mt-sm"></q-btn>
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
                            <div class="value">0.000000123 BTC</div>
                            <div class="conversion"><k-amount-conversion :amount="0.000123" coin="BTC"/></div>
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
import {required, email}  from "vuelidate/src/validators";

import DB_NOBILITY from "../../../models/DB_NOBILITY";
import DB_USER     from "../../../models/DB_USER"

export default
{
    components: { KHeader, KField, KCard },
    data:() =>(
    {
        form:
        {
            full_name       : '',
            email           : '',
            payment_method  : '',
            sponsor         : '',
            nobility        : '',
        },
        sponsor_name: '',
        nobilities: [],
        confirm_dialog: false,
        payment_options: [
            { label: 'Bitcoin'  , value: 'btc' },
            { label: 'Ethereum' , value: 'eth' },
        ],
    }),
    computed:
    {
        nobility_options()
        {
            return this.nobilities
                .filter(n => parseFloat(n.price) !== 0 && this.$_current_user_data.nobility_id !== n.id)
                .map(n => ({label: n.title, value: n.id}))
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
            data.nobility       = this.form.nobility.value;
            data.payment_method = this.form.payment_method.value;
            data.created_at     = new Date();

            await fbCall(FN_ENLIST_KNIGHT, JSON.stringify(data))
            .then(() =>
            {
                this.confirm_dialog = false;
                this.clearForm();
                this.$_notify({message: 'Successfully Enlisted a Knight', mode: 'positive'})
            })
            .catch(error =>
            {
                this.$_notify({message: error.message, mode: 'negative'})
            });

            this.$_hidePageLoading();
        },
        clearForm()
        {
            this.form.full_name = '';
            this.form.email     = '';
            this.$v.form.$reset();
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
        
        this.$_hidePageLoading();
    },
    validations:
    {
        form:
        {
            full_name: {required},
            email:
            {
                required,
                email,
                async isUnique(email)
                {
                    // Returns true if no user found, meaning the email is available.
                    return await DB_USER.getUserByEmailAddress(email)
                        .then(user => !user)
                }
            },
            sponsor :
            {
                required,
                async doesExists(sponsor)
                {
                    // Returns true if referral code belongs to an existing user.
                    return await DB_USER.getUserByReferralCode(sponsor).then(user =>
                    {
                        this.sponsor_name = user && !user.error ? user.full_name : null;
                        return !!user
                    })
                },
                async isEligible(referral_code)
                {
                    // Returns true if eligible
                    return await DB_USER.getUserByReferralCode(referral_code).then(user =>
                    {
                        this.sponsor_name = user && !user.error ? user.full_name : null;
                        return user && user.nobility_info.rank_order > 1;
                    })
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
