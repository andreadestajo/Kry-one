<template>
    <k-modal ref="kModalRef"
             card_width="600px"
             title="Accelerate User"
             @close="hideUsersAccelerateModal">

        <div slot="modal-content">
                <span slot="section">
                    <div class="row q-gutter-md">
                        <k-field label="Name">
                            <q-input dense outlined readonly
                                     :value="user_details.name"
                                     type="text"/>
                        </k-field>

                        <k-field label="Current Nobility">
                            <q-input dense outlined readonly
                                     :value="user_details.nobility_info.title"
                                     type="text"/>
                        </k-field>

                        <k-field label="Promote to:">
                            <q-select dense outlined
                                      style="width: 180px"
                                      v-model="promote_to"
                                      :options="nobilitiesOptions"/>
                        </k-field>
                    </div>
                </span>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="Promote" @click="" />
        </div>
    </k-modal>
</template>

<script>
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'
    import KModal from '../../../components/Admin/KModal'
    import DB_NOBILITY from "../../../models/DB_NOBILITY";

    export default {
        name: "PAUsersAccelerateModal",
        components: {KModal, KField, KCard},
        data: () =>
        ({
            promote_to: '',
            user_details:
            {
                name         : '',
                nobility_info: {}
            },
            nobilities: []
        }),
        computed:
        {
            nobilitiesOptions()
            {
                return this.nobilities.map(nobility =>
                ({
                    label: nobility.title,
                    value: nobility.id
                }))
            }
        },
        methods:
        {
            async showUsersAccelerateModal(user_details)
            {
                this.$refs.kModalRef.showModal();
                this.$refs.kModalRef.showLoading();

                // Assign user details
                this.user_details = Object.assign({}, user_details);

                this.$refs.kModalRef.hideLoading();
            },
            hideUsersAccelerateModal()
            {
                this.$refs.kModalRef.hideModal();
            }
        },
        mounted()
        {
            // bind nobilities
            DB_NOBILITY.bindNobilities(this)
        }
    }
</script>

<style scoped>

</style>
