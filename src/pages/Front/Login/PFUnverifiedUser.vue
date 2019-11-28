<template>
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

            <q-card class="q-pa-lg">
                <q-card-section>
                    <div class="row no-wrap items-center text-center">
                        <div class="col text-h6 ellipsis"></div>
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="text-subtitle1">
                        You need to verify your email <b><i>{{unverified_email}}</i></b> before you can sign in.
                    </div>
                </q-card-section>

                <q-card-actions>
                    <q-btn unelevated
                           class="full-width"
                           color="primary"
                           label="Sign out"
                           @click="signOut()"/>

                    <div class="q-pt-md text-center">
                        Still waiting for the activation link ?
                        <q-btn @click="resendVerificationLink" color="primary" flat dense>Resend Activation Link</q-btn>
                    </div>
                </q-card-actions>
            </q-card>
        </q-page>
    </q-page-container>
</template>

<script>
    import {fbCall} from "../../../utilities/Callables";
    import {FN_RESEND_EMAIL_VERIFICATION} from "../../../references/refs_functions";

    import DB_USER from '../../../models/DB_USER'

    export default {
        name: "PFRegistrationConfirmation",
        data: () =>
        ({
           unverified_email: '',
           full_name       : ''
        }),
        methods:
        {
            signOut()
            {
                DB_USER.signOut();
                this.$router.push('login');
            },
            async resendVerificationLink()
            {
                this.$_showPageLoading();

                const data = JSON.stringify({email: this.unverified_email, full_name: this.full_name});
                await fbCall(FN_RESEND_EMAIL_VERIFICATION, data)
                    .then(data =>
                    {
                        this.$_notify({message: 'Email has been successfully sent.', mode: 'positive'})
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error.message || 'Unable to resend email. Please try again.', mode: 'negative'})
                    });

                this.$_hidePageLoading();
            }
        },
        mounted() {
            if(!DB_USER.getCurrentUser())
            {
                this.$router.push('login');
                return 0;
            }

            this.unverified_email = DB_USER.getCurrentUser().email;
            this.full_name        = this.$_current_user_data.full_name;
        }
    }
</script>

<style scoped>

</style>
