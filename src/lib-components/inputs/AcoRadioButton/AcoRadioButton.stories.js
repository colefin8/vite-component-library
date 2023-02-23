import AcoRadioButton from './AcoRadioButton.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'inputs/AcoRadioButton',
    component: AcoRadioButton,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const RadioTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { AcoRadioButton },
    data() {
        return {
            selectedVal: '0'
        }
    },
    template: '<aco-radio-button v-bind="$props" v-model="selectedVal" />'
});

export const DefaultRadioButton = RadioTemplate.bind({});
DefaultRadioButton.args = {
    id: 'radio-button1',
    name: 'myGroup',
    value: '1',
    label: 'Radio 1',
};

export const RadioButtonLeft = RadioTemplate.bind({});
RadioButtonLeft.args = {
    id: 'radio-button2',
    name: 'myGroup',
    value: '1',
    label: 'Radio 1',
    hasLeftLabel: true,
};

export const RadioButtonNoLabel = RadioTemplate.bind({});
RadioButtonNoLabel.args = {
    id: 'radio-button3',
    name: 'myGroup',
    value: '1',
};

export const RadioGroup = (args, { argTypes }) => ({
    components: { AcoRadioButton },
    props: Object.keys(argTypes),
    data() {
        return {
            selectedVal: '1',
            items: [
                { id: '1', label: 'Radio 1', value: '1', },
                { id: '2', label: 'Radio 2', value: '2', },
                { id: '3', label: 'Radio 3', value: '3', },
                { id: '4', label: 'Radio 4', value: '4', }, 
            ]
        }
    },
    template: `<div>
        <div v-for="item in items" :key="item.id" style="margin-bottom: 8px">
            <aco-radio-button v-model="selectedVal" :value="item.value" :label="item.label" :id="item.id" name="myGroup4" :theme="theme" />
        </div>
        <div>Selected value: {{ selectedVal }}</div>
    </div>`
});

//new template so ids are unique
export const RadioGroupDisabled = (args, { argTypes }) => ({
    components: { AcoRadioButton },
    props: Object.keys(argTypes),
    data() {
        return {
            selectedVal: '1',
            items: [
                { id: 'a', label: 'Radio A', value: '1', },
                { id: 'b', label: 'Radio B', value: '2', },
                { id: 'c', label: 'Radio C', value: '3', },
                { id: 'd', label: 'Radio D', value: '4', }, 
            ]
        }
    },
    template: `<div>
        <div v-for="item in items" :key="item.id" style="margin-bottom: 8px">
            <aco-radio-button v-model="selectedVal" :value="item.value" :label="item.label" :id="item.id" name="myGroup5" :theme="theme" disabled />
        </div>
        <div>Selected value: {{ selectedVal }}</div>
    </div>`,
});
