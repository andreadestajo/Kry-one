<template>
    <div class="kfield">
        <div class="kfield__label">{{ label }}</div>
        <slot></slot>
    </div>
</template>

<script>
    import styles from './KField.scss';
    export default
    {
        name: "KField",
        props: ['label']
    }
</script>