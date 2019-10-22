<template>
    <div class="verification">
        <k-header detail="Please verify your account">KYC Verification</k-header>
        <q-form>
            <k-card class="q-mt-md q-pa-md q-px-lg">
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
                    <q-input v-model="form.last_name" dense placeholder="Doe" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- MIDDLE NAME -->
                <k-field label="Middle Name">
                    <q-input v-model="form.middle_name" dense placeholder="Smith" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- DATE OF BIRTH -->
                <k-field label="Date of Birth">
                    <q-input dense outlined v-model="form.birthdate" mask="date">
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
                    <q-input v-model="form.state_city" dense placeholder="Manila" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- COUNTRY -->
                <k-field label="Where is your document issued?">
                    <q-select outlined
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
                    <q-input v-model="form.id_number" dense placeholder="" class="input" outlined stack-label></q-input>
                </k-field>

                <!-- ID TYPE -->
                <k-field label="ID Type">
                    <q-select outlined
                              class="input"
                              dense
                              placeholder="Select your ID Types."
                              v-model="form.country"
                              :options="$options.id_types_options"
                              option-value="code"
                              option-label="name">
                    </q-select>
                </k-field>

                <!-- ID EXPIRATION DATE -->
                <k-field label="ID Expiry Date">
                    <q-input dense outlined v-model="form.id_expiration_date" mask="date">
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
                <k-field label="Upload ID (Front)">
                    <k-uploader v-model="form.front_id" :storage_ref="getStorageRef('id_front')"></k-uploader>
                </k-field>

                <!-- UPLOAD ID BACK -->
                <k-field label="Upload ID (Back)">
                    <k-uploader v-model="form.back_id" :storage_ref="getStorageRef('id_back')"></k-uploader>
                </k-field>

                <!-- UPLOAD ID SELFIE -->
                <k-field label="Upload ID (Selfie)" note="Take a picture holding the ID">
                    <k-uploader v-model="form.selfie" :storage_ref="getStorageRef('selfie')"></k-uploader>
                </k-field>

                <q-btn unelevated label="Submit KYC" type="submit" color="primary" class="full-width" @click="submitForm()"></q-btn>
                <q-btn @click="$router.go(-1)" outline label="Back" type="submit" color="primary" class="full-width q-mt-sm"></q-btn>
            </k-card>
        </q-form>
    </div>
</template>

<script>
import KHeader     from '../../../components/Member/KHeader';
import KField      from '../../../components/Member/KField';
import KUploader   from '../../../components/Member/KUploader';
import KCard       from '../../../components/Member/KCard';

import refs_countries from "../../../references/refs_countries";
import refs_id_types  from "../../../references/refs_id_types";

import {required}          from "vuelidate/src/validators";
import {STORE_MEMBER_IDS}  from "../../../references/refs_cloud_storage";
import DB_KYC_VERIFICATION from '../../../models/DB_KYC_VERIFICATION'

import styles     from './PMVerification.scss';
import { Quasar } from 'quasar';
import { date }   from 'quasar'

export default
{  
    components: { KHeader, KField, KUploader, KCard },
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
        },
    }),
    methods:
    {
        getStorageRef(type)
        {
            return STORE_MEMBER_IDS(`${type}_${(new Date).getTime()}`)
        },
        submitForm()
        {
            // TODO jln for testing puroses only.
            this.$_showPageLoading();
            DB_KYC_VERIFICATION.add(this.form)
                .then(() =>
                {
                    this.$_hidePageLoading();
                })
        }
    },
    watch:
    {
        'form.front_id'()
        {
            console.log(this.form);
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
    country_options : refs_countries,
    id_types_options: refs_id_types
}
</script>
