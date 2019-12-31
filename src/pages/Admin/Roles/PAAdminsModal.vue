<template>
    <k-modal ref="kModalRef"
             card_section_height="80vh"
             :title="'Admin Management'"
             @close="$refs.kModalRef.hideModal()">
        <div slot="modal-content">
            <k-field label="User Email">
                <q-input dense
                         placeholder="adminname@email.com"
                         outlined
                         type="text"
                         debounce="500"
                         :loading="$v.email.$pending"
                         v-model="email"
                         :error="$v.email.$error"
                         :error-message="emailError"
                         @blur="$v.email.$touch()"/>
            </k-field>

            <k-field label="Role/s">
                <q-select filled
                          v-model="roles"
                          multiple
                          :options="rolesOptions"
                          use-chips>
                </q-select>
            </k-field>
        </div>

        <span slot="modal-footer">
            <q-btn flat label="Save" @click="confirmSaveAdmin"/>
        </span>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField"
    import KModal from "../../../components/Admin/KModal"

    import {required, email} from "vuelidate/lib/validators";
    import DB_USER from "../../../models/DB_USER";

    export default {
        components : {KModal, KField},
        props: {
          roles_options: {type: Array, default: () => []}
        },
        data: () => ({
            email       : '',
            roles       : [],
            user_details: null
        }),
        computed: {
            rolesOptions()
            {
              return this.roles_options.map(r => r.role)
            },
            emailError()
            {
                return !this.$v.email.required
                    ? 'Email is required'
                        : !this.$v.email.email
                    ? 'Invalid E-mail Address'
                        : !this.$v.email.doesExists
                    ? "E-mail does not exists"  : ''
            },
        },
        methods: {
            showAdminsModal(data)
            {
                this.resetData();

                if(data)
                {
                    this.email        = data.email;
                    this.user_details = null;
                    this.$v.email.$touch();
                }

                this.$refs.kModalRef.showModal();
            },
            confirmSaveAdmin()
            {
                this.$v.email.$touch();
                if(this.$v.email.$error || this.$v.email.$pending) {return 0}

                const message = "Are you sure you want to save changes ?";
                this.$_showConfirmDialog(message, this.saveAdmin);
            },
            saveAdmin() {
                this.$_showPageLoading();

                // Update user roles
                const roles = [...this.roles];
                roles.push("admin");

                DB_USER.update(this.user_details.id, {roles})
                .then(() =>
                {
                    this.$_notify({message: "Successfully saved changes.", mode: "positive"});
                    this.$_hidePageLoading();
                    this.$refs.kModalRef.hideModal();
                })
                .catch( error =>
                {
                    this.$_notify({message: error.message, mode: "negative"});
                    this.$_hidePageLoading();
                })
            },
            resetData()
            {
                this.$v.email.$reset();
                this.email        = '';
                this.roles        = [];
                this.user_details = null;
            }
        },
        watch:
        {
            user_details(user_details)
            {
                if(!user_details) {this.roles = []; return 0;}

                if(user_details.hasOwnProperty('roles'))
                {
                    this.roles = user_details.roles.filter(r => r !== 'admin' && r !== 'developer');
                }
            }
        },
        validations()
        {
            return {
                email:
                {
                    required,
                    email,
                    doesExist(email)
                    {
                        this.user_details = null;
                        if(email === '' || !this.$v.email.email) {return true}

                        // Returns true if email does exist
                        return new Promise((resolve) => {
                            setTimeout(() =>
                            {
                                DB_USER.getUserByEmailAddress(email.trim()).then(user =>
                                {
                                    // check if eligible
                                    this.user_details = user;
                                    resolve(!!user)
                                });
                            }, 500)
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
