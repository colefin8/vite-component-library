import AcoTextarea from './AcoTextarea.vue';
import { _optionsStatus, _optionsResize } from '../../../propTypes';

export default {
    title: 'inputs/AcoTextarea',
    component: AcoTextarea,
    argTypes: {
        status: {
            options: [...Object.values(_optionsStatus), undefined],
            control: { type: 'inline-radio' },
        },
        resize: {
            options: Object.values(_optionsResize),
            control: { type: 'inline-radio' },
        },
    }
};


const TemplateExample = (args, { argTypes }) => ({
    components: { AcoTextarea },
    props: Object.keys(argTypes),
    template: `<div>
        <aco-textarea v-bind="$props" v-model="text" @change="onChange" @validate="onValidate" />
        <div style="margin:1em;">
            <div>Output: <pre style="background:lightyellow;padding:1em;">{{ text }}</pre></div>
            <div>Is Valid: {{ validation && validation.valid }}</div>
            <em v-if="changed">Changed</em>
        </div>
    </div>
    `,
    data() {
        return {
            text: '',
            changed: false,
            validation: null,
        };
    },
    methods: {
        onChange(output) {
            this.changed = true;
            setTimeout(() => this.changed = false, 1000)
        },
        onValidate(validation, validationMessage) {
            this.validation = validation;
            this.statusMessage = validationMessage;
        },
    }
});


export const PlainTextArea = TemplateExample.bind({});
PlainTextArea.args = {};

export const TextArea = TemplateExample.bind({});
TextArea.args = {
    label: 'Label',
    required: true,
    requiredText: 'Required text',
    disabled: true,
    readonly: false,
    placeholder: 'Placeholder text',
    statusMessage: 'Status message',
    status: _optionsStatus.NEUTRAL,
    minlength: 2,
    maxlength: 120,
    width: 500,
    height: 100,
    minWidth: 50,
    minHeight: 150,
    resize: 'vertical',
};
