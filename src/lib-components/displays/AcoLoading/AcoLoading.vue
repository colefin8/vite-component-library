<template>
    <div class="aco-loading"></div>
</template>

<script>
import '../../../styles/aco.scss'

/**
 * Simple component that can be conditionally rendered when loading is taking place.  uses cloudinary for the image src. 
 * Note: there is a loading state for buttons so that should be used when the loading icon replaces the button.
 * DSR-7 ticket should establish rules for loading states.
 * Note: aco-loading will center itself on the full width of its parent.
 */
export default {
    name: 'aco-loading',
};
</script>
