<template>
    <div class="aco-textarea aco-input aco-text" :style="{ width: textareaWidth, }">

        <aco-label v-if="label || required"
            :prefix-icon="labelPrefixIcon"
            :text="label"
            :label-for="inputId"
            :context="labelContext"
            :tooltip-text="labelTooltipText"
            :required="required"
            :required-text="`${translate(requiredText)}`"
            :readonly="readonly"
            :tooltip-icon="labelTooltipIcon"
            :class="{ 'aco-disabled': disabled }"
        />

        <div v-if="readonly" class="aco-input__readonly aco-readonly">
            {{ inputText }}
        </div>
        <textarea v-else
            v-model="inputText"
            :id="inputId"
            :disabled="disabled"
            :maxlength="maxlength"
            :minlength="minlength"
            :placeholder="placeholder"
            :required="required"
            :class="[ 'aco-input__input', `aco-input__input--${inputStatus}`, { 'aco-disabled': disabled }]"
            :style="{
                width: textareaWidth,
                height: textareaHeight,
                minWidth: textareaMinWidth,
                minHeight: textareaMinHeight,
                resize: resizeOption,
            }"
            @input="onInput"
            @change="onChange"
            ref="textArea"
            data-x-ray="true"
        />

        <div v-if="!readonly && (statusMessage || !isValid || maxlength)" :class="['aco-input__footer', { 'aco-disabled': disabled }]">
            <aco-form-alert v-if="statusMessage || !isValid" :status="inputStatus" class="aco-input__status">
                {{ statusMessage || 'Invalid input' }}
            </aco-form-alert>
            <span v-else></span>
            <small v-if="maxlength > 0" class="aco-input__char-count" :class="{ 'aco-status-text-danger': charCount > maxlength, 'aco-disabled': disabled }" data-x-ray="true">
                {{ charCount }} / {{ maxlength }}
            </small>
        </div>
    </div>
</template>

<script>
import './AcoTextarea.scss';
import labelMixin from '../../../mixins/labelMixin';
import translateMixin from '../../../mixins/translateMixin';
import { _optionsStatus, _optionsResize } from '../../../propTypes.js';

/**
 * Box for inputting longer text with debounced output
 */
export default {
    name: 'aco-textarea',
    model: {
        event: 'change',
    },
    components: {
        AcoFormAlert: () => import('../../displays/notifications/AcoFormAlert/AcoFormAlert.vue').then(d => d.default),
        AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    mixins: [ labelMixin, translateMixin, ],
    props: {
        /** Entered text or value of the input */
        value: {
            type: [String, Number],
            required: false,
        },
        /** Prompting text shown before text entered */
        placeholder: {
            type: String,
            required: false,
        },
        /** message shown under the input */
        statusMessage: {
            type: String,
            required: false,
        },
        /** shows icon and color code the statusMessage */
        status: {
            type: String,
            validator(value) {
                return Object.values(_optionsStatus).includes(value);
            },
            required: false,
            default: _optionsStatus.NEUTRAL
        },
        /**
         * Disables checking if the input is valid on blur
         */
        manualValidation: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** min length of text allowed */
        minlength: {
            type: Number,
            required: false,
        },
        /** maximum length of text allowed */
        maxlength: {
            type: Number,
            required: false,
        },
        /** initial width of the textarea */
        width: {
            type: [String, Number],
            required: false,
            default: 300,
        },
        /** initial height of the textarea (will be overridden if autoresize is enabled) */
        height: {
            type: [String, Number],
            required: false,
            default: 90,
        },
        /** 
         * resize options:
         *  auto: (default) resizes the height automatically based on content
         *  none: size is fixed and cannot be changed by user
         *  horizontal: user can resize the width
         *  vertical: user can resize the height
         *  both: user can resize the width and height
         */
        resize: {
            type: String,
            validator(value) {
                return typeof value === 'string' && Object.values(_optionsResize).includes(value);
            },
            required: false,
            default: _optionsResize.AUTO,
        },
        /** minimum width of a text area in pixels */
        minWidth: {
            type: [String, Number],
            required: false,
            default: 40,
        },
        /** minimum height of a text area in pixels */
        minHeight: {
            type: [String, Number],
            required: false,
            default: 40,
        },
    },
    data() {
        return {
            inputText: null,
            isValid: true,
        };
    },
    computed: {
        inputStatus() {
            return this.isValid ? this.status : 'danger';
        },
        charCount() {
            return (this.inputText || '').length;
        },
        resizeOption() {
            return this.resize === 'auto' ? 'none' : this.resize
        },
        textareaWidth() { return typeof(this.width) === 'number' ? `${this.width}px` : this.width; },
        textareaHeight() { return typeof(this.height) === 'number' ? `${this.height}px` : this.height; },
        textareaMinWidth() { return typeof(this.minWidth) === 'number' ? `${this.minWidth}px` : this.minWidth; },
        textareaMinHeight() { return typeof(this.minHeight) === 'number' ? `${this.minHeight}px` : this.minHeight; },
    },
    created() {
        this.inputText = this.value;
    },
    mounted() {
        this.$nextTick(this.autosizeTextarea);
    },
    watch: {
        resize() {
            this.autosizeTextarea();
        }
    },
    methods: {
        onInput() {
            this.autosizeTextarea();
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                /** Emit change with debounce */
                this.$emit('change', this.inputText);
            }, 500);
        },
        onChange(event) {
            this.isValid = this.manualValidation || ((!this.required && this.inputText === '') ? true : event.target.validity?.valid);
            /** Return validation results */
            this.$emit('validate', event.target.validity, event.target.validationMessage);
        },
        autosizeTextarea() {
            if (this.resize !== 'auto') {
                this.$refs.textArea.style.overflow = 'auto';
            } else {
                let element = this.$refs.textArea;
                if (element) {
                    element.style.height = 'auto';
                    element.style.height = element.scrollHeight + 'px';
                    element.style.overflow = (
                        element.scrollHeight >= this.maxHeight
                        ? 'auto'
                        : 'hidden'
                    );
                }
            }
        },
    }
};
</script>
