<template>
    <dialog 
        :open="isOpen" 
        :class="['aco-modal', {'aco-modal--top' : !centerVertically}]" 
        role="dialog" 
        :aria-labelledby="`acoModalTitle${_uid}`" 
        :aria-hidden="!showContents" 
        aria-live="assertive"
        @transitionend="emitOnClose"
        @keydown.esc="closeOnEsc && closeHandler()"
    >
        <div class="aco-modal__overlay" @click="overlayDismissible && closeHandler()"></div>
        <div v-if="showContents" class="aco-modal__form" :style="{ width: modalWidth, height: modalHeight }">
            <header v-if="!!title || !!$slots.header" class="aco-modal__header aco-h2" :id="`acoModalTitle${_uid}`">
                <!-- @slot DEPRECATED: if components other than those available are needed contact UX -->
                <slot name="header">
                    <span class="aco-modal__header-text">{{ translate(title) }}</span>
                    <aco-icon v-if="showCloseX || showXIcon" @click.native="closeHandler" @keypress.native.enter="closeHandler" icon="ph-x" tabindex="0" aria-label="Close" :disabled="isSubmitting" :data-analytics="xTag"/>
                </slot>
            </header>
            <main class="aco-modal__main aco-text">
                <form class="aco-modal__main-form" ref="acoModalForm" @submit.prevent="!disabled && !isSubmitting && $emit('submit')">
                    <!-- @slot dialog main content, NOTE: hiding / removing the slot contents too early will interfere with the closing animation -->
                    <slot></slot>
                </form>
            </main>
            <footer class="aco-modal__footer" ref="acoModalFooter">
                <!-- @slot DEPRECATED: if components other than those available are needed contact UX -->
                <slot name="footer">
                    <div class="aco-modal__footer_action_buttons">
                        <aco-button 
                            v-if="hasSubmit && submitLabel" 
                            buttonStyle="primary" 
                            :status="isPrimaryDestructive ? 'danger' : 'neutral'" 
                            :icon="isPrimaryDestructive ? 'ph-trash' : ''" 
                            :disabled="disabled" 
                            :is-loading="isSubmitting"
                            :theme="theme"
                            data-qa="aco-modal-submit-button"
                            @click="submitHandler"
                            :data-analytics="submitTag"
                        >
                            {{ translate(submitLabel) }}
                        </aco-button>
                        <aco-button v-if="closeLabel"
                            :buttonStyle="hasSubmit ? 'secondary' : 'primary'"
                            :disabled="isSubmitting"
                            :theme="theme"
                            data-qa="aco-modal-close-button"
                            @click="closeHandler"
                            :data-analytics="closeTag"
                        >{{ translate(closeLabel) }}</aco-button>
                    </div>
                    <!-- @slot Slot for a third button on the left side of the modal -->
                    <slot name="left-button-slot">
                        <aco-button v-if="hasDelete && deleteLabel"
                            buttonStyle="tertiary"
                            :disabled="isSubmitting"
                            status="danger"
                            icon="ph-trash"
                            :theme="theme"
                            @click="deleteHandler"
                            :data-analytics="deleteTag"
                        >
                            {{ translate(deleteLabel) }}
                        </aco-button>
                        <aco-button v-else-if="hasBack && backButtonLabel"
                            buttonStyle="secondary"
                            :theme="theme"
                            :disabled="isSubmitting"
                            @click="backHandler"
                            :data-analytics="backTag"
                        >
                            {{ translate(backButtonLabel) }}
                        </aco-button>
                        <span v-else></span>
                    </slot>
                </slot>
            </footer>
        </div>
    </dialog>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import translateMixin from '../../../mixins/translateMixin';

/**
 * Use for a popup dialog box. Wraps content in a modal with optional title and buttons. A close button is automatically added to the modal.
 * 
 * Use 'isSubmitting' to disable all the buttons while the modal is busy.
 * 
 * Use 'disabled' to disable all but the close buttons.
 */
