<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn label="Click me" color="primary" @click="inception = true" />

        <q-dialog persistent v-model="inception">
            <q-card>
                <q-card-section>
                    <div class="text-h6">KYC Submits</div>
                </q-card-section>

                <q-card-section>
                    <div class="row">
                        <div class="col-4 q-pa-sm" v-for="n in 9" :key="n">
                            <k-field label="Name">
                                <q-input :value="'hello there'"
                                         placeholder="John"
                                         class="input"
                                         dense outlined stack-label>
                                </q-input>
                            </k-field>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Accept" @click="secondDialog = true" />
                    <q-btn color="red" flat label="Reject" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import KField from "../../../components/Admin/KField";

    export default
    {
        name: "PAKycDetailsModal",
        components: {KField},
        props:
        {
           kyc_details: {}
        },
        data: () =>
        ({
            inception    : false,
            secondDialog : false
        })
    }
</script>

<style scoped>

</style>
