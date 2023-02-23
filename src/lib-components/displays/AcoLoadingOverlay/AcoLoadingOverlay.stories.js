import AcoLoadingOverlay from './AcoLoadingOverlay.vue';
import AcoButton from '../../inputs/AcoButton/AcoButton.vue'

export default {
    title: 'displays/AcoLoadingOverlay',
    component: AcoLoadingOverlay,
};

const TemplateLoading = (args, { argTypes }) => ({
    components: { AcoLoadingOverlay, AcoButton },
    props: Object.keys(argTypes),
    template:   '<div>' +
                    '<aco-button @click="click" style="margin-bottom: 20px;">Click to load</aco-button>' +
                    '<aco-loading-overlay :is-loading="loading">' +
                        '<table border="1" cellpadding="10" width="100%">' +
                            '<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>' +
                            '<tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>' +
                            '<tr><td>X</td><td>Y</td><td>Z</td><td>%</td></tr>' +
                        '</table>' +
                    '</aco-loading-overlay>' +
                    '<p>loading: {{this.loading}}</p>' +
                '</div>',
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        click(e) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
});

export const Loading = TemplateLoading.bind({});

const TemplateLoadingReplace = (args, { argTypes }) => ({
    components: { AcoLoadingOverlay, AcoButton },
    props: Object.keys(argTypes),
    template:   `<div>
                    <aco-button @click="click" style="margin-bottom: 20px;">Click to load</aco-button>
                    <table border="1" cellpadding="10" width="100%" style="border-color: lightgray;">
                        <tr><th>This</th><th>Is</th><th>The</th><th>Header</th></tr>

                        <template v-if="loading">
                            <tr><td colspan="100" style="padding: 0px;">
                                <aco-loading-overlay :is-loading="true" style="height: 150px; width: 100%;"/>
                            </td></tr>
                        </template>
                        <template v-else>
                            <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                            <tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>
                            <tr><td>X</td><td>Y</td><td>Z</td><td>%</td></tr>
                            <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                            <tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>
                            <tr><td>X</td><td>Y</td><td>Z</td><td>%</td></tr>
                            <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                            <tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>
                            <tr><td>X</td><td>Y</td><td>Z</td><td>%</td></tr>
                        </template>
                        

                    </table>
                    <p>loading: {{this.loading}}</p>
                </div>`,
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        click(e) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
});

export const LoadingReplace = TemplateLoadingReplace.bind({});
