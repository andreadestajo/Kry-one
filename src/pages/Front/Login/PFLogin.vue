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
                <div class="q-pt-md">
                    E-mail Address
                </div>
                <q-input dense
                         outlined
                         type="email"
                         v-model="login_form_data.email"
                         :error="$v.login_form_data.email.$error"
                         :error-message="emailError"
                         @blur="$v.login_form_data.email.$touch()"/>

                <div class="q-pt-md">
                    Password
                </div>
                <q-input dense
                         outlined
                         autocomplete="password"
                         v-model="login_form_data.password"
                         :type="isPassword ? 'password' : 'text'"
                         :error="$v.login_form_data.password.$error"
                         :error-message="passwordError"
                         @blur="$v.login_form_data.password.$touch()">
                    <template v-slot:append>
                        <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassword = !isPassword"/>
                    </template>
                </q-input>

                <div class="q-pt-lg">
                    <q-btn unelevated
                           label="Sign In"
                           type="submit"
                           color="primary"
                           class="full-width"
                           @click="signInWithEmailAndPassword()"/>

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
    import DB_USER           from "../../../models/DB_USER"

    import {
        required,
        email,
        minLength
    } from "vuelidate/lib/validators";

    export default {
        name: "PFRegistration",
        data: () =>
        ({
            login_form_data:
            {
                email         : '',
                password      : '',
            },
            isPassword: true
        }),
        computed: {
            emailError()
            {
                return !this.$v.login_form_data.email.required
                    ? 'Email is required'
                        :!this.$v.login_form_data.email.email
                    ? 'Invalid E-mail Address' : ''
            },
            passwordError()
            {
                return !this.$v.login_form_data.password.required
                    ? 'Password is required'
                       : !this.$v.login_form_data.email.minLength
                    ? 'Must be atleast 6 characters long.' : ''
            }
        },
        methods:
        {
            async signInWithEmailAndPassword()
            {
                this.$v.login_form_data.$touch();
                if(this.$v.login_form_data.$error) {return 0}

                if(!DB_USER.getCurrentUser())
                {
                    DB_USER.signIn(this.login_form_data.email, this.login_form_data.password)
                    .then(() =>
                    {
                        // Do something here for successfully logged in user
                        console.log(DB_USER.getCurrentUser())
                    })
                    .catch(error => {
                        // Show a snackbar here
                        console.log(error)
                    })
                } else {
                    console.log(DB_USER.getCurrentUser())
                }
            }
        },
        validations: 
        {
            login_form_data:
            {
                email    : {required, email},
                password : {required, minLength: minLength(6)}
            }
        }
    }
</script>

<style scoped>

</style>
