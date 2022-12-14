<template>
    <q-pull-to-refresh @refresh="refreshNotifications">
        <div class="notification" ref="scrollTargetRef">
            <k-header style="margin-top: 40px" detail="Get live information about events">Notifications</k-header>
            <k-card class="q-my-md">
                <div v-if="is_notification_empty" class="notification__label">
                    <span class="list">No notifications yet.</span>
                </div>
                <q-infinite-scroll class="notification__list"
                                   @load="fetchNotifications"
                                   ref="notificationRef"
                                   :scroll-target="$refs.scrollTargetRef">
                    <div v-for="notif in notification_data" :class="`list ${notif.is_new}`" @click="action(notif)">
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
    </q-pull-to-refresh>
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
        first_history         : null,
        is_notification_empty : false,
        new_count             : 0,
    }),
    methods: 
    {
        action(data)
        {
            // crypto notification
            if (data.others.tx_hash)
            {
                if (data.others.currency === 'ETH')
                {
                    window.open(`https://etherscan.io/tx/${ data.others.tx_hash }`);
                }
                else
                {
                    window.open(`https://blockchain.info/btc/tx/${ data.others.tx_hash }`);
                }
            }
        },
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

                if(notifications.length)
                {
                    // If there's no last history yet means that this is the first time you fetch data
                    if(!this.last_history)
                    {
                        this.first_history = notifications[0]; // get doc
                    }

                    // Get last document and assign to start_after
                    this.last_history = notifications[notifications.length - 1];

                    // warning. Change this too if you wanna change the default limit
                    if(notifications.length < 10)
                    {
                        if(this.$refs.notificationRef) {
                            this.$refs.notificationRef.stop()
                        }
                    }
                } else {
                    this.$nextTick(function () {
                        if(this.$refs.notificationRef) {
                            this.$refs.notificationRef.stop()
                        }
                    });
                }

                // Push to notifications
                notifications.forEach(notification =>
                {
                    const data = notification.data();

                    // Structure data
                    const notification_data =
                    {
                        detail          : data.detail,
                        is_new          : this.new_count > 0 ? 'new' : 'old',
                        relative_time   : getRelativeTime(new Date(data.created_date.toDate())),
                        image           : data.image,
                        id              : notification.id,
                        others          : data.options
                    };

                    this.new_count = this.new_count - 1;

                    this.notification_data.push(notification_data)
                });

                if(!this.notification_data.length)
                {
                    this.is_notification_empty = true;
                }

                done()
            }, 1000)
        },
        refreshNotifications(done)
        {
            setTimeout(async () => {
                console.log('fetching new notifications');
                this.resetNotificationCount();

                if(!this.first_history)
                {
                    this.fetchNotifications();
                    done();
                    return 0;
                }

                const new_notifications = await DB_NOTIFICATION.getUserNotifications(
                    this.$_current_user_data.id,
                    {end_before: this.first_history}
                );

                if(!new_notifications.length) {done(); return 0}

                // Set new first history
                this.first_history = new_notifications[0];

                // Push to notifications
                new_notifications.reverse();
                new_notifications.forEach(notification =>
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

                    this.notification_data.unshift(notification_data)
                });

                done()
            }, 500)
        },
        resetNotificationCount()
        {
            DB_USER.update(this.$_current_user_data.id, {notification_count: 0})
        }
    },
    mounted()
    {
        // Set notification count to 0
        this.new_count = this.$_current_user_data.notification_count;
        console.log(this.new_count);
        this.resetNotificationCount();
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
