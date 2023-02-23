import AcoCard from './AcoCard.vue';
import { _optionsStatus } from '../../../propTypes';

export default {
    title: 'displays/AcoCard',
    component: AcoCard,
    argTypes: {
        chipStatus: {
            options: Object.values(_optionsStatus),
            control: { type: 'inline-radio' },
        },
    }
};

const CardExample = (args, { argTypes }) => ({
    components: { AcoCard },
    props: Object.keys(argTypes),
    template: `
    <div>
        <aco-card v-bind="$props" @click="onClick" />
        {{ response }}
    </div>
    `,
    data() {
        return {
            response: '',
        }
    },
    methods: {
        onClick(e) {
            this.response = 'Clicked';
            setTimeout(() => this.response = '', 500);
        }
    }
});

export const Card = CardExample.bind({});
Card.args = {
    url: 'https://reeoo.jingoffer.com/Slack-icon.png!icon512',
    title: "Slack",
    subtitle: "Social Integration",
    description: "Recognize teammates without leaving Slack!",
    chipText: "Free",
};

