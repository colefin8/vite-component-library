import AcoButton from '../AcoButton/AcoButton.vue';
import AcoChipGroup from '../../displays/AcoChipGroup/AcoChipGroup.vue';
import AcoDropdown from './AcoDropdown.vue';
import AcoIcon from '../../displays/icons/AcoIcon/AcoIcon.vue';
import AcoInput from '../AcoInput/AcoInput.vue';
import AcoStatusChip from '../../displays/AcoStatusChip/AcoStatusChip.vue';
import AcoTextarea from '../../inputs/AcoTextarea/AcoTextarea.vue';
import { _optionsStatus, _optionsTheme } from '../../../propTypes.js';


export default {
    title: 'inputs/AcoDropdown',
    component: AcoDropdown,
    argTypes: {
        type: {
            description: 'type of dropdown',
            options: Object.values({ MENU: 'menu', CHECKBOX: 'checkbox', RADIO: 'radio', COMPLEX: 'complex' }),
            control: { type: 'inline-radio' },
        },
        submitLabel: {
            description: 'Text on the submit button',
            control: { type: 'text' },
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};


const DROPDOWN = [
    { label: 'Cupcake', key: 'cupcake' },
    { label: 'Donut', key: 'donut' },
    { label: 'Eclair', key: 'eclair'},
    { label: 'Frozen Yogurt', key: 'frozen-yogurt' },
    { label: 'Gingerbread', key: 'gingerbread' },
    { label: 'Honeycomb', key: 'honeycomb' },
    { label: 'Ice cream sandwich', key: 'ice-cream-sandwich' },
    { label: 'Jelly bean', key: 'jelly-bean' },
    { label: 'KitKat', key: 'kitkat' },
    { label: 'Lollipop', key: 'lollipop' },
    { label: 'Marshmallow', key: 'marshmallow' },
    { label: 'Nougat', key: 'nougat' },
    { label: 'Oreo', key: 'oreo' },
    { label: 'Pie', key: 'pie' },
];

const SingleSelectTemplate = (args, { argTypes }) => ({
    components: { AcoInput, AcoDropdown, AcoButton, AcoIcon },
    props: Object.keys(argTypes),
    template: `
        <div style="height: 400px">
            <aco-dropdown v-bind="$props" :items="list" v-model="selected" />
            <pre v-if="selected">Selected '{{ selected }}'</pre>
        </div>
    `,
    data() {
        return {
            list: DROPDOWN,
            selected: 'eclair',
        };
    },
});

export const SingleSelect = SingleSelectTemplate.bind({});
SingleSelect.args = {
    maxHeight: 350,
}


const MENU = [
    { icon: 'ph-archive', label: 'Archive', key: 'archive' },
    { icon: 'ph-download', label: 'Download', key: 'download' },
    { icon: 'ph-copy', label: 'Duplicate', key: 'duplicate' },
    { icon: 'ph-pencil', label: 'Edit', disabled: true, key: 'edit' },
    { icon: 'ph-star', label: 'Favorite label with lots of text that will be cut off', key: 'favorite' },
    { label: 'Print', key: 'print' },
    { icon: 'ph-trash', label: 'Delete', sublabel: 'sublabel', status: _optionsStatus.DANGER, key: 'delete' },
    { label: 'More', submenu: { items: DROPDOWN }, key: 'more' }
];


const IconMenuTemplate = (args, { argTypes }) => ({
    components: { AcoDropdown, AcoButton, AcoIcon },
    props: Object.keys(argTypes),
    template: `
    <div style="height: 80vh; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <aco-dropdown v-bind="$props" :items="menu" @change="onChange">
                <aco-icon icon="ph-dots-three-vertical-bold" size="20px" tabindex="0" />
            </aco-dropdown>
        </div>
        <div style="text-align: center;">
            <pre v-if="response">Clicked '{{ response }}'</pre>
        </div>
        <div style="text-align: right;">
            <aco-dropdown v-bind="$props" :items="dropdown" @change="onChange">
                <aco-icon icon="ph-list" size="20px" tabindex="0" />
            </aco-dropdown>
        </div>
    </div>`,
    data() {
        return {
            menu: MENU,
            dropdown: DROPDOWN,
            response: null,
        };
    },
    methods: {
        onChange(key) {
            this.response = key;
        }
    },
});

export const IconMenu = IconMenuTemplate.bind({});
IconMenu.args = {
    maxHeight: 350,
}


const STATUSES = [
    { status: 'positive', label: 'Connected', key: 'connected', slot: 'status' },
    { status: 'warning', label: 'Pending', key: 'pending', slot: 'status' },
    { status: 'danger', label: 'Lost Connection', key: 'lost-connection', slot: 'status' },
    { status: 'neutral', label: 'Off', key: 'off', slot: 'status' },
];


const StatusPickerTemplate = (args, { argTypes }) => ({
    components: { AcoDropdown, AcoButton, AcoIcon, AcoStatusChip },
    props: Object.keys(argTypes),
    template: `
    <div>
        <aco-dropdown v-bind="$props" :items="statuses" v-model="selected" @dropdownToggled="toggled" @change="toggled(false)">
            <aco-status-chip :text="item.label" :status="item.status" :isDropdownOpen="open" tabindex="0" />
            <template #status="{ key, item }">
                <aco-status-chip :text="item.label" :status="item.status" />
            </template>
        </aco-dropdown>
    </div>`,
    data() {
        return {
            statuses: STATUSES,
            selected: STATUSES[STATUSES.length - 1].key,
            open: false,
        };
    },
    computed: {
        item() {
            return this.statuses.find(status => status.key === this.selected) || {}
        }
    },
    methods: {
        toggled(isOpen) {
            this.open = isOpen
        }
    }
});

export const StatusPicker = StatusPickerTemplate.bind({});
StatusPicker.args = {
    width: 200,
}


const MENUITEMS = [
    { label: 'Save & Run', key: 'save-and-run', icon: 'ph-chart-line-up' },
    { label: 'Save', key: 'save', icon: 'ph-floppy-disk' },
    { label: 'Save As', key: 'save-as', icon: 'ph-floppy-disk' },
];

const ButtonDropdownTemplate = (args, { argTypes }) => ({
    components: { AcoDropdown, AcoButton, AcoIcon, AcoStatusChip },
    props: Object.keys(argTypes),
    template: `
    <div>
        <aco-dropdown v-bind="$props" :items="menu" @change="onChange">
            <aco-button icon="ph-floppy-disk" has-dropdown-control button-style="secondary" :theme="theme">Save View</aco-button>
        </aco-dropdown>
        <pre v-if="response">Clicked '{{ response }}'</pre>
    </div>`,
    data() {
        return {
            menu: MENUITEMS,
            response: '',
        };
    },
    methods: {
        onChange(item) {
            this.response = item;
        }
    },
});

export const ButtonDropdown = ButtonDropdownTemplate.bind({});
ButtonDropdown.args = {
    width: 200,
}


const MultiSelectWithChipsTemplate = (args, { argTypes }) => ({
    components: { AcoDropdown, AcoInput, AcoChipGroup },
    props: Object.keys(argTypes),
    template: `
        <div style="display: flex; flex-direction: column;">
            <aco-dropdown v-bind="$props" :items="dropdown" ref="tooltip" v-model="selected" />
            <aco-chip-group v-if="chips.length" :title="title" :chips="chips" style="box-sizing: border-box; width: 300px; margin-top: 8px;" @delete-chip="removeChip" @delete-group="deleteGroup" />
        </div>
    `,
    data() {
        return {
            dropdown: DROPDOWN,
            selected: ['eclair'],
        };
    },
    computed: {
        chips() {
            return this.dropdown.filter(item => this.selected.includes(item.key)).map(item => ({ id: item.key, text: item.label }));
        }
    },
    methods: {
        removeChip(key) {
            this.selected.splice(this.selected.indexOf(key), 1);
        },
        deleteGroup() {
            this.selected = [];
        },
    }
});

export const MultiSelectWithChips = MultiSelectWithChipsTemplate.bind({});
MultiSelectWithChips.args = {
    text: 'Select Value...',
    type: 'checkbox',
    maxHeight: 350,
    search: true,
    title: 'Dessert',
}


let MYRECS = [
    { label: "I've Given", key: 'given' },
    { label: "I've Received", key: 'received' },
];

let TAGS = [
    { label: 'Creativity', key: 'creativity' },
    { label: 'Grit', key: 'grit' },
    { label: 'Initiative', key: 'initiative' },
    { label: 'Team Player', key: 'team-player' },
];

const DEPARTMENTS = [
    { label: 'Deliverables', key: 'deliverables' },
    { label: 'Finance', key: 'finance' },
    { label: 'Human Resources', key: 'human-resources' },
];

const FILTERS = [
    { label: 'My Recognitions', submenu: { items: MYRECS, type: 'checkbox' }, key: 'my-recs' },
    { label: 'Date', submenu: { slot: 'date' }, key: 'date' },
    { label: 'Programs', submenu: { items: DROPDOWN, type: 'checkbox', search: true }, key: 'programs' },
    { label: 'Tags', submenu: { items: TAGS, type: 'checkbox', search: true }, key: 'tags' },
    { label: 'People', submenu: { slot: 'people' }, key: 'people' },
    { label: 'Keyword', submenu: { slot: 'keyword' }, key: 'keyword' },
    { label: 'Department', submenu: { items: DEPARTMENTS, type: 'checkbox', search: true }, key: 'department' },
    { label: 'Bussinessunit', submenu: { slot: 'bussinessunit' }, key: 'bussinessunit' },
];

const FilterTemplate = (args, { argTypes }) => ({
    components: { AcoDropdown, AcoButton, AcoIcon, AcoChipGroup, AcoInput , AcoTextarea},
    props: Object.keys(argTypes),
    template: `
        <div>
            <div class="aco-text" style="display: flex; align-items: center; width: 300px; justify-content: space-between;">
                <span style="font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; line-height: 14px; color: #111827;">Apply Filters</span>
                <aco-button buttonStyle="tertiary" :theme="theme" @click="onReset">Reset</aco-button>
            </div>
            <aco-dropdown v-bind="$props" :items="filters" @change="onSubmit">
                <template #date="{ key, item }">
                    <div style="padding: 0 1em; box-sizing: border-box; width: 100%;">
                        <aco-input type="date" label="Recognitions after" v-model="after" @change="changed('after', item)" style="width: 100%;" />
                        <aco-input type="date" label="Recognitions before" v-model="before" @change="changed('before', item)" style="width: 100%;" />
                    </div>
                </template>
                <template #people="{ key, item }">
                    <div style="padding: 0 8px; box-sizing: border-box; width: 100%;">
                        <aco-input type="search" style="width: 100%;" />
                        <div style="padding: 2em; text-align: center;">
                            Search a name to find people
                        </div>
                    </div>
                </template>
                <template #keyword="{ key, item }">
                    <aco-textarea label="Keyword found in text" v-model="keyword" placeholder="Enter text..." @change="changed('keyword', item)" style="width: 100%; box-sizing: border-box; padding: 0 16px;" :width="268" />
                </template>
            </aco-dropdown>

            <template v-for="(item, index) in selected">
                <div v-if="item.count" :key="index">
                    <aco-chip-group :title="item.label" :chips="item.submenu.items" :canDeleteGroup="false" :canDeleteChips="false" :theme="theme" style="width: 300px; background: white;" />
                </div>
            </template>
        </div>
    `,
    data() {
        return {
            filters: FILTERS,
            response: '',
            selected: [],
            after: null,
            before: null,
            keyword: null,
        };
    },
    created() {
        this.onSubmit(this.filters);
    },
    methods: {
        onSubmit() {
            let selected = [];
            this.filters.forEach(item => {
                let subitems = item.submenu.items?.filter(subitem => subitem.selected);
                item.count = (subitems?.length || 0) + (item.value ? 1 : 0);
                if (subitems?.length) {
                    subitems = subitems.map(item => ({ text: item.label, id: item.key }));
                } else if (item.value) {
                    subitems = [{ text: Object.values(item.value).join(' - '), id: item.value }];
                }
                if (item.count) {
                    selected.push({
                        ...item,
                        submenu: { items: subitems },
                    });
                }
            });
            this.selected = selected;
        },
        onReset() {
            let reset = (items) => {
                items.forEach(item => {
                    if (item.selected === true) {
                        item.selected = false;
                    }
                    if (item.count > 0) {
                        item.count = 0;
                    }
                    if (item.value) {
                        item.value = undefined;
                    }
                    if (item?.submenu?.items) {
                        reset(item.submenu.items);
                    }
                });
            };
            reset(this.filters);
            this.selected = [];
            this.after = null;
            this.before = null;
            this.keyword = null;
            this.$set(this.filters, 0, this.filters[0]);
        },
        changed(which, item) {
            item.value = {
                ...item.value,
                [which]: this[which]
            };
            item.count = (item.value ? 1 : 0);
        },
    }
});

export const FeedFilter = FilterTemplate.bind({});
FeedFilter.args = {
    text: 'Filter by',
    maxHeight: 300,
    type: 'complex',
}
