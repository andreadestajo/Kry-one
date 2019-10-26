<template>
    <q-dialog persistent v-model="isShow">
        <q-card>
            <q-card-section>
                <slot name="modal-header"></slot>
            </q-card-section>

            <q-card-section>
                <slot name="modal-content"></slot>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <slot name="modal-footer"></slot>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "KModal",
        data: () =>
        ({
            isShow: false
        }),
        methods:
        {
            showModal()
            {
                this.isShow = true;
            },
            hideModal()
            {
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>

</style>
