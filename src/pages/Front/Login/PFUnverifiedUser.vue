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
                </q-card-actions>
            </q-card>
        </q-page>
    </q-page-container>
</template>

<script>
    import DB_USER from '../../../models/DB_USER'

    export default {
        name: "PFRegistrationConfirmation",
        data: () =>
        ({
           unverified_email: ''
        }),
        methods:
        {
            signOut()
            {
                DB_USER.signOut();
                this.$router.push('login');
            }
        },
        mounted() {
            if(!DB_USER.getCurrentUser())
            {
                this.$router.push('login');
                return 0;
            }
            this.unverified_email = DB_USER.getCurrentUser().email;
        }
    }
</script>

<style scoped>

</style>
