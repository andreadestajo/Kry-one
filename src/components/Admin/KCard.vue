<template>
    <q-card class="kcard">
        <q-card-section v-if="content_padding">
            <slot name="section"></slot>
        </q-card-section>

        <slot name="content" v-if="!content_padding"></slot>
    </q-card>
</template>

<script>
    import './KCard.scss';

    export default
    {
        name: "KCard",
        props: {
            content_padding: {type: Boolean, default: true}
        }
    }
</script>

<style scoped>

</style>
