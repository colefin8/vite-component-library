
<template>
    <div class="aco-dropdown__list">
        <aco-input
            v-if="search"
            v-model="filterText"
            class="search-box"
            type="search"
            placeholder="Search"
            show-clear-button
        />
        <div class="aco-dropdown__fill-height" tabindex="-1">
            <li v-for="(item, index) in filteredItems"
                role="menuitem"
                :key="index"
                :tabindex="item.disabled ? '' : 0"
                :aria-hidden="item.disabled"
                :class="[
                    `aco-dropdown__list__item--${item.status || 'neutral'}`,
                    {
                        'aco-disabled': item.disabled,
                        'aco-dropdown__submenu-link': item.submenu,
                    },
                ]"
                @click.stop="onClick(item)"
                @keydown.enter.stop="onClick(item)"
            >
                <slot
                    :name="item.slot"
                    :value="item.key"
                    :item="item"
                    @change="onChange(index, item, $event)"
                >
                    <component v-if="hasIcons" :is="item.icon ? 'aco-icon' : 'span'" :icon="item.icon" class="aco_dropdown__item-icon" aria-hidden="true" />
                    <div class="aco_dropdown__item-label">
                        <div class="label" v-overflow-tooltip="item.label">{{ item.label }}</div>
                        <div class="sublabel" v-overflow-tooltip="item.sublabel">{{ item.sublabel }}</div>
                    </div>
                    <template v-if="item.submenu">
                        <span v-if="item.count" :class="['aco-dropdown__notification-badge', theme]">{{ item.count }}</span>
                        <aco-icon icon="ph-caret-right" />
                    </template>
                    <template v-else>
                        <aco-radio-button v-if="type === 'radio'" v-model="radioValue" :value="item.key" :name="name" :theme="theme" @selected="onClick(item)" />
                        <aco-checkbox v-else-if="type === 'checkbox'" :checked="checkboxValue(item)" :disabled="item.disabled" :theme="theme" @change="onClick(item)" />
                    </template>
                </slot>
            </li>
        </div>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import AcoButton from '../AcoButton/AcoButton.vue';
import AcoCheckbox from '../../inputs/AcoCheckbox/AcoCheckbox.vue';
import AcoIcon from '../../displays/icons/AcoIcon/AcoIcon.vue';
import AcoInput from '../AcoInput/AcoInput.vue';
import AcoRadioButton from '../../inputs/AcoRadioButton/AcoRadioButton.vue';
import overflowTooltip from '../../../directives/overflowTooltip/overflowTooltip';

export default {
    name: 'aco-dropdown-list',
    mixins: [themeMixin],
    components: { AcoButton, AcoCheckbox, AcoIcon, AcoInput, AcoRadioButton },
    directives: { overflowTooltip },
    props: {
        type: {
            type: String,
            default: 'menu'
        },        
        /**
         * Array of menu items. Each entry must have a label and can optionally have an icon (String), status (_optionsStatus), click (Function), disabled (Boolean).
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
         * Show the search box to filter the list of items based on their label
         */
        search: {
            type: Boolean,
            required: false,
            default: false,
        },
        selected: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            filterText: '',
            radioValue: '',
        }
    },
    created() {
        this.radioValue = (this.items?.find(item => item.selected)?.key || '');
    },
    computed: {
        hasIcons() {
            return this.items.some(item => item.icon);
        },
        filteredItems() {
            return this.items.filter(item => item.label.toLowerCase().includes(this.filterText.toLowerCase()));
        },
        name() {
            return `radio-buttons-${this._uid}`;
        }
    },
    methods: {
        checkboxValue(item) {
            return (this.selected || []).includes(item.key);
        },
        onClick(item) {
            if ((this.selected || []).includes(item.key)) {
                this.selected.splice(this.selected.indexOf(item.key), 1);
            } else {
                this.selected.push(item.key);
            }

            if (!item.disabled) {
                if (this.type === 'checkbox') {
                    this.$set(item, 'selected', !item.selected);
                    this.$emit('change', this.items);
                } else if (this.type === 'radio') {
                    this.radioValue = item.key;
                    this.items.forEach(i => i.selected = (i.key === item.key));
                    this.$emit('change', this.items);
                } else {
                    this.$emit('click', item);
                }
            }
        },
    }
};
</script>
