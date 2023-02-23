import AcoLabel from './AcoLabel.vue';

export default {
    title: 'displays/AcoLabel',
    component: AcoLabel,
    argTypes: {
        prefixIcon: { control: 'text' },
        text: { control: 'text' },
        labelFor: { control: 'text' },
        context: { control: 'text' },
        tooltipText: { control: 'text' },
        required: { control: 'boolean' },
        requiredText: { control: 'text' },
        readonly: { control: 'boolean' },
    }
};

const DefaultsExample = (args, { argTypes }) => ({
    components: { AcoLabel },
    props: Object.keys(argTypes),
    template: `
        <aco-label v-bind="$props">Label in Slot</aco-label>
    `,
});

export const Defaults = DefaultsExample.bind({});
Defaults.args = {};


const Example = (args, { argTypes }) => ({
    components: { AcoLabel },
    props: Object.keys(argTypes),
    template: `
        <div>
            <div><aco-label v-bind="$props" /></div>
            <div><input id="123" /></div>
        </div>
    `,
});

export const Label = Example.bind({});
Label.args = {
    prefixIcon: 'ph-calendar-blank',
    text: 'Label',
    labelFor: '123',
    context: 'MM-DD-YY',
    tooltipText: 'This is a tooltip',
    required: true,
    requiredText: 'Required',
    readonly: false,
};
