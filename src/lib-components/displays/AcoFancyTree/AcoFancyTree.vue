<!-- This component is intended to be used in place of the jquery fancyTree plugin -->

<template>
    <div :role="rootIsArray ? 'tree' : 'treeitem'">
        <template v-if="rootIsArray">
            <aco-fancy-tree
                v-for="node in children"
                :key="node.key"
                :root="node"
                :filter="filter"
                :parentIcon="parentIcon"
                :leafIcon="leafIcon"
                :_selectedNode="selectedNode"
                :theme="theme"
                @selected="propagateSelected"
            />
        </template>
        <template v-else>
            <div
                class="root-node"
                @click="propagateSelected(root)"
                @dblclick="toggleExpanded"
            >
                <aco-icon
                    :icon="caretType"
                    :class="['tree-icon__caret', {'tree-icon__caret--hidden': !children.length}]"
                    :id="`${root.key}-caret`"
                    @click.native.stop="toggleExpanded"
                    :data-x-ray="!!children.length"
                />
                <div
                    class="root-node__title-container"
                    :id="`${root.key}-title-container`"
                >
                    <div class="tree-icon__identifier">
                        <aco-icon :icon="children.length ? parentIcon : leafIcon"/>
                    </div>
                    <div :class="['root-node__title', {'root-node__title--filtered': !doesMatchFilter}]" data-x-ray="true">
                        <span>{{ root.title }}</span>
                    </div>
                    <div :class="['tree-icon__selected', { 'aco-theme': theme === acoTheme }]">
                        <aco-icon v-if="isSelected" icon="ph-check-circle" />
                    </div>
                </div>
            </div>
            <transition
                name="expand"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
            >
                <ul v-if="isExpanded">
                    <aco-fancy-tree
                        v-for="node in children"
                        :key="node.key"
                        :root="node"
                        :filter="filter"
                        :parentIcon="parentIcon"
                        :leafIcon="leafIcon"
                        :_selectedNode="selectedNode"
                        :theme="theme"
                        @selected="propagateSelected"
                    />
                </ul>
            </transition>
        </template>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import { cloneDeep } from 'lodash';

export default {
    name: 'aco-fancy-tree',
    mixins: [themeMixin],
    components: {
        AcoIcon: () => import('../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoFancyTree: () => import('./AcoFancyTree.vue').then(d => d.default)
    },
    props: {
        /**
         * An array should always be passed to this from outside the component,
         * Objects are only passed around internally and should never be passed directly.
         * 
         * type Node = {
         *     title: String,
         *     key: String,
         *     children: Array<TreeNode>,
         *     ...<any other fields>
         * }
         */
        root: {
            type: [Array, Object],
            required: true
        },
        /**
         * This will only show the nodes that match the filter,
         * along with their direct ancestors.
         */
        filter: {
            type: String,
            default: ''
        },
        /**
         * The icon that will be shown on any node that has children/is expandable.
         */
        parentIcon: {
            type: String,
            default: 'ph-folder-notch'
        },
        /**
         * The icon that will be shown on any node that has no children/is not expandable.
         */
        leafIcon: {
            type: String,
            default: 'ph-folder-notch'
        },
        /**
         * Mostly used internally, but if you want to reset the state of the tree,
         * you can pass a null node to do so.
         */
        _selectedNode: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isExpanded: false,
            isSelected: false,
            selectedNode: null,
            children: []
        }
    },
    computed: {
        rootIsArray() {
            return Array.isArray(this.root);
        },
        caretType() {
            return this.isExpanded ? 'ph-caret-down' : 'ph-caret-right';
        },
        doesMatchFilter() {
            return this.root.title?.toLowerCase().includes(this.filter.toLowerCase());
        }
    },
    watch: {
        _selectedNode(node) {
            this.selectNode(node);
            if (!node) {
                this.isExpanded = false;
            }
        },
        filter() {
            this.setChildren();
        },
        root() {
            this.setChildren();
        }
    },
    mounted() {
        this.setChildren();
    },
    methods: {
        toggleExpanded() {
            if (this.children.length) {
                this.isExpanded = !this.isExpanded;
            }
        },
        selectNode(node) {
            this.selectedNode = node;
            this.isSelected = this.root == node;
        },
        propagateSelected(node) {
            this.selectNode(node);
            this.$emit('selected', node);
        },
        getTree(node) {
            node.children = node.children.filter(child => {
                return this.getTree(child).children.length > 0 || 
                    child.title.toLowerCase().includes(this.filter.toLowerCase());
            });
            return node;
        },
        computeChildren() {
            let newChildren = this.rootIsArray ? 
                this.getTree({children: cloneDeep(this.root)}).children : 
                this.root.children;
            this.children = newChildren.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        },
        setChildren() {
            if (this.rootIsArray) {
                this.computeChildren();
            } else {
                this.children = this.root.children;
                if (!(this.doesMatchFilter && this.children.length)) {
                    this.isExpanded = true;
                }
            }
        },
        enter(element) {
            const width = getComputedStyle(element).width;
            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';
            const height = getComputedStyle(element).height;
            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;
            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;
            element.style.height = height;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;
            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/aco.scss";
    .tree-icon {
        &__identifier {
            color: $aco-ui-600;
        }
        &__caret {
            margin-right: 4px;
            cursor: pointer;
            &--hidden {
                visibility: hidden;
            }
        }
        &__selected {
            color: $aco-default-primary;
            &.aco-theme {
                color: $aco-primary;
            }
        }
    }
    .root-node {
        padding: 8px;
        display: flex;
        align-items: center;

        &:hover {
            background-color: $aco-ui-100;
        }

        &__title-container {
            display: flex;
            align-items: center;
            flex-grow: 1;
            gap: 8px;
        }

        &__title {
            flex-grow: 1;
            display: flex;
            align-items: center;
            font-size: $aco-text-large;
            color: $aco-ui-900;
            cursor: pointer;
            user-select: none;

            &--filtered {
                opacity: 0.4;
            }
        }
    }
    ul {
        margin-bottom: 0;
        margin-top: 0;
    }
    .expand-enter-active, .expand-leave-active {
        transition: height $aco-animation-fast ease-out;
        overflow: hidden;
    }
    .expand-enter, .expand-leave-to {
        height: 0;
    }
</style>