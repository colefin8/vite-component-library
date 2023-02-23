<template>
    <div class="storybook">
        <h1>AcoMediaInput</h1>
        <p>
            The wrapping Media Input component. Can be set to single or multi media upload.
            <br/>
            Prompts the user to select media from their computer, or emits an event to allow for things such as browsing a media library.
        </p>
        <div class="storybook-wrapper-grid">
            <h2 class="storybook-colspan-2">Single Media Input</h2>
            <p class="storybook-colspan-2">Usage: &#60;aco-media-input type="single" v-model="someArr" ... /&#62;</p>
            <aco-media-input
                type="single"
                v-model="singleList"
                @edit-media="doNothing"
            />
            <ul>
                <li>
                    <a href="/?path=/story/inputs-media-acomediainput-acosinglemediainput-acosinglemediainput--single-media-input">
                        Single Media Input
                    </a>
                </li>
                <li>
                    <a href="/?path=/story/inputs-media-acomediainput-acosinglemediainput-acosinglemediainput--single-media-input-no-edit">
                        Single Media Input No Edit
                    </a>
                </li>
            </ul>

            <h2 class="storybook-colspan-2">Multi Media Input</h2>
            <p class="storybook-colspan-2">Usage: &#60;aco-media-input type="multi" v-model="someArr" ... /&#62;</p>
            <aco-media-input
                type="multi"
                v-model="multiList"
            />
        </div>
    </div>
</template>

<script>
import AcoMediaInput from './AcoMediaInput.vue';

export default {
    name: 'aco-media-input-story',
    components: { AcoMediaInput },
    data() {
        return {
            singleList: [],
            multiList: [],
        }
    },
    methods: {
        doNothing() {
            // do nothing
        }
    }
}
</script>