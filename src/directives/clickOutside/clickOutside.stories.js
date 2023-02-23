import clickOutside from './clickOutside';
import clickOutsideDoc from './clickOutsideDoc.mdx';
import AcoButton from '../../lib-components/inputs/AcoButton/AcoButton.vue';

export default {
    title: 'Directives/ClickOutside',
    parameters: {
        docs: {
            page: clickOutsideDoc,
        }
    }
}

export const Default = () => ({
    components: { AcoButton },
    directives: { clickOutside },
    template: `
        <div>
            <aco-button v-click-outside="onClickOutside">Click me and nothing happens, click outside and an alert shows.</aco-button>
        </div>`,
    methods: {
        onClickOutside() {
            alert('You clicked outside!');
        },
    }
});