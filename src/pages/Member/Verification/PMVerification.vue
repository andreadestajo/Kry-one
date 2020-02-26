<template>
    <div>
        <!--VERIFICATION FORM-->
        <div class="verification">
            <k-header detail="Please verify your account">KYC Verification</k-header>

            <!--PENDING-->
            <k-card v-if="$_current_user_data.kyc_status === 'pending'" class="q-my-md q-pa-md q-px-lg">
                You've already submitted your KYC verification.
                Please wait for a notification regarding your verification status.
                Thank you.
            </k-card>
            <k-card v-else-if="$_current_user_data.kyc_status === 'accepted'" class="q-my-md q-pa-md q-px-lg">
                Your KYC has been verified.
            </k-card>
            <k-card v-else-if="$_current_user_data.kyc_status === 'rejected'" class="q-my-md q-pa-md q-px-lg">
                Your KYC has been rejected.
            </k-card>
            <q-form v-if="!$_current_user_data.kyc_status || $_current_user_data.kyc_status == 'rejected'">
                <k-card class="q-my-md q-pa-md q-px-lg">
                    <!-- FIRST NAME -->
                    <k-field label="First Name">
                        <q-input :error="$v.form.first_name.$error"
                                 :error-message="'First Name is required'"
                                 @blur="$v.form.first_name.$touch()"
                                 v-model="form.first_name"
                                 placeholder="John"
                                 class="input"
                                 dense outlined stack-label>
                        </q-input>
                    </k-field>

                    <!-- LAST NAME -->
                    <k-field label="Last Name">
                        <q-input :error="$v.form.last_name.$error"
                                 :error-message="'Last Name is required'"
                                 @blur="$v.form.last_name.$touch()"
                                 v-model="form.last_name" dense placeholder="Doe" class="input" outlined stack-label></q-input>
                    </k-field>

                    <!-- MIDDLE NAME -->
                    <k-field label="Middle Name">
                        <q-input :error="false"
                                 v-model="form.middle_name" dense placeholder="Smith" class="input" outlined stack-label></q-input>
                    </k-field>

                    <!-- DATE OF BIRTH -->
                    <k-field label="Date of Birth">
                        <q-input :error="$v.form.birthdate.$error"
                                 :error-message="'Birthdate is required'"
                                 @blur="$v.form.birthdate.$touch()"
                                 dense outlined v-model="form.birthdate" mask="date">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="form.birthdate" @input="() => $refs.qDateProxy.hide()" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </k-field>

                    <!-- STATE/CITY -->
                    <k-field label="State/City">
                        <q-input :error="$v.form.state_city.$error"
                                 :error-message="'State/City is required'"
                                 @blur="$v.form.state_city.$touch()"
                                 v-model="form.state_city" dense placeholder="Manila" class="input" outlined stack-label></q-input>
                    </k-field>

                    <!-- COUNTRY -->
                    <k-field label="Where is your document issued?">
                        <q-select :error="$v.form.country.$error"
                                  :error-message="'This field is required'"
                                  @blur="$v.form.country.$touch()"
                                  outlined
                                  class="input"
                                  dense
                                  v-model="form.country"
                                  :options="$options.country_options"
                                  option-value="code"
                                  option-label="name">
                        </q-select>
                    </k-field>

                    <!-- ID NUMBER -->
                    <k-field label="ID Number">
                        <q-input :error="$v.form.id_number.$error"
                                 :error-message="'ID Number is required'"
                                 @blur="$v.form.id_number.$touch()"
                                 v-model="form.id_number" dense placeholder="" class="input" outlined stack-label></q-input>
                    </k-field>

                    <!-- ID TYPE -->
                    <k-field label="ID Type">
                        <q-select :error="$v.form.id_type.$error"
                                  :error-message="'ID Type is required'"
                                  @blur="$v.form.id_type.$touch()"
                                  outlined
                                  class="input"
                                  dense
                                  placeholder="Select your ID Types."
                                  v-model="form.id_type"
                                  :options="$options.id_types_options"
                                  option-value="code"
                                  option-label="name"
                                  >
                        </q-select>
                        <q-input
                                :error="$v.other_id_type.$error"
                                :error-message="'ID Type is required'"
                                @blur="$v.other_id_type.$touch()"
                                class="input" 
                                placeholder="Please specify your ID type"
                                v-model="other_id_type" 

                                v-if="isIdInputHidden"
                                
                                dense outlined>
                        </q-input>
                    </k-field>

                    <!-- ID EXPIRATION DATE -->
                    <k-field label="ID Expiry Date">
                        <q-input :error="$v.form.id_expiration_date.$error"
                                 :error-message="'ID Expiry is required'"
                                 @blur="$v.form.id_expiration_date.$touch()"
                                 dense outlined v-model="form.id_expiration_date" mask="date">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="form.id_expiration_date" @input="() => $refs.qDateProxy.hide()" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </k-field>

                    <!-- UPLOAD ID FRONT -->
                    <k-field label="Upload ID (Front)" :error_message="$v.form.front_id_url.$error ? 'Please upload file' : ''">
                        <k-uploader v-model="form.front_id_url"
                                    :storage_ref="$options.STORE_MEMBER_IDS(`front_${(new Date).getTime()}`)">
                        </k-uploader>
                    </k-field>

                    <!-- UPLOAD ID BACK -->
                    <k-field label="Upload ID (Back)" :error_message="$v.form.back_id_url.$error ? 'Please upload file' : ''">
                        <k-uploader v-model="form.back_id_url"
                                    :storage_ref="$options.STORE_MEMBER_IDS(`back_${(new Date).getTime()}`)">
                        </k-uploader>
                    </k-field>

                    <!-- UPLOAD ID SELFIE -->
                    <k-field label="Upload ID (Selfie)" note="Take a picture holding the ID" :error_message="$v.form.selfie_url.$error ? 'Please upload file' : ''">
                        <k-uploader v-model="form.selfie_url"
                                    :storage_ref="$options.STORE_MEMBER_IDS(`selfie_${(new Date).getTime()}`)">
                        </k-uploader>
                    </k-field>

                    <q-btn unelevated label="Submit KYC" type="submit" color="primary" class="full-width" @click="submitForm()"></q-btn>
                    <q-btn @click="$router.go(-1)" outline label="Back" type="submit" color="primary" class="full-width q-mt-sm"></q-btn>
                </k-card>
            </q-form>
        </div>
            <!-- <q-btn
      :loading="loading1"
      :percentage="percentage1"
      color="primary"
      @click="startComputing(1)"
      style="width: 150px"
    >
    BUTTON
    </q-btn> -->
        <k-alert-dialog ref="kAlertDialogRef" title="SUCCESS!" @confirm="confirmDialog">
            <span slot="message">
                You've already submitted your KYC verification.
                Please wait for a notification regarding your verification status.
                Thank you.
            </span>
        </k-alert-dialog>
    </div>
