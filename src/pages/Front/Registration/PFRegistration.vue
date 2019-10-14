<template>
    <div>
        <q-page-container>
            <q-page class="q-pa-lg">
                <div class="text-center q-pa-lg">
                    <div class="text-h6">
                        KRYPTOONE
                        <div class="text-subtitle2">
                            Think Ahead!
                        </div>
                    </div>
                </div>

                <q-form class="q-pa-lg"
                        v-if="!isRegistered">
                    <div class="q-pa-none">
                        Full Name
                    </div>
                    <q-input dense
                             outlined
                             stack-label
                             v-model="registration_form_data.fullname"
                             :error="$v.registration_form_data.fullname.$error"
                             :error-message="'Fullname is required'"
                             @blur="$v.registration_form_data.fullname.$touch()"/>

                    <div class="q-pt-sm">
                        E-mail
                    </div>
                    <q-input dense
                             outlined
                             type="email"
                             v-model="registration_form_data.email"
                             :error="$v.registration_form_data.email.$error"
                             :error-message="emailError"
                             @blur="$v.registration_form_data.email.$touch()"/>

                    <div class="q-pt-sm">
                        Password
                    </div>
                    <q-input dense
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

                    <div class="q-pt-sm">
                        Country
                    </div>
                    <q-select outlined
                              dense
                              v-model="registration_form_data.country"
                              :options="$options.country_options"
                              option-value="code"
                              option-label="name"
                              :error="$v.registration_form_data.country.$error"
                              :error-message="'Please select a country.'"
                              @blur="$v.registration_form_data.country.$touch()">
                    </q-select>

                    <div class="q-pt-sm">
                        Referral Code
                    </div>
                    <q-input dense
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

                <p-f-registration-confirmation v-if="isRegistered" />
            </q-page>
        </q-page-container>
    </div>
</template>

<script>
    import PFRegistrationConfirmation from "./PFRegistrationConfirmation"

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
                fullname      : '',
                email         : '',
                password      : '',
                country       : '',
                referral_code : '',
                is_agree      : ''
            },
            isPassword    : true,
            isRegistered  : false,
            referral_name : null
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
                    console.log('success')
                    this.$_hidePageLoading();
                    this.isRegistered = true;
                })
                .catch(error =>
                {
                    console.log('error');
                    console.log(error.message);
                    this.$_hidePageLoading();
                })
            }
        },
        validations:
        {
            registration_form_data:
            {
                fullname      : {required},
                password      : {required, minLength: minLength(6)},
                country       : {required},
                email         :
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
                referral_code :
                {
                    required,
                    async doesExists(referral_code)
                    {
                        // Returns true if referral code belongs to an existing user.
                        return await DB_USER.getUserByReferralCode(referral_code).then(user =>
                        {
                            this.referral_name = user && !user.error ? user.fullname : null;
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
