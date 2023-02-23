<template>
    <div class="aco-form-alert">
        <aco-icon :class="`aco-form-alert__icon aco-status-text-medium-${status}`" :icon="`ph-${icon}`" size="20px" /> 
        <div class="aco-text " role="alert">
            <div :class="`aco-form-alert__text aco-status-text-${status}`" data-qa="form-alert-text" data-x-ray="true">
                <!-- @slot The alert message-->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import '../../../../styles/aco.scss'
import { _optionsStatus } from '../../../../propTypes';

/**
 * An alert with specific information
 */
export default {
    name: 'aco-form-alert',
    components: {
        AcoIcon: () => import('../../icons/AcoIcon/AcoIcon.vue').then(d => d.default),
    },
    props: {
        /** The status of the alert. Determines the color and icon. */
        status: {
            type: String,
            validator(value) {
                return typeof value === 'string' && Object.values(_optionsStatus).includes(value);
            },
            required: true,
        },
    },
    computed: {
        icon() {
            switch (this.status) {
                case _optionsStatus.DANGER: 
                    return 'warning-octagon';
                case _optionsStatus.WARNING: 
                    return 'warning';
                case _optionsStatus.POSITIVE: 
                    return 'check-circle';
                default: 
                    return 'info';
            }
        },
    }
};
</script>

