<template>
    <div class="aco-label" :readonly="readonly" data-x-ray="true">
        <aco-icon v-if="prefixIcon" :icon="prefixIcon" />
        <label :for="labelFor">
            <!-- @slot Text of the label. Can be entered as the text parameter or in the default slot. NOTE: this slot's contents will overwrite the text parameter. -->
            <slot>{{ translate(text) }}</slot>
            <span v-if="context" class="aco-text-600">({{ translate(context) }})</span>
        </label>
        <aco-tooltip v-if="tooltipText" :content="translate(tooltipText)">
            <aco-icon :icon="tooltipIcon" />
        </aco-tooltip>
        <sup v-if="required && requiredText" class="required-text">*{{ translate(requiredText) }}</sup>
    </div>
</template>

<script>

import './AcoLabel.scss';
import translateMixin from '../../../mixins/translateMixin';

/**
 * Used above inputs, form rows, etc.  Needs to replace current labels on existing components
 */
export default {
    name: 'aco-label',
    components: {
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoTooltip: () => import('../AcoTooltip/AcoTooltip.vue').then(d => d.default),
    },
    mixins: [ translateMixin, ],
    props: {
        /**
         * Optional icon that appears to the left of the label
         */
        prefixIcon: {
            type: String,
            required: false,
            default: ''
        },
        /** 
         * Text of the label.  Can be entered as the text parameter or in the default slot.
         * NOTE: default slot contents will overwrite this text.
         */
        text: {
            type: String,
            required: false,
            default: ''
        },
        /**
         * Id of the input that this label is tied to. 
         */
        labelFor: {
            type: String,
            required: false,
            default: ''
        },
        /**
         * Text that appears to the right of the label in parenthesis with a lighter text color
         */
        context: {
            type: String,
            required: false,
            default: ''
        },
        /**
         * Text that will appear in a tooltip to the right of the label
         */
        tooltipText: {
            type: String,
            required: false,
            default: ''
        },
        /**
         * Icon for the tooltip.  Defaults to 'ph-info'
         */
        tooltipIcon: {
            type: String,
            required: false,
            default: 'ph-info',
        },
        /**
         * Shows text in red to the far right of the label.
         */
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Required text. Defaults to 'Required'
         */
        requiredText: {
            type:  String,
            required: false,
            default: 'Required',
        },
        /**
         * Read-only state of the label for use with read-only inputs
         */
        readonly: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
}

</script>
