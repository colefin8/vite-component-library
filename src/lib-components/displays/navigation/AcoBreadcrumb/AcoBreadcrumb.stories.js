import AcoBreadcrumb from './AcoBreadcrumb.vue';

import { _optionsTheme } from '../../../../propTypes';

export default {
    title: 'displays/navigation/AcoBreadcrumb',
    component: AcoBreadcrumb,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const BreadcrumbTemplate = (args, { argTypes }) => ({
    components: { AcoBreadcrumb },
    props: Object.keys(argTypes),
    template: `
        <div style="padding-bottom: 128px;">
            <aco-breadcrumb v-bind="$props" @click="onClick" />
        </div>`,
    methods: {
        onClick(value) {
            alert(`Crumb with value ${value} clicked`);
        }
    }
});

export const Default = BreadcrumbTemplate.bind({});
Default.args = {
    items: [
        {
            label: 'Level 1',
            value: 1,
        },
        {
            label: 'Level 2',
            value: 2,
        },
        {
            label: 'Level 3',
            value: 3,
        },
    ]
};

export const FourOrMoreItems = BreadcrumbTemplate.bind({});
FourOrMoreItems.args = {
    items: [
        {
            label: 'All Active Budgets',
            value: 1,
        },
        {
            label: 'The United States of America Region',
            value: 2,
        },
        {
            label: 'Provo South Office',
            value: 3,
        },
        {
            label: 'Product Budget',
            value: 4,
        },
        {
            label: 'Frontend Team',
            value: 5,
        },
    ]
};

export const Links = BreadcrumbTemplate.bind({});
Links.args = {
    items: [
        {
            label: 'Admin',
            value: 1,
            href: '/dashboardV2'
        },
        {
            label: 'Settings',
            value: 2,
            href: '/settings'
        },
        {
            label: 'Recognition Programs',
            value: 3,
            href: '/settings/recognition-programs'
        },
        {
            label: 'High Five',
            value: 4,
            href: '/settings/recognition-programs/123'
        },
    ]
};
