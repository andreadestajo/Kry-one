<template>
    <div class="notification">
        <k-header detail="Get live information about events">Notifications</k-header>
        <k-card class="q-mt-md">
            <div class="notification__list">
                <div class="list new">
                    <div class="list-image">
                        <q-avatar>
                        <q-img src="../statics/boy.jpg"></q-img>
                        </q-avatar>
                    </div>
                    <div class="list-detail">
                        <div class="detail"><b>Guillermo Tabligan</b> is asking you for a date <b>next week</b>. Are you coming?</div>
                        <div class="time">2 minutes ago</div>
                    </div>
                </div>
                <div class="list" @click="goToPage('member_dashboard')">
                    <div class="list-image">
                        <q-avatar>
                        <q-img src="../statics/girl.jpg"></q-img>
                        </q-avatar>
                    </div>
                    <div class="list-detail">
                        <div class="detail"><b>Flare Lina</b> rejected your date request. So saad! Charot.. hahaha</div>
                        <div class="time">5 minutes ago</div>
                    </div>
                </div>

                <div class="list">
                    <div class="list-image">
                        <q-avatar>
                        <q-img src="../statics/boy.jpg"></q-img>
                        </q-avatar>
                    </div>
                    <div class="list-detail">
                        <div class="detail"><b>Guillermo Tabligan</b> is crying.</div>
                        <div class="time">30 minutes ago</div>
                    </div>
                </div>
            </div>
        </k-card>
    </div>
</template>

<script>
import KHeader     from '../../../components/Member/KHeader';
import KCard       from '../../../components/Member/KCard';
import styles      from './PMNotification.scss';

export default
{
    components: { KHeader, KCard },
    methods: 
    {
        goToPage(route, params = null)
        {
            if(route)
            {
                this.$router.push({ name: route }, params);
            }
        }
    }
}
</script>
