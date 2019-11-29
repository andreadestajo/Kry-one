<template>
    <li>
        <a v-if="data" href="javascript:">
            <div @click="checkChildren()">
                <div class="image"><q-img spinner-size="5px" :src="data.photo_url ? data.photo_url : `../statics/boy.jpg`"></q-img></div>
                <div class="name">{{ data.full_name }}</div>
                <div class="rank">{{ data.nobility_info.title }}</div>
            </div>
        </a>
        <a v-if="!data" href="javascript:" style="background-color: #aaa" @click="placementConfirmation()">
            <div>
                + Place Downline
            </div>
        </a>

        <!-- PLACE DOWNLINE DIALOG -->
        <q-dialog class="placement-dialog" v-model="placement_dialog">
            <q-card class="q-pa-md" style="width: 400px;">
                <div class="placement-dialog__form">
                    <div class="label">Choose Downline to Place</div>
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
        </q-dialog>
    </li>
</template>

<script>
import DB_USER from "../../../models/DB_USER";

export default
{
    name: 'Children',
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
    }),
    mounted()
    {
        console.log(this.data);
    },
    methods: 
    {
        placeDownline()
        {

        },
        placementConfirmation()
        {
            this.downline_to_place = null;
            this.placement_dialog = true;
            console.log(this.upline, this.position);
        },
        async checkChildren()
        {
            if (this.has_children)
            {
                this.has_children = false;
                this.$unbind('childrens');
            }
            else
            {
                this.$q.loading.show();
                await this.$bind('childrens', DB_USER.collection().where('upline_id', '==', this.data.id));
                this.has_children = true;
                this.$q.loading.hide();
            }
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
    computed: { }
}
</script>