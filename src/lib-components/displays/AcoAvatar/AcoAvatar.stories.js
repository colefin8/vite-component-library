import AcoAvatar from './AcoAvatar.vue';
import { _optionsSize, _optionsImageUrl, _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoAvatar',
    component: AcoAvatar,
    argTypes: {
        size: {
            options: Object.values(_optionsSize),
            control: { type: 'inline-radio' },
        },
        url: {
            options: Object.values(_optionsImageUrl),
            control: { type: 'inline-radio' },
        },
        initials: {
            control: { type: 'text' },
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const AvatarExample = (args, { argTypes }) => ({
    components: { AcoAvatar },
    props: Object.keys(argTypes),
    template: `<div style="display: flex; gap: 40px">
            <div style="padding: 48px 180px 48px 24px"><aco-avatar v-bind="$props"></aco-avatar></div>
            <div style="background: #985A5A; padding: 48px 180px 48px 24px"><aco-avatar v-bind="$props"></aco-avatar></div>
            <div style="background: #FDAF08; padding: 48px 180px 48px 24px"><aco-avatar v-bind="$props"></aco-avatar></div>
        </div>
    `,
});

export const AvatarDefault = AvatarExample.bind({});
AvatarDefault.args = {
    url: _optionsImageUrl.ADAM,
    initials: 'AR',
};

export const AvatarXSmall = AvatarExample.bind({});
AvatarXSmall.args = {
    url: _optionsImageUrl.ADAM,
    size: _optionsSize.XSMALL,
    initials: 'AR',
};

export const AvatarSmall = AvatarExample.bind({});
AvatarSmall.args = {
    url: _optionsImageUrl.ADAM,
    size: _optionsSize.SMALL,
    initials: 'AR',
};

export const AvatarMedium = AvatarExample.bind({});
AvatarMedium.args = {
    url: _optionsImageUrl.ADAM,
    size: _optionsSize.MEDIUM,
    initials: 'AR',
};

export const AvatarLarge = AvatarExample.bind({});
AvatarLarge.args = {
    url: _optionsImageUrl.ADAM,
    size: _optionsSize.LARGE,
    initials: 'AR',
};

export const AvatarXLarge = AvatarExample.bind({});
AvatarXLarge.args = {
    url: _optionsImageUrl.ADAM,
    size: _optionsSize.XLARGE,
    initials: 'AR',
};

export const AvatarEmpty = AvatarExample.bind({});
AvatarEmpty.args = {
    url: _optionsImageUrl.EMPTY,
    initials: 'AR',
};

export const AvatarBadImage = AvatarExample.bind({});
AvatarBadImage.args = {
    url: _optionsImageUrl.BAD,
    initials: 'AR',
};

export const AvatarLoading = AvatarExample.bind({});
// note: Did not pass args on purpose to create loading state