<template>
    <div class="notification" ref="scrollTargetRef" style="max-height: 700px; overflow: auto;">
        <k-header detail="Get live information about events">Notifications</k-header>
        <k-card class="q-mt-md">
            <div v-if="is_notification_empty">
                <span class="list">No transaction history.</span>
            </div>
            <q-infinite-scroll class="notification__list"
                               @load="fetchNotifications"
                               ref="notificationRef"
                               :scroll-target="$refs.scrollTargetRef">
                <div v-for="notif in notification_data"
                     :class="`list ${notif.is_new ? 'new' : ''}`">
                    <div class="list-image">
                        <q-avatar>
                            <q-img spinner-size="0" :src="notif.image"></q-img>
                        </q-avatar>
                    </div>
                    <div class="list-detail">
                        <div class="detail" v-html="notif.detail"></div>
                        <div class="time">{{notif.relative_time}}</div>
                    </div>
                </div>
                <template v-slot:loading>
                    <div class="row justify-center q-py-sm" style="background-color: #f3f3f3">
                        <q-spinner color="primary" size="20px" />
                    </div>
                </template>
            </q-infinite-scroll>

        </k-card>
    </div>
</template>

<script>
import styles      from './PMNotification.scss';

import KHeader     from '../../../components/Member/KHeader';
import KCard       from '../../../components/Member/KCard';

import DB_NOTIFICATION from '../../../models/DB_NOTIFICATION'
import DB_USER         from '../../../models/DB_USER'

import {getRelativeTime} from "../../../utilities/DateUtils";
import {fbCall}          from "../../../utilities/Callables";
import {FN_READ_NEW_NOTIFICATION} from "../../../references/refs_functions";

export default
{
    components: { KHeader, KCard },
    data: () =>
    ({
        notification_data     : [],
        last_history          : null,
        is_notification_empty : false
    }),
    methods: 
    {
        goToPage(route, params = null)
        {
            if(route)
            {
                this.$router.push({ name: route }, params);
            }
        },
        fetchNotifications(index, done)
        {
            setTimeout(async () => {
                if(this.is_notification_empty) {this.$refs.notificationRef.stop()}

                const options = {limit: 10}; // default limit is 10 you can modify this one

                // Set start after
                if(this.last_history)
                {
                    options.start_after = this.last_history
                }

                const notifications = await DB_NOTIFICATION.getUserNotifications(
                    this.$_current_user_data.id,
                    options
                );


                // Get last document and assign to start_after
                if(notifications.length)
                {
                    this.last_history = notifications[notifications.length - 1];
                } else {
                    this.$refs.notificationRef.stop()
                }

                // Push to notifications
                notifications.forEach(notification =>
                {
                    const data = notification.data();

                    // Structure data
                    const notification_data =
                    {
                        detail          : data.detail,
                        is_new          : data.new,
                        relative_time   : getRelativeTime(new Date(data.created_date.toDate())),
                        image           : data.image,
                        id              : notification.id
                    };

                    this.notification_data.push(notification_data)
                });

                if(!this.notification_data.length)
                {
                    this.is_notification_empty = true;
                }

                done()
            }, 1000)
        },
    },
    mounted()
    {
        // Set notification count to 0
        DB_USER.update(this.$_current_user_data.id, {notification_count: 0})
    },
    beforeDestroy()
    {
        // get all new notifs that has been fetched
        const fetched_new_notifs = this.notification_data.filter(n => n.is_new).map(n => n.id);

        // No need to call function if there's no new notif
        if(!fetched_new_notifs.length) {return 0}

        const data = {notif_ids: JSON.stringify(fetched_new_notifs)};
        fbCall(FN_READ_NEW_NOTIFICATION, data).then()
    }
}
</script>
