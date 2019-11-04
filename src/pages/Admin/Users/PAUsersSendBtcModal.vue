<template>
    <k-modal ref="kModalRef" card_width="800px" card_section_height="50vh">
        <div slot="modal-header">
            <div class="text-h6">Send BTC</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-12 q-ma-xs">
                        Ganda ka ?
                </div>

            </div>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="Continue" @click="" />
            <q-btn flat color="grey" label="Back" @click="$refs.kModalRef.hideModal()"/>
        </div>
    </k-modal>
</template>

<script>
    import KModal             from '../../../components/Admin/KModal'

    export default {
        name: "PAUsersSendBtcModal",
        components: {KModal},
        methods:
        {
            showSendBtcModal()
            {
                this.$refs.kModalRef.showModal();
            }
        }
    }
</script>

<style scoped>

</style>
