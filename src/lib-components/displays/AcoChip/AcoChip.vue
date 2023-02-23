<template>
    <div :class="[
        'aco-chip',
        {'aco-chip--small' : isSmall, 'aco-chip--light' : !useColors, 'aco-chip--with-image': hasImage, 'aco-theme': useColors && theme === acoTheme}
    ]" data-x-ray="true">
        <div v-if="hasImage" :class="['aco-chip__image-container', {'aco-chip__image-container--small' : isSmall && !label}]">
            <!-- @slot DEPRECATED: to use an avatar pass in an image and/or initials -->
            <slot>
                <aco-avatar v-if="image || initials" :url="image" :initials="initials" :size="avatarSize" class="aco-chip__image" :theme="theme" />
            </slot>
        </div>
        <div>
            <div v-if="label" :class="['aco-p-xsmall aco-chip__label', {'aco-chip__label--small' : isSmall}]">{{ label }}</div>
            <div data-qa="aco-chip-text" :class="['aco-text aco-chip__text', {'aco-chip__text--small' : isSmall}, {'aco-chip__text--has-label' : label}]">{{ text }}</div>
        </div>
        <aco-icon v-if="showXIcon" icon="ph-x-bold" data-qa="aco-chip-remove" class="aco-chip__x" size="16px" @click="$emit('remove', $event)" @keydown.native.enter.stop="$emit('remove', $event)" @keydown.native.space.stop="$emit('remove', $event)" tabindex="0" />
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import '../../../styles/aco.scss'
import { _optionsSize } from '../../../propTypes';


/**
 * Chips are used to quickly display information. For example- what filters have been selected, a list of metadata, etc.
 * Note: Has a height of either 24px (small), 32px (default & small with label), or 40px (default with label) (unless the text is super long for some reason)
 */
export default {
    name: 'aco-chip',
    mixins: [themeMixin],
    components: {
        AcoAvatar: () => import('../AcoAvatar/AcoAvatar.vue').then(d => d.default),
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },    
    props: {
        /** 
         * Size of chip- default or small
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
         * Text displayed in chip
         */
        text: { 
            type: String,
            required: true,
        },
        /**
         * Whether to use the primary/secondary colors, otherwise when false, background is white
         */
        useColors: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Whether to show the remove icon which emits an event when clicked
         */
        showXIcon: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Optional label to describe the main text in chip
         */
        label: { 
            type: String,
            required: false,
            default: '',
        },
        /**
         * Optional image to display in the chip
         */
        image: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * initials for the aco-avatar
         */
        initials: {
            type: String,
            required: false,
            default: '',
        }
    },
    computed: {
        isSmall() {
            return this.size === _optionsSize.SMALL;
        },
        hasImage() {
            return this.image || this.initials || !!this.$slots.default;
        },
        avatarSize() {
            return this.isSmall && !this.label ? 'xxsmall' : 'xsmall';
        }
    },
};
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";
    
    .aco-chip {
        background-color: $aco-default-primary;
        border: 1px solid $aco-default-primary;
        padding: 4px;
        display: flex;
        align-items: center;
        width: fit-content;
        position: relative;
        @include opaque-overlay($aco-border-radius-normal);

        &.aco-theme {
            background-color: $aco-primary;
            border-color: $aco-primary;
        }

        &__text {
            line-height: 20px;
            padding-left: 4px;
            padding-right: 4px;
            padding-bottom: 2px;
        }

        &__text--has-label {
            font-size: 14px;
            line-height: 14px;
        }

        &__text--small {
            font-size: 14px;
            line-height: 14px;
        }

        &__label {
            color: $aco-ui-600;
            padding: 0 4px;
            line-height: 14px;
        }

        &__label--small {
            font-size: 8px;
            line-height: 8px;
        }

        &__x {
            color: $aco-ui-400;
            cursor: pointer;
        }

        &__image {
            &-container {
                display: flex;
                border-radius: 100%;
                overflow: hidden;
                flex-shrink: 0;
            }
            &-container, & {
                width: 24px;
                height: 24px;
            }
            &-container--small, &-container--small & {
                width: 16px;
                height: 16px;
            }
        }
        &--small {
            @include opaque-overlay($aco-border-radius-small);
        }

        &--light {
            background-color: $aco-ui-white;
            border-color: $aco-ui-200;
        }
    }
</style>
