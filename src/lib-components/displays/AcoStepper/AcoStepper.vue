<template>
    <div class="aco-stepper">
        <div 
            v-for="(step, index) in steps" 
            :key="step + index" 
            :class="['aco-stepper__item', {'aco-stepper__item--has-label' : labels.length > 0}]" 
        >
            <div 
                :class="['aco-stepper__step', {'aco-stepper__step--navigate' : isInteractive}]" 
                :ref="'step-' + index"
                @click="changeStep(index)"
            >
                <div v-if="topLabels && topLabels.length" 
                    :class="['aco-stepper__step__label--top', {'aco-stepper__step__label--selected' : step === 'selected'}]"
                >
                    {{ translate(topLabels[index]) }}
                </div>
                <aco-icon
                    size="20px" 
                    :icon="step === 'completed' ? 'ph-check-circle-fill' : icons.length === 0 ? 'ph-circle' : icons[index]" 
                    :class="['aco-stepper__step__icon', {'aco-stepper__step__icon--colored' : step === 'selected' || step === 'completed', 'aco-theme': theme === acoTheme }]"
                /> 
                <div v-if="labels" 
                    :class="['aco-stepper__step__label', {'aco-stepper__step__label--wider' : allowLongerLabels}, {'aco-stepper__step__label--selected' : step === 'selected'}]"
                >
                    {{ translate(labels[index]) }}
                </div>
            </div>
            <div v-if="index < numSteps - 1" :class="['aco-stepper__line', {'aco-stepper__line--visited' : step === 'completed', 'aco-theme': theme === acoTheme}]" data-x-ray-border="bottom"></div>
        </div>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import '../../../styles/aco.scss'
import translateMixin from '../../../mixins/translateMixin';

/**
 * A stepper component to be used in things like setup wizards
 */
export default {
    name: 'aco-stepper',
    components: { 
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    mixins: [ translateMixin, themeMixin ],
    model: {
        prop: 'selectedValue', 
        event: 'step-change',
    },
    props: {
        /**
         * The number of steps
         */
        numSteps: {
            type: Number,
            required: true,
            validator: (value) => {
                return value > 1;
            }
        },
        /**
         * v-model
         * A value of < 0 will show all steps remaining upcoming with nothing selected
         * A value of >= `numSteps` will show all steps completed
         */
        selectedValue: {
            type: Number,
            required: false,
            default: 0,
        }, 
        /**
         * Optional icons to be used for each step- should be a list of phosphor icon strings eg `ph-bell`
         * When array is empty, circles will be used instead
         */
        icons: {
            type: Array,
            required: false,
            default: () => [],
            validator: (value) => {
                return value.every(e => typeof(e) === 'string');
            }
        },
        /**
         * Optional labels underneath the circles/icons
         * The labels should be only one line long unless allowLongerLabels is set to true
         */
        labels: {
            type: Array,
            required: false,
            default: () => [],
            validator: (value) => {
                return value.every(e => typeof(e) === 'string');
            }
        },
        /**
         * Optional labels above the circles/icons
         * Can be used in addition to the `labels`, but shouldn't be used by itself
         */
        topLabels: {
            type: Array,
            required: false,
            default: () => [],
            validator: (value) => {
                return value.every(e => typeof(e) === 'string');
            }
        },
        /**
         * Set to true when stepper should emit event when steps are clicked on.
         * Component will also add a pointer cursor
         */
        isInteractive: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Allow bottom labels to wrap to a second line 
         * Is normally false so that it stays a consistent size
         */
        allowLongerLabels: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    computed: {
        /** 
         * Array of step states- 'upcoming' is gray circle (or icon), 'selected' is outlined circle (or icon), 'completed' is filled in circle with check
         * ['completed', 'selected', 'upcoming'] 
         * */
        steps() {
            let steps = Array(this.numSteps).fill('upcoming');

            let lastSelected = Math.min(this.selectedValue, this.numSteps - 1);
            if (lastSelected >= 0) {
                steps = steps.fill('completed', 0, lastSelected + 1);
            }
            if (this.selectedValue >= 0 && this.selectedValue < this.numSteps) {
                steps[this.selectedValue] = 'selected';
            }
            return steps;
        },
    },
    created() {
        if (this.labels.length > 0 && this.labels.length !== this.numSteps) {
            console.error('aco-stepper: Number of labels should be the same as numSteps (if included)');
        }
        if (this.topLabels.length > 0 && this.topLabels.length !== this.numSteps) {
            console.error('aco-stepper: Number of top labels should be the same as numSteps (if included)');
        }
        if (this.icons.length > 0 && this.icons.length !== this.numSteps) {
            console.error('aco-stepper: Number of icons should be the same as numSteps (if included)');
        }
        for (let label of this.labels) {
            if (label.length > 30 && !this.allowLongerLabels) { //not an exact amount
                console.warn(`aco-stepper: label "${label}" is likely too long`);
            }
        }
    },
    methods: {
        changeStep(index) {
            if (this.isInteractive) {
                this.$emit('step-change', index);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";

    .aco-stepper { 
        display: flex;
        padding: 24px 32px;
        justify-content: center;

        &__item {
            display: flex;
            flex-grow: 1;
            position: relative;

            &--has-label {
                height: 32px;
            }

            &:last-of-type {
                flex-grow: 0;
            }
        }

        &__step {
            display: flex;
            align-items: center;
            flex-direction: column;

            &__icon {
                color: $aco-ui-400;
                margin: 0 8px;

                &--colored  {
                    color: $aco-default-primary;
                    &.aco-theme {
                        color: $aco-primary;
                    }
                }
            }

            &__label {
                @extend .aco-text;
                position: absolute; 
                width: fit-content;
                top: 18px; 
                text-align: center;
                max-height: 14px;
                overflow: hidden;
                font-size: $aco-text-xsmall;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: bold;
                color: $aco-ui-600;

                &--selected {
                    color: $aco-ui-900;
                }

                &--wider {
                    max-height: none;
                    width: 100px;
                }

                &--top {
                    @extend .aco-stepper__step__label;
                    width: 100px;
                    top: -16px;
                }
            }

            &--navigate {
                cursor: pointer;
            }
        }

        &__line {
            background-color: $aco-ui-400;
            height: 2px;
            flex-grow: 1;
            margin-top: 9px; //center on the 20px
            align-self: flex-start;
            border-radius: 1px;

            &--visited {
                background-color: $aco-default-primary;
                &.aco-theme {
                    background-color: $aco-primary;
                }
            }
        }
    }

</style>