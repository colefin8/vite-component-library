<template>
    <div ref="parent">
        <div ref="spacingDiv" :style="spacingDivStyle"></div>
        <div class="main-div" ref="mainDiv" :style="mainDivStyle">
            <slot />
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash';

const DEBOUNCE_INTERVAL = 50;

export default {
    name: 'aco-flexible-sticky',
    props: {
        verticalOffset: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            previousScrollY: null,
            mainDivStyle: '',
            spacingDivStyle: '',
        }
    },
    methods: {
        onScroll() {
            this.updatePreviousScrollY();
            this.determineScrollDirection();
        },
        updatePreviousScrollY: debounce(
            function() {
                this.previousScrollY = window.scrollY;
            },
            DEBOUNCE_INTERVAL,
            { 'leading': false, 'trailing': true }
        ),
        determineScrollDirection: debounce(
            function() {
                const scrollingUp = window.scrollY < this.previousScrollY;
                this.updateStickyAttributes(scrollingUp);
            },
            DEBOUNCE_INTERVAL,
            { 'leading': true, 'trailing': false }
        ),
        updateStickyAttributes(scrollingUp) {
            if (this.$refs.mainDiv.offsetHeight + (this.verticalOffset * 2) < window.innerHeight) {
                this.mainDivStyle = `top: ${this.verticalOffset}px; bottom: unset;`;
                this.spacingDivStyle = "height: 0;";
            }
            else {
                const spaceToTop = this.$refs.mainDiv.offsetTop - this.$refs.mainDiv.parentNode.offsetTop;
                const divOverflow = (window.innerHeight - this.$refs.mainDiv.offsetHeight) - this.verticalOffset;
                this.spacingDivStyle = `height: ${spaceToTop}px;`;
                this.mainDivStyle = `
                    bottom: ${scrollingUp ? divOverflow + 'px' : 'unset'};
                    top: ${scrollingUp ? 'unset' : divOverflow + 'px'};
                `;
            }
        },
    },
    mounted() {
        this.mainDivStyle = `top: ${this.verticalOffset}px;`;
        window.addEventListener('scroll', this.onScroll);
    }
}
</script>

<style lang="scss" scoped>
.parent {
    display: flex;
    flex-direction: column;
}

.main-div {
    position: sticky;
}
</style>