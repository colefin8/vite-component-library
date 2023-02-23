<template>
    <div class="aco-breadcrumb-item aco-p-large">
        <a 
            v-if="href && !isLast"
            class="aco-breadcrumb-item__link"
            :href="href"
            v-overflow-tooltip="label"
        >
            {{ label }}
        </a>
        <div 
            v-else
            class="aco-breadcrumb-item__label"
            :tabindex="isLast ? -1 : 0"
            role="button"
            @click.stop.prevent="onClick"
            @keypress.enter.prevent="onClick"
            v-overflow-tooltip="label"
        >
            {{ label }}
        </div>
    </div>
</template>

<script>
import '../../../../styles/aco.scss';
import './AcoBreadcrumb.scss';
import overflowTooltip from '../../../../directives/overflowTooltip/overflowTooltip';

export default {
    name: 'aco-breadcrumb-item',
    directives: { overflowTooltip, },
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number],
            required: true,
        },
        href: {
            type: String,
            required: false,
        },
        isLast: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    methods: {
        onClick() {
            if (!this.isLast) {
                this.$emit('click', this.value);
            }
        }
    },
    beforeDestroy() {
        /** GROSS ICKY HACK while we're still using jquery UI for tooltips */
        const tooltip = document.querySelector('.ui-tooltip');
        if (Array.isArray(tooltip)) {
            tooltip[0]?.remove();
        } else {
            tooltip?.remove();
        }
    },
};
</script>