<template>
    <k-modal ref="kModalRef"
             card_width="800px"
             card_section_height="100vh"
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
                                 readonly
                                 :error="$v.form.full_name.$error"
                                 :error-message="'Full name is required.'"
                                 @blur="$v.form.full_name.$touch()"/>
                    </k-field>

                    <!--E-MAIL-->
                   <k-field class="col-md-6 col-12" label="E-mail Address">
                        <q-input dense outlined
                                 v-model="form.email"
                                 type="text"
                                 readonly
                                 :error="$v.form.email.$error"
                                 :error-message="'Email is required.'"
                                 @blur="$v.form.email.$touch()"/>
                    </k-field>

                    <!--CONTACT NUMBER-->
                    <k-field class="col-md col-12" label="Contact Number">
                        <q-input dense outlined
                                 v-model="form.contact_number"
                                 type="text"
                                 :error="$v.form.contact_number.$error"
                                 :error-message="'Contact Number is required.'"
                                 @blur="$v.form.contact_number.$touch()"/>
                    </k-field>

                    <!--COUNTRY-->
                    <k-field class="col-md-6 col-12" label="Country">
                          <q-select outlined
                                    class="input"
                                    dense
                                    v-model="form.country"
                                    :options="$options.country_options"
                                    option-value="code"
                                    option-label="name"
                                    :error="$v.form.country.$error"
                                    :error-message="'Please select a country.'"
                                    @blur="$v.form.country.$touch()">
                        </q-select>
                    </k-field>

                    <!--CURRENCY-->
                    <k-field class="col-md col-12" label="Currency">
                        <q-select outlined
                                  class="input"
                                  dense
                                  v-model="form.currency"
                                  :options="$options.currency_options"
                                  option-value="value"
                                  option-label="label"
                                  :error="$v.form.currency.$error"
                                  :error-message="'Please select a currency.'"
                                  @blur="$v.form.currency.$touch()">
                </q-select>
                    </k-field>
                </div>
            </span>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="Save" @click="confirmSave" />
        </div>
    </k-modal>

</template>

<script>
    import KModal from '../../../components/Admin/KModal'
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'

    import {required} from "vuelidate/src/validators";

    import refs_countries     from "../../../references/refs_countries";
    import {currencies_list}  from "../../../references/refs_currencies";
    import DB_USER            from "../../../models/DB_USER";
    import {fbCall}           from "../../../utilities/Callables";
    import {FN_UPDATE_USER_DETAILS} from "../../../references/refs_functions";

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
            async showUsersEditModal(user_id)
            {
                this.$refs.kModalRef.showModal();
                this.$refs.kModalRef.showLoading();

                // Get selected user details
                const user_details = await DB_USER.doc(user_id).get()
                    .then(doc => doc.exists ? doc.data() : null);

                if(!user_details)
                {
                    this.$router.push({name: 'admin_users'});
                    return 0;
                }

                const currency = this.$options.currency_options
                    .filter(c => c.value === user_details.currency)[0];

                // assign details
                const initial_data =
                {
                    full_name       : user_details.full_name,
                    email           : user_details.email,
                    contact_number  : user_details.contact_number,
                    referral_code   : user_details.referral_code,
                    currency        : currency ? currency : null,
                    country         : user_details.country
                };

                this.form = Object.assign(this.form, initial_data);
                this.$refs.kModalRef.hideLoading();
            },
            hideUsersEditModal()
            {
                this.$refs.kModalRef.hideModal();
                this.$router.push({name: 'admin_users'});
            },
            confirmSave()
            {
                this.$v.form.$touch();
                if(this.$v.form.$error) {return 0}

                this.$_showConfirmDialog(
                    'Are you sure you want to save changes?',
                    this.saveDetails
                )
            },
            async saveDetails()
            {
                this.$_showPageLoading({message: 'Updating...'});

                const data =
                {
                    contact_number : this.form.contact_number,
                    country        : this.form.country,
                    currency       : this.form.currency.value,
                    date_modified  : new Date()
                };

                await fbCall(FN_UPDATE_USER_DETAILS, JSON.stringify(data))
                    .then(data =>
                    {
                        this.$_notify({message: 'Succesfully saved changes.', mode: 'positive'});
                        this.$_hidePageLoading();
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error.message, mode: 'negative'});
                        this.$_hidePageLoading();
                    });

                this.$_hidePageLoading();
            }
        },
        mounted()
        {
            if(!this.$route.params.hasOwnProperty('user_id'))
            {
                this.$router.push({name: 'admin_users'})
            }
            this.showUsersEditModal(this.$route.params.user_id)
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
        country_options  : refs_countries,
        currency_options : (() =>
        {
            return currencies_list.map(c => ({
                value: c.key,
                label: `${c.label} (${c.key})`
            }));
        })()
    }
</script>

<style scoped>

</style>
