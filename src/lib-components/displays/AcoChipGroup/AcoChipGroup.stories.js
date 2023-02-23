import AcoChipGroup from './AcoChipGroup.vue';
import AcoButton from './../../inputs/AcoButton/AcoButton.vue';
import { _optionsTheme, _optionsSize } from '../../../propTypes';

export default {
    title: 'displays/AcoChipGroup',
    component: 'AcoChipGroup',
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
        size: {
            options: [_optionsSize.MEDIUM, _optionsSize.SMALL],
            control: { type: 'inline-radio' },
        },
    },
};

const ChipGroupTemplate = (args, { argTypes }) => ({
    components: { AcoButton, AcoChipGroup },
    props: Object.keys(argTypes),
    template:
        '<div style="display: flex; flex-direction: column; gap: 16px;">' +
            '<aco-chip-group v-if="chips.length > 0 || $props.hasAddButton" v-bind="$props" :chips="chips" @delete-chip="deleteChip" @delete-group="deleteGroup" />' +
            '<aco-button @click="addChip" style="width: fit-content">Add Chip</aco-button>' +
            '<input v-model="input" placeholder="chip text" style="width: 300px; height: 20px; font-size: 14px"/>' +
        '</div>',
    data() {
        return {
            chips: [
                { text: 'The Social Network', id: 1 },
                { label: 'Tom Hanks', text: 'Saving Private Ryan', id: 2, image: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg', initials: 'SPR' },
                { label: 'Jim Carrey', text: 'The Truman Show', id: 3, image: 'https://en.wikipedia.org/wiki/File:Trumanshow.jpg', initials: 'TS' },
                { text: 'True Grit', id: 4 },
            ],
            id: 5,
            input: '',
        };
    },
    methods: {
        addChip() {
            this.chips.push({
                text: this.input ? this.input : `chip${this.id}`,
                id: this.id++,
            });
        },
        deleteChip(id) {
            this.chips = this.chips.filter((chip) => chip.id !== id);
        },
        deleteGroup() {
            this.chips = [];
        },
    },
});

export const ChipGroup = ChipGroupTemplate.bind({});
ChipGroup.args = {
    title: 'Movies',
    canDeleteGroup: true,
    canDeleteChips: true,
    hasAddButton: false,
    addButtonText: 'Add',
    useColors: true,
    chipSeparator: '',
};

const ChipGroupTemplateAdd = (args, { argTypes }) => ({
    components: { AcoButton, AcoChipGroup },
    props: Object.keys(argTypes),
    template:
        '<div>' +
            '<aco-chip-group v-bind="$props" :chips="chips" @delete-chip="deleteChip" @delete-group="deleteGroup" @add-chip="addChip" />' +
        '</div>',
    data() {
        return {
            chips: [
                { text: 'The Social Network', id: 1 },
                { text: 'Saving Private Ryan', id: 2 },
                { text: 'The Truman Show', id: 3 },
                { text: 'True Grit', id: 4 },
            ],
            id: 5,
            input: '',
        };
    },
    methods: {
        addChip() {
            this.chips.push({
                text: `chip${this.id}`,
                id: this.id++,
            });
        },
        deleteChip(id) {
            this.chips = this.chips.filter((chip) => chip.id !== id);
        },
        deleteGroup() {
            this.chips = [];
        },
    },
});

export const ChipGroupWithAdd = ChipGroupTemplateAdd.bind({});
ChipGroupWithAdd.args = {
    title: 'Movies',
    canDeleteGroup: true,
    canDeleteChips: true,
    hasAddButton: true,
    addButtonText: 'Add Movie',
    useColors: true,
    chipSeparator: '',
};