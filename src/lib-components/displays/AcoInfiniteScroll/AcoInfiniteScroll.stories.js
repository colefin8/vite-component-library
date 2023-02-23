import { _optionsDirection } from '../../../propTypes';
import AcoInfiniteScroll from './AcoInfiniteScroll.vue';
import AcoTable from '../tables/AcoTable/AcoTable';
import AcoAvatar from '../AcoAvatar/AcoAvatar';
import axios from 'axios';

export default {
    title: 'displays/AcoInfiniteScroll',
    components: { AcoInfiniteScroll },
    argTypes: {}
};


const VerticalExample = (args, { argTypes }) => ({
    components: { AcoInfiniteScroll },
    props: Object.keys(argTypes),
    template: `
        <aco-infinite-scroll v-bind="$props" @load-more="onScroll" :is-loading="loading" style="height: 20em;">
            <template #items="props">
                <li style="border-bottom: 1px solid gray; padding: .25em .5em;">
                    <span>Item {{ props.item.name }}</span>
                </li>
            </template>
        </aco-infinite-scroll>
    `,
    data() {
        return {
            itemNumber: 0,
            loading: false,
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        onScroll() {
            this.loadData();
        },
        loadData() {
            this.loading = true;
            setTimeout(() => {
                for(let i=0;i<25;i++) {
                    this.itemNumber++;
                    this.items.push({ name: `#${this.itemNumber.toString()}` });
                }
                this.loading = false;
            }, 1000);
        }
    }
});

export const VerticalScroll = VerticalExample.bind({});
VerticalScroll.args = {
    tag: 'ul',
    items: [],
    alwaysScroll: null,
    threshold: null,
    scrollElement: null,
    scrollDirection: null,
    isLoading: null,
};


const HorizontalExample = (args, { argTypes }) => ({
    components: { AcoInfiniteScroll },
    props: Object.keys(argTypes),
    template: `
        <aco-infinite-scroll v-bind="$props" @load-more="onScroll" :is-loading="loading" style="height: 20em;">
            <template #items="props">
                <img :src="'http://placeimg.com/' + props.item.size*64 + '/' + props.item.size*48 + '/animals'" style="flex: auto 1 1; border: 4px solid white; box-sizing: border-box;" />
            </template>
        </aco-infinite-scroll>
    `,
    data() {
        return {
            itemNumber: 0,
            loading: false,
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        onScroll() {
            this.loadData();
        },
        loadData() {
            this.loading = true;
            setTimeout(() => {
                for(let i=0;i<25;i++) {
                    this.itemNumber++;
                    this.items.push({
                        name: `#${this.itemNumber.toString()}`,
                        size: Math.floor(Math.random()*2)+1,
                    });
                }
                this.loading = false;
            }, 1000);
        }
    }
});

export const HorizontalScroll = HorizontalExample.bind({});
HorizontalScroll.args = {
    tag: 'div',
    items: [],
    scrollDirection: _optionsDirection.HORIZONTAL
};


const TableExample = (args, { argTypes }) => ({
    components: { AcoInfiniteScroll, AcoTable },
    props: Object.keys(argTypes),
    template: `
        <div id="scrollTableWrapper" class="aco-p-small" style="height: 30em; overflow: auto;">
            <aco-table :headers="headers" @sort="onSort" ref="acoTable">

                <template v-slot:tbody>
                    <aco-infinite-scroll v-bind="$props" @load-more="onScroll" :is-loading="loading" style="height: 20em;" :items="items">
                        <template #items="props">
                            <tr>
                                <td v-for="(data, idx) in props.item" :key="idx" :class="{ 'text-left': idx < 3, 'text-right': idx > 2 }">{{ data }}</td>
                            </tr>
                        </template>
                    </aco-infinite-scroll>
                </template>

            </aco-table>
        </div>
    `,
    data() {
        return {
            itemNumber: 0,
            loading: false,
            items: [],
            data: [
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
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        onScroll() {
            this.loadData();
        },
        loadData() {
            if (this.itemNumber < (this.data || []).length) {
                this.loading = true;
                setTimeout(() => {
                    for(let i=0;i<5;i++) {
                        let data = this.data[this.itemNumber];
                        if (data) {
                            this.items.push(data);
                            this.itemNumber++;
                        }
                    }
                    this.loading = false;
                }, 1000);
            }
        },
        onSort() {
            this.items = [];
            this.itemNumber = 0;
            document.querySelector(this.scrollElement).scrollTo(0, 0);
            this.$refs.acoTable.sortData(this.data);
            this.loadData();
        }
    }
});

export const LazyLoadTable = TableExample.bind({});
LazyLoadTable.args = {
    tag: 'tbody',
    headers: [
        { text: 'Name', key: '0' },
        { text: 'Position', key: '1', align: 'left' },
        { text: 'Office', key: '2', align: 'left' },
        { text: 'Age', key: '3', type: 'numeric', align: 'right' },
        { text: 'Start date', key: '4', align: 'right' },
        { text: 'Salary', key: '5', type: 'money', align: 'right' },
    ],
    scrollElement: '#scrollTableWrapper',
};


const TableInfiniteExample = (args, { argTypes }) => ({
    components: { AcoInfiniteScroll, AcoTable, AcoAvatar },
    props: Object.keys(argTypes),
    template: `
        <div id="infiniteScrollTableWrapper" class="aco-p-small" style="height: 30em; overflow: auto;">
            <aco-table :headers="headers">

                <template v-slot:tbody>
                    <aco-infinite-scroll v-bind="$props" @load-more="onScroll" :is-loading="loading">
                        <template #items="props">
                            <tr>
                                <td class="text-center">
                                    <aco-avatar :url="props.item.picture.thumbnail" style="display: inline-flex;" />
                                </td>
                                <td class="text-left">{{ props.item.name.title }} {{ props.item.name.first }} {{ props.item.name.last }}</td>
                                <td class="text-left">{{ props.item.gender }}</td>
                                <td class="text-left">{{ props.item.email }}</td>
                                <td class="text-right">{{ props.item.dob.age }}</td>
                                <td class="text-left">{{ props.item.location.country }}</td>
                                <td class="text-center">{{ props.item.phone }}</td>
                                <td class="text-center">{{ props.item.cell }}</td>
                            </tr>
                        </template>
                    </aco-infinite-scroll>
                </template>

            </aco-table>
        </div>
    `,
    data() {
        return {
            page: 0,
            loading: false,
            headers: [
                { text: 'Avatar' },
                { text: 'Name', align: 'left' },
                { text: 'Gender', align: 'left' },
                { text: 'Email', align: 'left' },
                { text: 'Age', type: 'numeric', align: 'right' },
                { text: 'Country', align: 'left' },
                { text: 'Phone' },
                { text: 'Cell' },
            ],
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        onScroll() {
            this.loadData();
        },
        async loadData() {
            this.loading = true;
            this.page++;
            await axios.get(`https://randomuser.me/api/?results=10&seed=foobar&page=${this.page}`)
            .then(({ data }) => {
                data.results.forEach(result => {
                    this.items.push(result);
                });
            })
            this.loading = false;
        }
    }
});

export const TableInfiniteScroll = TableInfiniteExample.bind({});
TableInfiniteScroll.args = {
    tag: 'tbody',
    items: [],
    scrollElement: '#infiniteScrollTableWrapper',
};
