<template>
    <div :class="avatarClass" data-x-ray="true">
        <span v-if="!hasLoadingSkeleton && ((!url || isBadImage) && initials)">{{ initials }}</span>
        <img
            v-show="!hasLoadingSkeleton && isImageDOMLoaded"
            class="aco-avatar__image"
            :src="url"
            alt="Avatar"
            @load="onLoadImage"
            @error="onErrorLoadImage"
        />
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import '../../../styles/aco.scss';
import { _optionsSize, _optionsTheme } from '../../../propTypes';

/**
 * Avatar component for displaying users / user images.
 */
export default {
    name: 'aco-avatar',
    mixins: [themeMixin],
    props: {
        /** Change the size of the avatar */
        size: {
            type: String,
            validator(value) {
                return Object.values(_optionsSize).includes(value);
            },
            default: _optionsSize.MEDIUM,
        },
        /** URL for the avatar image, overrides initials unless a broken url is passed */
        url: {
            type: String,
            required: false,
        },
        /** User initials for when a url isn't set,
         *  will also be a fallback to display if a broken url is passed.
         *  Only visually supports 1-2 characters on 'size' medium/small/xsmall.
         *  Can support 3 characters visually on 'size' large/xlarge. */
        initials: {
            type: String,
            required: false,
        },
        /** Determines if the initials circle has a white border.
         *  By default it will not contain a border. */
        hasBorder: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isBadImage: false,
            isImageDOMLoaded: false,
            test: false,
        }
    },
    computed: {
        avatarClass() {
            return [
                'aco-avatar', 
                {
                    'aco-avatar__loading': this.hasLoadingSkeleton,
                    'aco-avatar--border': this.shouldShowBorder, 
                    'aco-avatar--has-image': this.isImageDOMLoaded,
                }, 
                `aco-avatar--${this.size}`,
                `aco-avatar--${this.theme}`,
            ];
        },
        hasLoadingSkeleton() {
            return (!this.url && !this.initials) || // url nor initials are set
                // url is set but is still either loading on dom, or
                // its a bad image without any initials to fall back on
                (this.url && (this.isBadImage ? !this.initials : !this.isImageDOMLoaded));
        },
        shouldShowBorder() {
            return this.hasBorder && ((!this.url || this.isBadImage) && this.initials);
        },
    },
    methods: {
        onLoadImage() {
            this.isImageDOMLoaded = true;
        },
        onErrorLoadImage() {
            this.isBadImage = true;
            console.warn(`AcoAvatar: bad or broken image URL passed to 'url' prop, ${ 
                this.initials ? 
                    "falling back to 'initials' to be displayed" :
                    "component will infinitely show a loading state because no fallback 'initials' were passed"
                }.`
            );
        },
    },
    watch: {
        url() {
            // resets when url changes
            this.isBadImage = false; 
            this.isImageDOMLoaded = false;
        },
    },

};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

$aco-avatar-border-size: 1px;

@mixin aco-avatar-initials($font-size, $size, $has-border: true) {
    font-size: $font-size;
    width: $size;
    height: $size;
    @if $has-border {
        line-height: $size - ($aco-avatar-border-size * 2); // account for both top/bottom borders
    }
    @else {
        line-height: $size;
    }
}
.aco-avatar {
    @extend .aco-text;
    overflow: hidden;
    border-radius: 100%;
    display: inline-flex;
    justify-content: center;
    color: $aco-ui-white;
    text-transform: uppercase;
    box-sizing: border-box;
    flex-shrink: 0;
    &__image {
        height: 100%;
    }
    &__loading {
        display: inline-block;
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(
            90deg,
            $aco-ui-200,
            $aco-ui-200 20%,
            $aco-ui-300 30%,
            $aco-ui-300 50%,
            $aco-ui-200 60%,
            $aco-ui-200,
        );
        background-size: 500% 100%;
        animation: gradient 4s linear infinite reverse;
    }
    // Initials Border
    &--border {
        border: $aco-avatar-border-size solid $aco-ui-white;
    }
    // Sizes
    &--xxsmall:not(#{&}--border) {
        @include aco-avatar-initials($aco-text-xxsmall, 16px, false);
    }
    &--xxsmall {
        @include aco-avatar-initials($aco-text-xxsmall, 16px);
    }
    &--xsmall:not(#{&}--border) {
        @include aco-avatar-initials($aco-text-xsmall, 24px, false);
    }
    &--xsmall {
        @include aco-avatar-initials($aco-text-xsmall, 24px);
    }
    &--small:not(#{&}--border) {
        @include aco-avatar-initials($aco-text-medium, 32px, false);
    }
    &--small {
        @include aco-avatar-initials($aco-text-medium, 32px);
    }
    &--medium:not(#{&}--border), &--default:not(#{&}--border) {
        @include aco-avatar-initials($aco-text-large, 40px, false);
    }
    &--medium, &--default {
        @include aco-avatar-initials($aco-text-large, 40px);
    }
    &--large:not(#{&}--border) {
        @include aco-avatar-initials($aco-text-xlarge, 56px, false);
    }
    &--large {
        @include aco-avatar-initials($aco-text-xlarge, 56px);
    }
    &--xlarge:not(#{&}--border) {
        @include aco-avatar-initials($aco-heading-xlarge, 96px, false);
    }
    &--xlarge {
        @include aco-avatar-initials($aco-heading-xlarge, 96px);
    }
    // Themes
    &--aco-theme:not(&--has-image) {
        background-color: $aco-primary;
    }
    &--default-theme:not(&--has-image) {
        background-color: $aco-default-primary;
    }
}
@keyframes gradient {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% 0;
    }
}
</style>