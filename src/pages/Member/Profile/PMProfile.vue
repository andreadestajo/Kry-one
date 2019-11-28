<template>
    <q-page class="q-pa-lg registration">
        <k-header icon="fa fa-user" detail="Details about you">Profile</k-header>

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

            <div class="q-pt-md">
                <q-btn unelevated
                       label="Update Profile"
                       type="submit"
                       color="primary"
                       class="full-width"
                       @click=""></q-btn>

                <q-btn unelevated
                       label="Back"
                       type="reset"
                       color="grey"
                       class="q-mt-sm full-width"
                       @click="$router.push('/')"/>
            </div>
        </q-form>

    </q-page>
</template>

<script>
    import './PMProfile.scss';
    import KHeader  from '../../../components/Member/KHeader'
    import KField   from '../../../components/Member/KField'
    import KCard    from '../../../components/Member/KCard'

    import refs_countries     from "../../../references/refs_countries";
    import {currencies_list}  from "../../../references/refs_currencies";
    import {required} from "vuelidate/src/validators";

    export default {
        name: "PMProfile",
        components: { KHeader, KField, KCard },
        data: () =>
        ({
            form:
            {
                full_name      : '',
                contact_number : '',
                email          : '',
                password       : '',
                country        : '',
                currency       : ''
            }
        }),
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