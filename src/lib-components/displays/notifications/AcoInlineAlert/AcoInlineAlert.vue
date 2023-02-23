<template>
    <div :class="`aco-inline-alert aco-status-background-light-${status}`" data-x-ray="true">
        <div class="aco-inline-alert__badge--wrapper">
            <div :class="`aco-inline-alert__badge aco-status-background-medium-${status}`">
                <i :class="`aco-inline-alert__icon ph-${getIcon}`"></i>
            </div>
        </div>
        <div class="aco-inline-alert__text aco-text" role="alert">
            <p class="aco-inline-alert__text-content aco-text">
                <!-- @slot The alert message that can have added markup for things like links, and bolded text. -->
                <slot></slot>
            </p>
        </div>
        <div class="aco-inline-alert__links">
            <span class="aco-inline-alert__links-container" v-for="(link, i) in links" :key="i">
                <a 
                    :class="`aco-text aco-inline-alert__link aco-status-text-${status}--interactive`" 
                    :href="link.href" 
                    :target="link.target" 
                    :aria-label="link.title" 
                    tabindex="0"
                    @click="emitLinkClick"
                    @keypress.enter="emitLinkClick"
                >
                    {{link.title}}
                </a>
                <span v-if="links[i+1]" :class="`aco-inline-alert__divider aco-status-text-${status}`"></span>
            </span>
        </div>
    </div>
</template>

<script>
import { _optionsStatus } from '../../../../propTypes';
import '../../../../styles/aco.scss'

/**
 * An alert to be used within pages to display some information and possibly have a call to action for the user.
 */
export default {
    name: 'aco-inline-alert',
    props: {
        /** The status of the alert. Determines the color and icon. */
        status: {
            type: String,
            validator(value) {
                return typeof value === 'string' && Object.values(_optionsStatus).includes(value);
            },
            required: true,
            default: _optionsStatus.NEUTRAL
        },
        /** 
         * An array of actions displayed to the user on the alert.
         * @example [{ title: 'Go to link', href="https:...", id: "123" }, { title: 'Dismiss'}]
         */
        links: {
            type: Array,
            required: false,
            validator(value) {
                if (value.find(item => {
                    // title required, href optional, target optional
                    if (!item.title) {
                        console.error('aco-inline-alert: missing \'title\' property within object passed to the \'links\' prop.');
                        return true;
                    }
                    // title = string, href = string, target = string
                    if (typeof item.title !== 'string' && (item.href ? typeof item.href !== 'string' : false) && (item.target ? typeof item.target !== 'string' : false)) 
                        return true;
                }) !== undefined) return false;
                return true;
            },
        }
    },
    methods: {
        emitLinkClick() {
            /** Event emitted that passes back the link object that was clicked. */
            this.$emit('link-click', link);
        }
    },
    computed: {
        getIcon() {
            switch (this.status) {
                case _optionsStatus.DANGER: return 'warning-octagon';
                case _optionsStatus.WARNING: return 'warning';
                case _optionsStatus.POSITIVE: return 'check-circle';
                default: return 'info';
            }
        }
    }
};
</script>
