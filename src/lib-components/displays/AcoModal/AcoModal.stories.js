import AcoModal from './AcoModal.vue';
import AcoButton from '../../inputs/AcoButton/AcoButton.vue';
import AcoCheckbox from '../../inputs/AcoCheckbox/AcoCheckbox.vue';
import AcoTooltip from '../AcoTooltip/AcoTooltip.vue';
import AcoInput from '../../inputs/AcoInput/AcoInput.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoModal',
    component: AcoModal,
    argTypes: {
        default: { 
            control: { type: 'text' }
        },
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const SingleButtonExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton },
    props: Object.keys(argTypes),
    template: `<div>
        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen">{{$props.content}}</aco-modal>
    </div>
    `,
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        openDialog() {
            this.isOpen = true;
        }
    }
});

export const SingleButtonModal = SingleButtonExample.bind({});
SingleButtonModal.args = {
    title: 'Single Button Dialog Title',
    content: 'Single Button Dialog Content',
    overlayDismissible: true,
};


const MultipleButtonExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton, AcoInput, AcoTooltip },
    props: Object.keys(argTypes),
    template: `<div>

        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen" @submit="submitEvent" @close="closeEvent" @input="closeComplete" @delete="deleteEvent"
            :submitLabel="submitLabel" :closeLabel="closeLabel" :deleteLabel="deleteLabel" :disabled="isLoading" :isSubmitting="submitting"
        >
            <div><strong>Fixed Text</strong></div>
            <div style="display: flex; flex-direction: column; overflow: auto;">
                <div>
                    <label>
                        Input Box: <input name="test-input" v-model="(isOpen || {}).inputText" />
                    </label>
                </div>
                <p class="aco-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                <div>
                    <label>
                        Select Box: 
                        <select v-model="(isOpen || {}).selectIndex">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </label>
                </div>
                <ul class="aco-text"><li>Lorem ipsum dolor sit amet consectetur, adipiscing elit dapibus.</li> <li>Congue rhoncus cum augue nostra, eu ut quam.</li> <li>Tempor id praesent egestas rhoncus varius convallis, felis cum cras parturient.</li></ul>
                <div>
                    <label>
                        Text Area: <textarea v-model="(isOpen || {}).textareaText"></textarea>
                    </label>
                </div>
                <div>
                    <aco-input label="Input Label" labelTooltipText="Tooltip text" />
                </div>
                <div>
                    Tooltip: <aco-tooltip content="Tooltip Content" fixedPosition>Hover Over Me</aco-tooltip>
                </div>
            </div>
        </aco-modal>

        <aco-modal v-model="confirmDelete" title="Delete?" width="564px" @submit="deleteIt" submitLabel="Delete" isPrimaryDestructive>
            <p>Are you sure you want to delete this? This cannot be undone.</p>
        </aco-modal>

        <div>{{ event }}</div>
    </div>`,
    data() {
        return {
            isOpen: null,
            isLoading: false,
            submitting: false,
            event: '',
            confirmDelete: false,
            itemId: 123,
        }
    },
    methods: {
        openDialog() {
            this.isOpen = {
                inputText: 'Input Text',
                selectIndex: 2,
                textareaText: 'Textarea Text',
            };
        },    
        submitEvent(e) {
            this.submitting = true;
            this.event = `submit clicked with event: ${JSON.stringify(e)}`;
            setTimeout(() => {
                //simulate ajax call
                this.isOpen = false;
                this.submitting = false;
            }, 2000)
        },
        closeEvent(e) {
            this.event = `close clicked with event: ${JSON.stringify(e)}`;
            this.isOpen = false;
        },
        deleteEvent(e) {
            this.event = `delete clicked with event: ${JSON.stringify(e)}`;
            this.confirmDelete = this.itemId;
        },
        deleteIt(e) {
            this.event = `delete clicked with event: ${JSON.stringify(e)}`;
            this.confirmDelete = false;
            this.isOpen = false;
        },
        closeComplete(val) {
            if (!val) {
                this.isOpen = false;
            }
        }
    }
});

export const MultipleButtonModal = MultipleButtonExample.bind({});
MultipleButtonModal.args = {
    title: 'Modal Title',
};


const WizardExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton },
    props: Object.keys(argTypes),
    template: `<div>

        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal
            v-bind="$props"
            v-model="isOpen"
            @submit="submitEvent"
            @close="closeEvent" 
            @back="backEvent"
            :submitLabel="submitText"
            closeLabel=""
            :backButtonLabel="backText"
            showCloseX
            :disabled="isDisabled"
            >
            <div>
                <label>Step {{ step }} of {{ steps }} </label>
            </div>
        </aco-modal>

        <div>{{ event }}</div>
    </div>`,
    data() {
        return {
            isOpen: false,
            isDisabled: false,
            event: '',
            step: 1,
            steps: 5,
        }
    },
    computed: {
        submitText() {
            return (this.step === this.steps ? 'Finish' : 'Next');
        },
        backText() {
            return (this.step > 1 ? 'Back' : null);
        }
    },
    methods: {
        openDialog() {
            this.isOpen = true;
        },    
        submitEvent(e) {
            if (this.step === this.steps) {
                this.isDisabled = true;
                this.event = `submit clicked with event: ${JSON.stringify(e)}`;
                setTimeout(() => {
                    //simulate ajax call
                    this.isOpen = false;
                    this.isDisabled = false;
                    this.step = 1;
                }, 2000)
            } else {
                this.step++;
            }
        },
        closeEvent(e) {
            this.event = `close clicked with event: ${JSON.stringify(e)}`;
            this.isOpen = false;
        },
        backEvent(e) {
            if (this.step > 1) {
                this.step--;
            }
        },
    }
});

export const WizardModal = WizardExample.bind({});
WizardModal.args = {
    title: 'Wizard Modal Title',
    height: '500px',
};


export const FixedToTopModal = SingleButtonExample.bind({});
FixedToTopModal.args = {
    title: 'Fixed to Top Title',
    content: 'Fixed to Top Content',
    centerVertically: false,
};


const DestructivePrimaryExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton },
    props: Object.keys(argTypes),
    template: `<div>

        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen" @submit="submitEvent" @close="closeEvent" :submitLabel="submitLabel" :closeLabel="closeLabel" :disabled="isDisabled">
        </aco-modal>

        <div>{{ event }}</div>
    </div>`,
    data() {
        return {
            isOpen: false,
            isDisabled: false,
            event: '',
        }
    },
    methods: {
        openDialog() {
            this.isOpen = true;
        },    
        submitEvent(e) {
            this.event = `submit clicked with event: ${JSON.stringify(e)}`;
            this.isOpen = false;
        },
        closeEvent(e) {
            this.event = `close clicked with event: ${JSON.stringify(e)}`;
            this.isOpen = false;
        },
    }
});

export const DestructivePrimary = DestructivePrimaryExample.bind({});
DestructivePrimary.args = {
    title: 'Destructive Primary Button Title',
    content: 'Destructive Primary Button Content',
    centerVertically: false,
    isPrimaryDestructive: true,
};

const DisabledLoadingExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton, AcoCheckbox },
    props: Object.keys(argTypes),
    template: `<div>
        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen" :disabled="!isChecked" :is-submitting="isSubmitting" @submit="onSubmit" title="Disabled and Loading" :show-close-x="true">
            <p>Sometimes the user needs to do something before being ready to submit. This might be making sure something is selected, or that all their input is valid. They should still be able to close the modal, though.</p>
            <p>Also, the user shouldn't be able to change anything while the submit action is being processed. Note that the X is also disabled while loading/submitting.</p>
            <p>When selecting a button causes a loading state, the button should have the loading icon until the loading is finished. In this example, the modal closes automatically.</p>
            <aco-checkbox :checked="isChecked" :disabled="isSubmitting" id="checkbox" label="Check me before submitting!" @change="onCheck"/>
        </aco-modal>
    </div>
    `,
    data() {
        return {
            isOpen: false,
            isSubmitting: false,
            isChecked: false,
            loadingTime: 2000,
        };
    },
    methods: {
        openDialog() {
            this.isOpen = true;
        },
        onSubmit() {
            this.isSubmitting = true;
            setTimeout(() => {
                this.isSubmitting = false;
            }, this.loadingTime);
            setTimeout(() => {
                this.isChecked = false;
                this.isOpen = false;
            }, this.loadingTime + 400);
        },
        onCheck(bool) {
            this.isChecked = bool;
        },
    },
});

export const disabledAndLoading = DisabledLoadingExample.bind({});


// Left button needs a label to show up and is overridden by the delete button
const LeftButtonExample = (args, { argTypes }) => ({
    components: { AcoModal, AcoButton },
    props: Object.keys(argTypes),
    template: `<div>
        <div style="display: flex; justify-content: center; align-items: center; padding: 50px;">
            <aco-button @click="openDialog">Open Dialog</aco-button>
        </div>

        <aco-modal v-bind="$props" v-model="isOpen">
            {{ $props.content }}
            <template #left-button-slot>
                <aco-button buttonStyle="tertiary" hasDropdownControl @click="leftClick">Left Button</aco-button>
            </template>
        </aco-modal>
    </div>
    `,
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        openDialog() {
            this.isOpen = true;
        },
        leftClick(e) {
            console.log('left button clicked', e);
        },
    }
});

export const LeftButton = LeftButtonExample.bind({});
LeftButton.args = {
    title: 'Left Button Dialog Title',
    content: 'Left Button Dialog Content',
    overlayDismissible: true,
};
