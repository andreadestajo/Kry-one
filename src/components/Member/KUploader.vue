<template>
    <div class="kuploader">
        <div v-if="!uploading" class="kuploader__container" @click="openFileBrowser()">
            <q-icon name="fa fa-upload"></q-icon> Click here to upload
        </div>
        <div  v-if="uploading" class="kuploader__output" ref="upload_output">
            THIS IMAGE
        </div>
        <input accept="image/*" @change="uploadFile()" ref="uploader" class="hidden-uploader" type="file">
    </div>
</template>

<script>
    import styles from './KUploader.scss';
    export default
    {
        name: "KUploader",
        props: ['value'],
        data:() =>(
        {
            file_reader: null,
            uploading: false,
            image:
            {
                file : '',
                name: '',
                size: 0,
            }
        }),

        mounted()
        {
            let thisref = this;
            this.file_reader = new FileReader();
            this.file_reader.onload = function(fileLoadedEvent)
            {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                var newImage = document.createElement('img');
                newImage.src = srcData;

                thisref.$refs.upload_output.innerHTML = newImage.outerHTML;
                thisref.image = newImage.outerHTML;
            }
        },

        methods:
        {
            uploadFile()
            {
                this.uploading = true;
                let image = this.$refs.uploader.files[0];
                this.image.name = image.name;
                this.image.size = image.size;
                console.log(image);
                console.log(this.image);

                this.file_reader.readAsDataURL(image);
            },
            openFileBrowser()
            {
                this.$refs.uploader.click();
            }
        },
    }
</script>