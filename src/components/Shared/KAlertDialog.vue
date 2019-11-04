<template>
    <q-dialog v-model="alert">
        <q-card>
            <q-card-section>
                <div class="text-h6">{{options.title}}</div>
            </q-card-section>

            <q-card-section>
                {{options.message}}
                <slot name="custom-body"></slot>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" @click="hideAlert"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "KAlertDialog",
        data: () =>
        ({
            is_show    : false,
            options    :
            {
                title  : '',
                message: ''
            }
        }),
        methods:
        {
            showAlert(options = {})
            {
                if(options.hasOwnProperty('title'))
                {
                    this.options.title = options.title;
                }

                if(options.hasOwnProperty('message'))
                {
                    this.options.message = options.message;
                }

                this.is_show = true;
            },
            hideAlert()
            {
                this.is_show = false;
            },
        }
    }
</script>

<style scoped>

</style>
