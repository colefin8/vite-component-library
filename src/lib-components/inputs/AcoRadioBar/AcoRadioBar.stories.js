import AcoRadioBar from './AcoRadioBar.vue';
import '../../../styles/aco.scss';

export default {
    title: 'inputs/AcoRadioBar',
    component: AcoRadioBar,
    argTypes: {
        value: {
            control: 'text',
        },
    },
};

const Template = (args, { argTypes }) => ({
    components: { AcoRadioBar },
    props: Object.keys(argTypes),
    template: '<div><aco-radio-bar v-bind="$props" v-model="selectedOptionId"></aco-radio-bar><span class="aco-text">Selected option: {{selectedOption}}</span></div>',
    data() {
        return {
            selectedOptionId: 1,
        }
    },
    computed: {
        selectedOption() {
            return this.options.find(o => o.id === this.selectedOptionId)
        }
    }
});

const defaultArgs = {
    options: [
        {name: 'One', id: 1},
        {name: 'Two', id: 2},
        {name: 'Three', id: 3}
    ],
    name: "default",
}

const MultipleTemplate = (args, { argTypes }) => ({
    components: { AcoRadioBar },
    props: Object.keys(argTypes),
    template: 
    '<div>' + 
        '<div style="display: flex;">' + 
            '<aco-radio-bar v-bind="$props.first" v-model="selectionOne"></aco-radio-bar>' + 
            '<span class="aco-text">Selected option: {{selectedOptionOne}}</span>' + 
        '</div>' + 
        '<div style="display: flex; margin-top: 4px;">' + 
            '<aco-radio-bar v-bind="$props.second" v-model="selectionTwo"></aco-radio-bar>' + 
            '<span class="aco-text">Selected option: {{selectedOptionTwo}}</span>' + 
        '</div>' + 
    '</div>',
    data() {
        return {
            selectionOne: 1,
            selectionTwo: 2,
        }
    },
    computed: {
        selectedOptionOne() {
            return this.first.options.find(o => o.id === this.selectionOne)
        },
        selectedOptionTwo() {
            return this.second.options.find(o => o.id === this.selectionTwo)
        }
    }
});



export const RadioBar = Template.bind({});
RadioBar.args = {
    ...defaultArgs
}

export const RadioBarSmall = Template.bind({})
RadioBarSmall.args = {
    ...defaultArgs,
    name: 'small',
    isSmall: true
}

export const RadioBarDarkBackground = Template.bind({})
RadioBarDarkBackground.args = {
    ...defaultArgs,
    name: 'dark-background',
    useDarkBackground: true
}

export const RadioBarDisabled = Template.bind({})
RadioBarDisabled.args = {
    ...defaultArgs,
    name: 'disabled',
    disabled: true
}

export const RadioBarReadOnly = Template.bind({})
RadioBarReadOnly.args = {
    options: [{name: 'One', id: 1}],
    name: 'read-only',
}

export const RadioBarsOnSamePage = MultipleTemplate.bind({})
RadioBarsOnSamePage.args = {
    first: {...defaultArgs, name:'first'},
    second: {...defaultArgs, name:'second'}
}