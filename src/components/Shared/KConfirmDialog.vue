<template>
    <q-dialog :value="isShowConfirmDialog" persistent>
        <q-card>

            <q-card-section class="row items-center q-pm-md">
                <span class="q-ml-sm">{{dialog_details ? dialog_details.message : ''}}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Yes" color="primary" @click="confirmDialog()" v-close-popup />
                <q-btn flat label="No"  color="primary" @click="rejectDialog"    v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import {mapGetters}            from 'vuex';

    import {GETTER_CONFIRM_DIALOG}         from "../../store/shared-module/getters";
    import {MUTATION_CLEAR_CONFIRM_DIALOG} from "../../store/shared-module/mutations";

    export default {
        name: "KConfirmDialog",
        computed:
        {
            ...mapGetters({
                dialog_details: GETTER_CONFIRM_DIALOG
            }),
            isShowConfirmDialog(){
                return !!this.dialog_details
            }
        },
        methods:
        {
            confirmDialog(){
                if(this.dialog_details.hasOwnProperty('callback'))
                {
                    this.dialog_details.callback();
                }
                this.clearDialogDetails();
            },
            rejectDialog(){
                this.clearDialogDetails()
            },
            clearDialogDetails(){
                this.$store.commit(MUTATION_CLEAR_CONFIRM_DIALOG);
            }
        }
    }
</script>

<style scoped>

</style>
