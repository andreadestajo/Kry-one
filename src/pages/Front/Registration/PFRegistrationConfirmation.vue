<template>
    <q-card class="q-pa-lg">
            <q-card-section>
                <div class="row no-wrap items-center text-center">
                    <div class="col text-h6 ellipsis">Congratulations!</div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="text-subtitle1">
                    Thanks for signing up. Please confirm your e-mail address <i>(email-address)</i> to activate
                    your account. Check the inbox for activation link.
                </div>
            </q-card-section>

            <q-card-actions >
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
        name: "PFRegistrationConfirmation"
    }
</script>

<style scoped>

</style>
