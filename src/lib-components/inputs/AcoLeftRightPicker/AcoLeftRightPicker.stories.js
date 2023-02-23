import AcoLeftRightPicker from './AcoLeftRightPicker.vue';
import { _optionsTheme } from '../../../propTypes.js';

export default {
    title: 'inputs/AcoLeftRightPicker',
    component: AcoLeftRightPicker,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: 'inline-radio',
        },
        change: {
            description: 'Emitted when an item is selected or unselected. Emits an array of all the options.',
        }
    }
};

const LeftRightPickerTemplate = (args, { argTypes }) => ({
    components: { AcoLeftRightPicker },
    props: Object.keys(argTypes),
    template: '<aco-left-right-picker v-bind="$props" v-model="options" @change="onChange" />',
    data() {
        return {
            options: Array(300).fill('').map((item, index) => {
                return {
                    id: 100 + index + 1,
                    name: `Item ${index + 1}`,
                    order: null,
                    isSelected: false,
                };
            }), 
        }
    },
    methods: {
        onChange(options) {
            console.log(options);
        }
    }
});

export const Default = LeftRightPickerTemplate.bind({});
Default.args = {};

export const Mobile = LeftRightPickerTemplate.bind({});
Mobile.args = {
    isMobile: true,
};

export const FullWidth = LeftRightPickerTemplate.bind({});
FullWidth.args = {
    isFullWidth: true,
};

const CustomPlaceholderTemplate = (args, { argTypes }) => ({
    components: { AcoLeftRightPicker },
    props: Object.keys(argTypes),
    template: '<aco-left-right-picker v-bind="$props" v-model="options" />',
    data() {
        return {
            options: [
                {
                    id: 1,
                    name: 'Extraordinary Effort',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 2,
                    name: 'Teamwork',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 3,
                    name: 'No Ego',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 4,
                    name: 'Grit',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 5,
                    name: 'Problem-Solving',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 6,
                    name: 'Impact Player',
                    order: null,
                    isSelected: false,
                },
                {
                    id: 7,
                    name: 'Meaningful Interactions',
                    order: null,
                    isSelected: false,
                },
            ]
        }
    }
});

export const CustomPlaceholder = CustomPlaceholderTemplate.bind({});
CustomPlaceholder.args = {
    placeholder: 'Search Tags',
};

export const Disabled = LeftRightPickerTemplate.bind({});
Disabled.args = {
    disabled: true,
};
