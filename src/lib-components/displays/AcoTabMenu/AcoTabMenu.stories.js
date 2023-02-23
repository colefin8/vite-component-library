import AcoTabMenu from './AcoTabMenu.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoTabMenu',
    component: AcoTabMenu,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const TabMenuExample = (args, { argTypes }) => ({
    components: { AcoTabMenu },
    props: Object.keys(argTypes),
    template: `
        <div>
            <aco-tab-menu v-bind="$props" @itemSelected="setSelected" />
            <div style="padding-top: 12px">Tab selected: {{ selectedTab }}</div>
        </div>
    `,
    data() { 
        return {
            selectedTab: '',
        };
    },
    methods: {
        setSelected(e) {
            this.selectedTab = e;
        }
    }
});

export const TabMenu = TabMenuExample.bind({});
TabMenu.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
};

export const TabMenuAutomaticNavChange = TabMenuExample.bind({});
TabMenuAutomaticNavChange.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    isNavChangeAutomatic: true,
};


const UseVModelExample = (args, { argTypes }) => ({
    components: { AcoTabMenu },
    props: Object.keys(argTypes),
    template: `
        <div>
            <aco-tab-menu v-bind="$props" v-model="selectedTab">
                <template #slot1>Item <em>1</em></template>
            </aco-tab-menu>
            <div style="padding-top: 12px">Tab selected: {{ selectedTab }}</div>
        </div>
    `,
    data() { 
        return {
            selectedTab: 'item1',
        };
    },
});

export const UseVModelWithObject = UseVModelExample.bind({});
UseVModelWithObject.args = {
    items: { item1: 'Item 1', item2: 'Item 2', item3: 'Item 3' },
};

export const SlotAndDisabledTab = UseVModelExample.bind({});
SlotAndDisabledTab.args = {
    items: [
        { key:'item1', slot:'slot1' },
        { key:'item2', label:'Item 2', disabled:true },
        'Item 3',
    ],
};
