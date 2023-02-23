import AcoPaging from './AcoPaging.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoPaging',
    component: AcoPaging,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

/** 
 * Function for creating different template with the passed in dataset sizes.
 * @param {Object} pagingData represents the values that would correspond to pages of a dataset: start, end, total.
 * @param {Boolean} isLoading displays a loading message to represent results loading and cause disabled state
 * @returns returns the storybook template that goes along with the passed in data sizes
 * */
function getTemplate(pagingData, message) {
    return (args, { argTypes }) => ({
        components: { AcoPaging },
        props: Object.keys(argTypes),
        template:   '<div>' +
                        '<aco-paging v-bind="$props" :start="paging[currPage].start" :end="paging[currPage].end" :total="paging[currPage].total" :disabled="isLoading" @prev="prevSelect" @next="nextSelect"/>' + 
                        '<div>{{ contentMessage }}</div>' + 
                    '</div>',
        data() {
            return {
                currPage: 0,
                paging: pagingData,
                isLoading: false,
                message: message,
            };
        },
        computed: {
            contentMessage() {
                if (this.isLoading) {
                    return 'Loading...';
                }
                else return this.message ? this.message : `Showing items ${this.paging[this.currPage].start} to ${this.paging[this.currPage].end}`;
            }
        },
        methods: {
            prevSelect() {
                this.isLoading = true;
                setTimeout(() => {
                    this.currPage = this.currPage === 0 ? 0 : this.currPage - 1;
                    this.isLoading = false;
                }, 500)
            },
            nextSelect() {
                this.isLoading = true;
                setTimeout(() => {
                    this.currPage = this.paging[this.currPage].end === this.paging[this.currPage].total ? this.currPage : this.currPage + 1;
                    this.isLoading = false;
                }, 500)
            },
        },
    })
}

const PagingTemplateGeneral = getTemplate([
    {
        start: 1,
        end: 100,
        total: 236,
    },
    {
        start: 101,
        end: 200,
        total: 236,
    },
    {
        start: 201,
        end: 236,
        total: 236,
    },
]);
export const PagingGeneral = PagingTemplateGeneral.bind({});

const PagingTemplateZeros = getTemplate([
    {
        start: 0,
        end: 0,
        total: 0,
    }
], "No results to display");
export const PagingZeros = PagingTemplateZeros.bind({});

const PagingTemplateSingle = getTemplate([
    {
        start: 1,
        end: 37,
        total: 37,
    }
]);
export const PagingSingle = PagingTemplateSingle.bind({});