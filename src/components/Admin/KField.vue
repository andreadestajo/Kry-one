<template>
    <div class="kfield">
        <div v-if="label" class="kfield__label">{{ label }}</div>
        <div v-if="note" class="kfield__note">{{ note }}</div>
        <slot></slot>
        <div v-if="error_message" class="kfield__error">{{ error_message }}</div>
    </div>
</template>

<script>
    import styles from './KField.scss';
    export default
    {
        name: "KField",
        props: ['label', 'note', 'error_message']
    }
</script>
