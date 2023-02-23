<template>
    <div :class="['aco-tab-menu', theme, {'centered' : isCentered}]" @keydown="onKeydown" data-x-ray="true">
        <div 
            v-for="(item, index) in itemArray"
            :key="index"
            :tabindex="item.key === selectedKey ? 0 : -1"
            :ref="`button${index}`"
            role="button"
            :class="['aco-tab-item', { 'aco-disabled': item.disabled } ]"
            @click="setSelected(index)"
            @keydown.enter.prevent="setSelected(index)"
        >
            <span :class="{ 'selected': item.key === selectedKey}">
                <slot :name="item.slot">
                    {{ item.label }}
                </slot>
            </span>
        </div>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import '../../../styles/aco.scss'

/**
 * Use for a tabbed Menu Bar
 * Pass in an array of items to display and (if desired) which item index is selected
 */
export default {
    name: 'aco-tab-menu',
    mixins: [themeMixin],
    model: {
        prop: 'selected',
        event: 'itemSelected',
    },
    props: {
        /** 
         * List of items to display as tabs (string or html string)
         * Can be an array of strings, an object with keys and labels, or an array of objects with key, label and optional disabled boolean
         */
        items: {
            type: [Array, Object],
            required: true,
        },
        /**
         * Which item key (index) should start as selected 
         * Optional (default: 0)
         */
        selected: {
            type: [Number, String],
            default: 0,
            required: false,
        },
        /**
         * Whether to center the items (when horizontal)
         * Defaulted to false
         */
        isCentered: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Whether navigating tabs with arrow keys automatically changes the selected tab
         * Defaulted to false
         */
        isNavChangeAutomatic: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            selectedKey: this.selected,
            focusedIndex: 0,
        };
    },
    created() {
        this.focusedIndex = this.itemArray.findIndex(item => item.key === this.selected);
    },
    watch: {
        selected() {
            this.selectedKey = this.selected;
        }
    },
    computed: {
        itemArray() {
            return (
                Array.isArray(this.items)
                ? this.items.map((item, index) => (
                    typeof item === 'string'
                    ? {
                        key: index,
                        label: item,
                    }
                    : item
                ))
                : Object.keys(this.items).map(key => ({ key:key, label:this.items[key] }))
            );
        }
    },
    methods: {
        setSelected(index) {
            if (!this.itemArray[index].disabled) {
                this.selectedKey = this.itemArray[index].key;
                this.focusedIndex = index;
                this.$emit('itemSelected', this.selectedKey);
            }
        },
        onKeydown(e) {
            let next = 0;
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    next = -1;
                break;

                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    next = 1;
                break;

                case ' ':
                    e.preventDefault();
                    this.setSelected(this.focusedIndex);
                break;

                case 'Tab':
                    this.focusedIndex = this.itemArray.findIndex(item => item.key === this.selectedKey);
                return;
            };

            let loopCounter = this.itemArray.length;
            do {
                loopCounter--;
                this.focusedIndex += next;
                if (this.focusedIndex >= this.itemArray.length) {
                    this.focusedIndex = 0;
                };
                if (this.focusedIndex < 0) {
                    this.focusedIndex = this.itemArray.length - 1;
                };
            } while(this.itemArray[this.focusedIndex].disabled && loopCounter);

            this.$refs[`button${this.focusedIndex}`][0].focus();
            if (this.isNavChangeAutomatic) {
                this.setSelected(this.focusedIndex);
            };
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';
@import "./src/styles/variables/colors/colors.scss";

.aco-tab-menu {
    display: flex;
    height: 24px;
    & :last-child {
        margin: 0 0 6px 0;
    }
    &.centered {
        justify-content: center;
    }
}

.aco-tab-item {
    @extend .aco-text;
    cursor: pointer;
    color: $aco-ui-600;
    position: relative;

    &:hover:not(.aco-disabled) {
        color: $aco-default-primary;
    }

    .selected {
        color: $aco-ui-900;
    }

    &.aco-disabled {
        cursor: not-allowed;
    }
}

//large - horizontal
@media screen and (min-width: 768px) {
    .aco-tab-menu {
        border-bottom: 2px solid;
        border-color: $aco-ui-100;
        padding-bottom: 6px;
    }

    .aco-tab-item {
        margin: 0 24px 6px 0;
        height: 100%;
        bottom: -2px;
    }

    .selected {
        border-bottom: 2px solid;
        border-color: $aco-menu-active; 
        padding-bottom: 6px;
    }
}

//small - vertical
@media screen and (max-width: 767px) {
    .aco-tab-menu {
        flex-direction: column;
        border-left: 2px solid;
        border-color: $aco-ui-100;
        height: 100%;
    }

    .aco-tab-item {
        text-align: left;
        padding: 6px 0 6px 12px;
    }

    .selected {
        border-left: 2px solid;
        border-color: $aco-menu-active;
        padding: 6px 12px ;
        position: relative;
        left: -14px; /* padding + border width */
    }

}

.aco-theme {
    .aco-tab-item:hover:not(.aco-disabled) {
        color: $aco-primary;
    }

    .selected {
        border-color: $aco-primary;
    }
}


</style>