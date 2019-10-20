<template>
    <div class="kuploader">
        <div v-if="!uploading" class="kuploader__container" @click="openFileBrowser()">
            <q-icon name="fa fa-upload"></q-icon> Click here to upload
        </div>
        <div  v-if="uploading" class="kuploader__output" ref="upload_output">
                <q-knob
                    class="text-light-blue q-ma-md"
                    show-value
                    v-model="progress"
                    size="50px"
                    color="light-blue"
                />
        </div>
        <input accept="image/*" @change="uploadFile()" ref="uploader" class="hidden-uploader" type="file">
    </div>
</template>

<script>
    import styles from './KUploader.scss';

    import {STORE_MEMBER_IDS} from "../../references/refs_cloud_storage";

    export default
    {
        name: "KUploader",
        props: ['value'],
        data:() =>(
        {
            file_reader : null,
            uploading   : false,
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

                this.file_reader.readAsDataURL(image);

                // Start uploading file here
                this.storeToCloudStorage(image)
                    .then(url => {
                        this.$emit('input', url);
                        this.uploading = false;
                    })

            },
            storeToCloudStorage(file) {

                const user_id    = this.$_current_user_data.uid;
                const metadata   = {contentType: file.type};

                const uploadTask = STORE_MEMBER_IDS(`IDS_${user_id}`).put(file, metadata);

                const _this = this;
                return new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', function(snapshot) {
                        // Progress indicator
                        _this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
