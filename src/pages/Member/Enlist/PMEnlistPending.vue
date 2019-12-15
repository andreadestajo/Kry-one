<template>
    <div class="enlistPending">
        <k-header detail="Lorem ipsum">PENDING ENLIST</k-header>
        <div class="enlistPending__list">
            <k-card v-for="enlistment in pendingEnlistments" :key="enlistment.id" class="item">
                <div class="item-badge">
                    <div :style="`background-color: ${enlistment.nobility_badge_color}`" class="circle"></div>
                </div>
                <div class="item-detail">
                    <div class="detail"><b>{{enlistment.full_name}}</b></div>
                    <div class="detail">{{enlistment.email}}</div>
                    <div class="detail">{{enlistment.nobility_title}}</div>
                    <div class="time">{{getRelativeTime(enlistment.created_at.toDate())}}</div>
                </div>
            </k-card>
        </div>
    </div>
</template>

<script>
    import './PMEnlistPending.scss';

    import KHeader from '../../../components/Member/KHeader';
    import KCard   from '../../../components/Member/KCard';
    import KField  from '../../../components/Member/KField';

    import DB_ENLIST_KNIGHT  from '../../../models/DB_ENLIST_KNIGHT'
    import {getRelativeTime} from "../../../utilities/DateUtils";

    export default
    {
        components: { KHeader, KCard, KField},
        data: () =>
        ({
            pendingEnlistments: []
        }),
        methods: {
            getRelativeTime
        },
        async mounted()
        {
            this.$_showPageLoading();
            await DB_ENLIST_KNIGHT.bindPendingEnlistments(this, this.$_current_user_data.id);
            this.$_hidePageLoading();
        }
    }
</script>
