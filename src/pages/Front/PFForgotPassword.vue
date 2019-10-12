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
                <div class="q-p-lg">
                    Forgot Password ?
                </div>

                <div class="q-pt-md">
                    E-mail
                </div>
                <q-input dense
                         outlined
                         type="email"
                         class="q-pb-lg"
                         placeholder= "Enter your email"
                         v-model="email"/>

                <div class="q-pt-lg">
                    <q-btn unelevated
                           label="Submit"
                           type="submit"
                           color="primary"
                           class="full-width"
                           @click="forgotPassword()"/>

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
    import {required} from "vuelidate/lib/validators";
    import {fbCall}   from "../../utilities/Callables";

    import {FN_RESET_PASSWORD} from "../../references/refs_functions";

    export default {
        name: "PFForgotPassword",
        data: () =>
        ({
            email: ''
        }),
        methods:
        {
            async forgotPassword()
            {
                await fbCall(FN_RESET_PASSWORD, {email: this.email})
                .then(data =>
                {
                    console.log(data)
                })
            }
        },
        validations:
        {
            login_form_data:
            {
                email : {required},
            }

        }
    }
</script>

<style scoped>

</style>
