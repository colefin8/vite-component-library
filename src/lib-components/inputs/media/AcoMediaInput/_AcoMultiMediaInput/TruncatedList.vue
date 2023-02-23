<template>
    <div ref="outer-holder" class="truncated-list" v-resize="() => calculateNumRenderableChildren(false)">
        <v-nodes :vNodes="childrenToRender"/>
        <span ref="overflowSlot" v-show="numHiddenChildren"><slot name="overflow-indicator" :numHiddenChildren="numHiddenChildren"></slot></span>

        <div class="slot-holder">
            <div ref="defaultSlot"><slot/></div>
        </div>
    </div>
</template>

<script>
// TruncatedList, VNodes, and the resize directive copied from Reward54.
import VNodes from './VNodes.vue';

const observers = {};

export default {
    components: {
        VNodes,
    },
    directives: {
        resize: {
            bind(el, binding, vnode) {
                const resizeObserver = new ResizeObserver((entries) => {
                    entries.forEach((entry) => {
                        const targetEl = entry.target;
                        if (targetEl === el) {
                            binding.value.call(vnode.context, el);
                        }
                    });
                });
                resizeObserver.observe(el);
                observers[el] = resizeObserver;
            },
            update(el, binding, vnode) {
                observers[el]?.disconnect();
                const resizeObserver = new ResizeObserver((entries) => {
                    entries.forEach((entry) => {
                        const targetEl = entry.target;
                        if (targetEl === el) {
                            binding.value.call(vnode.context, el);
                        }
                    });
                });
                resizeObserver.observe(el);
                observers[el] = resizeObserver;
            },
            unbind(el) {
                observers[el].disconnect();
            }
        }
    },
    data() {
        return {
            numRenderableChildren: 0,
            holderHeight: 0,
            holderWidth: 0,
            observer: null,
            childrenToRender: [],
            numHiddenChildren: 0,
            shouldCalculateChildren: true,
        }
    },
    mounted() {
        this.observer = new MutationObserver(() => {
            this.calculateNumRenderableChildren(true);
        });

        this.observer.observe(this.$refs.defaultSlot, { childList: true, characterData: true, subtree: true });
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        calculateNumRenderableChildren(slotChanged) {
            if (!this.shouldCalculateChildren) {
                return;
            }
            this.shouldCalculateChildren = false;

            const height = this.$refs['outer-holder'].clientHeight;
            const width = this.$refs['outer-holder'].clientWidth;
            const childElements = this.$refs.defaultSlot.children;
            this.$nextTick(() => this.shouldCalculateChildren = true);

            if (!childElements.length) {
                this.numRenderableChildren = 0;
                this.childrenToRender = [];
                this.numHiddenChildren = 0;
                return;
            }

            const renderTest = document.createElement('div');
            renderTest.style.height = height + 'px';
            renderTest.style.width = width + 'px';
            document.body.appendChild(renderTest);

            let childIndex = 0;
            const clonedElements = [];
            for (; renderTest.scrollHeight <= height && childIndex < childElements.length; childIndex++) {
                const clonedElement = childElements[childIndex].cloneNode(true);
                renderTest.appendChild(clonedElement);
                clonedElements.push(clonedElement);
            }

            if (childIndex < childElements.length || renderTest.scrollHeight > height) {
                renderTest.appendChild(this.$refs.overflowSlot.children[0].cloneNode(true));
                for (; renderTest.scrollHeight > height; childIndex--) {
                    renderTest.removeChild(clonedElements[childIndex - 1]);
                }
            }

            document.body.removeChild(renderTest);
            if (childIndex !== this.numRenderableChildren || slotChanged) {
                this.numRenderableChildren = childIndex;
                this.childrenToRender = this.$slots.default ? this.$slots.default.slice(0, this.numRenderableChildren) : [];
                this.numHiddenChildren = this.$slots.default ? this.$slots.default.length - this.numRenderableChildren : 0;
            }
        }
    },
    computed: {
        renderTestSizeStyle() {
            return `height: ${this.holderHeight}px; width: ${this.holderWidth}px`;
        },
    },
}
</script>

<style scoped>
.truncated-list {
    min-height: 32px;
    height: 32px;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.slot-holder {
    display: none;
}
.render-test {
    visibility: hidden;
}
</style>