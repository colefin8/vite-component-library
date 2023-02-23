import AcoMediaInput from '../AcoMediaInput.vue';
import testBgImageURL from './test-bg.jpg';
import { _optionsStatus } from '../../../../../propTypes';

export default {
    title: 'inputs/media/AcoMediaInput/_AcoSingleMediaInput/_AcoSingleMediaInput',
    component: AcoMediaInput,
    argTypes: {
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'radio' },
        },
    }
};

const SingleMediaInputTemplate = (args, { argTypes }) => ({
    components: { AcoMediaInput },
    props: Object.keys(argTypes),
    data() {
        return {
            message: '',
            modelList: [],
        }
    },
    template:   `<div>
                    <aco-media-input
                        v-bind="$props"
                        v-model="modelList"
                        type="single"
                        @change="handleUpload"
                        @edit-media="handleEdit"
                        @remove-media="deleteMedia"
                        @main-action="handleMainAction"
                        @secondary-action="handleSecondaryAction"
                    />
                    <p>{{ message }}</p>
                </div>`,
    methods: {
        handleUpload() {
            this.setThenClearMessage('The parent should store the media to upload when it is ready.');
        },
        deleteMedia() {
            this.setThenClearMessage('Remove the stored media in the parent.');
        },
        handleEdit() {
            this.setThenClearMessage('Handle this editing however you need to.');
        },
        handleMainAction() {
            this.setThenClearMessage('Allow the user to choose media from wherever you need');
        },
        handleSecondaryAction() {
            this.setThenClearMessage('If you need to allow picking from the user\'s computer and also an additional library, use this and don\'t override the main text');
        },
        setThenClearMessage(msg) {
            this.message = msg;
            setTimeout(() => {
                this.message = '';
            }, 5000);
        }
    }
});

export const SingleMediaInput = SingleMediaInputTemplate.bind({});
SingleMediaInput.parameters = { controls: { exclude: ['mediaList', 'type'] } };
SingleMediaInput.args = {
    id: 'unique',
};

const SingleMediaInputNoEditTemplate = (args, { argTypes }) => ({
    components: { AcoMediaInput },
    props: Object.keys(argTypes),
    data() {
        return {
            message: '',
            modelList: [],
        }
    },
    template:   `<div>
                    <aco-media-input
                        v-bind="$props"
                        v-model="modelList"
                        type="single"
                        @edit-media="fakeEdit"
                    />
                </div>`,
    methods: {
        fakeEdit() {
            this.setThenClearMessage('Do whatever needs to be done with editing the media.');
        },
        setThenClearMessage(msg) {
            this.message = msg;
            setTimeout(() => {
                this.message = '';
            }, 5000);
        }
    }
});

export const SingleMediaInputNoEdit = SingleMediaInputNoEditTemplate.bind({});
SingleMediaInputNoEdit.parameters = { controls: { exclude: ['mediaList', 'type'] } };
SingleMediaInputNoEdit.args = {
    id: 'uniqueAlso',
}

const SingleMediaInputTemplateWithDefault = (args, { argTypes }) => ({
    components: { AcoMediaInput },
    props: Object.keys(argTypes),
    data() {
        return {
            message: '',
            modelList: [{src: testBgImageURL, alt: 'test-bg'}],
        }
    },
    template:   `<div>
                    <aco-media-input
                        v-bind="$props"
                        v-model="modelList"
                        type="single"
                        @change="handleUpload"
                        @edit-media="handleEdit"
                        @remove-media="deleteMedia"
                        @main-action="handleMainAction"
                        @alt-action="handleSecondaryAction"
                    />
                    <p>{{ message }}</p>
                </div>`,
    methods: {
        handleUpload() {
            this.setThenClearMessage('The parent should store the media to upload when it is ready.');
        },
        deleteMedia() {
            this.modelList.push({src: testBgImageURL, alt: 'test-bg'});
            // If you have a default image, you may want to disable the "delete button" overlay while it's the default image, and update/remove any custom button text.
            this.setThenClearMessage('This component will revert back to the default image when deleting the user-uploaded image.');
        },
        handleEdit() {
            this.setThenClearMessage('Handle this editing however you need to.');
        },
        handleMainAction() {
            this.setThenClearMessage('Allow the user to choose media from wherever you need');
        },
        handleSecondaryAction() {
            this.setThenClearMessage('If you need to allow picking from the user\'s computer and also an additional library, use this and don\'t override the main text');
        },
        setThenClearMessage(msg) {
            this.message = msg;
            setTimeout(() => {
                this.message = '';
            }, 5000);
        }
    }
});

export const SingleMediaInputWithDefault = SingleMediaInputTemplateWithDefault.bind({});
SingleMediaInputWithDefault.parameters = { controls: { exclude: ['type'] } };
SingleMediaInputWithDefault.args = {
    id: 'uniqueAsWell'
}