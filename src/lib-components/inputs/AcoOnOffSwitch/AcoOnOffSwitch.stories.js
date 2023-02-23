import AcoOnOffSwitch from './AcoOnOffSwitch.vue';
import AcoTooltip from '../../displays/AcoTooltip/AcoTooltip.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'inputs/AcoOnOffSwitch',
    component: AcoOnOffSwitch,
    argTypes: {
        onLabel: {
            control: { type: null }
        },
        offLabel: {
            control: { type: null }
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const OnOffSwitchTemplate = (args, { argTypes }) => ({
    components: { AcoOnOffSwitch },
    props: Object.keys(argTypes),
    template: '<aco-on-off-switch v-bind="$props" v-model="checked" />',
    data() {
        return {
            checked: false,
        }
    },
});

export const OnOffSwitch = OnOffSwitchTemplate.bind({});
OnOffSwitch.args = {
    id: 'on-off-switch',
    onLabel: 'On',
    offLabel: 'Off'
};

export const Disabled = OnOffSwitchTemplate.bind({});
Disabled.args = {
    ...OnOffSwitch.args,
    disabled: true,
};

export const Readonly = OnOffSwitchTemplate.bind({});
Readonly.args = {
    ...OnOffSwitch.args,
    readonly: true,
};

export const WithTranslateFunction = OnOffSwitchTemplate.bind({});
WithTranslateFunction.args = {
    ...OnOffSwitch.args,
    translate: (value) => {
        return value === 'On' ? 'オン' : 'オフ';
    }
};

const OnOffSwitchReadonlyTemplate = (args, { argTypes }) => ({
    components: { AcoOnOffSwitch, AcoTooltip, },
    props: Object.keys(argTypes),
    template: `
        <aco-tooltip class="aco-on-off-switch__tooltip" id="on-off-tooltip-1" :maxWidth="264">
            <template #hover style="padding: 24px 0 0 72px;"><aco-on-off-switch v-bind="$props" v-model="checked" /></template>
            <template #content><div>Only an admin can turn this on.</div></template>
        </aco-tooltip>
    `,
    data() {
        return {
            checked: false,
        }
    },
});

export const ReadonlyWithTooltip = OnOffSwitchReadonlyTemplate.bind({});
ReadonlyWithTooltip.args = {
    ...OnOffSwitch.args,
    readonly: true,
};
