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

            <div class="q-pa-lg">
                <q-btn unelevated
                       label="Sign In"
                       color="primary"
                       class="full-width"
                       @click="$router.push('login')" />

                <q-btn outline
                       label="Create an Account"
                       color="primary"
                       class="q-mt-sm full-width"
                       @click="$router.push('register')"/>
            </div>
        </q-page>
    </q-page-container>
</template>

<script>
    export default
    {
        name: "PFHome"
    }
</script>