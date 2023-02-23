<template>
    <div>
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
        <fieldset class="radio-bar"
            :class="classes"
            v-cloak
            @keydown="onKeyDown"
            role="radiogroup"
            data-x-ray="padded"
            :id="inputId"
        >
            <transition name="slide">
                <!-- This is the marker, will slide to show which option is selected and change width to fit that option -->
                <span v-if="!isReadOnly" class="radio-bar__marker radio-bar__button-text aco-text" :class="{'radio-bar__marker--small': isSmall}" :style="sliderStyle" aria-hidden="true" tabindex="-1"></span>
            </transition>
            <aco-radio-bar-button
                :name="name"
                ref="button"
                :read-only="isReadOnly || readonly"
                v-for="(option, index) in options"
                @inner-select="select"
                :key="`${option.name + index}`"
                :option="option"
                :index="index"
                :selected-index="selectedIndex"
                :isSmall="isSmall"
                :disabled="disabled"
                :tabindex="index === selectedIndex ? 0 : -1"
            />
        </fieldset>
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted} from 'vue';

import labelMixin from '../../../mixins/labelMixin';
import translateMixin from '../../../mixins/translateMixin';
import AcoRadioBarButton from './_AcoRadioBarButton.vue';

/**
 * Radio Bar to select between an array of options.
 * Don't use for an on/off switch
 */
export default defineComponent({
    name: 'aco-radio-bar',
    components: {
        AcoRadioBarButton,
    },
    mixins: [labelMixin, translateMixin],
    props: {
        /**
         * Array of options. Each option requires a name and id
         */
        options: {
            type: Array,
            required: true,
            validator(prop) {
                // check to see if every object in the options prop has a "name" property, if they all do the lengths of the filter and original array will be equal.
                return prop.filter((obj) => 'name' in obj && 'id' in obj).length === prop.length;
            }
        },
        /**
         * Id of the selected option that is bound to the model.
         */
        value: {
            type: [Number, String, Boolean],
            required: true,
        },
        /**
         * Ensures that radio buttons get grouped properly if there are more than one set on the same page.  Should be unique across the page per set of radio inputs.  See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-name
         */
        name: {
            type: String,
            required: true,
        },
        /**
         * A Boolean indicating whether or not to use the small vertical size for the radio bar.
         */
        isSmall: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * A Boolean indicating whether or not to use the darker background for the radio bar.
         */
        useDarkBackground: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props, {emit}) {
        const selectedIndex = ref(0);
        const sliderStyle = ref(`transform: translateX(0px);`);
        const button = ref(null);

        const findIndexOfOption = (optionId) => {
            return props.options.findIndex(o => o.id === optionId);
        };

        const calcSliderStyle = (index) => {
            let el;
            if (button.value) {
                el = button.value[index].$el;
                // I don't know why but it needs to be offset by 4 px.  Maybe the padding?
                sliderStyle.value = `transform: translateX(${el.offsetLeft - 4}px); width: ${button.value[index].$el.clientWidth}px;`;
            }
        };

        watch(() => props.value, (newVal) => {
            selectedIndex.value = findIndexOfOption(newVal);
            calcSliderStyle(selectedIndex.value);
        });

        onMounted(() => {
            // note: the initial value of props.value could be false or zero
            let initialIndex = findIndexOfOption(props.value);
            selectedIndex.value = initialIndex === -1 ? 0 : initialIndex;
            calcSliderStyle(selectedIndex.value);
        });

        const select = (index) => {
            if (!props.disabled && !props.isReadOnly && !props.readonly) {
                // There is a watch for the selectedOption that will fire after this emit
                emit('input', props.options[index].id);
            }
        };

        const onKeyDown = (e) => {  
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    selectedIndex.value--;
                    if (selectedIndex.value < 0) {
                        selectedIndex.value = props.options.length - 1;
                    }
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    selectedIndex.value++;
                    if (selectedIndex.value >= props.options.length) {
                        selectedIndex.value = 0;
                    }
                    break;
            }     
            button.value[selectedIndex.value].$el.focus();
            select(selectedIndex.value); 
        };

        const isReadOnly = computed(() => {
            return props.options.length <= 1;
        });

        const classes = computed(() => {
            return {
                'radio-bar--read-only': props.isReadOnly,
                'aco-disabled': props.disabled, 
                'radio-bar--dark-background': props.useDarkBackground, 
                'radio-bar--small': props.isSmall
            };
        });

        return {
            select,
            onKeyDown,
            sliderStyle,
            isReadOnly,
            button,
            selectedIndex,
            classes,
        };
    }
})
</script>