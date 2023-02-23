<template>
    <div 
        class="aco-checkbox" 
        :class="classes" 
        @click.stop="toggle"
        @keydown.space="toggle"
    >
        <input class="aco-checkbox__input" tabindex="-1" type="checkbox" :name="name" :id="id" :checked="checked">
        <span
            :id="id"
            role="checkbox"
            :tabindex="disabled ? -1 : 0"
            :class="[
                'aco-checkbox__checkbox',
                {
                    'aco-checkbox__checkbox--checked': isChecked,
                    'aco-theme': theme === acoTheme
                }
            ]"
            :aria-checked="isChecked ? (indeterminate ? 'mixed' : 'true') : 'false'"
            :aria-disabled="disabled"
            :aria-readonly="readonly"
            data-x-ray="true"
        >
            <aco-icon class="aco-checkbox__icon-x" v-if="readonly && !checked" icon="ph-x-bold" />
            <aco-icon class="aco-checkbox__icon-check" v-else-if="!indeterminate" icon="ph-check-bold" />
            <aco-icon class="aco-checkbox__icon-minus" v-else-if="indeterminate" icon="ph-minus-bold" />
        </span>
        <label
            class="aco-checkbox__label aco-text"
            v-if="label"
            :for="id"
            :style="`margin-${hasLeftLabel ? 'right' : 'left'}: 8px`"
            data-x-ray="true"
        >
            {{ label }}
        </label>
    </div>
</template>

<script>

import themeMixin from '../../../mixins/themeMixin';

/** A typical checkbox that allows you to select single values */
export default {
    name: 'aco-checkbox',
    mixins: [themeMixin],
    components: { AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default), },
    model: { prop: 'checked', event: 'change' },
    props: {
        /** 
         * Required for form submission use or when using a label 
         */
        id: {
            type: String,
            required: false,
        },
        /**
         * Required for form submission use
         */
        name: {
            type: String,
            required: false,
        },
        /** Accepts type Boolean or Array of primitive types */
        checked: {
            validator(value) {
                let isValid = (typeof value === 'boolean' || (Array.isArray(value) && value.every(el => typeof el !== 'object' && typeof el !== 'function')));
                if (!isValid) {
                    console.error('aco-checkbox: prop "checked" must of type Boolean or Array of primitive types');
                }
                return isValid;
            },
            required: true,
        },
        /**
         * Value is required when v-modeling an array. It tells the checkbox what value to store in the array when checked.
         */
        value: {
            required: false,
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        /**
         * A state used to show if the checkbox is in an indeterminate state: neither true nor false.
         */
        indeterminate: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Positions the label on the left side of the checkbox
         */
        hasLeftLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Sets checkbox width to 100% of it's parent container (should only be used with hasLeftLabel)
         */
        isFullWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            /**
             * Keeps track of whether or not the checkbox is part of a checkbox group
             */
            hasCheckboxGroup: false,
        }
    },
    computed: {
        isChecked() {
            if (this.hasCheckboxGroup) {
                return this.checked.includes(this.value);
            } else {
                return this.checked;
            }
        },
        classes() {
            const classPrefix = 'aco-checkbox--';
            return {
                [`${classPrefix}left-label`]: this.hasLeftLabel,
                [`${classPrefix}full-width`]: this.isFullWidth,
                [`${classPrefix}readonly`]: this.readonly,
                'aco-disabled': this.disabled,
            };
        }
    },
    methods: {
        toggle(e) {
            e.preventDefault();
            if (this.disabled || this.readonly) {
                return;
            }

            if (this.hasCheckboxGroup) {
                if (this.isChecked) {
                    this.$emit('change', this.checked.filter(v => v !== this.value));
                } else {
                    this.$emit('change', [...this.checked, this.value]);
                }
            } else {
                this.$emit('change', !this.checked);
            }
        }
    },
    created() {
        if (Array.isArray(this.checked)) {
            this.hasCheckboxGroup = true;
        }
        if (this.hasCheckboxGroup && !this.value && this.value !== 0) {
            console.error(`aco-checkbox: prop "value" is required when "checked" is of type Array`);
        }
        if (this.label && !this.id) {
            console.error(`aco-checkbox: prop "id" is required when using "label"`);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.aco-checkbox {
    display: inline-flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;

    &:not(.aco-disabled):not(#{&}--readonly) {
        cursor: pointer;
    }

    &--left-label {
        flex-direction: row-reverse;
    }

    &--full-width {
        width: 100%;
    }

    &__input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    &__checkbox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        background: $aco-ui-white;
        border: solid 1px $aco-ui-300;
        border-radius: 4px;
        transition: all 0.2s;
        flex-shrink: 0;
        &--checked {
            background-color: $aco-default-primary;
            border-color: $aco-default-primary;
            &.aco-theme {
                background-color: $aco-primary;
                border-color: $aco-primary;
            }
        }
    }

    &__icon-check, &__icon-minus, &__icon-x {
        transform: scale(0.5);
        transition: transform 0.2s;
        font-size: 16px;
        color: $aco-ui-white;
    }
    &__checkbox--checked &__icon-check,
    &__checkbox--checked &__icon-minus {
        transform: scale(1);
    }

    &__label {
        pointer-events: none;
        line-height: 18px;
        padding-top: 1px;
        margin-top: 0;
        margin-bottom: 0;
    }

    /* Readonly */
    &--readonly {
        cursor: default;
    }
    &--readonly &__checkbox {
        border-color: transparent;
        &--checked {
            background-color: transparent;
            border-color: transparent;
        }
    }
    &--readonly &__icon-check,
    &--readonly &__icon-minus, 
    &--readonly &__icon-x {
        position: relative;
        top: 1px;
        transform: scale(1.25); // using font size instead makes the checkbox offset vertically
        color: $aco-ui-400;
    }
    &--readonly &__label {
        font-weight: bold;
    }
}

.aco-button-selector__item__input-component.aco-checkbox {
    .aco-checkbox__label {
        margin: 0px;
    }
}
</style>