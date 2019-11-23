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
                <div class="q-py-md">
                    Forgot Password ?
                </div>

                <q-banner v-if="is_email_sent" inline-actions class="q-pa-md text-white bg-green">
                    An email for resetting your password has been successfully sent.
                </q-banner>

                <div class="q-pt-md">
                    E-mail
                </div>
                <q-input dense
                         outlined
                         type="email"
                         class="q-pb-lg"
                         placeholder= "Enter your email"
                         v-model="email"
                         :error="$v.email.$error"
                         :error-message="emailError"
                         @blur="$v.email.$touch()"/>

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
                           class="q-mt-sm full-width"
                           @click="$router.go(-1)"/>
                </div>
            </q-form>
        </q-page>
    </q-page-container>
</template>

<script>
    import {fbCall}            from "../../utilities/Callables";
    import {FN_RESET_PASSWORD} from "../../references/refs_functions";

    import {required, email} from "vuelidate/lib/validators";

    export default {
        name: "PFForgotPassword",
        data: () =>
        ({
            email         : '',
            is_email_sent : false
        }),
        computed:
        {
            emailError()
            {
                return !this.$v.email.required
                    ? 'Email is required'
                        : !this.$v.email.email
                    ? 'Invalid E-mail Address' : ''
            },
        },
        methods:
        {
            async forgotPassword()
            {
                this.$v.email.$touch();
                if(this.$v.email.$error) {return 0}

                this.$_showPageLoading();
                await fbCall(FN_RESET_PASSWORD, {email: this.email})
                .then(data =>
                {
                    this.is_email_sent = true;
                })
                .catch(error => {
                    console.log(error);
                });

                this.$_hidePageLoading();
            }
        },
        validations:
        {
            email : {required, email},
        }
    }
</script>

<style scoped>

</style>
