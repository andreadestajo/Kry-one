<template>
    <div class="page-name monarchy">
        <div>
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                <q-tab name="unilevel_tree" label="Family Tree" />
                <q-tab name="binary_tree" label="Knight Match Tree" />
            </q-tabs>

            <q-separator />
        </div>

        <div v-show="tab == 'unilevel_tree'" class="tree-container"  ref="tree" v-dragscroll :style="`overflow: hidden; width: 100%; height: calc(100vh - 87px);`">
            <div :style="`width: 999999px; height: 999999px; padding-top: 1000px; margin-top: -980px; background-image: url(${require('../../../statics/grey.png')})`">
                <div class="tree" style="margin-top: 1000px;">
                    <ul>
                        <li>
                            <div>
                                <a href="#">
                                    <div class="image"><q-img spinner-size="5px" :src="this.$_current_user_data.photo_url ? this.$_current_user_data.photo_url : `../statics/boy.jpg`"></q-img></div>
                                    <div class="name">{{ this.$_current_user_data.full_name }}</div>
                                    <div class="rank">{{ this.$_current_user_data.nobility_info.title }}</div>
                                </a>
                            </div>
                            <ul>
                                <!-- LEFT & RIGHT -->
                                <Children :data="children" :key="key" v-for="(children, key) of childrens" />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-show="tab == 'binary_tree'" class="tree-container"  ref="tree_binary" v-dragscroll :style="`overflow: hidden; width: 100%; height: calc(100vh - 87px);`">
            <div :style="`width: 999999px; height: 999999px; padding-top: 1000px; margin-top: -980px; background-image: url(${require('../../../statics/grey.png')})`">
                <div class="tree" style="margin-top: 1000px;">
                    <ul>
                        <li>
                            <div>
                                <a href="javascript:">
                                    <div class="image"><q-img spinner-size="5px" :src="this.$_current_user_data.photo_url ? this.$_current_user_data.photo_url : `../statics/boy.jpg`"></q-img></div>
                                    <div class="name">{{ this.$_current_user_data.full_name }}</div>
                                    <div class="rank">{{ this.$_current_user_data.nobility_info.title }}</div>
                                </a>
                            </div>
                            <ul>
                                <Children-Binary :unplaced_downline="unplaced_downline" :upline="this.$_current_user_data" position="left" :data="binary_left" />
                                <Children-Binary :unplaced_downline="unplaced_downline" :upline="this.$_current_user_data" position="right" :data="binary_right" />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import KHeader          from '../../../components/Member/KHeader';
import Children         from "./PMMonarchyChildren";
import ChildrenBinary   from "./PMMonarchyChildrenBinary";
import { dragscroll }   from 'vue-dragscroll';
import DB_USER          from "../../../models/DB_USER";
import styles           from './PMMonarchy.scss';

export default
{
    filters: { },
    components: { Children, KHeader, ChildrenBinary },
    directives: { dragscroll },
    data:() =>(
    {
        childrens: null,
        tab: 'unilevel_tree',
        paid_downline   : [],
        binary_left_query: [],
        binary_right_query: [],
        binary_left: null,
        binary_right: null,
    }),
    created()
    {
        this.$q.loading.show();
    },
    async mounted() 
    { 
        await this.$bind('binary_left_query', DB_USER.collection().where("placement_id", "==", this.$_current_user_data.id).where("placement_position", "==", 'left'));
        await this.$bind('binary_right_query', DB_USER.collection().where("placement_id", "==", this.$_current_user_data.id).where("placement_position", "==", 'right'));
    
        this.binary_left = this.binary_left_query.length > 0 ? this.binary_left_query[0] : null;
        this.binary_right = this.binary_right_query.length > 0 ? this.binary_right_query[0] : null;
 
        await this.$bind('childrens', DB_USER.collection().where('upline_id', '==', this.$_current_user_data.id));
        this.$q.loading.hide();
        this.$refs.tree.scrollLeft = (this.$refs.tree.scrollWidth - this.$refs.tree.clientWidth) / 2;
        this.$refs.tree.scrollTop = 1000;

        this.tab = this.$route.query.tab || 'unilevel_tree';

        // Get people to place
        await this.$bind('paid_downline', DB_USER.collection().where('upline_id', '==', this.$_current_user_data.id).where('nobility_info.rank_order', '>', 1));

    },
    watch: {
        tab()
        {
            setTimeout(() =>
            {
                this.$refs.tree_binary.scrollLeft = (this.$refs.tree_binary.scrollWidth - this.$refs.tree_binary.clientWidth) / 2;
                this.$refs.tree_binary.scrollTop = 1000;
            });
        },
        binary_left_query()
        {
            this.binary_left = this.binary_left_query.length > 0 ? this.binary_left_query[0] : null;
        },
        binary_right_query()
        {
            this.binary_right = this.binary_right_query.length > 0 ? this.binary_right_query[0] : null;
        }
    },
    methods: { },
    computed:
    {
        unplaced_downline()
        {
            return this.paid_downline.filter(n => !n.hasOwnProperty('placement'));
        }
    }
}
</script>