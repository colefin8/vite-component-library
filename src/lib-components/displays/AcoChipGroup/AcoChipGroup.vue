<template>
    <div class="chip-group-container" data-x-ray="padded">
        <div class="chip-group-container__content" :class="{ 'chip-group-container__content--row': !title && canDeleteGroup }">
            <div v-if="title || (canDeleteGroup && chips.length)" class="category-container">
                {{ title }}
                <aco-icon
                    v-if="canDeleteGroup && chips.length"
                    class="x-icon"
                    icon="ph-x"
                    @click="removeGroup"
                    @keydown.native.enter.stop="removeGroup"
                    @keydown.native.space.stop="removeGroup"
                    tabindex="0"
                />
            </div>
            <div class="chip-container">
                <div v-for="(chip, index) in chips" :key="index" class="chip-container__wrapper">
                    <span v-if="chipSeparator && index" class="chip-container__separator">{{ chipSeparator }}</span>
                    <aco-chip
                        :text="chip.text"
                        :label="chip.label"
                        :image="chip.image"
                        :initials="chip.initials"
                        :show-x-icon="canDeleteChips"
                        :size="chipSize()"
                        :theme="theme"
                        :use-colors="useColors"
                        @remove="removeChip(chip.id)"
                    />
                </div>
            </div>
        </div>
        <aco-button 
            v-if="hasAddButton" 
            button-style="tertiary" 
            size="small"
            icon="ph-plus"
            :theme="theme"
            @click="addChip"
            data-qa="aco-chip-group-add-button"
            :class="['add-button', {'add-button--empty' : !chips.length}]"
        >
            {{ addButtonText }}
        </aco-button>
    </div>
</template>

<script>
import themeMixin from '../../../mixins/themeMixin';
import { defineComponent } from 'vue';
import { _optionsSize } from '../../../propTypes';

/**
 * A Chip Group is used to group one or more chips along with an optional title. If chips can be deleted (canDeleteChip prop is true) deleting a chip will fire the "delete-chip" event 
 * along with the chip's id which the parent component will need to handle. Same if the group can be deleted (candDeleteGroup) it will fire the "delete-group" event
 */
export default defineComponent({
    name: 'aco-chip-group',
    //! may break if themeMixin changes!
    mixins: [themeMixin],
    components: {
        AcoButton: () =>
            import('./../../inputs/AcoButton/AcoButton.vue').then((d) => d.default),
        AcoChip: () =>
            import('./../AcoChip/AcoChip.vue').then((d) => d.default),
        AcoIcon: () =>
            import('./../icons/AcoIcon/AcoIcon.vue').then((d) => d.default),
    },
    props: {
        /**
         * The name of the group
         */
        title: {
            type: String,
            required: false,
        },
        /**
         * An array of objects and each object has a text and id property
         */
        chips: {
            type: Array,
            required: true,
            validator(prop) {
                // check to see if every object in the options prop has a "text" and "id" property, if they all do the lengths of the filter and original array will be equal.
                return (
                    prop.filter((obj) => 'text' in obj && 'id' in obj)
                        .length === prop.length
                );
            },
        },
        /**
         * If the entire group can be deleted
         */
        canDeleteGroup: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * If each chip can be deleted
         */
        canDeleteChips: {
            type: Boolean,
            required: false,
            default: true,
        },
        hasAddButton: {
            type: Boolean,
            required: false,
            default: false,
        },
        addButtonText: {
            type: String,
            required: false,
            default: 'Add',
        },
        /** 
         * Size of chip: medium or small
         */
        size: {
            type: String,
            validator(value) {
                return [_optionsSize.MEDIUM, _optionsSize.SMALL].includes(value);
            },
            required: false,
            default: _optionsSize.SMALL
        },
        /**
         * Uses primary/secondary colors when true; the component is black and white when false
         */
        useColors: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Text to place between the chips (e.g: 'or')
         */
        chipSeparator: {
            type: String,
            default: undefined,
            required: false,
        },
    },
    setup(props, { emit }) {
        const removeChip = (chipId) => {
            emit('delete-chip', chipId);
        };

        const removeGroup = () => {
            emit('delete-group');
        };

        const addChip = () => {
            emit('add-chip');
        }

        const chipSize = () => (props.size === _optionsSize.SMALL ? props.size : _optionsSize.DEFAULT);

        return { removeChip, removeGroup, addChip, chipSize };
    },
});
</script>

<style lang="scss" scoped>
@import '../../../styles/aco.scss';

.chip-group-container {
    display: inline-flex;
    flex-direction: column;
    padding: 12px;
    min-width: 0;

    background-color: #f3f4f6;
    border-radius: 8px;

    &__content {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &--row {
            flex-direction: row-reverse;
            justify-content: space-between;
        }
    }
}

.category-container {
    @extend .aco-text;
    min-height: 24px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
    font-weight: 400;

    .x-icon {
        color: #374151;
        cursor: pointer;
    }
}

.chip-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    &__wrapper {
        display: inline-flex;
    }

    &__separator {
        @extend .aco-text;
        color: $aco-ui-600;
        padding-right: 8px;
        display: flex;
        align-items: center;
        padding-bottom: 4px;
        text-transform: lowercase;
    }
}

.add-button {
    align-self: flex-start;
    margin-top: 8px;

    &--empty {
        margin-top: 0;
    }
}

</style>
