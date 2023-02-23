<template>
    <i :class="['aco-icon', icon]" :style="{color: color, fontSize: size}" @click="$emit('click', $event)" data-x-ray="true" :data-analytics="dataAnalytics"></i>
</template>

<script>
/** 
 * We currently use Phosphor Icons. To see a list of available icons, 
 * go here: https://phosphoricons.com/ 
*/

import dataAnalyticsMixin from '../../../../mixins/dataAnalyticsMixin';
export default {
    name: 'aco-icon',
    mixins: [dataAnalyticsMixin],
    props: {
        /**
         * The name of the icon. Be sure to include the 'ph-' prefix for it to work.
         * You can modify the icon style with the following post-fixes: '-thin', '-light', '-bold', and '-fill'.
         */
        icon: {
            type: String,
            required: true,
        },
        /**
         * Any valid color value will work. Color can also be set via a CSS class.
         */
        color: {
            type: String,
            required: false,
        },
        /**
         * Any valid size value (i.e. px, em, %) will work. Size can also be set via a CSS class.
         */
        size: {
            type: String,
            required: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.aco-icon {
    font-size: 20px;
    letter-spacing: normal;
}
</style>