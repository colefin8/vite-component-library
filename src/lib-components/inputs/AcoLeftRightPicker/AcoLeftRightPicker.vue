<template>
    <div
        class="aco-left-right-picker"
        :class="componentClasses"
        :aria-hidden="disabled"
        :tabindex="disabled ? -1 : null"
        data-x-ray="true"
    >
        <div class="aco-left-right-picker__search">
            <!-- TODO: replace with AcoInput -->
            <input class="aco-left-right-picker__search-input aco-text" v-model="searchQuery" type="search" :placeholder="placeholder" :tabindex="disabled ? -1 : null"/>
            <aco-icon class="aco-left-right-picker__search-icon" icon="ph-magnifying-glass" aria-hidden="true"/>
        </div>
        <div class="aco-left-right-picker__left aco-text">
            <div class="aco-left-right-picker__header">
                <div 
                    class="aco-left-right-picker__header-text"
                    v-overflow-tooltip="`${unselectedOptions.length} ${translate('Available')}`"
                >
                    {{ `${unselectedOptions.length} ${translate('Available')}` }}
                </div>
                <aco-button
                    class="aco-left-right-picker__header-action"
                    button-style="tertiary"
                    size="small"
                    :theme="theme"
                    @click="onToggleAll(true)"
                    :tabindex="disabled ? -1 : null"
                    :disabled="unselectedOptions.length === 0"
                >
                    {{ translate('Add All') }}
                </aco-button>
            </div>
            <ul 
                class="aco-left-right-picker__options aco-scrollbar"
                role="listbox"
                ref="unselected"
                @keydown="handleKeyboardNavigation($event, listName.LEFT, unselectedOptions, 'unselected')"
                @focusout="onFocusOutOptions"
            >
                <transition-group name="aco-lrp-option" :css="hasAnimation">
                    <li 
                        v-for="(option, index) in unselectedOptions"
                        :key="option.id"
                        :ref="`unselected-${index}`"
                        :tabindex="getOptionTabindex(index, listName.LEFT)"
                        class="aco-left-right-picker__option"
                        role="option"
                        @click.once="onToggleOption(option.id)"
                        translate="no"
                    >
                        <span class="aco-left-right-picker__option-name" v-overflow-tooltip="option.name">{{ option.name }}</span>
                        <aco-icon class="aco-left-right-picker__option-icon" icon="ph-plus-circle" aria-hidden="true"/>
                    </li>
                </transition-group>
            </ul>
        </div>
        <div class="aco-left-right-picker__right aco-text">
            <div class="aco-left-right-picker__header">
                <span 
                    class="aco-left-right-picker__header-text"
                    aria-live="polite"
                    v-overflow-tooltip="`${selectedOptions.length} ${translate('Selected')}`"
                >
                    <b>{{ selectedOptions.length }}</b> {{ translate('Selected') }}
                </span>
                <aco-button 
                    class="aco-left-right-picker__header-action"
                    button-style="tertiary"
                    size="small"
                    :theme="theme"
                    @click="onToggleAll(false)"
                    :tabindex="disabled ? -1 : null"
                    :disabled="selectedOptions.length === 0"
                >
                    {{ translate('Remove All') }}
                </aco-button>
            </div>

            <draggable
                tag="ul"
                class="aco-left-right-picker__selected aco-scrollbar"
                draggable=".aco-left-right-picker__selected-item"
                ghost-class="aco-left-right-picker__selected-item--ghost"
                @start="onDragStart"
                @end="onDragEnd"
                animation="150"
                delay="200"
                :delay-on-touch-only="true"
                :component-data="draggableAttributes"
                :disabled="isSortingDisabled"
                @keydown.native="handleKeyboardNavigation($event, listName.RIGHT, selectedOptions, 'selected')"
                @focusout.native="onFocusOutOptions"
                ref="selected"
            >
                <transition-group name="aco-lrp-option" :css="hasAnimation">
                    <li 
                        v-for="(option, index) in selectedOptions"
                        :key="option.id"
                        :class="['aco-left-right-picker__selected-item', {'aco-left-right-picker__selected-item--no-sort': isSortingDisabled}]"
                        @mouseenter="onMouseEnterOption"
                        @mouseleave="onMouseLeaveOption"
                        translate="no"
                    >
                        <aco-icon :class="['aco-left-right-picker__selected-item-grab-handle', {'aco-disabled': isSortingDisabled}]" icon="ph-dots-six-vertical" aria-hidden="true"/>
                        <span class="aco-left-right-picker__selected-item-name" v-overflow-tooltip="option.name" aria-hidden="true">
                            {{ option.name }}
                        </span>
                        <aco-icon
                            class="aco-left-right-picker__selected-item-icon"
                            icon="ph-x-circle"
                            :ref="`selected-${index}`"
                            :tabindex="getOptionTabindex(index, listName.RIGHT)"
                            @click.native.once="onToggleOption(option.id)"
                            :aria-label="`remove ${option.name}`"
                            role="option"
                        />
                    </li>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
