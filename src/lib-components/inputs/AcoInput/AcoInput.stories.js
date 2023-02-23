import AcoInput from './AcoInput.vue';
import AcoIcon from '../../displays/icons/AcoIcon/AcoIcon.vue';
import { _optionsInputType, _optionsStatus, _optionsSize } from '../../../propTypes';

export default {
    title: 'inputs/AcoInput',
    component: AcoInput,
    argTypes: {
        type: {
            options: Object.values(_optionsInputType),
            control: { type: 'inline-radio' },
        },
        status: {
            options: [...Object.values(_optionsStatus), undefined],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [_optionsSize.DEFAULT, _optionsSize.SMALL],
            control: { type: 'inline-radio' },
        }
    }
};

const AllOptionsExample = (args, { argTypes }) => ({
    components: { AcoInput, AcoIcon },
    props: Object.keys(argTypes),
    template: `<div>
        <aco-input 
            v-bind="$props"
            v-model="output"
            @change="onChange"
            @validate="onValidate"
            @click="onClick"
            @suffix-icon-click="onSuffixIconClick"
            @enter="onEnter"
        >
            <template #prefix>{{ $props.prefix }}</template>
            <template #suffix><aco-icon icon="ph-currency-circle-dollar" />{{ $props.suffix }}</template>
        </aco-input>
        <div style="margin:1em;">
            Output: <pre style="background:lightyellow;padding:1em;">{{ output }}</pre>
            Validation: {{ validation && validation.valid }}
            <div v-if="clicked">
                Clicked <aco-icon icon="ph-hand-pointing" />
            </div>
            <div v-if="suffixIconClicked">
                Suffix Icon Clicked <aco-icon icon="ph-hand-pointing" />
            </div>
        </div>
    </div>`,
    data() {
        return {
            output: this.value,
            validation: null,
            clicked: false,
            suffixIconClicked: null,
        };
    },
    methods: {
        onEnter(output) {
            console.log('enter fired:', output);
        },
        onChange(output) {
            console.log('change fired:', output);
        },
        onValidate(validation) {
            console.log('validate fired:', validation);
            this.validation = validation;
        },
        onClick() {
            console.log('click fired');
            this.clicked = true;
            setTimeout(() => this.clicked = false, 500)
        },
        onSuffixIconClick() {
            console.log('suffix icon click fired');
            this.suffixIconClicked = true;
            setTimeout(() => this.suffixIconClicked = false, 500);
        },
    },
    watch: {
        value(newVal) {
            this.output = newVal;
        }
    },
});

export const AllOptions = AllOptionsExample.bind({});
AllOptions.args = {
    type: _optionsInputType.TEXT,
    label: 'Label',
    required: true,
    requiredText: 'At least one value required',
    prefix: `http://`,
    prefixIcon: 'ph-calendar',
    suffix: 'USD',
    suffixIcon: 'ph-armchair',
    placeholder: 'type the secret phrase',
    size: 'default',
    maxlength: 100,
    width: '500px',
    showClearButton: true,
    pattern: 'hello world',
};

const TemplateExample = (args, { argTypes }) => ({
    components: { AcoInput, AcoIcon },
    props: Object.keys(argTypes),
    template: `<div>
        <aco-input 
            v-bind="$props"
            v-model="output"
            @change="onChange"
            @validate="onValidate"
            @click="onClick"
            @suffix-icon-click="onSuffixIconClick"
            @enter="onEnter"
        />
        <div style="margin:1em;">
            Output: <pre style="background:lightyellow;padding:1em;">{{ output }}</pre>
            Validation: {{ validation && validation.valid }}
            <div v-if="clicked">
                Clicked <aco-icon icon="ph-hand-pointing" />
            </div>
            <div v-if="suffixIconClicked">
                Suffix Icon Clicked <aco-icon icon="ph-hand-pointing" />
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            output: this.value,
            validation: null,
            clicked: null,
            suffixIconClicked: null,
        };
    },
    methods: {
        onEnter(output) {
            console.log('enter fired:', output);
        },
        onChange(output) {
            console.log('change fired:', output);
        },
        onValidate(validation) {
            console.log('validate fired:', validation);
            this.validation = validation;
        },
        onClick() {
            console.log('click fired');
            this.clicked = true;
            setTimeout(() => this.clicked = false, 500);
        },
        onSuffixIconClick() {
            console.log('suffix click fired');
            this.suffixIconClicked = true;
            setTimeout(() => this.suffixIconClicked = false, 500);
        },
    },
    watch: {
        value(newVal) {
            this.output = newVal;
        }
    },
});


export const WithPrefix = TemplateExample.bind({});
WithPrefix.args = {
    type: _optionsInputType.TEXT,
    prefix: 'http://',
    value: '',
};

export const Password = TemplateExample.bind({});
Password.args = {
    type: _optionsInputType.PASSWORD,
    value: 'lahsdls@383',
};

export const TextInput = TemplateExample.bind({});
TextInput.args = {
    type: _optionsInputType.TEXT,
    value: '',
};

export const StatusText = TemplateExample.bind({});
StatusText.args = {
    type: _optionsInputType.TEXT,
    placeholder: 'Enter text...',
    statusMessage: 'Enter a name please',
    status: _optionsStatus.WARNING,
    value: '',
};

export const SmallInput = TemplateExample.bind({});
SmallInput.args = {
    type: _optionsInputType.TEXT,
    placeholder: 'Enter text...',
    size: 'small',
    value: '',
};

export const Disabled = TemplateExample.bind({});
Disabled.args = {
    type: _optionsInputType.TEXT,
    placeholder: 'Enter text...',
    disabled: true,
    value: '',
};

export const Readonly = TemplateExample.bind({});
Readonly.args = {
    type: _optionsInputType.TEXT,
    readonly: true,
    value: 'Text',
};

export const TextWLabel = TemplateExample.bind({});
TextWLabel.args = {
    type: _optionsInputType.TEXT,
    label: 'Label',
    value: 'My typed text',
};

export const DisabledWLabel = TemplateExample.bind({});
DisabledWLabel.args = {
    type: _optionsInputType.TEXT,
    label: 'Label',
    value: 'My typed text',
    disabled: true,
};

export const ReadonlyWLabel = TemplateExample.bind({});
ReadonlyWLabel.args = {
    type: _optionsInputType.TEXT,
    label: 'Label',
    value: 'My typed text',
    readonly: true,
};

export const Number = TemplateExample.bind({});
Number.args = {
    type: _optionsInputType.NUMBER,
    value: 8,
};

export const Search = TemplateExample.bind({});
Search.args = {
    type: _optionsInputType.SEARCH,
    label: 'Search Box',
    placeholder: 'enter text to search',
    showClearButton: true,
    value: '',
};

export const Email = TemplateExample.bind({});
Email.args = {
    type: _optionsInputType.EMAIL,
    label: 'Enter a valid email',
    showClearButton: true,
    value: '',
};