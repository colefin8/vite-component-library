import AcoTableLoading from './AcoTableLoading.vue';
import AcoTable from '../AcoTable/AcoTable.vue';

export default {
    title: 'displays/tables/AcoTableLoading',
    component: AcoTableLoading,
};

const TableLoadingTemplate = (args, { argTypes }) => ({
    components: { AcoTableLoading },
    props: Object.keys(argTypes),
    template: '<aco-table-loading v-bind="$props"/>',
});

export const AlwaysLoading = TableLoadingTemplate.bind({});
AlwaysLoading.args = {
    numRows: 5,
    hasHeader: true,
};

const TableLoadingWithTableTemplate = (args, { argTypes }) => ({
    components: { AcoTable, AcoTableLoading },
    props: Object.keys(argTypes),
    template:
        '<div>' +
        '<aco-table-loading v-if="loading" v-bind="$props" />' +
        '<aco-table v-else :headers="headers" :items="items"/>' +
        '</div>',
    data() {
        return {
            loading: true,
            headers: [
                [
                    { text: 'Dessert (100g serving)', key: 'name' },
                    {
                        text: 'Calories',
                        key: 'calories',
                        type: 'numeric',
                        align: 'right',
                    },
                    {
                        text: 'Fat (g)',
                        key: 'fat',
                        type: 'numeric',
                        align: 'right',
                    },
                    {
                        text: 'Carbs (g)',
                        key: 'carbs',
                        type: 'numeric',
                        align: 'right',
                    },
                    {
                        text: 'Protein (g)',
                        key: 'protein',
                        type: 'numeric',
                        align: 'right',
                    },
                    {
                        text: 'Iron (%)',
                        key: 'iron',
                        type: 'numeric',
                        align: 'right',
                    },
                ],
            ],
            items: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        };
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 5000);
    },
});

export const LoadingTable = TableLoadingWithTableTemplate.bind({});
LoadingTable.args = {
    numRows: 10,
    hasHeader: true,
};
