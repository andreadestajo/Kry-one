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
                         v-model="registration_form_data.fullname"/>

                <div class="q-pt-md">
                  E-mail
                </div>
                <q-input dense
                         outlined
                         type="email"
                         v-model="registration_form_data.email"/>

                <div class="q-pt-md">
                  Password
                </div>
                <q-input dense
                         outlined
                         v-model="registration_form_data.password"
                         :type="isPassword ? 'password' : 'text'"
                         autocomplete="password">
                    <template v-slot:append>
                        <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassword = !isPassword"/>
                    </template>
                </q-input>

                <div class="q-pt-md">
                  Country
                </div>
                <q-select outlined
                          dense
                          v-model="registration_form_data.country"
                          :options="$options.country_options"
                          option-value="code"
                          option-label="name">
                </q-select>

                <div class="q-pt-md">
                  Referral Code
                </div>
                <q-input dense
                         outlined
                         stack-label
                         v-model="registration_form_data.referral_code"/>

                <q-checkbox class="q-py-lg"
                            right-label
                            v-model="registration_form_data.is_agree">
                    I agree to the Kryptoknight's <br />
                    <a href="">terms of service</a> and <a href="">privacy policy.</a>
                </q-checkbox>

                <div>
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
    import {required}     from "vuelidate/lib/validators";
    import {FN_REGISTER}  from "../../references/refs_functions";

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
        methods:
        {
            async register()
            {
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
                email         : {required},
                password      : {required},
                country       : {required},
                referral_code : {required}
            }
        },
        country_options: refs_countries
    }
</script>

<style scoped>

</style>
