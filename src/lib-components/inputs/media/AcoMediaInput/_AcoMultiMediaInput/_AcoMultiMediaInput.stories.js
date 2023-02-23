import AcoMediaInput from '../AcoMediaInput.vue';
import AcoButton from '../../../AcoButton/AcoButton.vue';
import { _optionsStatus } from '../../../../../propTypes';

export default {
    title: 'inputs/media/AcoMediaInput/_AcoMultiMediaInput/_AcoMultiMediaInput',
    component: AcoMediaInput,
    argTypes: {
        status: {
            options: Object.values(_optionsStatus),
            control: { type: 'radio' },
        },
        mediaList: {
            defaultValue: [],
        }
    }
};

const MultiMediaInputTemplate = (args, { argTypes }) => ({
    components: { AcoMediaInput, AcoButton },
    props: Object.keys(argTypes),
    data() {
        return {
            message: '',
            modelList: [],
            src: '',
            alt: '',
        }
    },
    template:   `<div>
                    <aco-media-input
                        v-bind="$props"
                        v-model="modelList"
                        type="multi"
                    />
                    <div class="storybook-wrapper-grid">
                        <div style="margin-top: 48px;">
                            <div>
                                <label class="aco-p-medium">src: </label>
                                <input v-model="src" type="text"/>
                            </div>
                            <div>
                                <label class="aco-p-medium">alt: </label>
                                <input v-model="alt" type="text"/>
                            </div>
                            <aco-button style="margin-top: 16px;" size="small" @click="addMedia">Add Media Object</aco-button>
                        </div>
                        <div>
                            <p v-if="modelList.length" class="aco-p-medium">v-modeled list:</p>
                            <ul>
                                <li
                                    v-for="(img, idx) in modelList"
                                    :key="img + idx"
                                    class="aco-p-medium"
                                >
                                    {
                                        src: {{ img.src.length > 50 ? 'C:/local/fakepath' + idx : img.src }},
                                        alt: {{ img.alt }},
                                        <template v-if="img.file">file: [[File Object]]</template>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p>{{ message }}</p>
                </div>`,
    methods: {
        setThenClearMessage(msg) {
            this.message = msg;
            setTimeout(() => {
                this.message = '';
            }, 5000);
        },
        addMedia() {
            this.modelList.push({src: this.src, alt: this.alt});
            this.src = '';
            this.alt = '';
        }
    }
});

export const MultiMediaInput = MultiMediaInputTemplate.bind({});
MultiMediaInput.parameters = { controls: { exclude: ['mediaList', 'type'] } }
MultiMediaInput.args = {
    id: 'unique',
};