<template>
    <div class="aco-color-picker">
        <div class="aco-color-picker__swatch-wrapper" @click="openPopup">
            <span class="aco-color-picker__swatch" :style="`background-color: ${color}`" data-x-ray="true"></span>
            <span class="aco-color-picker__hexcode" data-x-ray="true">{{ color }}</span>
        </div>
        <div v-show="popupOpen" class="aco-color-picker__modal">
            <div class="aco-color-picker__modal-overlay" @click="closePopup"></div>
            <div class="aco-color-picker__modal-picker-wrapper">
                <div>
                    <div class="aco-color-picker__swatch-wrapper">
                        <aco-icon v-if="isEyeDropperAvailable" icon="ph-eyedropper-fill" size="24px" @click="useEyeDropper" />
                        <span class="aco-color-picker__swatch" :style="`background: ${swatchColor}`" ref="swatch"></span>
                        <aco-input v-model="inputColor" @change="onChange" placeholder="name, hex code, rgb..." />
                        <aco-tooltip :content="translate('Enter a color by name (blue), hex code (#00F), rgb (0,0,255) or hsl (240 100% 50%)')">
                            <aco-icon icon="ph-info" />
                        </aco-tooltip>
                    </div>
                    <aco-form-alert v-if="invalidColor" status="danger">{{ translate('Invalid color value') }}</aco-form-alert>
                </div>
                <transition name="slideUp">
                    <div v-show="showCustom" class="aco-color-picker__gradient-wrapper">
                        <canvas 
                            class="aco-color-picker__gradient"
                            @mousedown="onMouseDown"
                            @mousemove="onMouseMove"
                            @mouseup="onMouseUp"
                            @click="pickColor"
                            @touchmove="pickColor"
                            ref="gradientCanvas"
                        ></canvas>
                        <span :class="[ 'aco-color-picker__picked-color', { visible: showPickedColor } ]" ref="pickedColor"></span>
                        <div class="aco-color-picker__hue-slider">
                            <input type="range" orient="vertical" v-model="hue" min="0" max="360" />
                        </div>
                    </div>
                </transition>
                <div class="aco-color-picker__button-wrapper">
                    <div>
                        <aco-button @click="saveColor">{{ translate('Save') }}</aco-button>
                        <aco-button button-style="secondary" @click="closePopup">{{ translate('Cancel') }}</aco-button>
                    </div>
                    <aco-button button-style="tertiary" has-dropdown-control :is-dropdown-open="showCustom" @click="toggleCustom">{{ translate('Custom') }}</aco-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import translateMixin from '../../../mixins/translateMixin';