</template>

<script>
import './PMVerification.scss';

import KHeader      from '../../../components/Member/KHeader';
import KField       from '../../../components/Member/KField';
import KUploader    from '../../../components/Member/KUploader';
import KCard        from '../../../components/Member/KCard';
import KAlertDialog from '../../../components/Shared/KAlertDialog'

import {required}          from "vuelidate/src/validators";
import {fbCall} 	       from "../../../utilities/Callables";
import {FN_SUBMIT_KYC}     from "../../../references/refs_functions";
import {FN_GET_KYC_DATA}   from "../../../references/refs_functions";
import {STORE_MEMBER_IDS}  from "../../../references/refs_cloud_storage";


import refs_countries from "../../../references/refs_countries";
import refs_id_types  from "../../../references/refs_id_types";

import DB_USER from "../../../models/DB_USER";

export default
{  
    components: { KHeader, KField, KUploader, KCard, KAlertDialog},
    data:() =>(
    {
        other_id_type   : '',
        form:
        {
            first_name         : '',
            last_name          : '',
            middle_name        : '',
            birthdate          : null,
            state_city         : '',
            country            : '',
            id_type            : '',
            id_number          : '',
            id_expiration_date : null,
            front_id_url       : '',
            back_id_url        : '',
            selfie_url         : '',

        }
    }),
    methods:
    {
        getStorageRef(type)
        {
            console.log(`${type}_${(new Date).getTime()}`);
            return STORE_MEMBER_IDS(`${type}_${(new Date).getTime()}`)
        },
        submitForm()
        {
            this.$v.form.$touch();
            if(this.$v.form.$error || this.$v.form.$pending) {return 0}

            this.$_showConfirmDialog(
                'Are you sure you want to submit your details?',
                async () => {
                    this.$_showPageLoading();

                    // Assign new id type specified by user
                    if(this.other_id_type != '')
                    {
                        this.form.id_type   = this.other_id_type; 
                    }

                    // Set date time submitted based on the timezone of the user
                    this.form.date_time_submitted = new Date();

                    await fbCall(FN_SUBMIT_KYC, {kyc_form_data: JSON.stringify(this.form)})
                    .then(data =>
                    {
                        console.log(data);
                        this.$refs.kAlertDialogRef.showAlert();
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error, mode: 'negative'})
                    });

                    this.$_hidePageLoading();
                }
            );
        },
        async getUserKycData(){
            try {
                let kyc_data = await fbCall(FN_GET_KYC_DATA, this.$_current_user_data.id)
                if(kyc_data)
                {
                    let moment                      = require('moment');
                    this.form.first_name            = kyc_data.data.first_name;
                    this.form.last_name             = kyc_data.data.last_name;
                    this.form.middle_name           = kyc_data.data.middle_name;
                    this.form.birthdate             = moment.unix(kyc_data.data.birthdate._seconds).format('YYYY/MM/DD');
                    this.form.state_city            = kyc_data.data.state_city;
                    this.form.country               = kyc_data.data.country;
                    this.form.id_number             = kyc_data.data.id_number;
                    this.form.id_expiration_date    = moment.unix(kyc_data.data.id_expiration_date._seconds).format('YYYY/MM/DD');
                    this.form.id_type               = kyc_data.data.id_type;
                    this.form.front_id_url          = kyc_data.data.front_id_url;
                    this.form.back_id_url           = kyc_data.data.back_id_url;
                    this.form.selfie_url            = kyc_data.data.selfie_url;

                }
            } catch (error) {
                console.log(error)
            }
        },
        confirmDialog()
        {
            
        }
    },

    computed: {
        isIdInputHidden () {
            if(this.form.id_type == "Others (Please Specify)"){
                return true;
            }else{

                return false;
            }
        },
    },

    mounted() {
        this.getUserKycData();
    },
    validations:
    {
        other_id_type   : {required},
        form:
        {
            first_name         : {required},
            last_name          : {required},
            birthdate          : {required},
            state_city         : {required},
            country            : {required},
            id_type            : {required},
            id_number          : {required},
            id_expiration_date : {required},
            front_id_url       : {required},
            back_id_url        : {required},
            selfie_url         : {required}
        }
    },
    STORE_MEMBER_IDS,
    country_options : refs_countries,
    id_types_options: refs_id_types
}
</script>
