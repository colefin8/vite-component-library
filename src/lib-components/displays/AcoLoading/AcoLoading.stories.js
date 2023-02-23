import AcoLoading from './AcoLoading.vue';
import AcoButton from '../../inputs/AcoButton/AcoButton.vue'

export default {
    title: 'displays/AcoLoading',
    component: AcoLoading,
};

const TemplateLoading = (args, { argTypes }) => ({
    components: { AcoLoading, AcoButton },
    props: Object.keys(argTypes),
    template:   '<div>' +
                    '<aco-button @click="click" style="margin-bottom: 20px;">Click to load</aco-button>' +
                    '<aco-loading v-if="loading"/>' +
                    '<table v-else border="1" cellpadding="10" width="100%">' +
                        '<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>' +
                        '<tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>' +
                        '<tr><td>X</td><td>Y</td><td>Z</td><td>%</td></tr>' +
                    '</table>' +
                    '<p>loading: {{this.loading}}</p>' +
                '</div>',
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        click(e) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
});

export const Loading = TemplateLoading.bind({});
