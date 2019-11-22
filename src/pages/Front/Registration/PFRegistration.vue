<template>
    <q-page-container>
        <q-page class="q-pa-lg registration">

            <!-- LOGO -->
            <div class="text-center">
                <div class="login__logo">
                    <q-img spinner-size="0" src="../statics/logo3.png"></q-img>
                </div>
            </div>

            <div class="registration__title">
                <div class="sub">Create An Account</div>
            </div>

            <q-form class="q-pa-lg registration__form" v-if="!isRegistered">
                <q-banner v-if="!!registrationError" inline-actions class="q-mb-md text-white bg-red">
                    {{registrationError}}
                </q-banner>

                <div class="q-pa-none label">
                    Full Name
                </div>
                <q-input dense
                         placeholder="John Doe"
                         class="input"
                         outlined
                         stack-label
                         v-model="registration_form_data.full_name"
                         :error="$v.registration_form_data.full_name.$error"
                         :error-message="'full name is required'"
                         @blur="$v.registration_form_data.full_name.$touch()"/>

                <div class="q-pa-none label">
                    Contact Number
                </div>
                <q-input dense
                         placeholder=""
                         class="input"
                         outlined
                         stack-label
                         v-model="registration_form_data.contact_number"
                         :error="$v.registration_form_data.contact_number.$error"
                         :error-message="'Contact Number is required'"
                         @blur="$v.registration_form_data.contact_number.$touch()"/>

                <div class="label">
                    E-mail
                </div>
                <q-input debounce="500"
                         dense
                         placeholder="yournam@gmail.com"
                         class="input"
                         outlined
                         type="email"
                         v-model.lazy="registration_form_data.email"
                         :error="$v.registration_form_data.email.$error"
                         :error-message="emailError"
                         @blur="$v.registration_form_data.email.$touch()"/>

                <div class="label">
                    Password
                </div>
                <q-input dense
                         class="input"
                         placeholder="•••••••••••••••"
                         outlined
                         autocomplete="password"
                         :type="isPassword ? 'password' : 'text'"
                         v-model="registration_form_data.password"
                         :error="$v.registration_form_data.password.$error"
                         :error-message="passwordError"
                         @blur="$v.registration_form_data.password.$touch()">
                    <template v-slot:append>
                        <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassword = !isPassword"/>
                    </template>
                </q-input>

                <div class="label">
                    Country
                </div>
                <q-select outlined
                          class="input"
                          dense
                          v-model="registration_form_data.country"
                          :options="$options.country_options"
                          option-value="code"
                          option-label="name"
                          :error="$v.registration_form_data.country.$error"
                          :error-message="'Please select a country.'"
                          @blur="$v.registration_form_data.country.$touch()">
                </q-select>

                <div class="label">
                    Referral Code
                </div>
                <q-input debounce="500"
                         dense
                         placeholder="KRPT01"
                         class="input"
                         outlined
                         stack-label
                         v-model="registration_form_data.referral_code"
                         :error="$v.registration_form_data.referral_code.$error"
                         :error-message="referralCodeError"
                         :hint="referralCodeError"
                         @blur="$v.registration_form_data.referral_code.$touch()"/>


                <q-checkbox class="q-py-sm"
                            right-label
                            v-model="registration_form_data.is_agree">
                    I agree to the Kryptoknight's <br />
                    <a href="">terms of service</a> and <a href="">privacy policy.</a>
                </q-checkbox>
                <div v-if="!registration_form_data.is_agree && $v.registration_form_data.$dirty"
                     class="text-center"
                     :style="{color: 'red'}">
                    You must agree with our terms of service and privacy policy in order to proceed.
                </div>


                <div class="q-pt-md">
                    <q-btn unelevated
                           label="Create Account"
                           type="submit"
                           color="primary"
                           class="full-width"
                           @click="register()"></q-btn>

                    <q-btn unelevated
                           label="Back"
                           type="reset"
                           color="grey"
                           class="q-mt-sm full-width"
                           @click="$router.push('/')"/>
                </div>
            </q-form>

            <p-f-registration-confirmation v-if="isRegistered" :email="registration_form_data.email"/>
        </q-page>
    </q-page-container>
