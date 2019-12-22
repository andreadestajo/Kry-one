<template>
    <k-modal ref="kModalRef"
             card_section_height="80vh"
             :title="`${is_edit ? 'Edit' : 'Add new'} Role`"
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
            <q-btn flat label="Save" @click="saveNewRole" />
        </span>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField"
    import KModal from "../../../components/Admin/KModal"

    import DB_ROLE       from "../../../models/DB_ROLE.js"
    import {access_keys} from "../../../references/refs_admin_access_keys";
    import {required}    from "vuelidate/lib/validators";

    export default {
        components : {KModal, KField},
        data: () => ({
            role    : "",
            access  : [],
            role_id : null,
            is_edit : null
        }),
        methods: {
            showRolesModal(data) {
                this.resetData();

                if(data)
                {
                    this.is_edit = !!data.id;
                    this.role_id = data.id;
                    this.access  = data.access;
                    this.role    = data.role;
                }

                this.$refs.kModalRef.showModal();
            },
            saveNewRole() {
                this.$_showPageLoading();

                const data =
                {
                    role          : this.role,
                    role_to_lower : this.role.toLowerCase(),
                    access        : this.access
                };

                const query = this.is_edit ? DB_ROLE.update(this.role_id, data) : DB_ROLE.add(data);

                query
                .then(() => {
                    this.$_notify({message: `Successfully ${this.is_edit ? "updated a" : "added new"} role.`, mode: "positive"});
                    this.$_hidePageLoading();
                    this.$refs.kModalRef.hideModal();
                })
                .catch(error => {
                    this.$_notify({message: error.message, mode: "negative"});
                    this.$_hidePageLoading();
                })
            },
            resetData() {
                this.role    = "";
                this.access  = [];
                this.role_id = null;
                this.is_edit = null;
            }
        },
        validations: {
            role: {required}
        },
        access_keys
    }
</script>

<style scoped>

</style>
