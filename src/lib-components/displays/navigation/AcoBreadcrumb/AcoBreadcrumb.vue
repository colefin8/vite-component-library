<template>
    <nav :class="classes" aria-label="Breadcrumb">
        <template v-for="(crumb, index) in itemsToDisplay">
            <aco-icon v-if="index !== 0" :key="`caret-${index}`" class="aco-breadcrumb__caret" icon="ph-caret-right" size="14px" aria-hidden="true" />
            
            <aco-breadcrumb-item
                v-if="!Array.isArray(crumb)"
                :key="itemKey(crumb.value)"
                :label="crumb.label"
                :value="crumb.value"
                :href="crumb.href"
                :isLast="index === itemsToDisplay.length - 1"
                @click="onClick"
                data-x-ray="true"
            />

            <div v-else class="aco-breadcrumb__dropdown" :key="index" v-click-outside="closeDropdown" @keydown.esc="closeDropdownWithFocus">
                <div
                    ref="dropdownButton"
                    key="dropdownButton"
                    role="button"
                    aria-haspopup="menu"
                    :aria-expanded="shouldShowDropdown"
                    aria-label="hidden items"
                    class="aco-breadcrumb__dropdown-ellipsis aco-p-large aco-text-600"
                    tabindex="0"
                    @click="onToggleDropdown"
                    @keypress.space.prevent="onToggleDropdown"
                    @keypress.enter.prevent="onToggleDropdown"
                    data-x-ray-border="bottom"
                >
                    ...
                </div>
                <!-- conditionally show with a class so that overflow-tooltip works -->
                <div ref="dropdown" key="dropdown" role="menu" :class="['aco-breadcrumb__dropdown-body', {'aco-breadcrumb__dropdown-body--visible': shouldShowDropdown}]">
                    <aco-breadcrumb-item
                        v-for="dropdownCrumb in crumb"
                        :key="`dropdown-crumb-${dropdownCrumb.value}`"
                        class="aco-breadcrumb__dropdown-crumb aco-text-600"
                        :label="dropdownCrumb.label"
                        :value="dropdownCrumb.value"
                        :href="dropdownCrumb.href"
                        @click="onClick"
                    />
                </div>
            </div>
        </template>
    </nav>
</template>

<script>
import themeMixin from '../../../../mixins/themeMixin';
import '../../../../styles/aco.scss';
import './AcoBreadcrumb.scss';
import clickOutside from '../../../../directives/clickOutside/clickOutside';
import { createPopper } from '@popperjs/core'; //see https://popper.js.org/
import { _optionsTheme } from '../../../../propTypes';

import AcoBreadcrumbItem from './_AcoBreadcrumbItem.vue';

/**
 * A common way to display navigation
 */
export default {
    name: 'aco-breadcrumb',
    mixins: [themeMixin],
    components: {
        AcoBreadcrumbItem,
        AcoIcon: () => import('../../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    directives: { clickOutside },
    props: {
        /**
         * The crumbs to display. They are displayed in order. When there are four or more items, the middle ones will be
         * placed in a dropdown so the breadcrumb can be condensed. 
         * Takes an array of objects with an optional href property for links: {'label': [String, Number], 'value': [String, Number], 'href': [String]}
         */
        items: {
            type: Array,
            required: true,
            validator: (items) => {
                return items.every(item => 'label' in item && 'value' in item);
            }
        },
    },
    data() {
        return {
            shouldShowDropdown: false,
            dropdownInstance: null,
            hasItemUpdate: true,
        }
    },
    watch: {
        items() {
            this.hasItemUpdate = true;
            this.$forceUpdate();
        }
    },
    computed: {
        classes() {
            return [
                'aco-breadcrumb', 
                {'aco-breadcrumb--default': this.theme === _optionsTheme.DEFAULT_THEME},
            ];
        },
        isCondensed() {
            return this.items.length > 3;
        },
        itemsToDisplay() {
            if (this.isCondensed) {
                return [this.items[0], this.items.slice(1, this.items.length - 1), this.items[this.items.length - 1]];
            } else {
                return this.items;
            }
        }
    },
    methods: {
        itemKey(value) {
            // change the key to force update the item so overflow tooltip gets checked
            return this.hasItemUpdate ? `temp-key-${value}` : `item-${value}`;
        },
        onClick(value) {
            this.closeDropdown();
            // allow re-render before emitting
            this.$nextTick(() => {
                /** Emits the value of the crumb that was clicked if it doesn't have an href. */
                this.$emit('click', value);
            });
        },
        onToggleDropdown() {
            this.shouldShowDropdown = !this.shouldShowDropdown;
        },
        closeDropdown() {
            this.shouldShowDropdown = false;
        },
        closeDropdownWithFocus() {
            this.shouldShowDropdown = false;
            this.$refs.dropdownButton[0]?.focus();
        },
        updatePopper() {
            this.$nextTick(() => {
                this.dropdownInstance?.update();
                if (this.isCondensed && this.hasItemUpdate) {
                    this.dropdownInstance = createPopper(this.$refs.dropdownButton[0], this.$refs.dropdown[0], {
                        placement: 'bottom-start',
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-4, 4]
                                }
                            },
                            {
                                // prevent the dropdown from moving to the top
                                name: 'flip',
                                options: {
                                    fallbackPlacements: ['bottom-start'],
                                },
                            },
                        ]
                    });
                }
                this.hasItemUpdate = false;
            })
        },
    },
    mounted() {
        this.updatePopper();
    },
    updated() {
        this.updatePopper();
    },
};
</script>