import './AcoLeftRightPicker.scss';
import draggable from "vuedraggable";
import { _optionsTheme } from '../../../propTypes';
import translateMixin from '../../../mixins/translateMixin.js';
import overflowTooltip from '../../../directives/overflowTooltip/overflowTooltip';
import themeMixin from '../../../mixins/themeMixin';

/**
 * Allows for the selection of multiple options along with controlled ordering of those selected options.
 */
export default {
    name: 'aco-left-right-picker',
    model: {prop: 'options', event: 'change'},
    directives: {overflowTooltip},
    mixins: [translateMixin, themeMixin],
    components: { 
        draggable,
        AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoButton: () => import('../../inputs/AcoButton/AcoButton.vue').then(d => d.default),
    },
    props: {
        /**
         * Requires objects that have the following properties: id, name, order, isSelected.
         * Expects all options that have isSelected set false to have an order value of null.
         */
        options: {
            type: Array,
            required: true,
            validator: (options) => {
                return typeof((options)) === 'object' && options.every(option => {
                    return ('id' in option && 'name' in option && 'order' in option && 'isSelected' in option);
                });
            },
        },
        /** Customize the search input placeholder */
        placeholder: {
            type: String,
            required: false,
            default: 'Search',
        },
        /** Makes the component mobile-friendly. To be replaced with container-queries once they are available. */
        isMobile: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** Determines if picker should take up 100% width of available space */
        isFullWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            searchQuery: null,
            isDragging: false,
            hasAnimation: true,
            activeOptionIndex: null,
            listName: {
                LEFT: 0,
                RIGHT: 1,
            },
            activeListName: null,
        }
    },
    watch: {
        searchQuery(newQuery, prevQuery) {
            if (!prevQuery) {
                this.$refs.unselected.scrollTo(0, 0);
                this.$refs.selected.$el.scrollTo(0,0);
            }
            // prevent the animation from happening when options get filtered
            this.hasAnimation = false;
            this.$nextTick(() => {
                this.hasAnimation = true;
            });
        }
    },
    computed: {
        componentClasses() {
            return {
                'aco-disabled': this.disabled,
                'aco-left-right-picker--mobile': this.isMobile,
                'aco-left-right-picker--full-width': this.isFullWidth,
            };
        },
        unselectedOptions() {
            return this.filterByQuery(
                this.options
                    .filter(option => !option.isSelected)
                    .sort((o1, o2) => o1.name >= o2.name ? 1 : -1)
            );
        },
        selectedOptions() {
            return this.filterByQuery(
                this.options
                    .filter(option => option.isSelected)
                    .sort((o1, o2) => o1.order >= o2.order ? 1 : -1)
            );
        },
        draggableAttributes() {
            return {
                attrs: {
                    role: 'listbox',
                }
            }
        },
        isSortingDisabled() {
            return this.searchQuery !== null && this.searchQuery !== '';
        },
    },
    methods: {
        onToggleOption(optionId) {
            if (!this.disabled) {
                let optionToUpdate = this.options.find(option => option.id === optionId);
                optionToUpdate.isSelected = !optionToUpdate.isSelected;
                if (optionToUpdate.isSelected) {
                    optionToUpdate.order = this.options.filter(option => option.isSelected).length;
                } else {
                    optionToUpdate.order = null;
                    this.updateSelectedOptionsOrder();
                }
                this.$emit('change', this.options);
            }
        },
        onToggleAll(flag) {
            if (!this.disabled) {
                this.hasAnimation = false;
                if (flag) {
                    const selectedOptionsCount = this.options.filter(option => option.isSelected).length;
                    [...this.unselectedOptions].forEach((option, index) => {
                        option.isSelected = flag;
                        option.order = index + 1 + selectedOptionsCount;
                    });
                } else {
                    this.options.forEach(option => {
                        option.isSelected = flag;
                        option.order = null;
                    });
                }
                this.$emit('change', this.options);
                this.$nextTick(() => {
                    this.hasAnimation = true;
                })
            }
        },
        onFocusOutOptions(e) {
            const currentTarget = e.currentTarget;
            this.$nextTick(() => {
                if (!document.activeElement || !currentTarget.contains(document.activeElement)) {
                    this.activeOptionIndex = null;
                    this.activeListName = null;
                }
            });
        },
        handleKeyboardNavigation(e, listName, options, refPrefix) {
            if (this.activeOptionIndex === null || this.activeListName !== listName) {
                this.activeOptionIndex = 0;
                this.activeListName = listName;
            }
            switch (e.key) {
                case ' ': // Space
                    e.preventDefault();
                    this.onToggleOption(options[this.activeOptionIndex].id);
                    if (options.length - 1 > 0) {
                        if (this.activeOptionIndex >= options.length - 1) {
                            this.activeOptionIndex--;
                        }
                        this.$nextTick(() => {
                            this.focusActiveOption(refPrefix);
                        });
                    } else {
                        this.activeOptionIndex = null;
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.activeOptionIndex > 0) {
                        this.activeOptionIndex--;
                    } else {
                        this.activeOptionIndex = options.length - 1;
                    }
                    this.focusActiveOption(refPrefix);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (this.activeOptionIndex < options.length - 1) {
                        this.activeOptionIndex++;
                    } else {
                        this.activeOptionIndex = 0;
                    }
                    this.focusActiveOption(refPrefix);
                    break;
            }
        },
        getOptionTabindex(index, listName) {
            const isActive = this.activeOptionIndex === index && listName === this.activeListName;
            return (!this.disabled && (isActive || this.activeOptionIndex === null && index === 0)) ? 0 : -1;
        },
        focusActiveOption(prefix) {
            let ref = this.$refs[`${prefix}-${this.activeOptionIndex}`][0];
            // if it's a component, grab the $el property
            (ref.$el ?? ref).focus();
        },
        onDragStart() {
            this.isDragging = true;
        },
        onDragEnd(event) {
            this.isDragging = false;
            if (event.oldIndex === event.newIndex) {
                return;
            }

            const movedOption = this.selectedOptions.find((option, index) => index === event.oldIndex);
            // find all items between old index and new index and update order
            if (event.newIndex > event.oldIndex) {
                // shift all options between new and old index by -1
                this.selectedOptions
                    .slice(event.oldIndex + 1, event.newIndex + 1)
                    .forEach(option => {
                        option.order -= 1;
                    });
            } else {
                // shift all options between new and old index by 1
                this.selectedOptions
                    .slice(event.newIndex, event.oldIndex)
                    .forEach(option => {
                        option.order += 1;
                    });
            }
            movedOption.order = event.newIndex + 1;

            this.$emit('change', this.options);
        },
        /* onMouseEnterOption and onMouseLeaveOption are a work around for the hover state persisting in the same location after drag and drop */
        onMouseEnterOption(e) {
            if (!this.isDragging) {
                e.target.classList.add('aco-left-right-picker__selected-item--hover');
            }
        },
        onMouseLeaveOption(e) {
            e.target.classList.remove('aco-left-right-picker__selected-item--hover');
        },
        filterByQuery(options) {
            if (this.searchQuery) {
                return options.filter(option => option.name.toLocaleLowerCase().trim().includes(this.searchQuery.toLocaleLowerCase().trim()));
            } else {
                return options;
            }
        },
        updateSelectedOptionsOrder() {
            this.selectedOptions.forEach((option, index) => {
                option.order = index + 1;
            });
        },
    }
};
</script>