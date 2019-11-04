<template>
    <q-dialog persistent v-model="is_show">
        <q-card :style="`width: ${card_width}; max-width: 900px;`">
            <q-card-section>
                <slot name="modal-header"></slot>

                <div v-if="!hasSlot('modal-header')" class="row">
                    <span class="text-h6">{{title}}</span>
                    <q-space/>
                    <q-btn icon="close" flat round dense
                           @click="closeModal"/>
                </div>
            </q-card-section>

            <q-card-section :style="`max-height: 70vh; height: ${card_section_height}`"
                            class="scroll">
                <slot v-if="!is_loading" name="modal-content"></slot>
                <q-inner-loading :showing="is_loading">
                    <q-spinner size="50px" :thickness="4" color="primary" />
                </q-inner-loading>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <slot name="modal-footer"></slot>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "KModal",
        data: () =>
        ({
            is_show    : false,
            is_loading : false
        }),
        props:
        {
            card_width          : {type: String, default: '600px'},
            card_section_height : {type: String, default: '20vh'},

            // Header
            title        : '',
            icon         : ''
        },
        methods:
        {
            showModal()
            {
                this.is_show = true;
            },
            hideModal()
            {
                this.is_show = false;
            },
            showLoading()
            {
                this.is_loading = true;
            },
            hideLoading()
            {
                this.is_loading = false;
            },
            hasSlot (name = 'default') {
                return !!this.$slots[ name ] || !!this.$scopedSlots[ name ];
            },
            closeModal()
            {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
