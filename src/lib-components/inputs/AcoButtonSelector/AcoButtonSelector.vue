<template>
    <div class="aco-button-selector">
        <div 
            v-for="option in options"
            :key="option.value" 
            :class="[
                'aco-button-selector__item', 
                {
                    'aco-button-selector__item--selected' : isSelected(option.value), 
                    'aco-theme' : theme === acoTheme
                }
            ]"
            @click="toggleOption(option.value)"
            data-x-ray="true"
        >
            <!-- @slot DEPRECATED: to use an avatar pass in an image and/or initials -->
            <slot :name="option.value">
                <aco-avatar v-if="option.image || option.initials" :url="option.image" :initials="option.initials" size="xsmall" alt="Button Image" class="aco-button-selector__item__image" :theme="theme" />
            </slot>
            <aco-checkbox
                v-if="multiSelect" 
                v-model="selectedCheckboxes" 
                :id="option.value"
                :name="name"
                :value="option.value" 
                :label="option.label" 
                :hasLeftLabel="true"
                :theme="theme"
                class="aco-button-selector__item__input-component"
            />
            <aco-radio-button
                v-else
                v-model="selectedRadio"
                :id="option.value"
                :name="name"
                :value="option.value"
                :label="option.label"
                :hasLeftLabel="true"
                :theme="theme"
                class="aco-button-selector__item__input-component"
            />
        </div>
    </div>
</template>

<script>
import '../../../styles/aco.scss'
import themeMixin from '../../../mixins/themeMixin';

/**
 * Tiles with checkboxes (or radio buttons).
 * Can include a small circle image
 */
export default {
    mixins: [themeMixin],
    components: {
        AcoCheckbox: () => import('../AcoCheckbox/AcoCheckbox.vue').then(d => d.default),
        AcoRadioButton: () => import('../AcoRadioButton/AcoRadioButton.vue').then(d => d.default),
        AcoAvatar: () => import('../../displays/AcoAvatar/AcoAvatar.vue').then(d => d.default),
    },
    name: 'aco-button-selector',
    model: {
        prop: 'selected',
        event: 'change',
    },
    props: {
        /**
         * When using multi-select (checkboxes), should be of type array
         * Otherwise (radio buttons), should be the same type as the value of the selected option
         * v-modeled
         */
        selected: {
            type: [Array, String, Number],
            required: false,
            // validated in subComponents
        },
        /**
         * Array of objects that include the labels, values, and optionally images
         * Example: [{ label: 'Teamwork', value: 'teamwork', image: 'myImage.jpg' }, ]
         */
        options: {
            type: Array,
            required: true,
            validator(value) {
                return value.every((val) => {
                    return val.hasOwnProperty('label') && typeof(val.label) === 'string' && val.hasOwnProperty('value');
                });
            },
        },
        /**
         * Name needed for subComponents
         */
        name: {
            type: String,
            required: true,
        },
        /**
         * When true uses checkboxes, when false uses radio buttons
         */
        multiSelect: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            selectedCheckboxes: [],
            selectedRadio: '',
        }
    },
    created() {
        if (this.multiSelect && !Array.isArray(this.selected)) {
            console.error('aco-button-selector: prop "selected" should be an array when "multiSelect" == true');
        }
        if (!this.multiSelect && typeof(this.selected) !== 'string') {
            console.error('aco-button-selector: prop "selected" should be of type string when "multiSelect" == false')
        }

        if (Array.isArray(this.selected)) {
            this.selectedCheckboxes = this.selected;
        } else {
            this.selectedRadio = this.selected;
        }
    },
    methods: {
        isSelected(val) {
            if (this.multiSelect) {
                return this.selectedCheckboxes.includes(val);
            } else {
                return val === this.selectedRadio; 
            }
        },
        toggleOption(val) {
            // handle toggle in this component so that can click on whole tile
            if (this.multiSelect) {
                if (this.selectedCheckboxes.includes(val)) {
                    this.selectedCheckboxes = this.selectedCheckboxes.filter(v => v != val);
                } else {
                    this.selectedCheckboxes.push(val);
                }
            } else {
                this.selectedRadio = val;
            }
        }
    },
    watch: {
        selectedCheckboxes() {
            if (this.multiSelect) {
                this.$emit('change', this.selectedCheckboxes);
            }
        },
        selectedRadio() {
            if (!this.multiSelect) {
                this.$emit('change', this.selectedRadio);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";

.aco-button-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    &__item {
        display: flex;
        align-items: center;
        padding: 5px; // this makes the whole button 32px tall. 6px vertical padding and at least 6px horizontal padding (with border)
        border: 1px solid $aco-ui-300;
        @include opaque-overlay($aco-border-radius-normal);
        cursor: pointer;

        .aco-avatar,
        &__image {
            height: 24px;
            width: 24px;
            border-radius: 100%;
            margin: -2px 4px -2px 0;
        }

        &__input-component {
            pointer-events: none; // handle toggle in this component so that can click on whole tile
            padding-left: 2px;
        }
    }

    &__item:last-of-type {
        margin-right: 0;
    }

    &__item--selected {
        background-color: $aco-default-primary;
        border-color: $aco-default-primary;
        &.aco-theme {
            background-color: $aco-primary;
            border-color: $aco-primary;
        }
    }
}
</style>