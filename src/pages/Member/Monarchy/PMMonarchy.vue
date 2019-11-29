<template>
    <div class="page-name monarchy">
        <div>
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                <q-tab name="unilevel_tree" label="Unilevel Tree" />
                <q-tab name="binary_tree" label="Binary Tree" />
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
                                <Children-Binary position="left" :data="binary_left" />
                                <Children-Binary position="right" :data="binary_right" />
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
        binary_left: null,
        binary_right: null,
    }),
    created()
    {
        this.$q.loading.show();
    },
    async mounted() 
    { 
        await this.$bind('childrens', DB_USER.collection().where('upline_id', '==', this.$_current_user_data.id));
        this.$q.loading.hide();
        this.$refs.tree.scrollLeft = (this.$refs.tree.scrollWidth - this.$refs.tree.clientWidth) / 2;
        this.$refs.tree.scrollTop = 1000;

        this.tab = this.$route.query.tab || 'unilevel_tree';

        // Get people to place
        this.paid_downline = await DB_USER.getPaidDownline(this.$_current_user_data.id);
        // console.log("unplaced_downline", this.unplaced_downline);
    },
    watch: {
        tab()
        {
            setTimeout(() =>
            {
                this.$refs.tree_binary.scrollLeft = (this.$refs.tree_binary.scrollWidth - this.$refs.tree_binary.clientWidth) / 2;
                this.$refs.tree_binary.scrollTop = 1000;
            });

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