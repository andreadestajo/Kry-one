<template>
    <k-modal ref="kModalRef"
             card_width="620px"
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
            <q-btn flat label="Promote" @click="confirmPromotions" />
        </div>
    </k-modal>
</template>

<script>
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'
    import KModal from '../../../components/Admin/KModal'

    import DB_NOBILITY        from "../../../models/DB_NOBILITY";
    import {fbCall} 	      from "../../../utilities/Callables";
    import {FN_PROMOTE_USER}  from "../../../references/refs_functions";

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
                return this.nobilities.map((nobility, index) =>
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
            },
            confirmPromotions()
            {
                this.$_showConfirmDialog(
                    `Are you sure you want to promote ${this.user_details.name}
                    from ${this.user_details.nobility_info.title} to ${this.promote_to.label}`,
                    this.promoteUser
                )
            },
            async promoteUser()
            {
                this.$_showPageLoading();
                const promotion_info =
                {
                    user_id                 : this.user_details.id,
                    user_full_name          : this.user_details.name,
                    previous_nobility_id    : this.user_details.nobility_info.id,
                    previous_nobility_title : this.user_details.nobility_info.title,
                    promoted_nobility_id    : this.promote_to.value,
                    promoted_nobility_title : this.promote_to.label
                };

                await fbCall(FN_PROMOTE_USER, {promotion_info})
                    .then(data =>
                    {
                        this.$_notify({message: 'Successfully promoted user.'});
                        this.$_hidePageLoading();
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error.message});
                        this.$_hidePageLoading();
                    })

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
