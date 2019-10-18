<template>
    <div class="kuploader">
        <div class="kuploader__container" @click="openFileBrowser()">
            <q-icon name="fa fa-upload"></q-icon> Click here to upload
        </div>
        <input ref="uploader" class="hidden-uploader" type="file">
    </div>
</template>

<script>
    import styles from './KUploader.scss';
    export default
    {
        name: "KUploader",
        props: ['value'],
        methods:
        {
            openFileBrowser()
            {
                this.$refs.uploader.click();
            }
        }
    }
</script>