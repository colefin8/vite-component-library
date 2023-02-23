
<template>
    <aco-dropdown :items="items" :aria-label="ariaLabel" :fixed-position="fixedPosition" @change="onClick">
        <aco-icon :icon="icon" size="20px" tabindex="0" />
    </aco-dropdown>
</template>

<script>
import './AcoIconMenu.scss';
import overflowTooltip from "../../../directives/overflowTooltip/overflowTooltip";

export default {
    name: "icon-menu",
    components: { 
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoDropdown: () => import('../../inputs/AcoDropdown/AcoDropdown.vue').then(d => d.default),
    },
    directives: { overflowTooltip },
    props: {
        /**
         * Icon to show for triggering the menu to appear
         */
        icon: {
            type: String,
            required: false,
            default: 'ph-dots-three-vertical-bold'
        },
        /**
         * Label for screen readers
         */
        ariaLabel: {
            type: String,
            required: false,
        },
        /**
         * Array of menu items. Each entry must have a label and can optionally have an icon (String), status (_optionsStatus), disabled (Boolean), key.
         */
        items: {
            type: Array,
            validator(items) {
                return items.every((item) => {
                    return item.label;
                });
            }
        },
        /**
         * Set the position to 'fixed' to allow overflow outside of relatively or absolutely placed containers (e.g.: Dialog boxes)
         */
        fixedPosition: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        onClick(key) {
            this.$emit('click', key);
        },
    }
};
</script>
