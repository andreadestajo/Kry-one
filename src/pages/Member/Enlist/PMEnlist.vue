<template>
    <div class="enlist">
        <k-header icon="fa fa-chess-knight" detail="Purchase for your friends">Enlist Knight</k-header>
        <q-form class="member__card q-mt-md q-pa-md q-px-lg">
            <!-- FIRST NAME -->
            <k-field label="Full Name">
                <q-input v-model="form.full_name" dense placeholder="John Doe" class="input" outlined stack-label></q-input>
            </k-field>

            <!-- E-MAIL ADDRESS -->
            <k-field label="E-Mail Address">
                <q-input v-model="form.email" dense placeholder="sample@gmail.com" class="input" outlined stack-label></q-input>
            </k-field>

            <!-- COUNTRY -->
            <k-field label="E-Mail Address">
                <q-select   outlined class="input" dense v-model="form.country" :options="$options.country_options"
                            option-value="code"
                            option-label="name">
                </q-select>
            </k-field>

            <!-- SPONSOR -->
            <k-field label="Sponsor">
                <q-input v-model="form.sponsor" dense placeholder="M6U3V3" class="input" outlined stack-label></q-input>
            </k-field>

            <!-- PLACEMENT -->
            <k-field label="Placement">
                <q-input v-model="form.placement" dense placeholder="M6U3V3" class="input" outlined stack-label></q-input>
            </k-field>

            <!-- PLACEMENT -->
            <k-field label="Position">
                <q-select   outlined class="input" dense
                            v-model="form.position"
                            :options="$options.position_options"
                            option-value="value"
                            option-label="label">
                </q-select>
            </k-field>

            <q-btn unelevated label="ENLIST KNIGHT" type="submit" color="primary" class="full-width"></q-btn>
        </q-form>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader'
import KField from '../../../components/Member/KField'
import refs_countries from "../../../references/refs_countries";

export default
{
    components: { KHeader, KField },
    filters: { },
    data:() =>(
    {
        form:
        {
            full_name: '',
            email: '',
            country: '',
            sponsor: 'M3A767U',
            placement: '',
            position: 'Left',
        },
    }),
    position_options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
    ],
    country_options: refs_countries,

    watch:
    {
        form()
        {
            console.log(this.form);
        }
    }
}
</script>