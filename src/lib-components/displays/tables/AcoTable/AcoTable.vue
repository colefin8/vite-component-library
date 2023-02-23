<template>
    <aco-table-loading v-if="isLoadingHeader" :num-rows="numLoadingRows" :has-header="true" />

    <table v-else :class="[ 'aco-table', { 'aco-table--fixed-layout': isFixedLayout }]">
        <!-- @slot custom thead contents -->
        <slot name="thead">
            <thead :class="[ 'aco-table-header', { 'aco-table-header--sticky': useStickyHeaders }]" data-x-ray-border="bottom">
                <tr v-for="(header, index) in tableHeaders" :key="index">
                    <template v-for="(column, idx) in header">
                        <th v-if="column.checkbox" :key="`${idx}_1`" class="text-center">
                            <aco-checkbox :checked="toggleStatus !== optionsCheckbox.UNCHECKED" :indeterminate="toggleStatus === optionsCheckbox.INDETERMINATE" @change="onToggleAll" />
                        </th>
                        <th v-else :key="`${idx}_2`" 
                            :class="{
                                'aco-table__sortable': !!column.key,
                                'no-wrap': column.nowrap,
                                'aco-table__sortable--is-sorted': column === sortBy,
                                [`text-${column.align}`]: !!column.align
                            }"
                            @click="sortByColumn(column)"
                            :colspan="column.colspan || 1"
                            :style="`width: ${column.width};`"
                            v-overflow-tooltip="column.text"
                            data-x-ray
                        >
                            {{ column.text }}
                            <span :class="['aco-table__sort-icon', {
                                'ph-sort-ascending': column === sortBy && !sortDesc,
                                'ph-sort-descending': column === sortBy && sortDesc,
                            }]" />
                        </th>
                    </template>
                    <th v-if="$scopedSlots.actions || $scopedSlots['actions-header']" data-x-ray="true">
                        <!-- @slot text in the header for the actions column -->
                        <slot name="actions-header"></slot>
                    </th>
                </tr>
            </thead>
        </slot>
        <!-- @slot custom tbody contents -->
        <slot name="tbody">
            <tbody>

                <template v-for="(item, index) in orderedItems">
                    <!-- @slot format for custom tr tags -->
                    <slot name="rows" :item="item" :index="index">
                        <tr :key="index">
                            <td v-if="item.checkbox !== undefined" class="text-center" data-x-ray="true">
                                <!-- @slot custom checkbox -->
                                <slot name="checkbox" :index="index" :item="item">
                                    <aco-checkbox :disabled="item.checkbox.disabled === true" :checked="item.checkbox.checked" @change="onChecked({ index, item})" />
                                </slot>
                            </td>
                            <template v-for="(data, key) in item">
                                <td v-if="key !== 'checkbox'" :key="key"
                                    :class="{ [`text-${headerAlign(key)}`]: headerAlign(key), 'no-wrap': noWrap(key), }" v-overflow-tooltip="data"
                                    data-x-ray
                                >
                                    {{ data }}
                                </td>
                            </template>
                            <td v-if="$scopedSlots.actions" data-x-ray="true">
                                <!-- @slot show menu in actions column-->
                                <slot name="actions" :index="index" :item="item"></slot>
                            </td>
                        </tr>
                    </slot>
                </template>

                <tr v-if="numLoadingRows > 0">
                    <td :colspan="columnCount" class="aco-table__loading-skeleton">
                        <aco-table-loading :num-rows="numLoadingRows" :has-header="false" />
                    </td>
                </tr>
                <tr v-else-if="isLoading">
                    <td :colspan="columnCount" class="aco-table__loading">
                        <aco-loading />
                    </td>
                </tr>
                <tr v-else-if="!(sortedItems || []).length">
                    <td :colspan="columnCount" class="aco-table__no-results">
                        {{ translate(noResultsMessage) }}
                    </td>
                </tr>
            </tbody>
        </slot>
        <!-- @slot custom tfoot contents -->
        <slot name="tfoot">
            <tfoot class="aco-table-footer" :class="{ 'aco-table-footer--sticky': useStickyFooters }">
                <!-- @slot custom tfoot -->
                <slot name="footer" />
            </tfoot>
        </slot>
    </table>
</template>

