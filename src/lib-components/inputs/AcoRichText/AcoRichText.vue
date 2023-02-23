<template>
    <div :class="['aco-rich-text', { disabled: disabled, readonly: readonly}]" data-x-ray="true">
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
        <froala tag="textarea" :config="config" v-model="model" :id="inputId">
            <slot>{{ model }}</slot>
        </froala>
    </div>
</template>

<script>
import Vue from 'vue';

require('froala-editor/js/froala_editor.pkgd.min.js');
require('froala-editor/js/plugins.pkgd.min.js');

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('froala-editor/css/froala_style.min.css');

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';
Vue.use(VueFroala);

const licenseKey = 'vYA6mA5C5E4G3B3B11C5eMRPYf1h1REb1BGQOQIc2CDBREJImA11C8D6D5B1G4I3F2F3A8==';

import labelMixin from '../../../mixins/labelMixin';
import translateMixin from '../../../mixins/translateMixin';

/**
 * Text area that supports rich text (HTML)
 */
export default {
    name: 'aco-rich-text',
    components: {
        VueFroala,
    },
    mixins: [ labelMixin, translateMixin, ],
    model: {
        event: 'change',
    },
    props: {
        /**
         * The initial text shown in the rich text box.  Has two-way binding
         */
        value: {
            type: String,
            required: false,
        },
        /**
         * Array of buttons in the toolbar grouped into subarrays.
         * Can also be an object, broken into separate toolbars with an array of buttons, the number of buttons visible, and their alignment.
         * Possible buttons: [
         *      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'
         *      'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote',
         *      'formatOLSimple', 'formatOL', 'formatUL', 'outdent', 'indent',
         *      'insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR',
         *      'undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help',
         * ],
         */
        toolbarButtons: {
            type: [Array, Object],
            required: false,
            default: () => [
                ['bold', 'italic', 'underline', 'clearFormatting'],
                ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                ['formatOL', 'formatUL', 'outdent', 'indent'],
                ['insertLink'],
                ['undo', 'redo', 'selectAll']
            ],
        },
        /**
         * Shows a + icon button for adding items
         * Possible options: ['image', 'video', 'table', 'ol', 'ul', 'hr'],
         */
        quickInsertButtons: {
            type: Array,
            required: false,
            default: () => null
        },
        /**
         * Set to false to allow pasting HTML
         */
        pastePlain: {
            type: Boolean,
            default: true,
            required: false,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            config: {
                key: licenseKey,
                attribution: false,
                quickInsertButtons: this.quickInsertButtons || [],
                quickInsertEnabled: !!(this.quickInsertButtons || []).length,
                toolbarButtons: this.toolbarButtons,
                pastePlain: this.pastePlain,
                placeholderText: this.placeholder,
            },
        };
    },
    computed: {
        model: {
            get() { 
                return this.value;
            },
            set(model) { 
                this.$emit('change', model);
            }
        }
    }
};
</script>

<style lang="scss" scoped>

    @import '../../../../src/styles/aco.scss';

    .readonly {
        pointer-events: none;
    }

    .disabled > :not(.aco-label) {
        pointer-events: none;
        opacity: $aco-disabled-opacity;
    }

</style>