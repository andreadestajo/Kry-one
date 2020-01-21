<template>
    <li>
        <a v-if="data" href="javascript:">
            <div @click="checkChildren()">
                <div class="image"><q-img spinner-size="5px" :src="data.photo_url ? data.photo_url : `../statics/boy.jpg`"></q-img></div>
                <div class="name">{{ data.full_name }}</div>
                <div class="rank">{{ data.nobility_info.title }}</div>
                <!-- <div class="points">PV: {{ ((data.binary_point_value || 0) * 1000).toFixed(0)  }}</div>
                <div class="points">Left: {{ ((data.binary_points_left || 0) * 1000).toFixed(0)  }}</div>
                <div class="points">Right: {{ ((data.binary_points_right || 0) * 1000).toFixed(0)  }}</div> -->
            </div>
            <!-- <div unelevated label="Back" type="reset" class="q-mt-sm full-width" value="hello" name="hello" @click="copyLink(data.id)">COPY ID</div> -->
        </a>
        <a v-if="!data" href="javascript:" style="background-color: #aaa" @click="placementConfirmation()">
            <div>
                + Place Your Knight Mate
            </div>
        </a>

        <ul v-if="has_children">
            <Children-Binary :unplaced_downline="unplaced_downline" :upline="data" position="left" :data="binary_left" />
            <Children-Binary :unplaced_downline="unplaced_downline" :upline="data" position="right" :data="binary_right" />
        </ul>

        <!-- PLACE DOWNLINE DIALOG -->
        <q-dialog class="placement-dialog" v-model="placement_dialog">
            <q-card v-if="unplaced_downline.length > 0" class="q-pa-md" style="width: 400px;">
                <div class="placement-dialog__form">
                    <div class="label">Choose Knight Mate to Place</div>
                    <q-select outlined class="input"
                            v-model="downline_to_place"
                            dense
                            :options="unplaced_downline"
                            option-value="id"
                            option-label="full_name">
                    </q-select>
                </div>

                <div class="placement-dialog__message" v-if="downline_to_place">
                    <div>Are you sure you want to place<br><b>{{ downline_to_place.full_name }}</b> on <b>{{ position }}</b> of <b>{{ upline.full_name }}</b>?</div>
                    <div class="q-mt-sm">
                        <q-btn @click="placeDownline()" color="primary" unelevated class="q-mr-md">Confirm</q-btn>
                        <q-btn @click="placement_dialog = false" unelevated>Cancel</q-btn>
                    </div>
                </div>
            </q-card>

            <q-card v-if="unplaced_downline.length == 0" class="q-pa-md" style="width: 400px;">
                <div>
                    <div style="text-align: center; ">You don't have any pending knight mate to place.</div>
                </div>
            </q-card>
        </q-dialog>
    </li>
</template>

<script>
import DB_USER                  from "../../../models/DB_USER";
import { fbCall }               from "../../../utilities/Callables";
import { FN_PLACE_DOWNLINE }    from "../../../references/refs_functions";

export default
{
    name: 'ChildrenBinary',
    filters: { },
    props:
    {
        data: Object,
        position: String,
        upline: Object,
        unplaced_downline: Array,
    },
   
    data:() =>(
    {
        has_children: false,
        is_hidden: false,
        childrens: null,
        placement_dialog: false,
        downline_to_place: null,
        binary_left: null,
        binary_right: null,
        binary_left_query: [],
        binary_right_query: [],
    }),
    mounted()
    {
        console.log(this.data);
    },
    methods: 
    {
        async placeDownline()
        {
            this.$q.loading.show()
            let placement_info          = {};

            placement_info.user_id      = this.downline_to_place.id; 
            placement_info.position     = this.position; 
            placement_info.upline_id    = this.upline.id;

            try
            {
                let res = await fbCall(FN_PLACE_DOWNLINE, placement_info);
                this.$q.notify({ message: res.data.message, color: 'green' });
            }
            catch(err)
            {
                this.$q.notify({ message: err.message, color: 'red' });
            }

            this.$q.loading.hide();
            this.placement_dialog = false;
        },
        placementConfirmation()
        {
            this.downline_to_place = null;
            this.placement_dialog = true;
            console.log(this.upline, this.position);
        },
        async checkChildren()
        {
            this.$q.loading.show();
            await this.$bind('binary_left_query', DB_USER.collection().where("placement_id", "==", this.data.id).where("placement_position", "==", 'left'));
            await this.$bind('binary_right_query', DB_USER.collection().where("placement_id", "==", this.data.id).where("placement_position", "==", 'right'));
            this.binary_left = this.binary_left_query.length > 0 ? this.binary_left_query[0] : null;
            this.binary_right = this.binary_right_query.length > 0 ? this.binary_right_query[0] : null;
            this.has_children = true;
            this.$q.loading.hide();

            // if (this.has_children)
            // {
            //     this.has_children = false;
            //     this.$unbind('childrens');
            // }
            // else
            // {
            //     this.$q.loading.show();
            //     await this.$bind('childrens', DB_USER.collection().where('upline_id', '==', this.data.id));
            //     this.has_children = true;
            //     this.$q.loading.hide();
            // }
        },
        copyLink(id)
        {
            const el = document.createElement('textarea');
            el.value = id;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert(id + " copied");
        }
    },
    computed: { },
    watch: {
        binary_left_query()
        {
            this.binary_left = this.binary_left_query.length > 0 ? this.binary_left_query[0] : null;
        },
        binary_right_query()
        {
            this.binary_right = this.binary_right_query.length > 0 ? this.binary_right_query[0] : null;
        }
    },
}
</script>