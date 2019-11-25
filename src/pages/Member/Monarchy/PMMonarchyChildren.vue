<template>
    <li>
        <a @click="checkChildren()" href="#">Child</a>
        <ul v-show="!is_hidden" v-if="has_children">
            <!-- Put Children Data HERE -->
            <Children />
            <Children />
        </ul>
    </li>
</template>

<script>
export default
{
    name: 'Children',
    filters: { },
    data:() =>(
    {
        has_children: false,
        is_hidden: false
    }),
    mounted() { },
    methods: 
    {
        checkChildren()
        {
            if (this.has_children)
            {
                this.is_hidden = !this.is_hidden;
            }
            else
            {
                this.$q.loading.show();
                setTimeout(() =>
                {
                    // Get Children Data HERE
                    this.has_children = true;
                    this.$q.loading.hide();
                }, 1000);
            }
        }
    },
    computed: { }
}
</script>