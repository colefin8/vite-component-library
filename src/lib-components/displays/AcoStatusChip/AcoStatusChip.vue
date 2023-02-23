<template>
    <div :class="[
        'aco-status-chip',
        {
            'aco-status-chip--small': size === 'small',
            'aco-status-chip__dropdown-open': isDropdownOpen,
            'aco-status-chip__dropdown-closed': (isDropdownOpen === false)
        }]" 
        @click="$emit('click')" 
        @keydown.enter="$emit('click')"
        :tabindex="isDropdownOpen !== undefined ? '0' : ''"
        data-x-ray="true"
    >
        <span :class="['aco-status-chip__circle', `aco-status-background-medium-${status}`]"></span>
        <span class="aco-status-chip__text">{{ translate(text) }}</span>
        <aco-icon v-if="isDropdownOpen !== undefined" icon="ph-caret-down" :size="size === 'small' ? '16px' : '20px'" />
    </div>
</template>

<script>
import '../../../styles/aco.scss'
import translateMixin from '../../../mixins/translateMixin';
import { _optionsStatus, _optionsSize } from '../../../propTypes';

export default {
    name: 'aco-status-chip',
    components: {
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    mixins: [ translateMixin, ],
    props: {
        /** 
         * The status. Determines the color of the dot
         **/
        status: {
            type: String,
            validator(value) {
                return typeof value === 'string' && Object.values(_optionsStatus).includes(value);
            },
            required: true,
        },
        /**
         * Text to show on the component
         */
        text: {
            type: String,
            required: true,
            default: '',
        },
        /** 
         * Size of status chip - default or small
         */
        size: {
            type: String,
            validator(value) {
                return [_optionsSize.DEFAULT, _optionsSize.SMALL].includes(value);
            },
            required: false,
            default: _optionsSize.DEFAULT
        },
        /**
         * Determines if the down arrow shows to the right of the chip and if it is pointed up or down:
         * true = arrow points up, false = arrow points down, undefined = no arrow appears
         */
        isDropdownOpen: {
            type: Boolean,
            required: false,
            default: undefined,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";

.aco-status-chip {
    background: $aco-ui-white; /* when not in dropdown */
    color: $aco-ui-900;
    border-radius: $aco-border-radius-normal;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    white-space: nowrap;
    box-sizing: border-box;
    border: 1px solid $aco-ui-200;
    height: 32px;
    @extend .aco-p-medium;

    &__circle {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    &__text {
        margin-bottom: 1px;
    }

    &__dropdown-open,
    &__dropdown-closed {
        cursor: pointer;
    }

    .ph-caret-down {
        transition: transform .25s;
    }

    &__dropdown-open .ph-caret-down {
        transform: rotate(0.5turn);
    }

    &--small {
        @extend .aco-p-xsmall;
        height: 24px;

        .aco-status-chip__circle {
            width: 8px;
            height: 8px;
        }
    }
}

</style>