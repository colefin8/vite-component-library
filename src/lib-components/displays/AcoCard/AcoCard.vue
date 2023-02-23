<template>
    <div class="aco-card" ref="globalCard" tabindex="0" @click.stop="click" @keydown.enter.stop="click" data-x-ray="padded">
        <img v-if="!imageErrored" class="aco-card__image" :src="url" :alt="alt" @error="hideImage" />
        <div class="aco-card__title">{{ title }}</div>
        <div class="aco-card__subtitle">{{ subtitle }}</div>
        <component :is="chipStatus ? 'aco-status-chip' : 'aco-chip'" class="aco-card__chip" :text="chipText" :use-colors="false" :status="chipStatus" />
        <p class="aco-card__description">
            {{ description }}
        </p>
    </div>
</template>

<script>
import '../../../styles/aco.scss';
import { _optionsStatus } from '../../../propTypes';

export default {
    name: 'aco-card',
    components: {
        AcoChip: () => import('./../AcoChip/AcoChip.vue').then((d) => d.default),
        AcoStatusChip: () => import('../AcoStatusChip/AcoStatusChip.vue').then((d) => d.default),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: false,
        },
        /**
         * Description can be up to two lines before it will be cut off
         */
        description: {
            type: String,
            required: true,
        },
        /**
         * Url for the image
         */
        url: {
            type: String,
            required: true,
        },
        /**
         * Alt text for the image
         */
        alt: {
            type: String,
            required: false,
        },
        /**
         * Text displayed in the chip
         */
        chipText: {
            type: String,
            required: true,
        },
        /**
         * Status color for the chip (not yet implimented)
         */
        chipStatus: {
            type: String,
            default: '',
            validator(value) {
                return !value || (typeof value === 'string' && Object.values(_optionsStatus).includes(value));
            },
            required: false,
        },
    },
    data() {
        return {
            imageErrored: false,
        };
    },
    mounted() {
        let parent = this.$refs.globalCard;
        window.addEventListener('resize', () => {
            parent.classList.toggle('aco-card--hide-image', (parent.clientWidth > 0 && parent.clientWidth < 300) || this.imageErrored);
        });
    },
    watch: {
        url() {
            this.imageErrored = false;
        }
    },
    methods: {
        hideImage() {
            this.imageErrored = true;
        },
        click(e) {
            this.$emit('click', e);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.aco-card {
    @extend .aco-text;
    padding: 24px;
    box-sizing: border-box;
    height: 144px;
    border-radius: 16px;
    background: $aco-ui-white;
    border: 1px solid $aco-ui-200;
    overflow: hidden;
    display: grid;
    grid-template-rows: 22px 16px 48px;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'image title chip' 'image subtitle chip' 'image description description';
    gap: 0 16px;
    cursor: pointer;

    &:focus,
    &:hover {
        box-shadow: $aco-shadow-2;
    }

    &--hide-image {
        gap: 0;
        .aco-card__image {
            display: none;
        }
    }

    &__image {
        grid-area: image;
        width: 96px;
        height: 96px;
        border-radius: 16px;
        overflow: hidden;
        flex-shrink: 0;
    }

    &__title {
        grid-area: title;
        font-size: $aco-text-xlarge;
        line-height: $aco-text-xlarge;
        color: $aco-ui-900;
        font-weight: bold;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: -.5em;
        padding-top: 4px;
    }

    &__subtitle {
        grid-area: subtitle;
        line-height: $aco-text-small;
        font-size: $aco-text-small;
        color: $aco-ui-600;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: -.5em;
        padding-top: 4px;
    }

    &__description {
        @extend .aco-p-large;
        grid-area: description;
        height: 48px;
        color: $aco-ui-600;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    &__chip {
        grid-area: chip;
    }
}

</style>
