<template>
    <div class="radio-bar__button-wrapper" @click="$emit('inner-select', index)" role="radio" :aria-checked="selectedIndex === index">
        <label
            class="radio-bar__button radio-bar__button-text aco-text"
            :class="{'radio-bar__button--small': isSmall, 'radio-bar__button--pipe': pipe, 'radio-bar__button--selected': selectedIndex === index}">
            {{ option.name }}
        </label>
        <input type="radio" :checked="selectedIndex === index" :name="name" class="radio-bar__input" :disabled="disabled || readOnly" />
    </div>
</template>

<script>
export default {
    name: 'aco-radio-bar-button',
    /**
     * Since this component will only ever be rendered by the parent (never manually), all these props are required
     */
    props: {
        option: {
            type: Object,
            required: true,
            validator(value) {
                return "name" in value;
            },
        },
        selectedIndex: {
            type: Number,
            required: true,
            validator(value) {
                return value >= 0;
            },
        },
        index: {
            type: Number,
            required: true,
            validator(value) {
                return value >= 0;
            },
        },
        name: {
            type: String,
            required: true,
        },
        isSmall: {
            type: Boolean,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        readOnly: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        // function to determine if the pipe should be placed between options.  Each RadioBarButton handles the pipe to its left on the page
        // basically if the button is the left most button, is selected, or if the button to its left is selected, don't show the pipe
        pipe() {
            return this.index > 0 && this.index - 1 !== this.selectedIndex && this.index !== this.selectedIndex;
        },
    },
};
</script>