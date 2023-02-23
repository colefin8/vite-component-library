<template>
    <div class="aco-loading-overlay__wrapper">
        <slot></slot>
        <div v-if="isLoading" class="aco-loading-overlay__overlay">
            <img :src="gifUrl" class="aco-loading-overlay__image" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "aco-loading-overlay",
        props: {
            isLoading: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        data() {
            return {
                gifUrl: "https://res.cloudinary.com/dhkcpbx2w/image/upload/v1620757108/Report%20Icons/loading-animation_white.gif",
            };
        },
    }
</script>

<style lang="scss" scoped>
.aco-loading-overlay {
    &__wrapper {
        position: relative;
    }

    &__overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        user-select: none;
        background-color: rgba(0, 0, 0, 0.1);
    }

    &__image {
        width: 48px;
        height: 48px;
    }
}
</style>