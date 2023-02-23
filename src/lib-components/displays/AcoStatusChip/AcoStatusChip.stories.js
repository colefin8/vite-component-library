import AcoStatusChip from './AcoStatusChip.vue';
import { _optionsStatus, _optionsSize } from '../../../propTypes';

export default {
    title: 'displays/AcoStatusChip',
    component: AcoStatusChip,
    argTypes: {
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'inline-radio' },
        },
        size: {
            options: Object.values(_optionsSize).filter(option => [_optionsSize.DEFAULT, _optionsSize.SMALL].includes(option)),
            control: { type: 'inline-radio' },
        },
    },
};

const Template = (args, { argTypes }) => ({
    components: { AcoStatusChip },
    props: Object.keys(argTypes),
    template: `
        <div>
            <aco-status-chip v-bind="$props" @click="onClick" />
        </div>
    `,
    methods: {
        onClick(e) {
            console.log('clicked', e);
            this.isDropdownOpen = !this.isDropdownOpen;
        }
    }
});

export const Status = Template.bind({});
Status.args = {
    text: 'Connected',
    status: _optionsStatus.NEUTRAL,
}

