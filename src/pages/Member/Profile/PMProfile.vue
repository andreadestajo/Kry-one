<template>
    <q-page class="q-pa-lg registration">
        <k-header icon="fa fa-user" detail="Details about you">Profile</k-header>

        <div class="registration__profile full-width column no-wrap justify-center items-center content-center q-pb-lg">
            <span class="avatar q-pa-sm">
                <q-avatar size="120px">
                    <q-img spinner-size="5px" :src="$_current_user_data.photo_url ? $_current_user_data.photo_url : '../statics/boy.jpg'"></q-img>
                </q-avatar>
            </span>
            <span class="name text-weight-bold">{{$_current_user_data ? $_current_user_data.email : ''}}</span>
            <span class="email">{{$_current_user_data ? $_current_user_data.full_name : ''}}</span>
        </div>

        <q-form class="q-pa-lg registration__form">
            <div class="q-pa-none label">
                Full Name
            </div>
            <q-input dense
                     placeholder="John Doe"
                     class="input q-mb-md"
                     outlined
                     stack-label
                     readonly
                     :value="form.full_name"
                     @blur="$v.form.full_name.$touch()"/>

            <div class="q-pa-none label">
                Contact Number
            </div>
            <q-input dense
                     placeholder=""
                     class="input"
                     outlined
                     stack-label
                     v-model="form.contact_number"
                     :error="$v.form.contact_number.$error"
                     :error-message="'Contact Number is required'"
                     @blur="$v.form.contact_number.$touch()"/>

            <div class="label">
                E-mail
            </div>
            <q-input debounce="500"
                     dense
                     placeholder="yourname@gmail.com"
                     class="input q-mb-md"
                     outlined
                     type="email"
                     readonly
                     :value.lazy="form.email"
                     @blur="$v.form.email.$touch()"/>

            <div class="label">
                Country
            </div>
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

            <div class="label">
                Currency
            </div>
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
            <k-field label="Upload ID (Selfie)" note="Take a picture holding the ID">
                <k-uploader v-model="form.photo_url" :storage_ref="$options.STORE_MEMBER_IDS(`profile_${(new Date).getTime()}`)"></k-uploader>
            </k-field>
            <div class="q-pt-md">
                <q-btn unelevated
                       label="Update Profile"
                       type="submit"
                       color="primary"
                       class="full-width"
                       @click="confirmUpdate">
                </q-btn>
            </div>

        </q-form>

    </q-page>
</template>

<script>
    import './PMProfile.scss';
    import KHeader  from '../../../components/Member/KHeader'
    import KField   from '../../../components/Member/KField'
    import KCard    from '../../../components/Member/KCard'
    import KUploader    from '../../../components/Member/KUploader';
    import {STORE_MEMBER_IDS}  from "../../../references/refs_cloud_storage";

    import refs_countries      from "../../../references/refs_countries";
    import {currencies_list}   from "../../../references/refs_currencies";
    import {required}          from "vuelidate/src/validators";
    import {fbCall}            from "../../../utilities/Callables";
    import {FN_UPDATE_PROFILE} from "../../../references/refs_functions";

    export default {
        name: "PMProfile",
        components: { KHeader, KField, KCard, KUploader },
        STORE_MEMBER_IDS,
        data: () =>
        ({
            form:
            {
                full_name      : '',
                contact_number : '',
                email          : '',
                country        : '',
                currency       : '',
                photo_url      : '',
            },
            update_error :
            {
                code    : '',
                message : '',
            }
        }),
        methods:
        {
            getStorageRef(type)
            {
                console.log(`${type}_${(new Date).getTime()}`);
                return STORE_MEMBER_IDS(`${type}_${(new Date).getTime()}`)
            },
            confirmUpdate()
            {
                this.$v.form.$touch();
                if(this.$v.form.$error || this.$v.form.$pending) {return 0}

                this.$_showConfirmDialog(
                    'Are you sure you want to update your profile ?',
                    this.updateProfile
                )
            },
            async updateProfile()
            {
                // We temporarily can update contact number, country and currency
                this.$_showPageLoading({message: 'Updating...'});

                const data =
                {
                    contact_number : this.form.contact_number,
                    country        : this.form.country,
                    currency       : this.form.currency.value,
                    date_modified  : new Date(),
                    photo_url      : this.form.photo_url,
                };

                await fbCall(FN_UPDATE_PROFILE, JSON.stringify(data))
                    .then(data =>
                    {
                        this.$_notify({message: 'Succesfully updated profile.', mode: 'positive'});
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
            // Start initializing data
            const currency = this.$options.currency_options
                .filter(c => c.value === this.$_current_user_data.currency)[0];

            const initial_data =
            {
                full_name      : this.$_current_user_data.full_name,
                contact_number : this.$_current_user_data.contact_number,
                email          : this.$_current_user_data.email,
                country        : this.$_current_user_data.country,
                currency       : currency ? currency : null,
                photo_url      : this.$_current_user_data.photo_url,
            };

            this.form = Object.assign(this.form, initial_data);
        },
        validations:
        {
            form:
            {
                contact_number : {required},
                country        : {required},
                currency       : {required}
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
