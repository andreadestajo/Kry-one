<template>
    <k-modal ref="kModalRef"
             card_section_height="80vh"
             :title="`${is_edit ? 'Edit' : 'Add new'} Role`"
             @close="$refs.kModalRef.hideModal()">
        <div slot="modal-content">
            <k-field label="User Email">
                <q-input dense
                         placeholder="adminname@email.com"
                         outlined
                         type="text"
                         v-model="email"/>
            </k-field>

            <k-field label="Role">
            </k-field>
        </div>

        <span slot="modal-footer">
            <q-btn flat label="Save" @click="" />
        </span>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField"
    import KModal from "../../../components/Admin/KModal"

    export default {
        components : {KModal, KField},
        data: () => ({
            email: '',
            roles: []
        }),
        methods: {
            showAdminsModal(data) {
                this.$refs.kModalRef.showModal();
            }
        }
    }
</script>

<style scoped>

</style>
