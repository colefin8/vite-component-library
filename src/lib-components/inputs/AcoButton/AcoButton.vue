<template>
    <button
        :data-analytics="dataAnalytics"
        type="button"
        class="aco-button aco-text"
        :class="classes"
        :disabled="disabled"
        @click="onClick"
        :role="ariaRole"
        :aria-label="ariaLabelText"
        :data-x-ray="buttonStyle === 'tertiary' ? undefined : 'padded'"
    >
        <!-- Button content -->
        <aco-icon 
            v-if="icon"
            :icon="icon"
            :class="['aco-button__icon-left', {'aco-button__icon-left--hidden': shouldHideContent}]"
            aria-hidden="true"
        />
        <span v-if="hasSlot" :class="['aco-button__text', {'aco-button__text--hidden': shouldHideContent}]" :aria-hidden="shouldHideContent" data-x-ray="true">
            <!-- @slot The text for the button.  -->
            <slot />
        </span>
        <aco-icon
            v-if="hasDropdownControl"
            icon="ph-caret-down"
            :class="['aco-button__icon-right', {'aco-button__icon-right--flip': isDropdownOpen, 'aco-button__icon-right--hidden': shouldHideContent}]"
            aria-hidden="true"
        />
        <aco-icon 
            v-else-if="rightIcon"
            :icon="rightIcon"
            :class="['aco-button__icon-right', {'aco-button__icon-right--hidden': shouldHideContent}]"
            aria-hidden="true"
        />
        <!-- Loading content -->
        <img
            v-show="isLoading"
            :class="['aco-button__loading-symbol', {'aco-button__loading-symbol--light': hasLightContent}]"
            :src="loadingSymbolSrc"
            alt="Loading"
            aria-hidden="true"
        />
        <div class="aco-button__checkmark" aria-hidden="true">
            <transition name="checkmark">
                <div v-if="shouldShowCheckmark" :class="['aco-button__checkmark-line', {'aco-button__checkmark-line--light': hasLightContent}]"></div>
            </transition>
        </div>
    </button>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import dataAnalyticsMixin from '../../../mixins/dataAnalyticsMixin';
import { _optionsButtonStyle, _optionsStatus, _optionsSize, _optionsTheme } from '../../../propTypes';

/**
 * It's a button. Need I say more?
 * AcoButton exposes the 'click' event so avoid listening for 'click.native'.
 */
