<template>
    <k-modal ref="kModalRef"
             card_width="800px"
             card_section_height="50vh"
             title="Block User"
             @close="hideUsersBlockModal">
             <div slot="modal-content">
                <span slot="section">
                    <div class="q-mb-md text-center">
                        <h6>Are you sure you want to {{$route.params.block_status}} this user?</h6>
                    </div>
                    <div class="registration__profile full-width column no-wrap justify-center items-center content-center q-pb-lg">
                        <span class="avatar q-pa-sm">
                            <q-avatar size="120px">
                                <q-img spinner-size="5px" src="../statics/boy.jpg"></q-img>
                            </q-avatar>
                        </span>
                    </div>
                    <k-field class="col-12">
                        <q-input dense outlined
                                 v-model="user.full_name"
                                 type="text"
                                 readonly
                                 style="text-align: center !important;"/>
                    </k-field>
                </span>
             </div>
            <div slot="modal-footer">
                <q-btn flat color="red" :label="$route.params.block_status" @click="blockingStatus($route.params.user_id, $route.params.block_status)"/>
                <q-btn flat color="green" label="Cancel" @click="hideUsersBlockModal"/>
            </div>
    </k-modal>
</template>

<script>
import KModal               from '../../../components/Admin/KModal';
import KField               from '../../../components/Admin/KField';

import {FN_BLOCK_STATUS}  from '../../../references/refs_functions';
import {fbCall}             from '../../../utilities/Callables';

import DB_USER              from '../../../models/DB_USER.js';

export default {
    name: "PAUsersBlockModal",
    components :{ KModal, KField },

    data: () => ({
        user: {
            full_name: ''
        }
    }),

    methods: { 
        hideUsersBlockModal () 
        {
            this.$refs.kModalRef.hideModal();
            this.$router.push({name: 'admin_users'});
        },
        async showUsersBlockModal (user_id)
        {
            let user            = await DB_USER.get(user_id);
            this.user.full_name = user.full_name;
            this.$refs.kModalRef.showModal();
        },
        async blockingStatus (user_id, block_status)
        {
            if (block_status == 'block')
            {
                let user_data       = JSON.stringify({
                                        'uid'       : user_id,
                                        'fields'    : {
                                            'is_block': true
                                        }
                                    });
                let update_data     = await fbCall(FN_BLOCK_STATUS, user_data);
            }else
            if (block_status == 'unblock')
            {
                let user_data       = JSON.stringify({
                                        'uid'       : user_id,
                                        'fields'    : {
                                            'is_block': false
                                        }
                                    });
                let update_data     = await fbCall(FN_BLOCK_STATUS, user_data);
            }
            this.hideUsersBlockModal();
        }
    },
    mounted()
    {
        this.showUsersBlockModal(this.$route.params.user_id);
    }
}
</script>