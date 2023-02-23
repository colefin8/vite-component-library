<template>
    <component :is="`aco-${type}-media-input`"
        v-bind="$props"
        :typeLabel="typeLabel"
        @[editMedia]="$emit('edit-media')"
        @change="$emit('change', $event)"
        @remove-media="$emit('remove-media')"
        @main-action="$emit('main-action', $event)"
        @alt-action="$emit('alt-action', $event)"
    />
</template>

<script>
import themeMixin from '../../../../mixins/themeMixin';
import mediaInputMixin from './mediaInputMixin.js';
import AcoSingleMediaInput from './_AcoSingleMediaInput/_AcoSingleMediaInput.vue';
import AcoMultiMediaInput from './_AcoMultiMediaInput/_AcoMultiMediaInput.vue';

/**
 * The wrapping Media Input component. Can be set to single or multi media upload.
 * Prompts the user to select media from their computer.
 */
export default {
    name: 'aco-media-input',
    mixins: [mediaInputMixin, themeMixin],
    components: {
        AcoSingleMediaInput,
        AcoMultiMediaInput
    },
    model: { prop: 'mediaList', event: 'change' },
    props: {
        type: {
            type: String,
            default: 'single',
            validator: value => ['single', 'multi'].includes(value),
        },
        /**
         * A description or instructions about the media that should be uploaded.
         * Only used for single media input.
         */
        label: {
            type: String,
            default: ''
        },
        /**
         * The text to show on the main button. Only used on the single media input for now.
         */
        actionText: {
            type: String,
            default: ''
        },
        secondaryActionText: {
            type: String,
            default: ''
        },
        secondaryActionIcon: {
            type: String,
            default: ''
        },
        /**
         * Only used for SingleMediaInput for videos, it's not practical for usage in the MultiMediaInput
         */
        displayControls: {
            type: Boolean,
            default: true
        },
        /**
         * Only used for the SingleMediaInput, it will disable the edit/delete button hover overlay.
         */
        disableOverlay: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        editMedia() {
            return (this.type === 'single' && !!this.$listeners['edit-media']) ? 'edit-media' : null;
        },
        typeLabel() {
            let videosAllowed = this.accept.indexOf('video') !== -1;
            let imagesAllowed = this.accept.indexOf('image') !== -1;
            if (videosAllowed) {
                return imagesAllowed ?
                    'media' :
                    this.type === 'single' ? 'video' : 'videos';
            }
            return this.type === 'single' ? 'image' : 'images';
        }
    }
}
</script>