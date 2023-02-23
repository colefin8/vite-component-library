<template>
    <div>
        <h1 class="aco-h1">Animations</h1>
        <a class="aco-text" href="https://www.figma.com/file/EOBq2FSaozeysU6jl7vWki/%F0%9F%A4%96-Simon?node-id=311%3A7918" target="_blank">
            Link to Simon
        </a>

        <h2 class="aco-h2">Speeds</h2>
        <h3 class="aco-h3">Very Fast (0.15s)</h3>
        <div class="animations">
            <div class="animations__button">
                <aco-button @click="showAlert.veryFast = !showAlert.veryFast">Click to {{showAlert.veryFast ? 'hide' : 'show'}}</aco-button>
            </div>
            <transition name="fade">
                <aco-form-alert v-if="showAlert.veryFast" class="aco-animation-very-fast" status="danger">Very fast transition</aco-form-alert>
            </transition>
        </div>

        <h3 class="aco-h3">Fast (0.3s)</h3>
        <div class="animations">
            <div class="animations__button">
                <aco-button @click="showAlert.fast = !showAlert.fast">Click to {{showAlert.fast ? 'hide' : 'show'}}</aco-button>
            </div>
            <transition name="fade">
                <aco-form-alert v-if="showAlert.fast" class="aco-animation-fast" status="danger">Fast transition</aco-form-alert>
            </transition>
        </div>

        <h3 class="aco-h3">Medium (0.4s)</h3>
        <div class="animations">
            <div class="animations__button">
                <aco-button @click="showAlert.medium = !showAlert.medium">Click to {{showAlert.medium ? 'hide' : 'show'}}</aco-button>
            </div>
            <transition name="fade">
                <aco-form-alert v-if="showAlert.medium" class="aco-animation-medium" status="danger">Medium transition</aco-form-alert>
            </transition>
        </div>

        <h3 class="aco-h3">Slow (0.5s)</h3>
        <div class="animations">
            <div class="animations__button">
                <aco-button @click="showAlert.slow = !showAlert.slow">Click to {{showAlert.slow ? 'hide' : 'show'}}</aco-button>
            </div>
            <transition name="fade">
                <aco-form-alert v-if="showAlert.slow" class="aco-animation-slow" status="danger">Slow transition</aco-form-alert>
            </transition>
        </div>

    </div>
</template>

<script>
import AcoButton from '../../../lib-components/inputs/AcoButton/AcoButton.vue'
import AcoFormAlert from '../../../lib-components/displays/notifications/AcoFormAlert/AcoFormAlert.vue'

export default {
    components: { 
        AcoButton,
        AcoFormAlert 
    },
    data() {
        return {
            showAlert: {
                veryFast: false,
                fast: false,
                medium: false,
                slow: false,
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../aco.scss';

.fade-enter-active.aco-animation-slow, .fade-leave-active.aco-animation-slow {
    transition: all $aco-animation-slow;
}

.fade-enter-active.aco-animation-medium, .fade-leave-active.aco-animation-medium {
    transition: all $aco-animation-medium;
}

.fade-enter-active.aco-animation-fast, .fade-leave-active.aco-animation-fast {
    transition: all $aco-animation-fast;
}

.fade-enter-active.aco-animation-very-fast, .fade-leave-active.aco-animation-very-fast {
    transition: all $aco-animation-very-fast;
}

.fade-leave-to, .fade-enter {
    opacity: 0;
}

.animations {
    display: flex;
    
    &__button {
        width: 150px;
    }
}

</style>