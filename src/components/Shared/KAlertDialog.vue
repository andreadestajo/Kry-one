<template>
    <q-dialog v-model="is_show" persistent>
        <div class="kalert_dialog">
            <q-card class="q-pa-lg" style="max-width: 450px;">
                <div class="title">{{title}}</div>

                <div class="detail q-my-md q-mb-xs">
                    <slot name="message"></slot>
                </div>

                <q-btn unelevated color="primary" @click="confirm" class="full-width">
                    {{button_label}}
                </q-btn>
            </q-card>
        </div>
    </q-dialog>
</template>

<script>
    import './KAlertDialog.scss'

    export default {
        name: "KAlertDialog",
        props:
        {
            title        : '',
            button_label : {type: String, default: 'CLOSE'}
        },
        data: () =>
        ({
            is_show    : false
        }),
        methods:
        {
            showAlert()
            {
                this.is_show = true;
            },
            confirm()
            {
                // hide alert
                this.is_show = false;

                // invoke functions here :)) choss
                this.$emit('confirm')
            },
        }
    }
</script>

<style scoped>

</style>
