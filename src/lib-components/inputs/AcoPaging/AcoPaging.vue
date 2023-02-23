<template>
    <div class="paging">
        <div class="aco-p-small paging__text-container">
            <span class="paging__text--bold">{{ start }}</span>
            &nbsp;-&nbsp;
            <span class="paging__text--bold">{{ end }}</span>
            &nbsp;{{ translate('of') }}&nbsp;
            <span class="paging__text--bold">{{ total }}</span>
        </div>
        <aco-button :theme="theme" buttonStyle="secondary" icon="ph-arrow-left" @click="onClickPrevious" :disabled="isPrevDisabled || disabled"/>
        <aco-button :theme="theme" buttonStyle="secondary" icon="ph-arrow-right" @click="onClickNext" :disabled="isNextDisabled || disabled"/>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import translateMixin from '../../../mixins/translateMixin';
/**
 * Paging for navigating through pages of data. This does not show which page you are on, rather which items out of the total data are being displayed.
 * Values for item numbers and totals need to be supplied.
 */
export default {
    name: 'aco-paging',
    components: {
        AcoButton: () => import('../AcoButton/AcoButton.vue').then(d => d.default),
    },
    mixins: [ translateMixin, themeMixin ],
    props: {
        /** Index of which item is the first being displayed */
        start: {
            type: Number,
            validator(value) {
                return value >= 0;
            },
            default: 0,
        },
        /** Index of which item is the last being displayed */
        end: {
            type: Number,
            validator(value) {
                return value >= 0;
            },
            default: 0,
        },
        /** Total number of items */
        total: {
            type: Number,
            validator(value) {
                return value >= 0;
            },
            default: 0,
        },
        /** Disable arrows. Useful if results are loading and/or more clicks should be prevented. */
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        onClickPrevious() {
            /** Event emitted when the previous button is clicked. */
            this.$emit('prev');
        },
        onClickNext() {
            /** Event emitted when the next button is clicked. */
            this.$emit('next');
        },
    },
    created() {
        if (this.end > this.total) {
            console.error(`aco-paging: prop "end" is greater than prop "total"`);
        }
        if (this.start > this.end) {
            console.error(`aco-paging: prop "start" is greater than prop "end"`);
        }
    },
    computed: {
        isPrevDisabled() {
            return this.start <= 1;
        },
        isNextDisabled() {
            return this.end === this.total;
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.paging {
    display: flex;
    align-items: center;
    gap: 8px;

    &__text {
        &-container {
            display: flex;
            align-items: center;
        }
        &--bold {
            font-weight: bold;
        }
    }
}

</style>