</template>

<script>
    import PFRegistrationConfirmation from "./PFRegistrationConfirmation"
    import styles           from './PFRegistration.scss';

    import refs_countries from "../../../references/refs_countries";
    import DB_USER        from "../../../models/DB_USER"

    import {fbCall} 	  from "../../../utilities/Callables";
    import {FN_REGISTER}  from "../../../references/refs_functions";

    import {
        required,
        email,
        minLength
    } from "vuelidate/lib/validators";

    import { QSpinnerOval } from 'quasar'

    export default {
        name: "PFRegistration",
        components: {PFRegistrationConfirmation},
        data: () =>
        ({
            registration_form_data:
            {
                full_name      : '',
                contact_number : '',
                email          : '',
                password       : '',
                country        : '',
                referral_code  : '',
                is_agree       : ''
            },
            isPassword         : true,
            isRegistered       : false,
            referral_name      : null,
            registration_error :
            {
                code    : '',
                message : ''
            }
        }),
        computed:
        {
            emailError()
            {
                return !this.$v.registration_form_data.email.required
                    ? 'Email is required'
                        : !this.$v.registration_form_data.email.email
                    ? 'Invalid E-mail Address'
                        : !this.$v.registration_form_data.email.isUnique
                    ? 'E-mail Address already exists' : ''
            },
            passwordError()
            {
                return !this.$v.registration_form_data.password.required
                    ? 'Password is required'
                        : !this.$v.registration_form_data.email.minLength
                    ? 'Must be atleast 6 characters long.' : ''
            },
            referralCodeError()
            {
                return !this.$v.registration_form_data.referral_code.$dirty
                    ? null
                        : !this.$v.registration_form_data.referral_code.required
                    ? 'Referral Code is required.'
                        : !this.$v.registration_form_data.referral_code.doesExists
                    ? 'Referral Code does not belong to anyone.'
                    :   `Referral from ${this.referral_name}`
            },
            registrationError()
            {
                return !this.registration_error.code
                    ? false
                    : this.registration_error.message
            }
        },
        methods:
        {
            async register()
            {
                this.$v.registration_form_data.$touch();
                if(this.$v.registration_form_data.$error || this.$v.registration_form_data.$pending) {return 0}

                this.$_showPageLoading({message: 'Creating an account.'});
                await fbCall(FN_REGISTER, {registration_form_data: this.registration_form_data})
                .then(data =>
                {
                    console.log(data);
                    this.$_hidePageLoading();
                    this.isRegistered = true;
                })
                .catch(error =>
                {
                    this.registration_error.code    = error.code;
                    this.registration_error.message = error.message;
                    this.$_hidePageLoading();
                })
            }
        },
        mounted()
        {
            if(this.$route.query.refcode)
            {
                this.registration_form_data.referral_code = this.$route.query.refcode
            }
        },
        validations:
        {
            registration_form_data:
            {
                full_name      : {required},
                contact_number : {required},
                password       : {required, minLength: minLength(6)},
                country        : {required},
                email          :
                {
                    required,
                    email,
                    async isUnique(email)
                    {
                        console.log(email);
                        // Returns true if no user found, meaning the email is available.
                        return await DB_USER.getUserByEmailAddress(email)
                            .then(user => !user)
                    }
                },
                referral_code :
                {
                    required,
                    async doesExists(referral_code)
                    {
                        // Returns true if referral code belongs to an existing user.
                        return await DB_USER.getUserByReferralCode(referral_code).then(user =>
                        {
                            this.referral_name = user && !user.error ? user.full_name : null;
                            return !!user
                        })
                    }
                }
            }
        },
        country_options: refs_countries
    }
</script>

<style scoped>

</style>