export default {
    name: 'aco-button',
    mixins: [themeMixin, dataAnalyticsMixin],
    components: { AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default), },
    props: {
        /** Determines the type and style of the button */
        buttonStyle: {
            type: String,
            validator(value) {
                return Object.values(_optionsButtonStyle).includes(value);
            },
            default: _optionsButtonStyle.PRIMARY,
        },
        /** Determines the color scheme of the button */
        status: {
            type: String,
            validator(value) {
                return Object.values(_optionsStatus).includes(value);
            },
            default: _optionsStatus.NEUTRAL,
        },
        /** Determines the size of the button */
        size: {
            type: String,
            validator(value) {
                return [_optionsSize.DEFAULT, _optionsSize.SMALL].includes(value);
            },
            default: _optionsSize.DEFAULT,
        },
        /** The name of the icon to show on the left.  Should be a 'non-action' icon. */
        icon: {
            type: String,
            required: false,
        },
        /** The name of the icon to show on the right.  Should be an icon indicating action (dropdown, open in new window, etc.). Will be overwritten if hasDropdownControl is true. */
        rightIcon: {
            type: String,
            required: false,
        },
        /** 
         * Controls the display of the dropdown caret. Overrides rightIcon.
         */
        hasDropdownControl: {
            type: Boolean,
            default: false,
        },
        /** Controls whether the caret points up or down */
        isDropdownOpen: {
            type: Boolean,
            default: false,
        },
        /** Makes the button take full width of its parent */
        isFullWidth: {
            type: Boolean,
            default: false,
        },
        /** Controls the display of the loading symbol */
        isLoading: {
            type: Boolean,
            default: false,
        },
        /** Disables the checkmark that shows by default after setting isLoading to false */
        disableCheckmark: {
            type: Boolean,
            default: false,
        },
        /** Required for buttons with an icon and no text to describe what the button does */
        ariaLabel: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hasLoaded: false,
            shouldShowCheckmark: false,
        }
    },
    computed: {
        /**
         * If not using the brand colors, classes will be something like aco-button--default-primary, if using brand colors they will be aco-button--primary
         */
        classes() {
            const themeStyle = this.theme === _optionsTheme.DEFAULT_THEME ? 'default-' : '';
            let classPrefix = 'aco-button--';
            let classes = [
                `${classPrefix}${themeStyle}${this.buttonStyle}`,
                `${classPrefix}${this.size}`,
                {
                    [`${classPrefix}${this.status}`]: this.status !== _optionsStatus.NEUTRAL,
                    [`${classPrefix}icon-only`]: !this.hasSlot,
                    [`${classPrefix}full-width`]: this.isFullWidth,
                    [`${classPrefix}icon-left-pad`]: this.buttonStyle !== _optionsButtonStyle.TERTIARY && (this.icon && this.hasSlot),
                    [`${classPrefix}icon-right-pad`]: this.buttonStyle !== _optionsButtonStyle.TERTIARY && (this.hasDropdownControl || this.rightIcon),
                    [`${classPrefix}loading`]: this.isLoading || this.shouldShowCheckmark,
                },
            ];
            return classes;
        },
        hasSlot() {
            return this.$slots.default && this.$slots.default[0]?.text;
        },
        loadingSymbolSrc() {
            if (this.hasLightContent) {
                return 'https://res.cloudinary.com/dhkcpbx2w/image/upload/v1620757108/Report%20Icons/loading-animation_white';
            } else {
                return 'https://res.cloudinary.com/dhkcpbx2w/image/upload/v1649286753/Report%20Icons/loading-animation_black_96px';
            }
        },
        hasLightContent() {
            return this.buttonStyle === _optionsButtonStyle.PRIMARY;
        },
        shouldHideContent() {
            return this.isLoading || this.shouldShowCheckmark;
        },
        ariaRole() {
            return (this.isLoading || this.shouldShowCheckmark) ? 'status' : null;
        },
        ariaLabelText() {
            if (this.isLoading || this.shouldShowCheckmark) {
                return 'waiting';
            } else if (this.ariaLabel) {
                return this.ariaLabel;
            } else {
                return null;
            }
        },
    },
    watch: {
        isLoading() {
            this.hasLoaded = !this.isLoading;
            if (!this.isLoading && !this.disableCheckmark) {
                this.shouldShowCheckmark = true;
                setTimeout(() => {
                    this.shouldShowCheckmark = false;
                }, 2000);
            }
        },
    },
    methods: {
        onClick(e) {
            if (this.isLoading || this.shouldShowCheckmark) {
                e.preventDefault(); // stop button's default keypress handling while loading
                return;
            }
            /** Event emitted when the button is clicked. */
            this.$emit('click', e);
        },
    },
    mounted() {
        if (!this.hasSlot && !this.ariaLabel) {
            console.error('AcoButton: prop "aria-label" is required for buttons with an icon and no text.');
        }
        if (this.hasDropdownControl && this.rightIcon) {
            console.error('AcoButton: rightIcon prop overwritten by hasDropdownControl.');
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.aco-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    min-width: 40px;
    border-radius: 40px;
    padding: 0 16px;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    transition: all $aco-animation-very-fast;
    position: relative;
    max-width: 100%;

    [class$=--hidden] {
        opacity: 0;
    }

    &__text, &__icon-left, &__icon-right {
        transition: opacity $aco-animation-fast;
    }

    &__text {
        position: relative;
        top: -1px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__icon-left, &__icon-right {
        height: 20px;
    }
    &__icon-right {
        transition: transform $aco-animation-fast;
    }
    &__icon-right--flip {
        transform: rotate(-180deg);
    }

    &--full-width {
        width: 100%;
    }

    /* Size */
    &--small {
        gap: 4px;
        height: 32px;
        min-width: 32px;
        border-radius: 32px;
        padding: 0 12px;
    }
    &--small#{&}--tertiary,
    &--small#{&}--default-tertiary {
        height: 18px;
        min-width: 18px;
        font-size: 12px;
    }
    &--small#{&}--tertiary &__icon-left,
    &--small#{&}--tertiary &__icon-right,
    &--small#{&}--default-tertiary &__icon-left,
    &--small#{&}--default-tertiary &__icon-right {
        height: 16px;
        font-size: 16px;
    }
    &--small#{&}--tertiary &__text,
    &--small#{&}--default-tertiary &__text {
        top: 0;
    }

    /* Icon */
    &--icon-left-pad {
        padding-left: 12px;
    }
    &--icon-left-pad#{&}--small {
        padding-left: 8px;
    }
    &--icon-right-pad {
        padding-right: 12px;
    }
    &--icon-right-pad#{&}--small {
        padding-right: 8px;
    }
    &--icon-only {
        padding: 0;
    }

    /* Types */
    &--default-primary.aco-text {
        color: $aco-ui-white;
        border: solid 1px;
        @include interactive-default-property('border-color', $aco-default-primary);
        @include interactive-default-property('background-color', $aco-default-primary);
    }
    &--default-secondary.aco-text {
        background-color: $aco-ui-white;
        border: solid 1px $aco-ui-300;
        @include interactive-default-property('color', $aco-default-primary);
        @include interactive-default-property('border-color', $aco-default-primary, false);
    }
    &--default-tertiary.aco-text {
        padding: 0;
        border-radius: 0;
        background-color: transparent;
        border: none;
        @include interactive-default-property('color', $aco-default-primary);
    }

    &--primary.aco-text {
        color: $aco-ui-white;
        border: solid 1px;
        @include interactive-property('border-color', $aco-primary);
        @include interactive-property('background-color', $aco-primary);
    }
    &--secondary.aco-text {
        background-color: $aco-ui-white;
        border: solid 1px $aco-ui-300;
        @include interactive-property('color', $aco-primary);
        @include interactive-property('border-color', $aco-primary, false);
    }
    &--tertiary.aco-text {
        padding: 0;
        border-radius: 0;
        background-color: transparent;
        border: none;
        @include interactive-property('color', $aco-primary);
    }

    &--small#{&}--tertiary.aco-text,
    &--small#{&}--default-tertiary.aco-text {

        .aco-button__loading-symbol {
            height: 18px;
            width: 18px;
        } 

        .aco-button__checkmark {
            width: 14px;
            height: 7px;
        }
    }

    /* Status */
    @mixin buttonStatus($status, $color) {
        &--#{$status}#{&}--default-primary {
            @include interactive-property('border-color', $color);
            @include interactive-property('background-color', $color);
        }
        &--#{$status}#{&}--default-secondary {
            @include interactive-property('color', $color);
            @include interactive-property('border-color', $color, false);
        }
        &--#{$status}#{&}--default-tertiary {
            background-color: transparent;
            @include interactive-property('color', $color);
        }
        &--#{$status}#{&}--primary {
            @include interactive-property('border-color', $color);
            @include interactive-property('background-color', $color);
        }
        &--#{$status}#{&}--secondary {
            @include interactive-property('color', $color);
            @include interactive-property('border-color', $color, false);
        }
        &--#{$status}#{&}--tertiary {
            background-color: transparent;
            @include interactive-property('color', $color);
        }
    }

    @include buttonStatus('positive', $aco-positive-dark);
    @include buttonStatus('warning', $aco-warning-medium);
    @include buttonStatus('danger', $aco-danger-dark);

    /* Loading */
    &--loading {
        pointer-events: none;
    }

    &__loading-symbol, &__checkmark {
        position: absolute;
    }

    &__loading-symbol, &__checkmark-line {
        opacity: 0.6;
        &--light {
            opacity: 0.8;
        }
    }

    &__loading-symbol {
        height: 24px;
        width: 24px;
        user-select: none;
    }

    &__checkmark {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        opacity: 1;
        width: 20px;
        height: 10px;
        transform: rotate(-45deg) translate(1px, -1px);
        transition: opacity $aco-animation-very-fast;
    }

    &__checkmark-line {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-bottom: solid $aco-ui-900 4px;
        border-left: solid $aco-ui-900 4px;
        &--light {
            border-color: $aco-ui-white;
        }
    }

    .checkmark-enter-active {
        animation: checkmark $aco-animation-fast;
    }
    .checkmark-leave-active {
        opacity: 0;
    }
}

@keyframes checkmark {
    0% {
        width: 0;
        height: 0;
    }
    75% {
        width: 100%;
        height: 0;
    }
    100% {
        width: 100%;
        height: 100%;
    }
}
</style>