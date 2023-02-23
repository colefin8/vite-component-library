<template>
    <div class="aco-mmi">
        <div :class="[
                `aco-mmi__container${mediaList.length ? '' : '--empty'}`,
                inputStatusClass,
                {'aco-disabled': disabled, 'drop-border': isDragging}
            ]"
            @drop.prevent="addMedia($event)"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            data-x-ray="true"
        >
            <!-- TODO: translate this when inline tags are supported -->
            <p v-if="mediaList.length === 0" class="aco-p-medium aco-text-600">
                Drop new {{typeLabel}} here or <span class="aco-mmi__add-text" role="button" tabindex="0" @click="$refs.fileInput.click()">upload {{typeLabel}}.</span>
            </p>
            <template v-else>
                <truncated-list>
                    <div
                        class="aco-mmi__media-container"
                        v-for="(media, index) in mediaList"
                        :key="media.alt + index"
                    >
                        <component
                            :is="media.tag"
                            :src="media.src"
                            :alt="media.alt"
                            class="aco-mmi__media"
                        />
                        <div class="aco-media__overlay" @click="removeMedia(index)">
                            <div class="aco-media__overlay-background"></div>
                            <div class="aco-media__overlay-buttons">
                                <aco-icon icon="ph-trash" color="#FFF"/>
                            </div>
                        </div>
                    </div>
                    <template #overflow-indicator="{numHiddenChildren}">
                        <span class="aco-p-medium aco-text-600">+{{ numHiddenChildren }} more</span>
                    </template>
                </truncated-list>
                <p class="aco-p-medium aco-text-600 aco-mmi__options-text">
                    <span
                        class="aco-mmi__add-text"
                        role="button"
                        tabindex="0"
                        @click="$refs.fileInput.click()"
                    >
                        Add more
                    </span>
                    or
                    <span
                        class="aco-mmi__remove-text"
                        role="button"
                        tabindex="0"
                        @click="isRemovePromptOpen = true"
                    >
                        remove all
                    </span>
                    {{typeLabel}}.
                </p>
            </template>
            <input :id="id" :name="id" type="file" ref="fileInput" :accept="accept" @change="addMedia" hidden multiple/>
        </div>
        <aco-form-alert
            v-if="statusMessage"
            :status="status"
            class="media-input__alert"
        >
            {{ statusMessage }}
        </aco-form-alert>
        <aco-modal
            v-model="isRemovePromptOpen"
            title="Remove Media"
            submit-label="Remove"
            close-label="Cancel"
            @submit="removeAllMedia"
        >
            <p class="aco-p-medium">{{ translate(`Are you sure you want to remove all ${typeLabel}?`) }}</p>
        </aco-modal>
    </div>
</template>

<script>
import translateMixin from '../../../../../mixins/translateMixin.js';
import mediaInputMixin from '../mediaInputMixin.js';
import TruncatedList from './TruncatedList.vue';

export default {
    name: 'aco-multi-media-input',
    mixins: [translateMixin, mediaInputMixin],
    components: {
        AcoFormAlert: () => import('../../../../displays/notifications/AcoFormAlert/AcoFormAlert.vue').then(d => d.default),
        AcoIcon: () => import('../../../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoModal: () => import('../../../../displays/AcoModal/AcoModal.vue').then(d => d.default),
        TruncatedList,
    },
    props: {
        /**
         * Computed in AcoMediaInput, it's the correct word to display, i.e. "Drop new media".
         */
        typeLabel: {
            type: String,
            required: true,
            validator: val => ['media', 'images', 'videos'].includes(val)
        }
    },
    data() {
        return {
            isRemovePromptOpen: false,
        }
    },
    methods: {
        addMedia(event) {
            this.isDragging = false;
            if (this.disabled) {
                return;
            }
            // Note: the file input value will not and cannot properly update on drop due to how the html works
            let files = (event.type == 'drop') ? event.dataTransfer.files : event.target.files;
            if (!files.length) {
                return;
            }

            let newMediaList = [...this.mediaList];
            for (let i = 0; i < files.length; i++) {
                let tag = this.getFileTag(files[i]);
                let reader = new FileReader();
                reader.onload = (e) => {
                    newMediaList.push({alt: files[i].name, src: e.target.result, file: files[i], tag});
                    if (i === files.length - 1) {
                        this.$emit('change', newMediaList);
                    }
                }
                reader.readAsDataURL(files[i]);
            }
        },
        removeMedia(index) {
            this.$emit('change', this.mediaList.filter((img, idx) => idx !== index));
        },
        removeAllMedia() {
            this.isRemovePromptOpen = false;
            // reset the fileInput completely
            this.$refs.fileInput.value = null;
            this.$refs.fileInput.files = new DataTransfer().files;
            this.$emit('change', []);
        },
        getFileTag(file) {
            if (file.type.match('image.*')) {
                return 'img';
            }
            if (file.type.match('video.*')) {
                return 'video';
            }
        }
    }
}
</script>