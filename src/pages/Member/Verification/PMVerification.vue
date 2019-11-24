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

            <q-form v-if="$_current_user_data.kyc_status === null">
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
                                  option-label="name">
                        </q-select>
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
import KHeader      from '../../../components/Member/KHeader';
import KField       from '../../../components/Member/KField';
import KUploader    from '../../../components/Member/KUploader';
import KCard        from '../../../components/Member/KCard';
import KAlertDialog from '../../../components/Shared/KAlertDialog'

import {required}          from "vuelidate/src/validators";
import {fbCall} 	       from "../../../utilities/Callables";
import {FN_SUBMIT_KYC}     from "../../../references/refs_functions";
import {STORE_MEMBER_IDS}  from "../../../references/refs_cloud_storage";


import refs_countries from "../../../references/refs_countries";
import refs_id_types  from "../../../references/refs_id_types";

import styles     from './PMVerification.scss';
import { Quasar } from 'quasar';
import { date }   from 'quasar'

export default
{  
    components: { KHeader, KField, KUploader, KCard, KAlertDialog},
    data:() =>(
    {
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
            selfie_url         : ''
        }
    }),
    methods:
    {
        getStorageRef(type)
        {
            console.log(`${type}_${(new Date).getTime()}`);
            return STORE_MEMBER_IDS(`${type}_${(new Date).getTime()}`)
        },
        async submitForm()
        {
            this.$v.form.$touch();
            if(this.$v.form.$error || this.$v.form.$pending) {return 0}

            this.$_showPageLoading();
            await fbCall(FN_SUBMIT_KYC, {kyc_form_data: JSON.stringify(this.form)})
            .then(data =>
            {
                this.$refs.kAlertDialogRef.showAlert();
            })
            .catch(error =>
            {
                this.$_notify({message: error, mode: 'negative'})
            });

            this.$_hidePageLoading();
        },
        confirmDialog()
        {
            
        }
    },
    validations:
    {
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
