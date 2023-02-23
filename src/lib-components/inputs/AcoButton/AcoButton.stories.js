import AcoButton from './AcoButton.vue';
import { _optionsButtonStyle, _optionsStatus, _optionsSize, _optionsTheme } from '../../../propTypes';

export default {
    title: 'inputs/AcoButton',
    component: AcoButton,
    argTypes: {
        default: {
            description: 'The text for the button',
            control: { type: 'text' },
        },
        buttonStyle: {
            options: Object.values(_optionsButtonStyle),
            control: { type: 'inline-radio' },
        },
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'inline-radio' },
        },
        size: {
            options: [_optionsSize.DEFAULT, _optionsSize.SMALL],
            control: { type: 'inline-radio' },
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
        rightIcon: {
            description: 'The icon on the right',
            control: { type: 'text' },
        },
    }
};

const ButtonTemplate = (args, { argTypes }) => ({
    components: { AcoButton },
    props: Object.keys(argTypes),
    template: '<aco-button v-bind="$props">{{$props.default}}</aco-button>',
});

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = {
    default: 'Button',
};

export const PrimaryButton = ButtonTemplate.bind({});
PrimaryButton.args = {
    default: 'Primary Button',
    buttonStyle: _optionsButtonStyle.PRIMARY,
};
export const SecondaryButton = ButtonTemplate.bind({});
SecondaryButton.args = {
    default: 'Secondary Button',
    buttonStyle: _optionsButtonStyle.SECONDARY,
};
export const TertiaryButton = ButtonTemplate.bind({});
TertiaryButton.args = {
    default: 'Tertiary Button',
    buttonStyle: _optionsButtonStyle.TERTIARY,
};

export const PrimaryButtonAcoTheme = ButtonTemplate.bind({})
PrimaryButtonAcoTheme.args = {
    default: 'Primary Button w/Awardco Theme',
    buttonStyle: _optionsButtonStyle.PRIMARY,
    theme: 'aco-theme'
};

export const SecondaryButtonAcoTheme = ButtonTemplate.bind({})
SecondaryButtonAcoTheme.args = {
    default: 'Secondary Button w/Awardco Theme',
    buttonStyle: _optionsButtonStyle.SECONDARY,
    theme: 'aco-theme'
};

export const TertiaryButtonAcoTheme = ButtonTemplate.bind({})
TertiaryButtonAcoTheme.args = {
    default: 'Tertiary Button w/Awardco Theme',
    buttonStyle: _optionsButtonStyle.TERTIARY,
    theme: 'aco-theme'
};

export const PositiveButton = ButtonTemplate.bind({});
PositiveButton.args = {
    default: 'Positive Button',
    status: _optionsStatus.POSITIVE,
};
export const WarningButton = ButtonTemplate.bind({});
WarningButton.args = {
    default: 'Warning Button',
    status: _optionsStatus.WARNING,
};
export const DangerButton = ButtonTemplate.bind({});
DangerButton.args = {
    default: 'Danger Button',
    status: _optionsStatus.DANGER,
};

export const SmallButton = ButtonTemplate.bind({});
SmallButton.args = {
    default: 'Small Button',
    size: _optionsSize.SMALL,
};

export const IconButton = ButtonTemplate.bind({});
IconButton.args = {
    default: 'Icon Button',
    icon: 'ph-trophy',
};

export const IconButtonNoText = ButtonTemplate.bind({});
IconButtonNoText.args = {
    icon: 'ph-trophy',
    ariaLabel: 'Claim Reward',
};

export const LoadingButton = ButtonTemplate.bind({});
LoadingButton.args = {
    default: 'Loading Button',
    isLoading: true,
};

export const SecondaryLoadingButton = ButtonTemplate.bind({});
SecondaryLoadingButton.args = {
    default: 'Secondary Loading Button',
    buttonStyle: _optionsButtonStyle.SECONDARY,
    isLoading: true,
};

export const DangerLoadingButton = ButtonTemplate.bind({});
DangerLoadingButton.args = {
    default: 'Danger Loading Button',
    status: _optionsStatus.DANGER,
    isLoading: true,
};

const LoadingButtonTemplate = (args, { argTypes }) => ({
    components: { AcoButton },
    props: Object.keys(argTypes),
    template: '<aco-button v-bind="$props" :isLoading="loading" @click="onClick">{{$props.default}}</aco-button>',
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        onClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
});

export const ClickableLoadingButton = LoadingButtonTemplate.bind({});
ClickableLoadingButton.args = {
    default: 'Loading Button',
};

export const ClickableLoadingButtonNoCheckmark = LoadingButtonTemplate.bind({});
ClickableLoadingButtonNoCheckmark.args = {
    default: 'Loading Button No Checkmark',
    disableCheckmark: true,
};

export const FullWidthButton = ButtonTemplate.bind({});
FullWidthButton.args = {
    default: 'Full Width Button',
    isFullWidth: true,
};

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = {
    default: 'Disabled Button',
    disabled: true,
};