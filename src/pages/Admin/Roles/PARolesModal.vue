<template>
    <k-modal ref="kModalRef"
             card_section_height="80vh"
             title="Add New Role"
             @close="$refs.kModalRef.hideModal()">
        <div slot="modal-content">
            <k-field label="Role Name">
                <q-input dense
                         outlined
                         type="text"
                         v-model="role"/>
            </k-field>

            <k-field label="Access">
                <div v-for="access_key in $options.access_keys" :v-for="access_key.key">
                    <q-checkbox v-model="access" :val="access_key.key" :label="access_key.label"/>
                </div>
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

    import {access_keys} from "../../../references/refs_admin_access_keys";

    export default {
        name       : "PANobilitiesAddModal",
        components : {KModal, KField},
        data: () => ({
           role   : "",
           access : []
        }),
        methods: {
            showRolesModal() {
                this.$refs.kModalRef.showModal();
            }
        },
        access_keys
    }
</script>

<style scoped>

</style>
