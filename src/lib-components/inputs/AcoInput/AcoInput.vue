<template>
    <div class="aco-input aco-text" :style="{ width: inputWidth }">

        <aco-label v-if="label || required"
            :prefix-icon="labelPrefixIcon"
            :text="label"
            :label-for="inputId"
            :context="labelContext"
            :tooltip-text="labelTooltipText"
            :required="required"
            :required-text="`${translate(requiredText)}`"
            :readonly="readonly"
            :tooltip-icon="labelTooltipIcon"
            :class="{ 'aco-disabled': disabled }"
        />

        <div :class="['aco-input__outer', { 'aco-input__outer--disabled': disabled }]" data-x-ray="true">
            <span v-if="hasPrefix" :class="['aco-input__prefix', { 'aco-input__prefix--small': size === 'small', 'aco-input__prefix--readonly': readonly }]">
                <!-- @slot Text and/or HTML for the prefix -->
                <slot name="prefix">
                    {{ prefix }}
                </slot>
            </span>
            <div class="aco-input__inner">
                <span v-if="!!inputIcon" class="aco-input__input-icon">
                    <aco-icon :icon="inputIcon" />
                </span>
                <input
                    :id="inputId"
                    :class="['aco-input__input', inputClasses]"
                    :value="value"
                    :disabled="disabled"
                    :max="max"
                    :maxlength="maxlength"
                    :min="min"
                    :minlength="minlength"
                    :pattern="inputPattern"
                    :placeholder="translate(placeholder)"
                    :readonly="readonly"
                    :required="required"
                    :step="step"
                    :type="inputType"
                    :autocomplete="autoComplete"
                    :autocorrect="autocorrect"
                    @change="onChange"
                    @click="onClick"
                    @input="onInput"
                    @keypress.enter="onEnter"
                    :aria-describedby="ariaDescriptor"
                />
                <span
                    v-if="!readonly && (showClearButton || actionIcon)"
                    :class="{'aco-input--disabled': disabled}"
                    class="aco-input__action-icon"
                >
                    <aco-icon
                        v-if="showClearButton && (value || '') !== ''" 
                        icon="ph-x-circle"
                        :aria-label="translate('clear input')"
                        tabindex="0"
                        @mousedown.native="onClearIconMouseDown"
                        @keydown.enter.native="onClearIconMouseDown"
                    />
                    <aco-icon
                        v-if="actionIcon"
                        :icon="actionIcon"
                        :aria-label="actionIconAriaLabel"
                        tabindex="0"
                        @mousedown.native="onActionIconMouseDown" 
                        @keydown.enter.native="onActionIconMouseDown"
                    />
                </span>
            </div>
            <span v-if="hasSuffix" :class="['aco-input__suffix', { 'aco-input__suffix--small': size === 'small', 'aco-input__suffix--readonly': readonly }]">
                <!-- @slot Text and/or HTML for the suffix -->
                <slot name="suffix">
                    {{ suffix }}
                </slot>
            </span>
        </div>
        
        <div v-if="status || !isValid || maxlength" class="aco-input__footer">
            <aco-form-alert
                v-if="status || !isValid"
                class="aco-input__status"
                :id="ariaDescriptor"
                :status="inputStatus"
                :aria-describes="inputId"
                data-x-ray="true"
            >
                {{ translate(inputStatusMessage) }}
            </aco-form-alert>
            <span v-else></span>
            <small v-if="maxlength > 0" class="aco-input__char-count" :class="{ 'aco-status-text-danger': charCount > maxlength, 'aco-disabled': disabled }" data-x-ray="true">
                {{ charCount }} / {{ maxlength }}
            </small>
        </div>
    </div>
</template>

<script>
import labelMixin from '../../../mixins/labelMixin';
import translateMixin from '../../../mixins/translateMixin';
import '../../../styles/aco.scss';
import { _optionsStatus, _optionsInputType, _optionsSize } from '../../../propTypes';

/**
 * Allow a user to enter text in a UI, and support the native types: text, password, email, search, url, and tel.
 * Typically used in forms, settings pages, and within modals. 
 * This component is built with automatic validation and error handling on appropriate input types.
 */
