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
        </q-card-actions>
    </q-card>
</template>

<script>
    export default {
        name: "PFRegistrationConfirmation",
        props:
        {
            email: {type: String}
        }
    }
</script>

<style scoped>

</style>
