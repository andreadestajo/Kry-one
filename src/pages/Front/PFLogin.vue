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
                         v-model="login_form_data.email"/>

                <div class="q-pt-md">
                    Password
                </div>
                <q-input dense
                         outlined
                         v-model="login_form_data.password"
                         :type="isPassword ? 'password' : 'text'"
                         autocomplete="password">
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
                           class="q-mt-sm full-width" />
                </div>
            </q-form>
        </q-page>
    </q-page-container>
</template>

<script>
    import refs_countries from "../../references/refs_countries";

    import DB_USER from "../../models/DB_USER"
    import {required}  from "vuelidate/lib/validators";

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
        methods:
        {
            async signInWithEmailAndPassword()
            {
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
                email         : {required},
                password      : {required}
            }

        },
        country_options: refs_countries
    }
</script>

<style scoped>

</style>
