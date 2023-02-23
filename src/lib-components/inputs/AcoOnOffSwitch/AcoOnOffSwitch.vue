<template>
    <div
        class="aco-on-off-switch aco-text"
        :class="{'aco-disabled': disabled, 'aco-readonly': readonly, 'aco-on-off-switch--on': checked}"
        @click="toggleSwitch"
        @keypress.enter="toggleSwitch"
        @keypress.space.prevent="toggleSwitch"
        role="switch"
        :tabindex="disabled ? -1 : 0"
        :aria-checked="checked"
        :aria-disabled="disabled"
        :aria-readonly="readonly"
        data-x-ray="true"
    >
        <input class="aco-on-off-switch__checkbox" type="checkbox" :name="name" :id="id" :checked="checked" tabindex="-1">
        <div class="aco-on-off-switch__text">
            <span class="aco-on-off-switch__text-value" :class="{'aco-on-off-switch__text-value--hidden': !checked}" aria-hidden="true">{{ translate(onLabel) }}</span>
            <span class="aco-on-off-switch__text-value" :class="{'aco-on-off-switch__text-value--hidden': checked}" aria-hidden="true">{{ translate(offLabel) }}</span>
        </div>
        <div :class="[
            'aco-on-off-switch__circle',
            ( checked ? 'aco-on-off-switch__circle--on' : 'aco-on-off-switch__circle--off' ),
            { 'aco-theme': theme === acoTheme }
        ]"></div>
    </div>
</template>

<script>
import translateMixin from '../../../mixins/translateMixin';
import themeMixin from '../../../mixins/themeMixin';

/**
 * An on-off switch checkbox to be used for toggling settings/options on or off.
 */
export default {
    name: 'aco-on-off-switch',
    model: { prop: 'checked', event: 'change' },
    components: { AcoTooltip: () => import('../../displays/AcoTooltip/AcoTooltip.vue').then(d => d.default), },
    mixins: [ translateMixin, themeMixin ],
    props: {
        /** Required for form submission use or for being connected to a label */
        id: {
            type: String,
            required: false,
        },
        /** Required for form submission use */
        name: {
            type: String,
            required: false,
        },
        /** The checked state of the switch  */
        checked: {
            type: Boolean,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        readonly: {
            type: Boolean,
            default: false,
            required: false,
        },
        onLabel: {
            type: String,
            default: 'On',
            required: false
        },
        offLabel: {
            type: String,
            default: 'Off',
            required: false
        }
    },
    methods: {
        toggleSwitch() {
            if (this.disabled || this.readonly) {
                return;
            }
            this.$emit('change', !this.checked);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.aco-on-off-switch {
    $circle-diameter: 24px;
    $circle-margin: 4px;
    $circle-offset: ($circle-diameter + $circle-margin * 2);

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-shrink: 0;
    height: $circle-offset;
    min-width: $circle-diameter * 3;
    max-width: fit-content;
    background-color: $aco-ui-white;
    border: $aco-border;
    border-color: $aco-ui-300;
    border-radius: $circle-offset;
    user-select: none;
    transition: all $aco-animation-fast;
    cursor: pointer;

    &.aco-disabled {
        cursor: not-allowed;
    }

    &.aco-readonly {
        background-color: $aco-ui-white;
        border-color: $aco-ui-white;
        cursor: default;
    }

    &__checkbox {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    &__text {
        display: grid;
        width: 100%;

        &-value {
            grid-column: 1;
            grid-row: 1;
            opacity: 1;
            text-align: center;
            transition: opacity $aco-animation-fast;
    
            &:first-of-type {
                padding: 0 $circle-offset 0 8px;
            }
            &:last-of-type {
                padding: 0 8px 0 $circle-offset;
            }
            &--hidden {
                opacity: 0;
            }
        }
    }

    &__circle {
        position: absolute;
        top: 0;
        left: 0;
        margin: $circle-margin;
        height: $circle-diameter;
        width: $circle-diameter;
        border-radius: 100%;
        transition: all $aco-animation-fast;

        &--off {
            background-color: $aco-ui-600;
        }
        &--on {
            left: calc(100% - $circle-offset);
            background-color: $aco-default-primary;
            &.aco-theme {
                background-color: $aco-primary;
            }
        }
    }
}
</style>