export default {
    name: 'aco-input',
    components: {
        AcoFormAlert: () => import('../../displays/notifications/AcoFormAlert/AcoFormAlert.vue').then(d => d.default),
        AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    mixins: [ labelMixin, translateMixin, ],
    props: {
        /** The entered text or value of the input. */
        value: {
            type: [String, Number],
            required: false,
        },
        /** This determines the type, style, and functionality of the input. 
         *  This mimics the HTML input types and their functionality.*/
        type: {
            type: String,
            validator(value) {
                return Object.values(_optionsInputType).includes(value);
            },
            required: false,
            default: _optionsInputType.TEXT,
        },
        /** This determines the size of the input box.
         *  Most use cases will use 'default', but 'small' is also available for things like tables or narrow areas in a UI. */
        size: {
            type: String,
            validator(value) {
                return [_optionsSize.DEFAULT, _optionsSize.SMALL].includes(value);
            },
            required: false,
            default: _optionsSize.DEFAULT,
        },
        /** Prompting text shown in the input before a value is entered.
         *  Will attempt to be translated automatically. */
        placeholder: {
            type: String,
            required: false,
        },
        /** The message shown under the input to describe the current status to the user.
         *  Will attempt to be translated automatically.*/
        statusMessage: {
            type: String,
            required: false,
        },
        /** Determines a manually set error or warning state, the component will handle its own status for regex patterns.
         *  This changes the color of the input field and determines if the status message is displayed.
         *  This will overwrite the any automatic status set by regex pattern validation. 
         *  Passing 'undefined' (or not defining the prop) will hide the status color/message, and allow automatic status from regex patterns. */
        status: {
            type: String,
            validator(value) {
                return Object.values(_optionsStatus).includes(value);
            },
            required: false,
        },
        /**
         * Disables checking if the input is valid on blur
         */
        manualValidation: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** The minimum length of text allowed by user input. 
         *  This will automatically validate if the user has typed too few characters after the input looses focus.
         *  The automatic validation will be overwritten if 'status' is anything but undefined. */
        minlength: {
            type: Number,
            required: false,
        },
        /** The maximum length of text allowed by user input. 
         *  Also displays a counter for the user so they know the remaining characters left. */
        maxlength: {
            type: Number,
            required: false,
        },
        /** The minimum numeric value allowed by user input.
         *  Only useful for the input type 'number'. */
        min: {
            type: Number,
            required: false,
        },
        /** The maximum numeric value allowed by user input.
         *  Only useful for the input type 'number'. */
        max: {
            type: Number,
            required: false,
        },
        /** The numeric granularity allowed. Use 'any' for any number of decimals */
        step: {
            type: [Number, String],
            required: false,
        },
        /** Adds prefix text in a gray bubble to the left of the input.
         *  Content can be extended through the 'prefix' slot. */
        prefix: {
            type: String,
            required: false,
        },
        /** The icon on the inside-left of the input. */
        prefixIcon: {
            type: String,
            required: false,
        },
        /** Adds suffix text in a gray bubble to the right of the input.
         *  Content can be extended through the 'suffix' slot. */
        suffix: {
            type: String,
            required: false,
        },
        /** The icon on the inside-right of the input.
         *  Can be interacted with if you handle the 'suffix-click' event.
         *  On type 'password' it provides the 'ph-eye' icon by default and hides the text when clicked. */
        suffixIcon: {
            type: String,
            required: false,
        },
        /** Provides accessability context to the suffix icon.
         *  This should be set if you are manually handling the 'suffix-click' event.
         *  On type 'password' it provides the label 'Toggle Password Visibility' by default. */
        suffixIconAriaLabel: {
            type: String,
            required: false,
        },
        /** The regex that the value must match to be valid.
         *  This will automatically validate when the input looses focus. 
         *  The automatic validation will be overwritten if 'status' is anything but undefined. */
        pattern: {
            type: String,
            required: false,
        },
        /** The total width of the input box including any icons, prefix, suffix. */
        width: {
            type: [String, Number],
            required: false,
        },
        /** Determines if an 'x' icon button shows within the right side of the input.
         *  This only shows when a value is set on the input.
         *  Clicking automatically clears the current value of the input. */
        showClearButton: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Allow or diallow autocompletion of the field by the browser.
         * Use "off" to prevent auto-completion (will not prevent automatically filling in login form)
         * Use "new-password" for an "Enter your new password" or "Confirm new password" field.
         * More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
         */
        autocomplete: {
            type: String,
            default: 'off',
            required: false,
        },
        /**
         * A string indicating whether or not autocorrect is on or off. Safari only.
         */
        autocorrect: {
            type: String,
            default: 'off',
            required: false,
        },
    },
    data() {
        return {
            inputType: _optionsInputType.TEXT,
            isPasswordShowing: false,
            charCount: 0,
            isValid: true,
        };
    },
    watch: {
        type() {
            this.inputType = this.type;
        },
    },
    computed: {
        hasPrefix() {
            return this.prefix || this.$slots['prefix'];
        },
        hasSuffix() {
            return this.suffix || this.$slots['suffix'];
        },
        inputIcon() {
            return (
                (this.type === _optionsInputType.SEARCH && !this.prefixIcon)
                ? 'ph-magnifying-glass'
                : this.prefixIcon
            );
        },
        actionIcon() {
            if (this.type === _optionsInputType.PASSWORD && !this.suffixIcon) {
                return this.isPasswordShowing  ? 'ph-eye' : 'ph-eye-slash';
            } else {
                return this.suffixIcon;
            }
        },
        actionIconAriaLabel() {
            if (this.type === _optionsInputType.PASSWORD && !this.suffixIconAriaLabel) {
                return 'Toggle Password Visibility';
            } else {
                return this.suffixIconAriaLabel;
            }
        },
        inputWidth() {
            if (this.width) {
                return typeof this.width === 'number' ? `${this.width}px` : this.width;
            } else {
                return this.type === _optionsInputType.NUMBER ? '84px' : '300px';
            }
        },
        inputPattern() {
            if (this.pattern) {
                return this.pattern;
            } else {
                return this.type === _optionsInputType.EMAIL ?
                    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                    : null;
            }
        },
        inputStatus() {
            return this.status || (this.isValid ? undefined : 'danger');
        },
        inputStatusMessage() {
            if (this.statusMessage) {
                return this.statusMessage;
            } else if (this.minlength > 0 && typeof this.value === 'string' && this.value.length < this.minlength) {
                return `Input must be at least ${this.minlength} characters long.`;
            } else if (this.type === _optionsInputType.PASSWORD) {
                return 'Password is not valid.';
            } else if (this.type === _optionsInputType.EMAIL) {
                return 'Email is not valid.';
            } else {
                return 'Input is not valid.';
            }
        },
        inputClasses() {
            return {
                [`aco-input__input--${this.inputStatus}`]: this.inputStatus,
                'aco-input__input--small': this.size === 'small',
                'aco-input__input--has-prefix': this.hasPrefix,
                'aco-input__input--has-suffix': this.hasSuffix,
                'aco-input__input--has-clear': this.showClearButton,
                'aco-input__input--has-action': this.actionIcon,
                'aco-readonly': this.readonly,
            }
        },
        ariaDescriptor() {
            return this.inputId + '-alert';
        },
        autoComplete() {
            return (
                this.autocomplete === 'off' && this.type === 'password'
                ? 'new-password' 
                : this.autocomplete
            );
        }
    },
    methods: {
        onInput(event) {
            let newVal = event.target.value;
            if (this.type === _optionsInputType.NUMBER) {
                let number = parseFloat(newVal);
                if ((this.max || this.max === 0) && number > this.max) {
                    newVal = this.max;
                } else if ((this.min || this.min === 0) && number < this.min) {
                    newVal = this.min;
                }
            }
            this.charCount = (newVal || '').length;
            this.$emit('input', newVal);
        },
        onChange(event) {
            this.isValid = this.manualValidation || (this.value === '' ? true : event.target.validity?.valid);
            /** Return validation results */
            this.$emit('validate', event.target.validity);
            this.$emit('change', event);
        },
        onClearIconMouseDown() {
            // Mouse down instead of click so it fires before change event.
            // Otherwise it will validate before clear, and blink the status on and off
            if (this.disabled) return;
            this.isValid = true;
            this.$emit('input', '');
        },
        onActionIconMouseDown() {
            if (this.disabled) return;

            if (this.type === _optionsInputType.PASSWORD) {
                this.toggleVisibility();
            } else {
                /** Suffix icon clicked */
                this.$emit('suffix-icon-click', this.value);
            }
        },
        onClick() {
            /** Input field clicked. */
            this.$emit('click', this.value);
        },
        onEnter() {
            /** Fired when focused on enter key pressed. */
            this.$emit('enter', this.value);
        },
        toggleVisibility() {
            this.isPasswordShowing = !this.isPasswordShowing;
            this.inputType = (
                this.isPasswordShowing
                ? _optionsInputType.TEXT
                : _optionsInputType.PASSWORD
            );
        },
    },
    created() {
        this.inputType = this.type;
        this.charCount = (this.value || '').length;
    },
};
</script>
