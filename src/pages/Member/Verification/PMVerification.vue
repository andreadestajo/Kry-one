<template>
    <div class="verification">
        <k-header detail="Please verify your account">KYC Verification</k-header>
        <q-form class="member__card q-mt-md q-pa-md q-px-lg">
            <k-field label="First Name">
                <q-input v-model="form.first_name" dense placeholder="John" class="input" outlined stack-label></q-input>
            </k-field>
            <k-field label="Last Name">
                <q-input v-model="form.last_name" dense placeholder="Doe" class="input" outlined stack-label></q-input>
            </k-field>
            <k-field label="Date of Birth">
                <q-input dense outlined v-model="form.birthday" mask="date">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="form.birthday" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </k-field>
            <k-field label="Upload ID (Front)">
                <k-uploader></k-uploader>
            </k-field>

            <k-field label="Upload ID (Back)">
                <k-uploader></k-uploader>
            </k-field>
            <k-field label="Upload ID (Selfie)" note="Take a picture holding the ID">
                <k-uploader></k-uploader>
            </k-field>

            <q-btn unelevated label="Submit KYC" type="submit" color="primary" class="full-width"></q-btn>
            <q-btn @click="$router.go(-1)" outline label="Back" type="submit" color="primary" class="full-width q-mt-sm"></q-btn>
        </q-form>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader'
import KField from '../../../components/Member/KField'
import KUploader from '../../../components/Member/KUploader'
import { Quasar } from 'quasar';
import { date } from 'quasar'
import styles from './PMVerification.scss';

export default
{  
    components: { KHeader, KField, KUploader },
    filters: { },
    data:() =>(
    {
        form: {
            first_name: '',
            last_name: '',
            birthday: new Date(),
        },
    }),
}
</script>