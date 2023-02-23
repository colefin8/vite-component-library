<template>
    <div class="aco-tooltip"
        ref="target"
        tabindex="0"
        @focus="showTooltip" 
        @mouseenter="showTooltip" 
        @focusout="hideTooltip" 
        @mouseleave="hideTooltip"
        :aria-describedby="tooltipId"
    >
        <!-- @slot Use this for the main content that when clicked or hovered the tooltip appears -->
        <slot>
            <!-- @slot hover slot is deprecated -->
            <slot name="hover"></slot>
        </slot>
        <div
            v-if="hasContent"
            :id="tooltipId"
            ref="tooltip"
            role="tooltip"
            class="aco-text aco-tooltip__body aco-tooltip__content"
            :class="{'aco-tooltip__body--visible': isShowingTooltip}"
            :style="tooltipStyle"
        >
            <!-- @slot Use this for the HTML content inside the tooltip -->
            <slot name="content">{{ content }}</slot>
            <div class="aco-tooltip__arrow" data-popper-arrow></div>
        </div>
    </div>
</template>

<script>
import '../../../styles/aco.scss'
import './AcoTooltip.scss';
import { _optionsPlacement } from '../../../propTypes';
import { createPopper } from '@popperjs/core'; //see https://popper.js.org/

const isPositiveNum = (number) => {
    return number >= 0;
}

const isPositiveNumOrString = (number) => {
    return isPositiveNum(number) || typeof number === 'string';
}

/**
 * Tooltip for showing additional information.
 * There are 8 different placement options depending on where it should appear in relation to the main content.
 * Note that when it is scrolled out of view, the tooltip will move to stay in view. To observe this behavior, see https://popper.js.org/
 * Wrap the content that will display the tooltip when hovered over with the tooltip component (in the default slot)
 * To denote content that will be inside the tooltip, simply use the content prop for plain text, or for HTML content use the '#content' slot
 * Note: '#name' is the same as 'v-slot:name' in Vue 2.6+
 */
export default {
    name: 'aco-tooltip',
    props: {
        /**
         * A page-unique ID for the tooltip for accessibility purposes
         * If not given, the component will use its own generated id
         */
        id: {
            type: String,
            required: false,
        },
        placement: {
            type: String,
            default: _optionsPlacement.TOP,
            validator(value) {
                return Object.values(_optionsPlacement).includes(value);
            },
        },
        /**
         * Time in milliseconds to delay the appearance of the tooltip
         */
        delayMilliseconds: {
            type: Number,
            default: 0,
            validator: isPositiveNum,
        },
        maxHeight: {
            type: [String, Number],
            default: 256,
            validator: isPositiveNumOrString,
        },
        maxWidth: {
            type: [String, Number],
            default: 196,
            validator: isPositiveNumOrString,
        },
        /** 
         * Set the width value to overwrite the standard width of the tooltip (which is based on the parent/ancestor)
         */
        width: {
            type: [String, Number],
            required: false,
            validator: isPositiveNumOrString,
        },
        /**
         * Plain text to display in the tooltip, if content slot is empty
         */
        content: {
            type: String,
            require: false,
        },
        /**
         * Set the position to 'fixed' to allow overflow outside of relatively or absolutely placed containers
         */
        fixedPosition: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            tooltipInstance: null,
            isShowingTooltip: false,
            timeoutHandler: Function,
        }
    },
    computed: {
        hasContent() {
            return this.content || !!this.$slots.content;
        },
        tooltipStyle() {
            return {
                maxWidth: this.tooltipMaxWidth,
                maxHeight: this.tooltipMaxHeight,
                width: this.tooltipWidth
            };
        },
        strategy() {
            return this.fixedPosition ? 'fixed' : 'absolute';
        },
        tooltipId() {
            return this.id || `tooltip_${this._uid}`;
        },
        tooltipWidth() { return typeof(this.width) === 'number' ? `${this.width}px` : this.width; },
        tooltipMaxWidth() { return typeof(this.maxWidth) === 'number' ? `${this.maxWidth}px` : this.maxWidth; },
        tooltipMaxHeight() { return typeof(this.maxHeight) === 'number' ? `${this.maxHeight}px` : this.maxHeight; },
    },
    mounted() {
        if (this.hasContent) {
            this.$nextTick(() => {
                this.tooltipInstance = createPopper(this.$refs.target, this.$refs.tooltip, {
                    strategy: this.strategy,
                    placement: this.placement,
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8]
                            }
                        },
                    ]
                });
            });
        }
    },
    watch: {
        fixedPosition() {
            this.tooltipInstance.setOptions(options => ({
                ...options,
                strategy: this.strategy,
            }));
        },
        placement() {
            this.tooltipInstance.setOptions(options => ({
                ...options,
                placement: this.placement
            }));
        }
    },
    methods: {
        hideTooltip() {
            clearTimeout(this.timeoutHandler);
            this.isShowingTooltip = false;
        },
        showTooltip() {
            this.timeoutHandler = setTimeout(() => {
                this.isShowingTooltip = true;
            }, this.delayMilliseconds);
        },
    },
    updated() {
        this.$nextTick(() => {
            this.tooltipInstance?.update();
        });
    }
};
</script>
