import AcoButtonSelector from './AcoButtonSelector.vue';
import { _optionsImageUrl, _optionsTheme } from '../../../propTypes';

export default {
    title: 'inputs/AcoButtonSelector',
    component: AcoButtonSelector,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    },
};

const MultiTemplate = (args, { argTypes }) => ({
    components: { AcoButtonSelector },
    props: Object.keys(argTypes),
    data() {
        return {
            selected: [],
        }
    },
    template: '<aco-button-selector v-bind="$props" v-model="selected" ></aco-button-selector>',
});

export const ButtonSelectorDefault = MultiTemplate.bind({});
ButtonSelectorDefault.args = {
    name: 'myButtonSelector',
    options: [{label: 'Teamwork', value: 'team'}, {label: 'No Ego', value: 'noEgo'}, {label: 'A-team Ready', value: 'aTeam'}],
};

export const ButtonSelectorWithImages = MultiTemplate.bind({});
ButtonSelectorWithImages.args = {
    name: 'myButtonSelector',
    options: [{label: 'Teamwork', value: 'team', image: _optionsImageUrl.CAT}, {label: 'No Ego', value: 'noEgo', image: _optionsImageUrl.TYLER}, {label: 'Other', value: 'other'}],
};


const SingleTemplate = (args, { argTypes }) => ({
    components: { AcoButtonSelector },
    props: Object.keys(argTypes),
    data() {
        return {
            selected: '',
        }
    },
    template: '<aco-button-selector v-bind="$props" v-model="selected" ></aco-button-selector>',
});

export const ButtonSelectorSingleSelect = SingleTemplate.bind({});
ButtonSelectorSingleSelect.args = {
    ...ButtonSelectorDefault.args,
    multiSelect: false,
};