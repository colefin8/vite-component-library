import AcoCheckbox from './AcoCheckbox.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'Inputs/AcoCheckbox',
    component: AcoCheckbox,
    argTypes: {
        'v-model': {
            description: 'You can v-model a BOOLEAN or ARRAY: Use a boolean if the checkbox is used alone or use an array of primitive types to create a checkbox group.',
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    },
};

const CheckboxTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { AcoCheckbox },
    data() {
        return {
            checked: true
        }
    },
    template: '<div @click="onClick"><aco-checkbox v-bind="$props" v-model="checked" /></div>',
    methods: {
        onClick() {
            console.log(`This should never make it to the console because aco-checkbox stops propagation of click event`);
        }
    }
});

export const DefaultCheckbox = CheckboxTemplate.bind({});
DefaultCheckbox.args = {
    id: 'checkbox1',
};

export const IndeterminateCheckbox = CheckboxTemplate.bind({});
IndeterminateCheckbox.args = {
    id: 'checkbox2',
    indeterminate: true,
};

export const CheckboxWithLabel = CheckboxTemplate.bind({});
CheckboxWithLabel.args = {
    id: 'checkbox3',
    label: 'Checkbox With Label',
};

export const CheckboxWithLeftLabel = CheckboxTemplate.bind({});
CheckboxWithLeftLabel.args = {
    id: 'checkbox4',
    label: 'Checkbox With Left Label',
    hasLeftLabel: true,
};

export const FullWidthCheckboxWithLeftLabel = CheckboxTemplate.bind({});
FullWidthCheckboxWithLeftLabel.args = {
    id: 'checkbox4',
    label: 'Full-Width Checkbox With Left Label',
    hasLeftLabel: true,
    isFullWidth: true,
};

export const CheckboxGroup = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { AcoCheckbox },
    data() {
        return {
            checkedItems: [],
            items: [
                { id: '1', label: 'Checkbox 1', value: '1', },
                { id: '2', label: 'Checkbox 2', value: '2', },
                { id: '3', label: 'Checkbox 3', value: '3', },
                { id: '4', label: 'Checkbox 4 with a Long Label that will Wrap', value: '4', },
            ]
        }
    },
    template: `
        <div>
            <div v-for="item in items" :key="item.id">
                <aco-checkbox :id="item.id" :label="item.label" :value="item.value" v-model="checkedItems" :theme="theme" />
            </div>
        </div>
    `,
});

export const DisabledCheckbox = CheckboxTemplate.bind({});
DisabledCheckbox.args = {
    id: 'checkbox5',
    label: 'Disabled Checkbox',
    disabled: true,
};

const ReadonlyCheckboxTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { AcoCheckbox },
    template: '<aco-checkbox v-bind="$props" />'
});

export const ReadonlyCheckbox = ReadonlyCheckboxTemplate.bind({});
ReadonlyCheckbox.args = {
    id: 'checkbox6',
    label: 'Readonly Checkbox',
    readonly: true,
    checked: false,
};

export const ReadonlyCheckedCheckbox = ReadonlyCheckboxTemplate.bind({});
ReadonlyCheckedCheckbox.args = {
    id: 'checkbox7',
    label: 'Readonly Checked Checkbox',
    readonly: true,
    checked: true,
};