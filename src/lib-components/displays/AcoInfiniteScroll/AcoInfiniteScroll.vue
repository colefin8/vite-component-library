<template>
    <component 
        :is="tag"
        :class="['aco-infinite-scroll', { 'aco-infinite-scroll--always-scroll aco-infinite-scroll--horizontal': alwaysScroll }]"
        @scroll="onScroll"
        ref="listWrapper"
        :items="items"
    >
        <template v-for="(item, index) in items">
            <slot :item="item" name="items" :index="index" />
        </template>
        <component :is="tag === 'tbody' ? 'li' : 'div'" v-if="isLoading" class="aco-infinite-scroll__loader">
            <component :is="tag === 'tbody' ? 'td' : 'div'" colspan="999">
                <aco-loading />
            </component>
        </component>
    </component>
</template>

<script>
import { _optionsDirection } from '../../../propTypes';
import '../../../styles/aco.scss';

/**
 * Allows lazy-loading of scrollable content
 */
export default {
    name: 'aco-infinite-scroll',
    components: {
        AcoLoading: () => import('../AcoLoading/AcoLoading.vue').then(d => d.default),
        AcoTable: () => import('../tables/AcoTable/AcoTable.vue').then(d => d.default),
    },
    props: {
        /**
         * List of items to show
         */
        items: {
            type: Array,
        },
        /**
         * Show a scroll bar even if there are not enough items to cause scrolling
         */
        alwaysScroll: {
            type: Boolean,
            required: false,
            default: true
        },
        /**
         * Scrollbar pixel distance from bottom to trigger scroll
         */
        threshold: {
            type: Number,
            required: false,
            default: 50,
        },
        /**
         * The element with the scrollbar, defaults to the component's internal wrapper
         */
        scrollElement: {
            type: [String, Object],
            required: false,
        },
        /**
         * Direction of the scrolling: vertical or horizontal
         */
        scrollDirection: {
            type: String,
            validator(value) {
                return typeof value === 'string' && Object.values(_optionsDirection).includes(value);
            },
            required: false,
            default: _optionsDirection.VERTICAL
        },
        /**
         * Show loading animation
         */
        isLoading: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * The tag to use for the wrapper
         */
        tag: {
            type: String,
            required: false,
            default: 'ul'
        },
    },
    data() {
        return {
            isUpdating: false,
            internalScrollElement: null,
        };
    },
    watch: {
        scrollElement() {
            this.setupScroll();
        },
    },
    mounted() {
        this.setupScroll();
    },
    unmounted() {
        if (this.internalScrollElement) {
            this.internalScrollElement.removeEventListener('scroll', this.onScroll);
        }
    },
    methods: {
        conditionalWrapper({ condition, wrapper, children }) {
            return condition ? wrapper(children) : children;
        },
        setupScroll() {
            if (this.internalScrollElement) {
                this.internalScrollElement.removeEventListener('scroll', this.onScroll);
                this.internalScrollElement.classList.remove('aco-infinite-scroll__wrapper-always-scroll');
            }
            this.internalScrollElement = (
                (
                    typeof this.scrollElement === 'string'
                    ? document.querySelector(this.scrollElement)
                    : this.scrollElement
                ) || this.$refs.listWrapper || null
            );
            if (this.internalScrollElement && this.internalScrollElement.addEventListener) {
                if (this.alwaysScroll) {
                    this.internalScrollElement.classList.add('aco-infinite-scroll__wrapper-always-scroll');
                }
                this.internalScrollElement.addEventListener('scroll', this.onScroll);
            }
        },
        onScroll(event) {
            let target = event.target;
            if (target.scrollHeight - target.scrollTop <= target.clientHeight + this.threshold) { 
                this.isUpdating = true;
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    /** triggered when scrollbar reaches near the bottom */
                    this.$emit('load-more', { position: 'bottom' });
                }, 250);
            } else if (target.scrollTop < this.threshold) {
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    /** triggered when scrollbar reaches near the top */
                    this.$emit('load-more-top', { position: 'top' });
                }, 250);
            }
        },
    }
};
</script>

<style lang="scss" scoped>

    .aco-infinite-scroll {

        &__loader {
            position: sticky;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,.4);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    tbody.aco-infinite-scroll .aco-infinite-scroll__loader {
        display: table-row;

        td {
            text-align: center;
        }
    }

    ul.aco-infinite-scroll {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    div.aco-infinite-scroll {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    div.aco-infinite-scroll,
    ul.aco-infinite-scroll {
        overflow: auto;
        height: 100%;
        position: relative;

        &--always-scroll::before {
            content: '';
            position: absolute;
            top: 0;
            display: block;
            width: 1px;
            height: calc(100% + 3em);
        }

        &--horizontal {
            flex-direction: column;

            &.aco-infinite-scroll--always-scroll::before {
                height: 1px;
                width: calc(100% + 3em);
            }
        }
    }

</style>

<style lang="scss">

    .aco-infinite-scroll__wrapper-always-scroll {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            display: block;
            width: 1px;
            height: calc(100% + 3em);
        }
    }

</style>