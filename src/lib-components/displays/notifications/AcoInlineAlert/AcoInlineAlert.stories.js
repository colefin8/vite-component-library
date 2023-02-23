import AcoInlineAlert from './AcoInlineAlert.vue';
import { _optionsStatus } from '../../../../propTypes';

export default {
    title: 'displays/notifications/AcoInlineAlert',
    component: AcoInlineAlert,
    argTypes: {
        default: {
            control: { type: 'text' }
        },
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'inline-radio' },
        },
        links: {
            control: { type: 'object'}
        }
    }
};

const TemplateWithEvent = (args, { argTypes }) => ({
    components: { AcoInlineAlert },
    props: Object.keys(argTypes),
    template: '<aco-inline-alert v-bind="$props" @link-click="click" >{{$props.default}}</aco-inline-alert>',
    methods: {
        click(e) {
            alert(`Link clicked with event: ${JSON.stringify(e)}`);
        }
    }
});

const TemplateWithoutEvent = (args, { argTypes }) => ({
    components: { AcoInlineAlert },
    props: Object.keys(argTypes),
    template: '<aco-inline-alert v-bind="$props">{{$props.default}}</aco-inline-alert>',
});

const TemplateWithInlineLink = (args, { argTypes }) => ({
    components: { AcoInlineAlert },
    props: Object.keys(argTypes),
    template: '<aco-inline-alert v-bind="$props">The file upload failed to save. <a class="aco-status-text-danger--active" href="https://www.google.com/" target="_blank">Learn about file types</a>?</aco-inline-alert>',
});

export const InlineAlert = TemplateWithoutEvent.bind({});
InlineAlert.args = {
    default: 'The file upload failed to save.',
    status: _optionsStatus.NEUTRAL,
    links: [],
};

export const InlineAlertWithEvent = TemplateWithEvent.bind({});
InlineAlertWithEvent.args = {
    default: 'The file upload failed to save.',
    status: _optionsStatus.POSITIVE,
    links: [{title: "Dismiss"}]
};

export const InlineAlertWithHref = TemplateWithoutEvent.bind({});
InlineAlertWithHref.args = {
    default: 'The file upload failed to save.',
    status: _optionsStatus.WARNING,
    links: [{title: "Go to Link", href: "https://www.google.com/", target: "_blank"}]
};

export const InlineAlertWithHrefAndEvent = TemplateWithEvent.bind({});
InlineAlertWithHrefAndEvent.args = {
    default: 'The file upload failed to save.',
    status: _optionsStatus.DANGER,
    links: [{title: "Go to Link", href: "https://www.google.com/", target: "_blank"}, {title: 'Dismiss'}, {title: "Go to another Link", href: "https://www.google.com/", target: "_blank"}, {title: 'Delete'}]
};

export const InlineAlertWithInlineLink = TemplateWithInlineLink.bind({});
InlineAlertWithInlineLink.args = {
    status: _optionsStatus.DANGER,
    links: [{title: "Go to Link"}]
};