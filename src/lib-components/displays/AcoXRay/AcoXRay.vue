<template>
    <div class="aco-x-ray" ref="xRay">
        <slot></slot>
        <canvas v-show="isLoading" class="aco-x-ray__canvas" ref="canvas" />
    </div>
</template>

<script>

const SELECTOR = '[data-x-ray]';
const BORDERS_SELECTOR = '[data-x-ray-border]';
const DEFAULT_RADIUS = 8;

export default {
    name: 'aco-x-ray',
    props: {
        isLoading: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            xRay: null,
            canvas: null,
        }
    },
    mounted() {
        this.xRay = this.$refs.xRay;
        this.canvas = this.$refs.canvas;
        window.addEventListener('resize', this.draw);
        if (this.isLoading) {
            this.$nextTick(this.draw);
        }

        if (!CanvasRenderingContext2D.prototype.roundRect) {
            /**
             * Handle browsers that do not support canvas roundRect (Firefox)
             */
            CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
                if (w < 2 * r) r = w / 2;
                if (h < 2 * r) r = h / 2;
                this.beginPath();
                this.moveTo(x+r, y);
                this.arcTo(x+w, y,   x+w, y+h, r);
                this.arcTo(x+w, y+h, x,   y+h, r);
                this.arcTo(x,   y+h, x,   y,   r);
                this.arcTo(x,   y,   x+w, y,   r);
                this.closePath();
                return this;
            }
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.draw);
    },
    watch: {
        isLoading() {
            if (this.isLoading) {
                this.draw();
            }
        }
    },
    methods: {
        draw() {
            let sw = this.xRay.clientWidth;
            let sh = this.xRay.clientHeight;
            this.canvas.width = this.canvas.style.width = sw;
            this.canvas.height = this.canvas.style.height = sh;
            let ctx = this.canvas.getContext('2d');
            
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, sw, sh);

            let els = Array.from(this.xRay.querySelectorAll(SELECTOR));
            els.forEach(element => {
                let position = this.getPosition(element, element.dataset.xRay !== 'padded');
                ctx.save();
                ctx.beginPath();
                ctx.roundRect(position.x, position.y, position.w, position.h, position.r);
                ctx.clip();
                ctx.clearRect(position.x, position.y, position.w, position.h);
                ctx.restore();
            });

            let borders = Array.from(this.xRay.querySelectorAll(BORDERS_SELECTOR));
            borders.forEach(element => {
                let position = this.getPosition(element, false);
                ctx.strokeStyle = '#e5e7eb';
                ctx.beginPath();
                if (element.dataset.xRayBorder === 'bottom') {
                    ctx.moveTo(position.x, position.y + position.h);
                    ctx.lineTo(position.x + position.w, position.y + position.h);
                } else {
                    ctx.roundRect(position.x, position.y, position.w, position.h, position.r);
                }
                ctx.stroke();
            });
        },
        getPosition(element, excludePadding) {
            let style = window.getComputedStyle(element);
            let rect = element.getBoundingClientRect();
            let sr = this.xRay.getBoundingClientRect();
            let pt = excludePadding ? parseInt(style.paddingTop) : 0;
            let pb = excludePadding ? parseInt(style.paddingBottom) : 0;
            let pl = excludePadding ? parseInt(style.paddingLeft) : 0;
            let pr = excludePadding ? parseInt(style.paddingRight) : 0;
            return {
                x: rect.x - sr.x + pl,
                y: rect.y - sr.y + pt,
                w: rect.width - pl - pr,
                h: rect.height - pt - pb,
                r: parseInt(style.borderRadius) || DEFAULT_RADIUS,
            };
        },
    }

}
</script>

<style lang="scss" scoped>

.aco-x-ray {
    position: relative;

    &__canvas {
        position: absolute;
        z-index: 600;
        top: 0;
        left: 0;
        background: 
            linear-gradient(to bottom, rgba(255,255,255,.4), rgba(255,255,255,.4)),
            linear-gradient(
                90deg,
                #e5e7eb,
                #e5e7eb 23%,
                #d1d5db 25%,
                #d1d5db 27%,
                #e5e7eb 29%,
                #e5e7eb 63%,
                #d1d5db 65%,
                #d1d5db 67%,
                #e5e7eb 69%
            );
        background-size: 500% 100%;
        animation: gradient 4s linear infinite reverse;
    }
}

</style>

