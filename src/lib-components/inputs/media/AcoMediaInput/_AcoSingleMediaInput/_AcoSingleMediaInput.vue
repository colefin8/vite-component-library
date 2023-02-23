<template>
    <div class="aco-smi">
        <div class="aco-smi__row"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent
        >
            <div
                :class="[
                    'aco-smi__media-container',
                    inputStatusClass,
                    {
                        'aco-disabled': disabled,
                        'aco-media__background': media,
                        'drop-border': isDragging
                    }
                ]"
                @drop="setMedia($event)"
                data-x-ray="true"
            >
                <div v-if="!media" class="aco-smi__no-media-text aco-text-600" translate="no">
                    {{ translate(emptyStateText) }}
                </div>
                <template v-else>
                    <div v-if="!disableOverlay" class="aco-media__overlay">
                        <div class="aco-media__overlay-background"></div>
                        <div class="aco-media__overlay-buttons">
                            <aco-button
                                v-if="hasEditButton"
                                icon="ph-pencil-simple"
                                button-style="secondary"
                                aria-label="edit-button"
                                :theme="theme"
                                @click="editMedia"
                            >
                            </aco-button>
                            <aco-button
                                icon="ph-trash"
                                button-style="secondary"
                                status="danger"
                                aria-label="remove-media"
                                @click="removeMedia"
                            >
                            </aco-button>
                        </div>
                    </div>
                    <component
                        :is="mediaType"
                        :class="['aco-smi__media', `aco-media--${mediaFit}`]"
                        :src="media.src"
                        :alt="media.alt"
                        :controls="displayControls"
                        controlslist="nodownload nofullscreen noremoteplayback noplaybackrate"
                        disablepictureinpicture
                    />
                </template>
            </div>
            <div class="aco-smi__info">
                <div class="aco-smi__info-button-container">
                    <aco-button
                        button-style="secondary"
                        class="aco-smi__info-button"
                        :disabled="disabled"
                        translate="no"
                        size="small"
                        :theme="theme"
                        @click="onActionClick"
                    >
                        {{ translate(buttonText) }}
                    </aco-button>
                    <template v-if="secondaryActionText">
                        <aco-button
                            button-style="tertiary"
                            class="aco-smi__info-button"
                            :disabled="disabled"
                            translate="no"
                            :theme="theme"
                            :icon="secondaryActionIcon"
                            @click="onSecondaryActionClick"
                        >
                            {{ translate(secondaryActionText) }}
                        </aco-button>
                    </template>
                </div>
                <input :id="id" :name="id" type="file" ref="fileInput" :accept="accept" @change="setMedia" hidden/>
                <p :class="['aco-p-medium aco-text-600', {'aco-disabled': disabled}]" translate="no">{{ translate(label) }}</p>
            </div>
        </div>
        <aco-form-alert
            v-if="statusMessage"
            :status="status"
            class="media-input__alert"
        >
            {{ translate(statusMessage) }}
        </aco-form-alert>
    </div>
</template>

<script>
import themeMixin from '../../../../../mixins/themeMixin';
import translateMixin from '../../../../../mixins/translateMixin.js';
import mediaInputMixin from '../mediaInputMixin.js';
import '../../../../../styles/aco.scss';

/**
 * WARNING: SHOULD NOT AND CANNOT BE USED DIRECTLY; Is used as part of AcoMediaInput.
 * 
 * Media input component. Emits an upload event with the file being uploaded, receives an media url to display if upload succeeds.
 * DOES NOT ACTUALLY UPLOAD THE FILE.  You must upload the file emitted from this component manually, and then pass the returned url to this component to display the uploaded media
 */
export default {
    name: 'aco-single-media-input',
    mixins: [translateMixin, mediaInputMixin, themeMixin],
    components: {
        AcoButton: () => import('../../../AcoButton/AcoButton.vue').then(d => d.default),
        AcoFormAlert: () => import('../../../../displays/notifications/AcoFormAlert/AcoFormAlert.vue').then(d => d.default),
    },
    props: {
        /**
         * A description or instructions about the media that should be uploaded.
         */
        label: {
            type: String,
            default: ''
        },
        /**
         * The text to show on the main button.
         * If present, overrides the default behavior of prompting the user to
         * select a file from their computer and instead emits an event.
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
        displayControls: {
            type: Boolean,
            default: true
        },
        /**
         * Computed in AcoMediaInput, it's the correct word to display, i.e. "Upload Image".
         */
        typeLabel: {
            type: String,
            required: true,
            validator: val => ['media', 'image', 'video'].includes(val)
        },
        disableOverlay: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        media() {
            return this.mediaList.length ? this.mediaList[0] : null;
        },
        emptyStateText() {
            return this.emptyText || `No ${this.capitalTypeLabel}`;
        },
        buttonText() {
            return this.media ? `Replace ${this.capitalTypeLabel}` : (this.actionText || `Upload ${this.capitalTypeLabel}`);
        },
        hasEditButton() {
            return !!this.$listeners['edit-media'];
        },
        mediaType() {
            if (this.media?.file?.type?.match('image.*')) {
                return 'img';
            }
            if (this.media?.file?.type?.match('video.*')) {
                return 'video';
            }
            // if fileType is provided (i.e. 'video') it will use that; defaults to 'img'
            return this.media?.fileType || 'img';
        },
        capitalTypeLabel() {
            return this.typeLabel.charAt(0).toUpperCase() + this.typeLabel.slice(1);
        }
    },
    methods: {
        editMedia() {
            this.$emit('edit-media');
        },
        removeMedia() {
            // reset the fileInput completely
            this.$refs.fileInput.value = null;
            this.$refs.fileInput.files = new DataTransfer().files;
            this.$emit('change', []);
            this.$emit('remove-media');
        },
        setMedia(event) {
            this.isDragging = false;
            if (this.disabled) {
                return;
            }
            let files = (event.type == 'drop') ? event.dataTransfer.files : event.target.files;
            if (!files.length) {
                return;
            }
            let reader = new FileReader();
            reader.onload = (e) => {
                let fileObj = {src: e.target.result, alt: files[0].name, file: files[0]}
                this.$emit('change', [fileObj]);
            }
            reader.readAsDataURL(files[0]);
            this.$refs.fileInput.files = files;
        },
        onActionClick() {
            if (!this.actionText) {
                this.$refs.fileInput.click();
            } else {
                this.$emit('main-action');
            }
        },
        onSecondaryActionClick() {
            this.$emit('alt-action');
        }
    }
};
</script>