import AcoColorPicker from './AcoColorPicker.vue';

export default {
    title: 'inputs/AcoColorPicker',
    component: AcoColorPicker,

}

const ColorPickerTemplate = (args, { argTypes }) => ({
    components: { AcoColorPicker },
    template: `
        <div style="height: 400px;">
            <aco-color-picker v-model="color" />
        </div>
    `,
    data() {
        return {
            color: '#FDAF08'
        }
    }
});

export const ColorPicker = ColorPickerTemplate.bind({});
