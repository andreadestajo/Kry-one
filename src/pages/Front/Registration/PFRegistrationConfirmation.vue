<template>
    <q-card class="q-pa-md q-mt-lg">
        <q-card-section>
            <div class="row no-wrap items-center text-center">
                <div class="col text-h6 ellipsis">Congratulations!</div>
            </div>
        </q-card-section>

        <q-card-section>
            <div class="text-subtitle1">
                Thanks for signing up. Please confirm your e-mail address <b>({{email}})</b> to activate
                your account. Check your inbox for the activation link.
            </div>
        </q-card-section>

        <q-card-actions>
            <q-btn unelevated
                   class="full-width"
                   color="primary"
                   label="Sign In"
                   @click="$router.push('login')"/>

            <div class="q-pt-md text-center">
                Still waiting for the activation link ?
                <q-btn @click="resendVerificationLink" color="primary" flat dense>Resend Activation Link</q-btn>
            </div>
        </q-card-actions>
    </q-card>
</template>

<script>
    import {fbCall} from "../../../utilities/Callables";
    import {FN_RESEND_EMAIL_VERIFICATION} from "../../../references/refs_functions";

    export default {
        name: "PFRegistrationConfirmation",
        props:
        {
            email     : {type: String},
            full_name : {type: String}
        },
        methods:
        {
            async resendVerificationLink()
            {
                this.$_showPageLoading();

                const data = JSON.stringify({email: this.email, full_name: this.full_name});
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
        }
    }
</script>

<style scoped>

</style>
