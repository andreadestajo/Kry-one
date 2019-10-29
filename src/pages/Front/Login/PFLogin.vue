<template>
    <q-page-container>
        <q-page class="q-pa-lg login">

            <!-- LOGO -->
            <div class="text-center">
                <div class="login__logo">
                    <q-img spinner-size="0" src="../statics/logo3.png"></q-img>
                </div>
            </div>

            <div class="login__title">
                <div class="sub">Sign in to continue</div>
            </div>

            <q-form class="q-pa-lg login__form">
                <q-banner v-if="!!loginError" inline-actions class="q-mb-md text-white bg-red">
                    {{loginError}}
                </q-banner>

                <div class="label">
                    E-mail Address
                </div>
                <q-input dense
                         class="input"
                         placeholder="yourname@gmail.com"
                         outlined
                         type="email"
                         v-model="login_form_data.email"
                         :error="$v.login_form_data.email.$error"
                         :error-message="emailError"
                         @blur="$v.login_form_data.email.$touch()"/>

                <div class="label">
                    Password
                </div>
                <q-input dense
                         class="input"
                         outlined
                         autocomplete="password"
                         placeholder="•••••••••••••••"
                         v-model="login_form_data.password"
                         :type="is_password ? 'password' : 'text'"
                         :error="$v.login_form_data.password.$error"
                         :error-message="passwordError"
                         @blur="$v.login_form_data.password.$touch()">
                    <template v-slot:append>
                        <q-icon :name="is_password ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="is_password = !is_password"/>
                    </template>
                </q-input>

                <div class="q-pt-lg">
                    <q-btn unelevated
                           label="Sign In"
                           type="submit"
                           color="primary"
                           class="full-width"
                           @click="signInWithEmailAndPassword()"/>

                    <q-btn outline
                           label="Back"
                           type="reset"
                            color="primary"
                            class="q-mt-sm full-width"
                           @click="$router.push('/')"/>
                </div>
            </q-form>
        </q-page>
    </q-page-container>
</template>

<script>
    import styles   from './PFLogin.scss';
    import DB_USER  from "../../../models/DB_USER"

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
            is_password      : true,
            unverified_email : '',
            login_error_code : ''
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
            },
            loginError()
            {
                return !this.login_error_code
                    ? false
                        : this.login_error_code === 'auth/user-not-found'
                    ? 'E-mail and Password do not match.'
                        : this.login_error_code === 'auth/wrong-password'
                    ? 'E-mail and Password do not match.'
                        : 'Something went wrong. Please try again.'
            }
        },
        methods:
        {
            async signInWithEmailAndPassword()
            {
                this.$v.login_form_data.$touch();
                if(this.$v.login_form_data.$error) {return 0}

                // Start authenticating the user
                this.$_showPageLoading({message: 'Logging in...'});
                DB_USER.signIn(this.login_form_data.email, this.login_form_data.password)
                .then(data =>
                {
                    if(!data) {return 0}

                    if(data)
                    {
                        this.$router.push('member');
                    }
                    this.$_hidePageLoading();
                })
                .catch(error => {
                    // Show a snackbar here
                    this.login_error_code = error.code;
                    this.$_hidePageLoading();
                })
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
