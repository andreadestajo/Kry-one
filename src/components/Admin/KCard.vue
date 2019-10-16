<template>
    <q-card class="my-card">
        <q-card-section v-if="content_padding">
            <slot name="section"></slot>
        </q-card-section>

        <slot name="content" v-if="!content_padding"></slot>
    </q-card>
</template>

<script>
    export default
    {
        name: "KCard",
        props: {
            content_padding: {type: Boolean, default: true}
        }
    }
</script>

<style scoped>
    .q-card {
        border-radius: 20px;
    }
</style>