export default {
    name: 'aco-modal',
    components: {
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoButton: () => import('../../inputs/AcoButton/AcoButton.vue').then(d => d.default),
    },
    mixins: [ translateMixin, themeMixin],
    props: {
        /** 
         * Triggers the modal to open.  Can be a truthy value or a boolean.  Is automatically set to false when the default close button is clicked.
         */
        value: {
            //type: Any,
            required: true,
            default: false,
        },
        /** 
         * Indicates the user can click the overlay to close the modal.  Triggers close event.
        */
        overlayDismissible: {
            type: Boolean,
            default: false,
        },
        /** 
            Width of the modal. CSS string (500px, 100em, 50%, etc.)
        */
        width: {
            type: [String, Number],
            required: false,
        },
        /** 
            Height of the modal. CSS string (500px, 100em, 50%, etc.)
        */
        height: {
            type: [String, Number],
            required: false,
        },
        /** 
            Title of the modal.  Text which appears in the titlebar of the modal.  If empty not title bar will be present.
            NOTE: Any user defined text should not be in the title but should only appear in the body of the modal.
        */
        title: {
            type: String,
            required: false,
            default: '',
        },
        /** 
            Label of the submit button (primary button, to the far right)
            only shown when a handler is attached i.e.: @submit="" AND the submitLabel is not empty
        */
        submitLabel: {
            type: String,
            required: false,
            default: 'OK'
        },
        /** 
            Label of the close button
            handler defaults to simply closing the modal
        */
        closeLabel: {
            type: String,
            required: false,
            default: 'Close'
        },
        /** 
            Label of the delete button
            only shown when a handler is attached i.e.: @delete=""
        */
        deleteLabel: {
            type: String,
            required: false,
            default: 'Delete'
        },
        /** 
            Label of the back button when using the modal as a wizard
            only shown when a handler is attached i.e.: @back="handler" AND backButtonLabel is not empty
        */
        backButtonLabel: {
            type: String,
            required: false,
            default: 'Back'
        },
        /** 
            Show the X in the upper-right to close the modal
        */
        showXIcon: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** 
            DEPRECATED: Use showXIcon instead
         */
        showCloseX: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** 
            Disables the action buttons in the footer. Does not disable the close button or X. This is for when submit is disabled until the user does something, like check a box or have a valid form.
        */
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** 
            Disables all buttons. This is so the user cannot interact with the modal while it is loading or a request is being made.
        */
        isSubmitting: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
            Whether to center the modal vertically (vs being fixed 100px from the top)
        */
        centerVertically: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Show the primary button with a red background and a trash can
         */
        isPrimaryDestructive: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Closes the dialog when the ESC key is pressed
         */
        closeOnEsc: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Object that defines the data-analytics tags to give to each button valid object keys are 'submit', 'close', 'delete', 'back', and 'x'
         */
        dataAnalyticsObj: {
            type: Object,
            required: false,
            validator(obj) {
                const validStrings = ['submit', 'close', 'delete', 'back', 'x']
                // returns true if all the keys in obj are found in the above array
                return Object.keys(obj).every(key => validStrings.includes(key))
            }
        }
    },
    data() {
        return {
            isOpen: false,
            showContents: false,
            pageScrollPosition: 0, // Page will maintain the same scroll position before/after modal being opened.
            disableBodyScroll: false, // Only change scroll position for first modal opened in the case there is more than one
        }
    },
    computed: {
        hasSubmit() { return !!this.$listeners.submit; },
        hasDelete() { return !!this.$listeners.delete; },
        hasBack() { return !!this.$listeners.back; },
        modalWidth() { return typeof(this.width) === 'number' ? `${this.width}px` : this.width; },
        modalHeight() { return typeof(this.height) === 'number' ? `${this.height}px` : this.height; },
        submitTag() { return this.dataAnalyticsObj?.submit},
        closeTag() { return this.dataAnalyticsObj?.close},
        deleteTag() { return this.dataAnalyticsObj?.delete},
        backTag() { return this.dataAnalyticsObj?.back},
        xTag() { return this.dataAnalyticsObj?.x},
    },
    created() {
        this.isOpen = this.value;
        if (this.showCloseX) {
            console.warn("aco-modal: showCloseX prop is deprecated- use showXIcon instead");
        }
    },
    watch: {
        value() {
            this.isOpen = this.value;
        },
        isOpen(currentValue) {
            if (!this.showContents && !currentValue) {
                /* prevent falsy value from showing contents */
                return;
            }
            this.showContents = true;
            const body = document.querySelector('body');
            if (!!currentValue) { //isOpen
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.acoModalFooter?.querySelector('button')?.focus();
                        this.$refs.acoModalForm?.elements[0]?.focus();
                    });
                    if (!body.classList.contains('disable-body-scroll')) {
                        this.disableBodyScroll = true;
                        this.pageScrollPosition = document.documentElement.scrollTop;
                        body.classList.add('disable-body-scroll'); // this class is in disabled.scss
                        body.style.top = `-${this.pageScrollPosition}px`;
                    }
                    document.querySelectorAll('body > div').forEach(n => n.setAttribute('aria-hidden', true));
                })
                /** Update the view state */
                this.$emit('input', currentValue);
            } else {
                this.resetPageOnClose()
            }
        }
    },
    beforeDestroy() {
        if (!!this.isOpen) { //destroyed before closed
            this.resetPageOnClose();
        }
    },
    methods: {
        emitOnClose(event) {
            if (!this.isOpen && this.isOpen !== 0 && event.propertyName === 'opacity' && event.srcElement.tagName === 'DIALOG') {
                /** Update the view state */
                this.$emit('input', this.isOpen);
                this.showContents = false;
            }
        },
        submitHandler() {
            /** Event emitted when submit button clicked that passes back the form object */
            this.$emit('submit', this.$refs.acoModalForm);
        },
        closeHandler() {
            if (this.isSubmitting) {
                return; // user cannot close modal while waiting for submit to finish
            }
            if (!!this.$listeners.close) {
                /** Event emitted when close button clicked that passes back the form object */
                this.$emit('close', this.$refs.acoModalForm);
            } else {
                this.isOpen = false;
            }
        },
        deleteHandler() {
            /** Event emitted when delete button clicked that passes back the form object */
            this.$emit('delete', this.$refs.acoModalForm);
        },
        backHandler() {
            /** Event emitted when back button clicked that passes back the form object */
            this.$emit('back', this.$refs.acoModalForm);
        },
        resetPageOnClose() {
            if (this.disableBodyScroll) {
                const body = document.querySelector('body');
                body.style.top = '0px';
                body.classList.remove('disable-body-scroll');
                document.documentElement.scrollTop = this.pageScrollPosition;
                this.pageScrollPosition = 0;
            }
            document.querySelectorAll('body > div').forEach(n => n.setAttribute('aria-hidden', false));
        },
    }
};
</script>

