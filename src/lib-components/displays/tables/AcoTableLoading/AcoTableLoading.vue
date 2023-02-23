<template>
    <div class="aco-table-loading">
        <div class="aco-table-loading__loading-mask">
            <div v-if="hasHeader" class="aco-table-loading__row aco-table-loading__header">
                <div v-for="cutout in numRowCutouts" class="aco-table-loading__cutout-container" :key="cutout"></div>
            </div>
            <div
                v-for="index in numRows"
                :key="index"
                class="aco-table-loading__row"
            >
                <span class="aco-table-loading__circles-container"></span>
                <div v-for="cutout in numRowCutouts" class="aco-table-loading__cutout-container" :key="cutout"></div>
                <span class="aco-table-loading__circles-container"></span>
                <span class="aco-table-loading__circles-container"></span>
            </div>
        </div>
    </div>
</template>

<script>
import './AcoTableLoading.scss';

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'aco-table-loading',
    props: {
        /**
         * The number of rows to be displayed. Excluding the header row.
         */
        numRows: {
            type: Number,
            required: false,
            default: 5,
        },
        hasHeader: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    setup() {
        const numRowCutouts = 4;
        return {
            numRowCutouts
        };
    }
});
</script>