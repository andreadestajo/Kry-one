<template>
    <div class="enlist">
        <k-header icon="fa fa-chess-knight" detail="Purchase for your friends">Enlist Knight</k-header>
        <q-form @submit="confirmEnlist()">
            <k-card class="q-mt-md q-pa-md q-px-lg">
                <!-- NAME -->
                <k-field label="Full Name">
                    <q-input v-model="form.full_name" dense placeholder="Enter name of person you'll invite" class="input" outlined stack-label></q-input>
                </k-field>


                <!-- E-MAIL ADDRESS -->
                <k-field label="E-Mail Address">
                    <q-input v-model="form.email" dense placeholder="Enter e-mail of person you'll invite" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- SPONSOR -->
                <k-field label="Sponsor">
                    <q-input v-model="form.sponsor" dense placeholder="M6U3V3" class="input" outlined stack-label></q-input>
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
                            <div class="value">guillermotabligan@gmail.com</div>
                            <div class="detail">Please take note that the owner of this e-mail address will receive an e-mail which will allow him/her to create an account.</div>
                        </div>
                    </div>

                    <q-btn @click="submitEnlist()" unelevated color="primary">Enlist Knight!</q-btn>
                    <q-btn @click="confirm_dialog = false" class="q-ml-sm" outline color="primary">Cancel Enlist</q-btn>
                </q-card>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import './PMEnlist.scss';
import KHeader from '../../../components/Member/KHeader'
import KField from '../../../components/Member/KField'
import KCard from '../../../components/Member/KCard'
import refs_countries from "../../../references/refs_countries";

import { FN_ENLIST_KNIGHT } from "../../../references/refs_functions";
import { fbCall }           from "../../../utilities/Callables";

import DB_NOBILITY from "../../../models/DB_NOBILITY";

export default
{
    components: { KHeader, KField, KCard },
    filters: { },
    data:() =>(
    {
        form:
        {
            full_name: '',
            email: '',
            payment_method: '',
            sponsor: '',
            nobility: '',
        },
        nobilities: [],
        confirm_dialog: false,
        payment_options: [
            { label: 'Bitcoin', value: 'btc' },
            { label: 'Ethereum', value: 'eth' },
        ]
    }),
    position_options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
    ],
    country_options: refs_countries,
    watch:
    {
        form()
        {
            console.log(this.form);
        }
    },
    computed:
    {
        nobility_options()
        {
            return this.nobilities
                .filter(n => parseFloat(n.price) !== 0 && this.$_current_user_data.nobility_id !== n.id)
                .map(n => ({label: n.title, value: n.id}))
        },
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
    methods:
    {
        confirmEnlist()
        {
            this.confirm_dialog = true;
        },
        submitEnlist()
        {
            console.log(this.form);
            fbCall(FN_ENLIST_KNIGHT, this.form);
        }
    },
}
</script>