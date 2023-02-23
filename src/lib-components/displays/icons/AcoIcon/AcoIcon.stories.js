import AcoIcon from './AcoIcon.vue';

export default {
    title: 'displays/icons/AcoIcon',
    component: AcoIcon,
};

const IconTemplate = (args, { argTypes }) => ({
    components: { AcoIcon },
    props: Object.keys(argTypes),
    data() {
        return {
            clicked: null,
        }
    },
    template: `<div>
        <aco-icon v-bind="$props" @click="onClick"></aco-icon>
        <div>{{ clicked }}</div>
    </div>`,
    methods: {
        onClick(e) {
            this.clicked = '"Click"';
            setTimeout(() => this.clicked=null, 500);
        }
    }
});

export const DefaultIcon = IconTemplate.bind({});
DefaultIcon.args = {
    icon: 'ph-trophy',
};

export const PxSizedIcon = IconTemplate.bind({});
PxSizedIcon.args = {
    ...DefaultIcon.args,
    size: '32px'
};

export const EmSizedIcon = IconTemplate.bind({});
EmSizedIcon.args = {
    ...DefaultIcon.args,
    size: '3em'
};

export const ColorIcon = IconTemplate.bind({});
ColorIcon.args = {
    ...DefaultIcon.args,
    color: '#db1f1f',
};