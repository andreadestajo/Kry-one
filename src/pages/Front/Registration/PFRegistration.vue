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
                         :readonly="has_valid_eid"
                         v-model="registration_form_data.full_name"
                         :error="$v.registration_form_data.full_name.$error"
                         :error-message="'full name is required'"
                         @blur="$v.registration_form_data.full_name.$touch()"/>

                <div class="q-pa-none label">
                    Contact Number
                </div>
                <q-input dense
                         placeholder="+639982736473"
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
                         placeholder="yourname@gmail.com"
                         class="input"
                         outlined
                         type="email"
                         :readonly="has_valid_eid"
                         v-model.lazy="registration_form_data.email"
                         :error="$v.registration_form_data.email.$error"
                         :error-message="emailError"
                         :loading="$v.registration_form_data.email.$pending"
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
                    Currency
                </div>
                <q-select outlined
                          class="input"
                          dense
                          v-model="registration_form_data.currency"
                          :options="$options.currency_options"
                          option-value="value"
                          option-label="label"
                          :error="$v.registration_form_data.currency.$error"
                          :error-message="'Please select a currency.'"
                          @blur="$v.registration_form_data.currency.$touch()">
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
                         :readonly="has_valid_eid"
                         v-model="registration_form_data.referral_code"
                         :error="$v.registration_form_data.referral_code.$error"
                         :error-message="$v.registration_form_data.referral_code.$pending ? '' : referralCodeError"
                         :hint="$v.registration_form_data.referral_code.$pending ? '' : referralCodeError"
                         :loading="$v.registration_form_data.referral_code.$pending"
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

            <p-f-registration-confirmation v-if="isRegistered"
                                           :email="registration_form_data.email"
                                           :full_name="registration_form_data.full_name"/>
        </q-page>
    </q-page-container>
</template>

<script>
    import './PFRegistration.scss';
    import PFRegistrationConfirmation from "./PFRegistrationConfirmation"

    import DB_USER          from "../../../models/DB_USER"
    import DB_ENLIST_KNIGHT from "../../../models/DB_ENLIST_KNIGHT"

    import {fbCall} 	  from "../../../utilities/Callables";
    import {FN_REGISTER}  from "../../../references/refs_functions";

    import refs_countries     from "../../../references/refs_countries";
    import {currencies_list}  from "../../../references/refs_currencies";

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
                currency       : '',
                referral_code  : '',
                is_agree       : ''
            },
            isPassword         : true,
            isRegistered       : false,
            referral_name      : null,
            is_eligible        : false,
            registration_error :
            {
                code    : '',
                message : ''
            },
            has_valid_eid: false,
            knight_data: null,
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
                        : !this.$v.registration_form_data.referral_code.isEligible
                    ? 'Not Eligible to be a sponsor.'
                        :   `Referral from ${this.referral_name}`
            },
            registrationError()
            {
                return !this.registration_error.code
                    ? false
                        : this.registration_error.message === "TOO_SHORT"
                    ? "Invalid Phone Number"
                        : this.registration_error.code === "invalid-argument"
                    ? "Invalid Phone Number"
                        : this.registration_error.message
            }
        },
        methods:
        {
            async register()
            {
                this.$v.registration_form_data.$touch();
                if(this.$v.registration_form_data.$error || this.$v.registration_form_data.$pending) {return 0}

                const registration_form_data    = Object.assign({}, this.registration_form_data);
                registration_form_data.currency    = this.registration_form_data.currency.value;
                registration_form_data.knight_data = this.knight_data;

                // Do something if enlisted. Just in case u need, you can access knight_data,
                if(this.has_valid_eid)
                {
                    registration_form_data.eid = this.$route.query.eid;
                    registration_form_data.id  = this.$route.query.id;
                }

                this.$_showPageLoading({message: 'Creating an account.'});
                await fbCall(FN_REGISTER, {registration_form_data})
                .then(data =>
                {
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
        async mounted()
        {
            if(this.$route.query.refcode)
            {
                this.registration_form_data.referral_code = this.$route.query.refcode
            }

            if(this.$route.query.hasOwnProperty('id') && this.$route.query.hasOwnProperty('eid'))
            {
                this.$_showPageLoading();

                // Validate eid and id
                const knight_data = await DB_ENLIST_KNIGHT.doc(this.$route.query.id).get()
                    .then(doc => doc.exists ? doc.data() : null);

                // Halt process if not valid
                if(!knight_data)
                {
                    console.log('invalid id or eid');
                    this.$_hidePageLoading();
                    return 0;
                }
                else
                {
                    this.knight_data   = Object.assign({}, knight_data);
                    this.has_valid_eid = true;
                    this.registration_form_data.referral_code = knight_data.sponsor;
                    this.registration_form_data.full_name     = knight_data.full_name;
                    this.registration_form_data.email         = knight_data.email;
                }

                this.$_hidePageLoading();
            }
        },
        validations()
        {
            return {
                registration_form_data:
                {
                    full_name      : {required},
                    contact_number : {required},
                    password       : {required, minLength: minLength(6)},
                    country        : {required},
                    currency       : {required},
                    email          :
                    {
                        required,
                        email,
                        isUnique(email)
                        {
                            if(email === '') {return true}

                            // Returns true if no user found, meaning the email is available.
                            return new Promise((resolve) => {
                                setTimeout(() =>
                                {
                                    DB_USER.getUserByEmailAddress(email)
                                        .then(user => {
                                            resolve(!user)
                                        });
                                }, 500)
                            });
                        }
                    },
                    referral_code :
                    {
                        required,
                        doesExists(referral_code)
                        {
                            if(referral_code === '') {return true}

                            // Returns true if referral code belongs to an existing user.
                            return new Promise((resolve) => {
                                setTimeout(() =>
                                {
                                    DB_USER.getUserByReferralCode(referral_code).then(user =>
                                    {
                                        // check if eligible
                                        this.is_eligible  = user && !user.error ? user.nobility_info.rank_order > 1 : false;
                                        this.referral_name = this.is_eligible ? user.full_name : null;
                                        resolve(!!user)
                                    });
                                }, 500)
                            })
                        },
                        isEligible(referral_code) {
                            if(referral_code === '') {return true}
                            if(this.$v.registration_form_data.referral_code.doesExists.$pending) {return true}

                            return this.is_eligible
                        }
                    }
                }
            }
        },
        country_options  : refs_countries,
        currency_options : (() =>
        {
            return currencies_list.map(c => ({
                value: c.key,
                label: `${c.label} (${c.key})`
            }));
        })()
    }
</script>

<style scoped>

</style>
