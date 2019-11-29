<template>
    <li>
        <a href="javascript:">
            <div @click="checkChildren()">
                <div class="image"><q-img spinner-size="5px" :src="data.photo_url ? data.photo_url : `../statics/boy.jpg`"></q-img></div>
                <div class="name">{{ data.full_name }}</div>
                <div class="rank">{{ data.nobility_info.title }}</div>
            </div>
            <div unelevated label="Back" type="reset" class="q-mt-sm full-width" value="hello" name="hello" @click="copyLink(data.id)">COPY ID</div>
        </a>

        <ul v-if="has_children">
            <template v-if="childrens.length">
                <Children :data="children" :key="key" v-for="(children, key) of childrens" />
            </template>
            <template v-else>
                <li style="width: 100%;">
                    <a href="javascript:" style="background-color: #aaa;">
                        <div class="no-downline">No Downline</div>
                    </a>
                </li>
            </template>
        </ul>
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
        data: Object
    },
    data:() =>(
    {
        has_children: false,
        is_hidden: false,
        childrens: null
    }),
    mounted() { },
    methods: 
    {
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