<script>
import overflowTooltip from '../../../../directives/overflowTooltip/overflowTooltip.js';
import { _optionsCheckbox } from '../../../../propTypes';
import translateMixin from '../../../../mixins/translateMixin';
import '../../../../styles/aco.scss';

/**
 * Displays a data table with optional sticky header/footer, automatic column sorting, checkboxes, an action column, loading states, etc
 * 
 */
export default {
    name: 'aco-table',
    components: {
        AcoLoading: () => import('../../AcoLoading/AcoLoading.vue').then(d => d.default),
        AcoCheckbox: () => import('../../../inputs/AcoCheckbox/AcoCheckbox.vue').then(d => d.default),
        AcoTableLoading: () => import('../AcoTableLoading/AcoTableLoading.vue').then(d => d.default),
    },
    mixins: [ translateMixin, ],
    directives: { overflowTooltip },
    props: {
        /**
         * Keep the headers in place as the table is scrolled down
         */
        useStickyHeaders: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Keep the footers in place as the table is scrolled up
         */
        useStickyFooters: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * DEPRECATED: Use isLoadingHeader/numLoadingRows instead
         */
        isLoading: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Headers is an array containing the header objects or an array of arrays for multiple header rows. Each header object can have the following attributes though none are required:
         *  
         * "text": The actual text of the header
         * 
         * "key": The field in the data to sort by
         * 
         * "type": The type of the data to sort by ('numeric', 'money', 'text') defaults to text sorting alphabetically
         * 
         * "align": left, center, right
         * 
         * "colspan": Number of columns to span, defaults to 1
         * 
         * "checkbox": Will show a checkbox for toggling the state of all the checkboxes in a column
         * 
         * "nowrap": Boolean to indicate if text should wrap (automatically uses v-overflow-tooltip directive).  If "nowrap" is used, isFixedLayout should be set to true
         */
        headers: {
            type: Array,
            required: false,
        },
        /**
         * Array of table items with key, item pairs representing column names and values
         * 
         * To show a column of checkboxes, use the key 'checkbox' with an object having the checked status and optional disabled state: (e.g: checkbox: { checked: true, disabled: true })
         */
        items: {
            type: Array,
            required: false,
        },
        /**
         * Message to show when there are no items.  Will be translated in the component
         */
        noResultsMessage: {
            type: String,
            required: false,
            default: 'No Results',
        },
        /**
         * Will show AcoTableLoading component in place of table with numLoadingRows rows
         */
        isLoadingHeader: {
            type: Boolean,
            required: false,
            default: false,

        },
        /**
         * Displays a number of loading skeleton rows.
         * If isLoadingHeader is false, the skeleton rows will be added to the bottom of any already loaded rows within the items prop.
         */
        numLoadingRows: {
            type: Number,
            required: false,
            default: 0,
        },
        /**
         * Set the table layout to fixed.  Allows overflow of table cells
         */
        isFixedLayout: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
        * Array of keys to set the order of the columns in the body of the table
        */
        columnOrder: {
            type: Array,
            default: null,
            required: false,
        },
    },
    data() {
        return {
            optionsCheckbox: _optionsCheckbox,
            sortedItems: [],
            sortDesc: false,
            sortBy: null,
            sortIndex: null,
        };
    },
    computed: {
        tableHeaders() {
            return (
                (this.headers && this.headers.length)
                ? (
                    !Array.isArray(this.headers[0])
                    ? [this.headers]
                    : this.headers
                )
                : null
            );
        },
        lastHeader() {
            return this.tableHeaders[this.tableHeaders.length-1];
        },
        columnCount() {
            return (this.tableHeaders || []).reduce((count, header) => Math.max(header.length, count), 0);
        },
        toggleStatus() {
            let checkedCount = this.orderedItems.reduce((x, item) => x + (item.checkbox?.checked ? 1 : 0), 0);
            return (
                checkedCount === 0
                ? _optionsCheckbox.UNCHECKED
                : (
                    checkedCount === this.orderedItems.length
                    ? _optionsCheckbox.CHECKED
                    : _optionsCheckbox.INDETERMINATE
                )
            );
        },
        orderedItems() {
            return (
                this.columnOrder
                ? this.items.map(item => this.columnOrder.reduce((reordered, key) => ({ ...reordered, [key]: item[key]}), {}))
                : this.items
            );
        },
    },
    created() {
        this.sortedItems = this.orderedItems;
        if (this.isLoading) {
            console.warn("aco-table: isLoading prop is deprecated- use isLoadingHeader/numLoadingRows instead");
        }
    },
    watch: {
        items() {
            this.sortedItems = this.orderedItems;
        },
    },
    methods: {
        sortByColumn(col) {
            if (!!col.key) {
                if (this.sortBy === col) {
                    this.sortDesc = !this.sortDesc;
                } else {
                    this.sortDesc = false;
                    this.sortBy = col;
                }
            }

            if (!!this.sortBy && !!this.sortedItems) {
                this.sortData();
            }
            /** 
             * Triggered when one of the column headers is clicked.
             * Returns an object with the properties key (column name that was clicked), desc (whether should sort in descending order), and type (the type of sort: i.e. 'numeric', 'money', or 'text').
             */
            this.$emit('sort', { ...col, desc: this.sortDesc });
        },
        sortData(data = this.sortedItems, column = this.sortBy?.key, isDesc = this.sortDesc, type = this.sortBy?.type) {
            const regEx = /[$,]/g;
            data.sort((itemA, itemB) => {
                let a = (itemA[column] || '');
                let b = (itemB[column] || '');
                switch(type) {
                    case 'numeric':
                        return (parseFloat(a || 0) - parseFloat(b || 0)) * (isDesc ? -1 : 1);
                    break;

                    case 'money':
                        return (parseFloat(a.replaceAll(regEx, '') || 0) - parseFloat(b.replaceAll(regEx, '') || 0)) * (isDesc ? -1 : 1);
                    break;

                    case 'text':
                    default:
                        return `${a}`.localeCompare(`${b}`) * (isDesc ? -1 : 1);
                    break;
                }
            });
        },
        onChecked(index_item) {
            if (!this.$listeners.checked) {
                console.warn('In order for the checkboxes to be active an event listener need to be attached to the checked event and the checked column updated');
            }
            /** triggered when a checkbox in the body is checked or unchecked */
            this.$emit('checked', index_item)
        },
        onToggleAll(e) {
            let canCheck = this.orderedItems.some(item => !item.checkbox?.checked && !item.checkbox?.disabled);
            /** triggered when the checkbox in the header is checked or unchecked, returns true if there is an item that can be checked */
            this.$emit('toggle-all', canCheck);
        },
        headerAlign(key) {
            return this.lastHeader.find(header => header.key === key)?.align;
        },
        noWrap(key) {
            return !!this.lastHeader.find(header => header.key === key)?.nowrap;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";

.aco-table {
    border: none;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    background: $aco-ui-white;

    &--fixed-layout {
        table-layout: fixed;
    }

    thead {
        tr {
            box-shadow: inset 0 -1px 0 $aco-ui-100;

            th {
                border: none;
                vertical-align: middle;
                @extend .aco-table-header;
            }
        }
    }

    tbody {
        @extend .aco-p-medium;
    
        tr {
            border-bottom: 1px solid $aco-ui-100;

            &:hover {
                background: $aco-ui-100;
            }

            td {
                line-height: 18px;
            }
        }
    }

    thead tr:last-child th {
        box-shadow: inset 0 -1px 0 $aco-ui-900;
    }

    tbody th {
        border-right: 1px solid $aco-ui-900;
    }

    th, td {
        text-align: left;
        padding: 16px 8px;

        .aco-checkbox {
            margin: -5px 0;
            vertical-align: sub;
        }

        &.aco-table__loading-skeleton {
            padding: 0;
        }
    }

    tfoot tr:last-child {
        box-shadow: inset 0 1px 0 $aco-ui-900;
    }

    td.aco-table__no-results {
        text-align: center;
    }

    &__sortable {
        cursor: pointer;
        position: relative;
    }

    th.aco-table__sortable--is-sorted {
        padding-right: 16px;
    }

    th:not(&__sortable) {
        cursor: default;
    }

    &__sort-icon {
        position: absolute;
        top: 50%;
        margin: -.5em -0.125em;
        right: 0.25em;
    }

    &-header--sticky,
    &-footer--sticky {
        position: sticky;
        background: $aco-ui-white;
        z-index: 200;
    }

    &-header--sticky {
        top: 0;
    }

    &-footer--sticky {
        bottom: 0;
    }

    th, td {
        &.no-wrap { 
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.text-left { text-align: left; }
        &.text-center { text-align: center; }
        &.text-right { text-align: right; }
    }

}

</style>