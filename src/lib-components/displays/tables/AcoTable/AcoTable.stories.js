import AcoTable from './AcoTable.vue';
import AcoIconMenu from '../../AcoIconMenu/AcoIconMenu.vue';
import { _optionsCheckbox, _optionsStatus } from '../../../../propTypes';

const HEADERS = [
    { text: 'Dessert (100g serving)', key: 'name' },
    { text: 'Calories', key: 'calories', type: 'numeric', align: 'right' },
    { text: 'Fat (g)', key: 'fat', type: 'numeric', align: 'right' },
    { text: 'Carbs (g)', key: 'carbs', type: 'numeric', align: 'right' },
    { text: 'Protein (g)', key: 'protein', type: 'numeric', align: 'right' },
    { text: 'Iron (%)', key: 'iron', type: 'numeric', align: 'right' },
];

const ITEMS = [
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

export default {
    title: 'displays/tables/AcoTable',
    component: AcoTable,
    argTypes: {}
};

const SimpleTableExample = (args, { argTypes }) => ({
    components: { AcoTable },
    props: Object.keys(argTypes),
    template: `
    <div>
        <p>To use AcoTable pass in the headers in an array and items as an array of objects representing each row.</p>
        <p>Headers can be a single array or an array of arrays for multiple headers. Each heading has text, an optional key for automatic sorting, an optional align value, an optional colspan, and and optional type.</p>
        <p>Table rows will match the alignment of the headers.</p>
        <aco-table v-bind="$props" @sort="onSort" />
    </div>`,
    methods: {
        onSort(column) {
            console.log('sort column', column);
        }
    }
});

export const SimpleTable = SimpleTableExample.bind({});
SimpleTable.args = {
    headers: [
        [
            { text: 'Food', key: 'name' },
            { text: 'Nutrients', colspan: 5, align: 'center' },
        ],
        HEADERS
    ],
    items: ITEMS,
};


export const EmptyTable = SimpleTableExample.bind({});
EmptyTable.args = {
    headers: HEADERS,
    items: [],
};


export const ReorderdColumns = SimpleTableExample.bind({});
ReorderdColumns.args = {
    headers: [
        { text: 'Fat (g)', key: 'fat', type: 'numeric', align: 'right' },
        { text: 'Calories', key: 'calories', type: 'numeric', align: 'right' },
        { text: 'empty' },
        { text: 'Dessert (100g serving)', key: 'name' },
    ],
    items: ITEMS,
    columnOrder: ['fat', 'calories', 'empty', 'name'],
};


const TableCheckboxesExample = (args, { argTypes }) => ({
    components: { AcoTable },
    props: Object.keys(argTypes),
    data() {
        return {
            loading: false,
        };
    },
    template: `<div>
        <aco-table v-bind="$props" @checked="onChecked" @toggle-all="onToggleAll" />
    </div>`,
    methods: {
        onChecked(e) {
            this.items[e.index].checkbox = { checked: !this.items[e.index].checkbox.checked };
        },
        onToggleAll(checked) {
            this.items = this.items.map((item) => ({
                ...item,
                checkbox: (
                    item.checkbox.disabled
                    ? item.checkbox
                    : { checked: checked }
                )
            }));
        },
    }
});

export const TableCheckboxes = TableCheckboxesExample.bind({});
TableCheckboxes.args = {
    headers: [
        { checkbox: true },
        ...HEADERS
    ],
    items: [
        { checkbox: { checked: true, }, ...ITEMS[0] },
        { checkbox: { checked: false, },  ...ITEMS[1] },
        { checkbox: { checked: false, disabled: true }, ...ITEMS[2] },
        { checkbox: { checked: true, disabled: true }, ...ITEMS[3] },
        { checkbox: { checked: false, },  ...ITEMS[4] },
        { checkbox: { checked: false, },  ...ITEMS[5] },
        { checkbox: { checked: false, },  ...ITEMS[6] },
        { checkbox: { checked: false, },  ...ITEMS[7] },
        { checkbox: { checked: false, },  ...ITEMS[8] },
        { checkbox: { checked: false, },  ...ITEMS[9] },
    ],
};


const ACTIONS = [
    { icon: 'ph-archive', label: 'Archive', key: 'archive' },
    { icon: 'ph-download', label: 'Download' },
    { icon: 'ph-copy', label: 'Duplicate', disabled: true, key: 'duplicate' },
    { icon: 'ph-pencil', label: 'Edit', disabled: true, key: 'edit' },
    { icon: 'ph-star', label: 'Favorite label with lots of text that will be cut off', key: 'favorite' },
    { label: 'Print', key: 'print' },
    { icon: 'ph-trash', label: 'Delete', status: _optionsStatus.DANGER, key: 'delete' },
];

const TableActionsExample = (args, { argTypes }) => ({
    components: { AcoTable, AcoIconMenu },
    props: Object.keys(argTypes),
    data() {
        return {
            loading: false,
            showActions: null,
            acts: ACTIONS,
        };
    },
    template: `<div>
        <aco-table v-bind="$props">
            <template #actions-header>
                <div style="text-align: right;">Actions</div>
            </template>
            <template #actions="actionsProps">
                <aco-icon-menu :items="acts" style="float: right; margin: -9px 0;" />
            </template>
        </aco-table>
    </div>`,
    methods: {
        toggleActions(index) {
            this.showActions = (
                this.showActions === index
                ? null
                : index
            );
        },
    }
});

export const TableActions = TableActionsExample.bind({});
TableActions.args = {
    headers: HEADERS,
    items: ITEMS,
};


const FormatedTableExample = (args, { argTypes }) => ({
    components: { AcoTable },
    props: Object.keys(argTypes),
    data() {
        return {
            showActions: null,
        };
    },
    template: `
    <div>
        <p>For more control over the rows, include a #rows template to be used for each row</p>
        <aco-table v-bind="$props">
            <template #rows="props">
                <tr>
                    <th>{{ props.item.name }}</th>
                    <td class="text-center"><u>{{ props.item.calories }}</u></td>
                    <td class="text-center" style="color: red;">{{ props.item.fat }}</td>
                    <td class="text-center">{{ props.item.carbs }}</td>
                    <td class="text-center">{{ props.item.protein }}</td>
                    <td class="text-center">{{ props.item.iron }}</td>
                </tr>
            </template>
        </aco-table>
    </div>`,
});

export const FormattedTable = FormatedTableExample.bind({});
FormattedTable.args = {
    headers: [
        [
            { text: 'Food', key: 'name' },
            { text: 'Nutrients', colspan: 5, align: 'center' },
        ],
        HEADERS
    ],
    items: ITEMS,
};


const TemplateExample2 = (args, { argTypes }) => ({
    components: { AcoTable },
    props: Object.keys(argTypes),
    template: `
    <div class="aco-p-small">

        <p>
            A large table width a constrained height has automatic scrolling with sticky headers and footers.

            Has fixed layout and no-wrap cells with overflow-tooltip directive
        </p>

        <aco-table v-bind="$props">
            <template #footer>
                <tr>
                    <th>Total</th>
                    <td colspan="5">
                    </td>
                </tr>
            </template>
        </aco-table>
    </div>`,
});


export const LargeTable = TemplateExample2.bind({});
LargeTable.args = {
    isFixedLayout: true,
    headers: [
        { text: 'Name', key: 0, nowrap: true, width: '18%' },
        { text: 'Employee Position', key: 1, align: 'left', nowrap: true, width: '18%' },
        { text: 'Office', key: 2, align: 'left', nowrap: true, width: '18%' },
        { text: 'Age', key: 3, type: 'numeric', align: 'right', width: '10%' },
        { text: 'Start date', key: 4, align: 'right', width: '18%' },
        { text: 'Salary', key: 5, type: 'money', align: 'right', width: '18%' },
    ],
    items: [
        ['missing data'],
        ['Airi Satou', 'Accountant', 'Tokyo', '33', '2008/11/28', '$162,700'],
        ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '47', '2009/10/09', '$1,200,000'],
        ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '66', '2009/01/12', '$86,000'],
        ['Bradley Greer', 'Software Engineer', 'London', '41', '2012/10/13', '$132,000'],
        ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28', '2011/06/07', '$206,850'],
        ['Brielle Williamson', 'Integration Specialist', 'New York', '61', '2012/12/02', '$372,000'],
        ['Bruno Nash', 'Software Engineer', 'London', '38', '2011/05/03', '$163,500'],
        ['Caesar Vance', 'Pre-Sales Support', 'New York', '21', '2011/12/12', '$106,450'],
        ['Cara Stevens', 'Sales Assistant', 'New York', '46', '2011/12/06', '$145,600'],
        ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '22', '2012/03/29', '$433,060'],
        ['Charde Marshall', 'Regional Director', 'San Francisco', '36', '2008/10/16', '$470,600'],
        ['Colleen Hurst', 'Javascript Developer', 'San Francisco', '39', '2009/09/15', '$205,500'],
        ['Dai Rios', 'Personnel Lead', 'Edinburgh', '35', '2012/09/26', '$217,500'],
        ['Donna Snider', 'Customer Support', 'New York', '27', '2011/01/25', '$112,000'],
        ['Doris Wilder', 'Sales Assistant', 'Sydney', '23', '2010/09/20', '$85,600'],
        ['Finn Camacho', 'Support Engineer', 'San Francisco', '47', '2009/07/07', '$87,500'],
        ['Fiona Green', 'Chief Operating Officer (COO)', 'San Francisco', '48', '2010/03/11', '$850,000'],
        ['Garrett Winters', 'Accountant', 'Tokyo', '63', '2011/07/25', '$170,750'],
        ['Gavin Cortez', 'Team Leader', 'San Francisco', '22', '2008/10/26', '$235,500'],
        ['Gavin Joyce', 'Developer', 'Edinburgh', '42', '2010/12/22', '$92,575'],
        ['Gloria Little', 'Systems Administrator', 'New York', '59', '2009/04/10', '$237,500'],
        ['Haley Kennedy', 'Senior Marketing Designer', 'London', '43', '2012/12/18', '$313,500'],
        ['Hermione Butler', 'Regional Director', 'London', '47', '2011/03/21', '$356,250'],
        ['Herrod Chandler', 'Sales Assistant', 'San Francisco', '59', '2012/08/06', '$137,500'],
        ['Hope Fuentes', 'Secretary', 'San Francisco', '41', '2010/02/12', '$109,850'],
        ['Howard Hatfield', 'Office Manager', 'San Francisco', '51', '2008/12/16', '$164,500'],
        ['Jackson Bradshaw', 'Director', 'New York', '65', '2008/09/26', '$645,750'],
        ['Jena Gaines', 'Office Manager', 'London', '30', '2008/12/19', '$90,560'],
        ['Jenette Caldwell', 'Development Lead', 'New York', '30', '2011/09/03', '$345,000'],
        ['Jennifer Acosta', 'Junior Javascript Developer', 'Edinburgh', '43', '2013/02/01', '$75,650'],
        ['Jennifer Chang', 'Regional Director', 'Singapore', '28', '2010/11/14', '$357,650'],
        ['Jonas Alexander', 'Developer', 'San Francisco', '30', '2010/07/14', '$86,500'],
        ['Lael Greer', 'Systems Administrator', 'London', '21', '2009/02/27', '$103,500'],
        ['Martena Mccray', 'Post-Sales support', 'Edinburgh', '46', '2011/03/09', '$324,050'],
        ['Michael Bruce', 'Javascript Developer', 'Singapore', '29', '2011/06/27', '$183,000'],
        ['Michael Silva', 'Marketing Designer', 'London', '66', '2012/11/27', '$198,500'],
        ['Michelle House', 'Integration Specialist', 'Sydney', '37', '2011/06/02', '$95,400'],
        ['Olivia Liang', 'Support Engineer', 'Singapore', '64', '2011/02/03', '$234,500'],
        ['Paul Byrd', 'Chief Financial Officer (CFO)', 'New York', '64', '2010/06/09', '$725,000'],
        ['Prescott Bartlett', 'Technical Author', 'London', '27', '2011/05/07', '$145,000'],
        ['Quinn Flynn', 'Support Lead', 'Edinburgh', '22', '2013/03/03', '$342,000'],
        ['Rhona Davidson', 'Integration Specialist', 'Tokyo', '55', '2010/10/14', '$327,900'],
        ['Sakura Yamamoto', 'Support Engineer', 'Tokyo', '37', '2009/08/19', '$139,575'],
        ['Serge Baldwin', 'Data Coordinator', 'Singapore', '64', '2012/04/09', '$138,575'],
        ['Shad Decker', 'Regional Director', 'Edinburgh', '51', '2008/11/13', '$183,000'],
        ['Shou Itou', 'Regional Marketing', 'Tokyo', '20', '2011/08/14', '$163,000'],
        ['Sonya Frost', 'Software Engineer', 'Edinburgh', '23', '2008/12/13', '$103,600'],
        ['Suki Burks', 'Developer', 'London', '53', '2009/10/22', '$114,500'],
        ['Tatyana Fitzpatrick', 'Regional Director', 'London', '19', '2010/03/17', '$385,750'],
        ['Thor Walton', 'Developer', 'New York', '61', '2013/08/11', '$98,540'],
        ['Tiger Nixon', 'System Architect', 'Edinburgh', '61', '2011/04/25', '$320,800'],
        ['Timothy Mooney', 'Office Manager', 'London', '37', '2008/12/11', '$136,200'],
        ['Unity Butler', 'Marketing Designer', 'San Francisco', '47', '2009/12/09', '$85,675'],
        ['Vivian Harrell', 'Financial Controller', 'San Francisco', '62', '2009/02/14', '$452,500'],
        ['Yuri Berry', 'Chief Marketing Officer (CMO)', 'New York', '40', '2009/06/25', '$675,000'],
        ['Zenaida Frank', 'Software Engineer', 'New York', '63', '2010/01/04', '$125,250'],
        ['Zorita Serrano', 'Software Engineer', 'San Francisco', '56', '2012/06/01', '$115,000'],
    ]
}


export const TableLoading = SimpleTableExample.bind({});
TableLoading.args = {
    headers: [
        [
            { text: 'Food', key: 'name' },
            { text: 'Nutrients', colspan: 5, align: 'center' },
        ],
        [
            { text: 'Dessert (100g serving)', key: 'name' },
            { text: 'Calories', key: 'calories', type: 'numeric', align: 'right' },
            { text: 'Fat (g)', key: 'fat', type: 'numeric', align: 'right' },
            { text: 'Carbs (g)', key: 'carbs', type: 'numeric', align: 'right' },
            { text: 'Protein (g)', key: 'protein', type: 'numeric', align: 'right' },
            { text: 'Iron (%)', key: 'iron', type: 'numeric', align: 'right' },
        ]
    ],
    items: [],
    isLoadingHeader: true,
    numLoadingRows: 5,
};