export default {
    name: 'aco-color-picker',
    components: {
        AcoButton: () => import('../AcoButton/AcoButton.vue').then(d => d.default),
        AcoIcon: () => import('../../displays/icons/AcoIcon/AcoIcon.vue').then(d => d.default),
        AcoInput: () => import('../../inputs/AcoInput/AcoInput.vue').then(d => d.default),
        AcoTooltip: () => import('../../displays/AcoTooltip/AcoTooltip.vue').then(d => d.default),
        AcoFormAlert: () => import('../../displays/notifications/AcoFormAlert/AcoFormAlert.vue').then(d => d.default),
    },
    mixins: [ translateMixin, ],
    model: {
        prop: 'color',
    },
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            inputColor: null,
            swatchColor: null,
            popupOpen: false,
            hue: 0,
            canvas: null,
            ctx: null,
            width: null,
            testColor: document.createElement('span'),
            showCustom: false,
            invalidColor: false,
            showPickedColor: false,
        };
    },
    mounted() {
        document.body.append(this.testColor);
        this.swatchColor = this.color;
    },
    computed: {
        isEyeDropperAvailable() {
            return 'EyeDropper' in window;
        },
    },
    watch: {
        inputColor() {
            this.showPickedColor = false;
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.inputToSwatch();
            }, 500);
        },
        swatchColor() {
            let swatch = this.$refs.swatch;
            let style = window.getComputedStyle(swatch);
            this.$nextTick(() => {
                let rgba = style.backgroundColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1);
                this.hue = this.rgbToHue(...rgba);
            });
        },
        hue() {
            if (this.ctx) {
                this.drawGradient();
            }
        },
    },
    methods: {
        openPopup() {
            this.inputColor = this.color;
            this.popupOpen = true;
        },
        closePopup() {
            this.showCustom = false;
            this.popupOpen = false;
        },
        saveColor() {
            this.$emit('input', this.inputColor);
            this.closePopup();
        },
        onMouseDown() {
            this.mouseDown = true;
        },
        onMouseMove(event) {
            if (this.mouseDown) {
                this.pickColor(event);
            }
        },
        onMouseUp() {
            this.mouseDown = false;
        },
        async useEyeDropper() {
            const eyeDropper = new EyeDropper();
            try {
                const result = await eyeDropper.open();
                this.swatchColor = this.inputColor = this.rgbToHex(result.sRGBHex);
            } catch (err) {}
        },
        toggleCustom() {
            this.showCustom = !this.showCustom;
            if (this.showCustom) {
                this.$nextTick(() => {
                    this.canvas = this.$refs.gradientCanvas;
                    this.canvas.width = this.canvas.clientWidth;
                    this.canvas.height = this.canvas.clientHeight;
                    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
                    this.width = this.canvas.clientWidth;
                    this.height = this.canvas.clientHeight;
                    this.drawGradient();
                });
            }
        },
        rgbToHex(rgba) {
            return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('').toUpperCase()}`;
        },
        onChange() {
            this.inputToSwatch();
            let swatch = this.$refs.swatch;
            let style = window.getComputedStyle(swatch);
            this.$nextTick(() => {
                this.inputColor = this.rgbToHex(style.backgroundColor);
            });
        },
        inputToSwatch() {
            let inputText = this.inputColor;
            if (inputText === '') {
                this.invalidColor = false;
            } else {
                this.testColor.style.background = 'transparent';
                if (/^[a-z ]+$/i.test(inputText)) {
                    //two word named colors
                    inputText = inputText.replaceAll(' ', '');
                } else if (/^([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(inputText)) {
                    //hex code
                    inputText = `#${inputText}`;
                } else if (/^\d{1,3}[, ] ?\d{1,3}[, ] ?\d{1,3}([, ] ?0?\.\d{1,3})?$/i.test(inputText)) {
                    //rgb
                    inputText = `rgb(${inputText})`;
                } else if (/^\d{1,3}[, ] ?\d{1,3}%[, ] ?\d{1,3}%$/i.test(inputText)) {
                    //hsl
                    inputText = `hsl(${inputText})`;
                }
                this.testColor.style.background = inputText;
                this.$nextTick(() => {
                    if (window.getComputedStyle(this.testColor).backgroundColor.replaceAll(' ', '') !== 'rgba(0,0,0,0)') {
                        this.invalidColor = false;
                        this.swatchColor = inputText;
                    } else {
                        this.invalidColor = true;
                    }
                });
            }
        },
        rgbToHue(r,g,b) {
            r /= 255;
            g /= 255;
            b /= 255;

            let cmin = Math.min(r,g,b);
            let cmax = Math.max(r,g,b);
            let delta = cmax - cmin;
            let hue = 0;

            if (delta == 0) {
                hue = 0;
            } else if (cmax == r) {
                hue = ((g - b) / delta) % 6;
            } else if (cmax == g) {
                hue = (b - r) / delta + 2;
            } else {
                hue = (r - g) / delta + 4;
            }
            hue = Math.round(hue * 60);
            if (hue < 0) {
                hue += 360;
            }
            return hue
        },
        drawGradient() {
            const borderRadius = 2;
            const gradient = this.ctx.createLinearGradient(borderRadius, borderRadius, this.width-borderRadius, borderRadius);
            gradient.addColorStop(0, `hsl(${this.hue} 100% 50%)`);
            gradient.addColorStop(1, 'black');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);

            const lumin = this.ctx.createLinearGradient(borderRadius, borderRadius, borderRadius, this.height-borderRadius);

            lumin.addColorStop(0, 'white');
            lumin.addColorStop(1, 'transparent');

            this.ctx.fillStyle = lumin;
            this.ctx.fillRect(0, 0, this.width, this.height);
        },
        pickColor(event) {
            if (event.touches) {
                event = event.touches[0];
            }
            const bounding = this.canvas.getBoundingClientRect();
            let x = event.clientX - bounding.left;
            let y = event.clientY - bounding.top;
            const data = this.ctx.getImageData(x, y, 1, 1).data;
            this.swatchColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            this.inputColor = this.rgbToHex(this.swatchColor);
            this.invalidColor = false;
            this.$nextTick(() => {
                this.$refs.pickedColor.style.left = `${x}px`;
                this.$refs.pickedColor.style.top = `${y}px`;
                this.showPickedColor = true;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../src/styles/aco.scss';

.aco-color-picker {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &__swatch-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 300px;

        .aco-input {
            width: 100%;
        }
    }

    &__swatch {
        display: inline-block;
        width: 44px;
        height: 44px;
        box-shadow: inset 0 0 2px rgba(0,0,0,.15);
        border-radius: 12px;
        flex-shrink: 0;
    }

    &__hexcode {
        @extend .aco-text;
    }

    &__modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        display: flex;

        justify-content: center;
        align-items: center;
        z-index: 700;
        border-width: 0;
        &[open] {
            opacity: 1;
            pointer-events: all;
        }

        &-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &-picker-wrapper {
            position: relative;
            background: $aco-ui-white;
            box-shadow: $aco-shadow-3;
            border-radius: $aco-border-radius-large;
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }
    }

    &__gradient-wrapper {
        display: flex;
        flex-direction: row;
        width: 300px;
        height: 250px;
        box-sizing: border-box;
        position: relative;
    }
        
    &__gradient {
        display: inline-block;
        width: 250px;
        height: 250px;
        box-shadow: 0 0 1px $aco-ui-600;
        border-radius: 2px;
        margin: 4px;
        cursor: crosshair;
        flex-grow: 9;
    }

    &__picked-color {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        margin: calc(-10px + 4px);
        border-radius: 50%;
        box-sizing: border-box;
        border: 4px solid white;
        outline: 2px solid black;
        outline-offset: -3px;
        pointer-events: none;
        visibility: hidden;

        &.visible {
            visibility: visible;
        }
    }

    &__hue-slider {
        margin: 4px;
        border-radius: 4px;
        height: 100%;
        border: 1px solid #9CA3AF;
        box-sizing: border-box;
        background: linear-gradient(0deg, #FF0000 0%, #FFC700 16.67%, #42FF00 33.33%, #00FFF0 51.04%, #000AFF 67.19%, #FF00F5 83.85%, #FF0000 100%);
    
        input[type=range][orient=vertical] {
            writing-mode: bt-lr; /* IE */
            -webkit-appearance: slider-vertical; /* Chromium */
            width: 0px;
            height: 100%;
            margin: 0 10px;
            flex-grow: 0;
        
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                border: 3px solid #4B5563;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 1px 2px #fff, 0 0 2px 2px #000;
            }

            &::-moz-slider-thumb {
                cursor: pointer;
            }
        }
    }

    &__button-wrapper {
        width: 100%;
        justify-content: space-between;

        &,
        > div {
            display: flex;
            flex-direction: row-reverse;
            gap: 8px;
        }
    }

    .slideUp-enter-active {
        animation: slide-up $aco-animation-fast reverse;
        overflow: hidden;
    }

    .slideUp-leave-active {
        animation: slide-up $aco-animation-fast;
        overflow: hidden;
    }

    @keyframes slide-up {
        0% { max-height: 300px; }
        100% { max-height: 0; }
    }
}

</style>