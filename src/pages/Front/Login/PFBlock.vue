<template>
    <div class="dashboard">
        <!-- LOGO -->
        <div class="text-center">
            <div class="dashboard__logo">
                <q-img spinner-size="0" src="../statics/logo3.png"></q-img>
            </div>
        </div>
        <div class="dashboard__warning q-mt-md">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Access Denied</div>
                <div class="message-detail">
                    Your account has been blocked. In result, your access with this site is denied. Please contact the admin for this issue. You must use another account.
                </div>
                <div class="message-footer">
                    <q-btn @click="$router.push({name: 'front_home'})">okay</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './PFBlock.scss';
export default {
    data: () => ({

    }),
    methods: {

    },

    computed: {

    }
}
</script>