
<template>
    <div class="aco-dropdown" :aria-expanded="isShowingDropdown.toString()">
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
        <div 
            ref="target"
            :readonly="readonly"
            :class="['aco-dropdown__target', { 'aco-dropdown--active': isShowingDropdown, 'aco-disabled': disabled }]"
            :aria-label="ariaLabel"
            :id="inputId"
            @click.stop="toggleDropdown"
            @keydown.enter.stop="toggleDropdown"
        >
            <slot name="default">
                <div :class="[ 'aco-dropdown__input' ]" tabindex="0" :style="{ width: widthString }">
                    <span v-if="text || value" class="aco-dropdown__text">{{ text || value }}</span>
                    <span v-else class="aco-dropdown__placeholder">{{ placeholder }}</span>
                    <aco-icon v-if="allowClear && value && type === 'menu' && !isShowingDropdown" icon="ph-x-circle" @click.stop="clear" />
                    <aco-icon icon="ph-caret-down" />
                </div>
            </slot>
        </div>
        <transition name="slideUp">
            <div
                ref="tooltip"
                role="tooltip"
                :class="['aco-dropdown__body', {'aco-dropdown__body--visible': isShowingDropdown}]"
                :style="dropdownStyle"
                @keydown.stop="onKeydown"
            >
                <menu class="aco-dropdown__dropdown">
                    <div v-if="title" class="aco-dropdown__title">{{ title }}</div>
                    <template v-if="!active">
                        <aco-dropdown-list :items="items" @click="onClick" @change="onChange($event)" :type="type" :search="search" :theme="theme" :selected="selected">
                            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                                <slot :name="name" v-bind="slotData" />
                            </template>
                        </aco-dropdown-list>
                    </template>
                    <template v-else v-for="(item, index) in items">
                        <template v-if="item.submenu && item.submenu === active.submenu">
                            <li
                                :key="`${item.key}_back`"
                                :tabindex="0"
                                class="aco-dropdown__back"
                                @click.stop="onBack(item)"
                                @keydown.enter.stop="onBack(item)"
                            >
                                <aco-button buttonStyle="tertiary" size="small" icon="ph-caret-left" :theme="theme">
                                    {{ item.label }}
                                </aco-button>
                            </li>
                            <slot
                                :name="`${item.submenu.slot}`"
                                :value="item.submenu.slot"
                                :item="item"
                                @change="onChange($event, index, item)"
                            >
                                <aco-dropdown-list
                                    :key="`${item.key}`"
                                    :items="item.submenu.items"
                                    :search="item.submenu.search"
                                    :type="item.submenu.type"
                                    :theme="theme"
                                    :selected="item.submenu.items.filter(item => item.selected).map(item => item.key)"
                                    @change="onChange($event, index, item)"
                                    @click="onClick"
                                />
                            </slot>
                        </template>
                    </template>
                </menu>
                <div v-if="showButtons" class="aco-dropdown__button-wrapper">
                    <aco-button buttonStyle="tertiary" :theme="theme" @click="submit">{{ submitLabel }}</aco-button>
                    <aco-button buttonStyle="tertiary" :disabled="isResetDisabled" :theme="theme" @click="reset">{{ resetLabel }}</aco-button>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
import './AcoDropdown.scss';
import labelMixin from '../../../mixins/labelMixin';
import themeMixin from '../../../mixins/themeMixin';
import translateMixin from '../../../mixins/translateMixin';
import AcoDropdownList from './_AcoDropdownList.vue';
import { _optionsPlacement } from '../../../propTypes';
import { createPopper } from '@popperjs/core'; //see https://popper.js.org/

