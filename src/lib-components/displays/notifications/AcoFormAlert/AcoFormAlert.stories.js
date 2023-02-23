import AcoFormAlert from './AcoFormAlert.vue';
import { _optionsStatus } from '../../../../propTypes';

export default {
    title: 'displays/notifications/AcoFormAlert',
    component: AcoFormAlert,
    argTypes: {
        default: { 
            control: { type: 'text' }
        },
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'inline-radio' },
        },
    },
};

const FormAlertTemplate = (args, { argTypes }) => ({
    components: { AcoFormAlert },
    props: Object.keys(argTypes),
    template: '<aco-form-alert v-bind="$props" >{{$props.default}}</aco-form-alert>',
});

export const FormAlert = FormAlertTemplate.bind({});
FormAlert.args = {
    default: 'Please upload a file',
    status: _optionsStatus.NEUTRAL,
};

export const FormAlertPositive = FormAlertTemplate.bind({});
FormAlertPositive.args = {
    default: 'Upload Successful',
    status: _optionsStatus.POSITIVE,
};
