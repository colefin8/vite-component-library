import AcoChip from './AcoChip.vue';
import { _optionsImageUrl, _optionsSize, _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoChip',
    component: AcoChip,
    argTypes: {
        size: {
            options: [_optionsSize.DEFAULT, _optionsSize.SMALL],
            control: { type: 'inline-radio' },
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    },
};

const ChipTemplate = (args, { argTypes }) => ({
    components: { AcoChip },
    props: Object.keys(argTypes),
    template: '<aco-chip v-bind="$props"></aco-chip>',
});

export const Chip = ChipTemplate.bind({});
Chip.args = {
    text: "Item",
};


export const ChipEverything = ChipTemplate.bind({});
ChipEverything.args = {
    text: "Item",
    image: _optionsImageUrl.BRETT,
    showXIcon: true,
    label: 'Location',
};


export const ChipSmallWhiteAvatar = ChipTemplate.bind({});
ChipSmallWhiteAvatar.args = {
    text: "Item",
    image: _optionsImageUrl.BRETT,
    label: 'A-Team Ready and Some More Text',
    useColors: false,
    size: _optionsSize.SMALL,
};


export const ChipInitials = ChipTemplate.bind({});
ChipInitials.args = {
    text: "Item",
    initials: 'AA',
    showXIcon: true,
    label: 'Location',
    useColors: false,
};
