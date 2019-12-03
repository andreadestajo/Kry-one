<template>
    <div class="admin__header">
        <div class="fixer">
            <div v-if="!icon" class="back" @click="$router.go(-1)"><q-icon name="fa fa-arrow-left"></q-icon></div>
            <div v-if="icon" class="icon" ><q-icon :name="icon"></q-icon></div>
            <div class="title">
                <div class="title-main"><slot></slot></div>
                <div class="title-sub">{{ detail }}</div>
                <div class="title-right">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
        <div class="spacer"></div>
    </div>
</template>

<script>
    import styles from './KHeader.scss';

    export default
    {
        name: "KHeader",
        props: ['detail', 'icon']
    }
</script>
