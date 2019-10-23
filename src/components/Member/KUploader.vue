<template>
    <div class="kuploader">
        <div v-if="!uploading" class="kuploader__container" @click="openFileBrowser()">
            <q-icon name="fa fa-upload"></q-icon> Click here to upload
        </div>
        <div  v-if="uploading" class="kuploader__output">
            <div class="image" ref="upload_output">
                <img src="../../statics/be.jpg">
            </div>
            <div class="loading" v-if="!is_done">
                <q-circular-progress class="loader" show-value font-size="12px" :value="progress" size="50px" :thickness="0.22" color="primary" track-color="white" />
            </div>
        </div>
        <input accept="image/*" @change="uploadFile()" ref="uploader" class="hidden-uploader" type="file">
    </div>
</template>

<script>
    import styles         from './KUploader.scss';
    import {STORAGE_ROOT} from "../../references/refs_cloud_storage";

    export default
    {
        name: "KUploader",
        props:
        {
            value       : {type: String},
            storage_ref : '' // default cloud storage would be root
        },
        data:() =>(
        {
            file_reader : null,
            uploading   : false,
            is_done     : false,
            progress    : 0,
            image:
            {
                file : '',
                name: '',
                size: 0,
            }
        }),
        mounted()
        {
            this.file_reader        = new FileReader();
            this.file_reader.onload = (fileLoadedEvent) =>
            {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                var newImage = document.createElement('img');
                newImage.src = srcData;

                this.$refs.upload_output.innerHTML = newImage.outerHTML;
                this.image = newImage.outerHTML;
            }
        },

        methods:
        {
            uploadFile()
            {
                this.uploading = true;
                this.is_done   = false;
                let image = this.$refs.uploader.files[0];
                this.image.name = image.name;
                this.image.size = image.size;

                this.file_reader.readAsDataURL(image);

                // Start uploading the file here
                this.storeToCloudStorage(image)
                    .then(url => {
                        this.$emit('input', url);
                        this.is_done = true;
                        console.log("done uploading");
                    })

            },
            storeToCloudStorage(file) {
                let STORAGE     = this.storage_ref ? this.storage_ref : STORAGE_ROOT((new Date).getTime());
                const metadata  = {contentType: file.type};

                const uploadTask = STORAGE.put(file, metadata);

                const _this = this;
                return new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', function(snapshot) {
                        // Progress indicator
                        _this.progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                       console.log()
                    }, function(error) {
                        reject(error);
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            resolve(downloadURL);
                        });
                    });
                })
            },
            openFileBrowser()
            {
                this.$refs.uploader.click();
            }
        },
    }
</script>