<style lang="scss" scoped>

@import "./src/styles/aco.scss";

.aco-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    justify-content: center;
    align-items: center;
    display: flex;
    max-height: 100%;
    overflow: auto;
    transition: opacity $aco-animation-slow;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    border-width: 0;
    &[open] {
        opacity: 1;
        pointer-events: all;
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
    }

    &__form {
        display: flex;
        position: relative;
        flex-direction: column;
        background: $aco-ui-white;
        border-radius: $aco-border-radius-large;
        padding: 24px;
        max-width: calc(100vw - 200px);
        max-height: calc(100vh - 200px);
        overflow: hidden;
        margin: 0 auto;
        box-sizing: border-box;
    }

    &__header {
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: space-between;
        align-items: center;
        &-text {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 1.2em;
        }
        .aco-icon {
            cursor: pointer;

            &[disabled] {
                opacity: $aco-disabled-opacity;
                cursor: not-allowed;
            }
        }
    }

    &__main {
        margin: 24px 0;
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;

        &-form {
            display: flex;
            flex-direction: column;
            min-height: 1.5em;
        }
    }

    &__footer {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        gap: 8px 40px;
        flex-wrap: wrap;
    }

    &__footer_action_buttons {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
    }

    &--top {
        align-items: flex-start;
        padding-top: 100px;
    }
}

@media (max-width: 540px) {
    .aco-modal {
        &__form {
            max-width: 100vw;
        }
        &__footer_action_buttons {
            flex-wrap: wrap;
        }
    }
}

@media (max-height: 540px) {
    .aco-modal {
        &__form {
            max-height: 100vh;
        }
        &--top {
            align-items: center;
            padding-top: 0;
        }
    }
}

</style>