export default {
    name: 'aco-dropdown',
    mixins: [labelMixin, themeMixin, translateMixin],
    components: {
        AcoCheckbox: () => import('../../inputs/AcoCheckbox/AcoCheckbox.vue').then(d => d.default),
        AcoButton: () => import('../AcoButton/AcoButton.vue').then(d => d.default),
        AcoDropdownList,
        AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoRadioButton: () => import('../../inputs/AcoRadioButton/AcoRadioButton.vue').then(d => d.default),
    },
    directives: { 
        overflowTooltip: () => import('../../../directives/overflowTooltip/overflowTooltip').then(d => d.default),
    },
    model: {
        prop: 'defaults',
        event: 'change'
    },
    props: {
        /** The id for the input tag, auto-generated if not given. */
        id: {
            type: Number,
            required: false,
        },
        /**
         * default selected value(s)
         */
        defaults: {
            required: false,
            default: null,
        },
        /**
         * Label for screen readers
         */
        ariaLabel: {
            type: String,
            required: false,
        },
        /**
         * Text to show in the input box (overwrites value)
         */
        text: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * Placeholder in the input box (overwritten by text or value)
         */
        placeholder: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * Types are menu, checkbox, radio, complex
         */
        type: {
            type: String,
            required: false,
            default: 'menu'
        }, 
        /**
         * Array of menu items. Each entry must have a label and can optionally have the following:
         * 
         * icon, (String, same as IconMenu icon, icon that appears to the left of the label)
         * label, (String, same as IconMenu label, label of the dropdown item)
         * key,  (String, same as IconMenu key, unique value or id of the dropdown item)
         * status, (String _optionsStatus, same as IconMenu status, gives the icon and text the color of the status)
         * disabled, (Boolean, same as IconMenu disabled)
         * selected, (Boolean, for checkboxes or radio buttons)
         * submenu, (Object containing items in the submenu)
         * slot, (Slot name to show)
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
        /**
         * Show search box which will filter the items based on their `label`
         */
        search: {
            type: Boolean,
            required: false,
            default: false,
        },
        width: {
            type: [Number, String],
            required: false,
            default: 300,
        },
        minHeight: {
            type: [Number, String],
            required: false,
            default: null,
        },
        maxHeight: {
            type: [Number, String],
            required: false,
            default: null,
        },
        /**
         * Text of the submit button. The buttons will appear if there is a submit event listener
         */
        submitLabel: {
            type: String,
            default: 'Done',
            required: false,
        },
        /**
         * Text of the reset button. The buttons will appear if there is a submit event listener
         */
        resetLabel: {
            type: String,
            default: 'Reset',
            required: false,
        },
        /**
         * Title of the dropdown.  Shows above the menu items when the dropdown is open
         */
        title: {
            type: String,
            default: '',
            required: false,
        },
        /**
         * Show an X to clear the selection for type 'menu' with an input box
         */
        allowClear: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data() {
        return {
            active: false,
            popupInstance: null,
            isShowingDropdown: false,
            selected: [],
        }
    },
    computed: {
        inputId() {
            return this.id || `aco-input-${this._uid}`;
        },
        value() {
            let key = (
                Array.isArray(this.selected) && this.selected.length > 0
                ? this.selected[0]
                : this.selected
            );
            return (this.items.find(item => item.key === key) || {}).label;
        },
        widthString() {
            return this.setSizeString(this.width);
        },
        showButtons() {
            return this.type !== 'menu';
        },
        isResetDisabled() {
            return this.items.every(item => (item.count || 0) === 0 && !item.selected) && !this.selected.length;
        },
        dropdownStyle() {
            return {
                width: this.widthString,
                minHeight: this.setSizeString(this.minHeight),
                maxHeight: this.setSizeString(this.maxHeight),
            };
        },
        strategy() {
            return this.fixedPosition ? 'fixed' : 'absolute';
        },
    },
    created() {
        this.setSelected();
    },
    mounted() {
        this.$nextTick(() => {
            this.popupInstance = createPopper(this.$refs.target, this.$refs.tooltip, {
                strategy: this.strategy,
                placement: _optionsPlacement.BOTTOM_START,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8]
                        }
                    },
                ]
            });
        });
    },
    watch: {
        defaults() {
            this.setSelected();
        }
    },
    methods: {
        setSizeString(value) {
            return (
                typeof(value) === 'number'
                ? `${value}px`
                : value
            )
        },
        setSelected() {
            this.selected = (
                this.defaults
                ? Array.isArray(this.defaults)
                    ? this.defaults
                    : [this.defaults]
                : (
                    this.items.filter(item => item.selected).map(item => item.key) || []
                )
            ).slice(0);
        },
        onClick(item) {
            if (!item.disabled) {
                if (item.submenu) {
                    this.active = item;
                } else {
                    this.active = null;
                    this.$emit('change', item.key || item.label);
                    this.isShowingDropdown = false;
                }
            }
        },
        onChange(subitems, index, item) {
            if (item) {
                let count = subitems.reduce((a, v) => a + ((v.selected && v.key !== '') ? 1 : 0), 0)
                item.count = count;
                this.$set(this.items, index, item);
            }
            this.$emit('change', this.selected);
        },
        onBack() {
            this.active = null;
        },
        onKeydown(e) {
            let item = e.target;
            if (item.tagName !== 'LI') {
                item = item.closest('LI');
            }
            if (item) {
                switch(e.key) {
                    case 'ArrowUp':
                        while(item.previousSibling && item.previousSibling.classList.contains('aco-disabled')) {
                            item = item.previousSibling;
                        }
                        if (item.previousSibling) {
                            item.previousSibling.focus();
                        }
                    break;
                    case 'ArrowDown':
                        while(item.nextSibling && item.nextSibling.classList.contains('aco-disabled')) {
                            item = item.nextSibling;
                        }
                        if (item.nextSibling) {
                            item.nextSibling.focus();
                        }
                    break;
                }
            }
        },
        reset() {
            let resetItems = (items) => {
                items.forEach(item => {
                    if (item.selected === true) {
                        item.selected = false;
                    }
                    if (item.count > 0) {
                        item.count = 0;
                    }
                    if (item.value) {
                        item.value = undefined;
                    }
                    if (item?.submenu?.items) {
                        resetItems(item.submenu.items);
                    }
                });
            };
            resetItems(this.items);
            this.$set(this.items, 0, this.items[0]);
            this.$emit('change', []);
            this.active = null;
        },
        submit() {
            this.active = null;
            this.isShowingDropdown = false;
            this.$emit('submit', this.items);
        },
        toggleDropdown() {
            if (!this.disabled && !this.readonly) {
                this.isShowingDropdown = !this.isShowingDropdown;
                this.$emit('dropdown-toggled', this.isShowingDropdown);
            }
        },
        clear() {
            this.$emit('change', null);
        },
    },
    updated() {
        this.$nextTick(() => {
            this.popupInstance?.update();
        });
    },
};
</script>
