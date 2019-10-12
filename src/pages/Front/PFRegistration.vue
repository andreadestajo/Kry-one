<template>
    <q-page-container>
        <q-page class="q-pa-lg">
            <div class="text-center">
                <div class="text-h6">
                    KRYPTOONE
                    <div class="text-subtitle2">
                        Think Ahead!
                    </div>
                </div>
            </div>

            <q-form class="q-pa-lg">
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
                         @blur="$v.registration_form_data.referral_code.$touch()"/>


                    <q-checkbox class="q-py-sm"
                                right-label
                                v-model="registration_form_data.is_agree">
                        I agree to the Kryptoknight's <br />
                        <a href="">terms of service</a> and <a href="">privacy policy.</a>
                    </q-checkbox>
                    <div v-if="!registration_form_data.is_agree && this.$v.registration_form_data.$error"
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
        </q-page>
    </q-page-container>
</template>

<script>
    import refs_countries from "../../references/refs_countries";

    import {fbCall} 	  from "../../utilities/Callables";
    import {FN_REGISTER}  from "../../references/refs_functions";

    import {
        required,
        email,
        minLength
    } from "vuelidate/lib/validators";

    export default {
        name: "PFRegistration",
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
            isPassword: true
        }),
        computed:
        {
            emailError()
            {
                return !this.$v.registration_form_data.email.required
                    ? 'Email is required'
                        : !this.$v.registration_form_data.email.email
                    ? 'Invalid E-mail Address' : ''
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
                return 'Referral Code is required.'
            }
        },
        methods:
        {
            async register()
            {
                this.$v.registration_form_data.$touch();
                if(this.$v.registration_form_data.$error) {return 0}

                await fbCall(FN_REGISTER, {registration_form_data: this.registration_form_data})
                .then(data =>
                {
                    console.log(data)
                })
            }
        },
        validations:
        {
            registration_form_data:
            {
                fullname      : {required},
                email         : {required, email},
                password      : {required, minLength: minLength(6)},
                country       : {required},
                referral_code : {required}
            }
        },
        country_options: refs_countries
    }
</script>

<style scoped>

</style>
