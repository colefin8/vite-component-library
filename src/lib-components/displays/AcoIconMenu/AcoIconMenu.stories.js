import AcoIconMenu from './AcoIconMenu.vue';
import AcoTable from '../tables/AcoTable/AcoTable';
import AcoModal from '../AcoModal/AcoModal.vue';
import AcoButton from './../../inputs/AcoButton/AcoButton.vue';
import { _optionsStatus } from '../../../propTypes.js';

export default {
    title: 'displays/AcoIconMenu',
    component: AcoIconMenu,
    argTypes: {
    }
};

const LINKS = [
    { icon: 'ph-archive', label: 'Archive', key: 'archive' },
    { icon: 'ph-download', label: 'Download' },
    { icon: 'ph-copy', label: 'Duplicate', disabled: true, key: 'duplicate' },
    { icon: 'ph-pencil', label: 'Edit', disabled: true, key: 'edit' },
    { icon: 'ph-star', label: 'Favorite label with lots of text that will be cut off', key: 'favorite' },
    { label: 'Print', key: 'print' },
    { icon: 'ph-trash', label: 'Delete', status: _optionsStatus.DANGER, key: 'delete' },
];

const NOICONS = [
    { label: 'Archive', key: 'archive' },
    { label: 'Download' },
    { label: 'Duplicate', disabled: true, key: 'duplicate' },
    { label: 'Edit', disabled: true, key: 'edit' },
    { label: 'Favorite label with lots of text that will be cut off', key: 'favorite' },
    { label: 'Print', key: 'print' },
    { label: 'Delete', status: _optionsStatus.DANGER, key: 'delete' },
];


const Template = (args, { argTypes }) => ({
    components: { AcoIconMenu },
    props: Object.keys(argTypes),
    template: `
    <div style="height: 80vh; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <aco-icon-menu v-bind="$props" :items="links" @click="clicked" />
        </div>
        <div style="text-align: center;">
            <pre>{{ response }}</pre>
        </div>
        <div style="text-align: right;">
            <aco-icon-menu v-bind="$props" :items="links" @click="clicked" icon="ph-list" />
        </div>
    </div>
    `,
    data() {
        return {
            links: LINKS,
            response: {},
        };
    },
    methods: {
        clicked(item) {
            this.response = `Clicked "${JSON.stringify(item)}"`;
        }
    },
});

export const IconMenu = Template.bind({});
IconMenu.args = {
    ariaLabel: 'Icon Menu',
}


const HEADERS = [
    [
        { text: 'Dessert (100g serving)', key: 'name' },
        { text: 'Calories', key: 'calories', type: 'numeric' },
        { text: 'Fat (g)', key: 'fat', type: 'numeric' },
        { text: 'Carbs (g)', key: 'carbs', type: 'numeric' },
        { text: 'Protein (g)', key: 'protein', type: 'numeric' },
        { text: 'Iron (%)', key: 'iron', type: 'numeric' },
        { text: 'Actions' },
    ]
];

const ROWS = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: '1%' },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: '1%', },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: '7%', },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: '8%', },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, iron: '16%', },
    { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, iron: '0%' },
    { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, iron: '2%', },
    { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, iron: '45%', },
    { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, iron: '22%'},
    { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, iron: '6%', },
];

const InATableTemplate = (args, { argTypes }) => ({
    components: { AcoIconMenu, AcoTable },
    props: Object.keys(argTypes),
    template: `
    <div>
        <aco-table :headers="headers" :items="rows">
            <template #rows="props">
                <tr>
                    <th>{{ props.item.name }}</th>
                    <td class="text-right">{{ props.item.calories }}</td>
                    <td class="text-right">{{ props.item.fat }}</td>
                    <td class="text-right">{{ props.item.carbs }}</td>
                    <td class="text-right">{{ props.item.protein }}</td>
                    <td class="text-right">{{ props.item.iron }}</td>
                    <td>
                        <aco-icon-menu v-bind="$props" :items="links" @click="clicked($event, props.item)" />
                    </td>
                </tr>
            </template>
        </aco-table>
    </div>
    `,
    data() {
        return {
            links: NOICONS,
            headers: HEADERS,
            rows: ROWS,
        };
    },
    methods: {
        clicked(key, item) {
            console.log('key: ', key, item);
        }
    }
});

export const InATable = InATableTemplate.bind({});
InATable.args = {}


const InAModalTemplate = (args, { argTypes }) => ({
    components: { AcoIconMenu, AcoModal, AcoButton },
    props: Object.keys(argTypes),
    template: `<div>
        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="isOpen = true">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen" width="500px">
            <div style="height: 200px; display: flex; justify-content: center; align-items: center;">
                <aco-icon-menu v-bind="$props" :items="links" @click="clicked" />
            </div>
        </aco-modal>
    </div>
    `,
    data() {
        return {
            isOpen: false,
            links: LINKS,
        };
    },
    methods: {
        clicked(event) {
            console.log('key: ', event);
        }
    }
});

export const InAModal = InAModalTemplate.bind({});
InAModal.args = {
    icon: 'ph-article',
    fixedPosition: true,
}