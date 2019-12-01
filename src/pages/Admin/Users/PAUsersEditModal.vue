<template>
    <k-modal ref="kModalRef"
             card_width="800px"
             card_section_height="70vh"
             title="Edit User"
             @close="hideUsersEditModal">

        <div slot="modal-content">
            <span slot="section">
                <div class="registration__profile full-width column no-wrap justify-center items-center content-center q-pb-lg">
                    <span class="avatar q-pa-sm">
                        <q-avatar size="120px">
                            <q-img spinner-size="5px" src="../statics/boy.jpg"></q-img>
                        </q-avatar>
                    </span>
                </div>

                <div class="row q-gutter-sm">
                    <!--FULL NAME-->
                   <k-field class="col-12" label="Full Name">
                        <q-input dense outlined
                                 v-model="form.full_name"
                                 type="text"
                                 :error="$v.form.full_name.$error"
                                 :error-message="'Full name is required.'"
                                 @blur="$v.form.full_name.$touch()"/>
                    </k-field>

                    <!--E-MAIL-->
                   <k-field class="col-6" label="E-mail Address">
                        <q-input dense outlined
                                 v-model="form.email"
                                 type="text"
                                 :error="$v.form.email.$error"
                                 :error-message="'Email is required.'"
                                 @blur="$v.form.email.$touch()"/>
                    </k-field>

                    <!--CONTACT NUMBER-->
                    <k-field class="col" label="Contact Number">
                        <q-input dense outlined
                                 v-model="form.contact_number"
                                 type="text"
                                 :error="$v.form.contact_number.$error"
                                 :error-message="'Contact Number is required.'"
                                 @blur="$v.form.contact_number.$touch()"/>
                    </k-field>

                    <!--COUNTRY-->
                    <k-field class="col-6" label="Country">
                        <q-input dense outlined
                                 v-model="form.country"
                                 type="text"
                                 :error="$v.form.country.$error"
                                 :error-message="'Country is required.'"
                                 @blur="$v.form.country.$touch()"/>
                    </k-field>

                    <!--CURRENCY-->
                    <k-field class="col" label="Currency">
                        <q-input dense outlined
                                 v-model="form.currency"
                                 type="text"
                                 :error="$v.form.currency.$error"
                                 :error-message="'Currency is required.'"
                                 @blur="$v.form.currency.$touch()"/>
                    </k-field>
                </div>
            </span>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="UPDATE" @click="confirmUpdate" />
        </div>
    </k-modal>

</template>

<script>
    import KModal from '../../../components/Admin/KModal'
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'

    import {required} from "vuelidate/src/validators";

    export default {
        name: "PAUsersEditModal",
        components  : {KModal, KCard, KField},
        data: () =>
        ({
            form:
            {
                full_name      : '',
                contact_number : '',
                email          : '',
                country        : '',
                currency       : '',
                referral_code  : ''
            },
        }),
        methods:
        {
            showUsersEditModal(user_details)
            {
                const user_id = user_details.id;

                const user_data =

                Object.assign(this.form, initial_data);
                this.$refs.kModalRef.showModal();
            },
            hideUsersEditModal()
            {
                this.$refs.kModalRef.hideModal()
            },
            confirmUpdate()
            {

            }
        },
        validations()
        {
            return {
                form:
                {
                    full_name       : {required},
                    email           : {required},
                    contact_number  : {required},
                    country         : {required},
                    currency        : {required}
                }
            }
        },
    }
</script>

<style scoped>

</style>
