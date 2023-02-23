<template> 
    <div :class="['aco-radio-button', {'aco-radio-button--left-label' : hasLeftLabel}, {'aco-disabled' : disabled}]" @click="toggle">
        <input 
            type="radio" 
            :name="name" 
            :id="id" 
            :value="value"
            :checked="isChecked"
            :aria-disabled="disabled"
            :tabindex="disabled ? '-1' : '0'"
            :class="['aco-radio-button__input', { 'selected' : isChecked, 'disabled' : disabled, 'aco-theme': theme === acoTheme }]" 
            data-x-ray="true"
        />
        <label
            :class="['aco-radio-button__label aco-text', {'disabled' : disabled}]"
            v-if="label"
            :for="id"
            :style="`margin-${hasLeftLabel ? 'right' : 'left'}: 8px`"
            :aria-disabled="disabled"
            data-x-ray="true"
        >
            {{ label }}
        </label>
    </div> 
</template>

<script>
import '../../../styles/aco.scss'
import themeMixin from '../../../mixins/themeMixin';

/**
 * Radio button component
 */
export default {
    name: 'aco-radio-button',
    model: { prop: 'selectedValue', event: 'selected'},
    mixins: [ themeMixin ],
    props: {
        /**
         * The `value` of which radio button is selected. Should be same type as value
         * Use v-model for this prop
         */
        selectedValue: {
            type: [String, Number],
            required: true,
        },
        /**
         * Value of radio button- helps determined if is selected
         */
        value: {
            type: [String, Number],
            required: true,
        },
        /** 
         * Required for form submission use or when using a label 
         */
        id: {
            type: String,
            required: false,
        },
        /**
         * Required for form submission use - groups radio buttons together
         */
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Positions the label on the left side of the radio button
         */
        hasLeftLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        isChecked() {
            return this.value === this.selectedValue;
        },
    },
    methods: {
        toggle(e) {
            e.preventDefault();
            if (this.disabled) {
                return;
            }
            this.$emit('selected', this.value);
        }
    },
    created() {
        if (this.label && !this.id) {
            console.error(`aco-radio-button: prop "id" is required when using "label"`);
        }
        if (typeof(this.value) !== typeof(this.selectedValue)) {
            console.error('aco-radio-button: value and selectedValue should be of the same type')
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.aco-radio-button {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;

    &--left-label {
        flex-direction: row-reverse;
    }

    &__label {
        line-height: 16px;
        cursor: pointer;
        margin: 0; // needs to be set to override screen.css. Inline styles are used in template to set left/right margin
    }

    &__input {
        -webkit-appearance: none;
        appearance: none;
        background-color: $aco-ui-white;
        margin: 0;
        width: 20px;
        height: 20px;
        border: 1px solid $aco-ui-300;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
    }

    &__input:hover:not(.disabled) {
        border: 2px solid $aco-default-primary;
        &.aco-theme {
            border-color: $aco-primary;
        }
    }

    /* ::before styles are for the inner circle */
    &__input::before { 
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 100%;
        transform: scale(0);
        transition: all 0.2s;
        /* It is suggested to use box-shadow instead of background so that when a page is printed out
            it remains visible. But since the shadow color is appearing inconsistently I'll keep both */
        box-shadow: inset 1em 1em $aco-ui-300;
        background-color: $aco-ui-300;
    }

    &__input:hover:not(.disabled)::before {
        transform: scale(1);
    }

    &__input.selected::before {
        transform: scale(1);
        box-shadow: inset 1em 1em $aco-default-primary;
        background-color: $aco-default-primary;
    }
    &__input.aco-theme.selected::before {
        box-shadow: inset 1em 1em $aco-primary;
        background-color: $aco-primary;
    }
    
}
.disabled {
    cursor: not-allowed;
}

</style>