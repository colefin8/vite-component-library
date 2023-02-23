import overflowTooltip from "./overflowTooltip";
import overflowTooltipDoc from './overflowTooltipDoc.mdx';

export default {
    title: 'Directives/OverflowTooltip',
    parameters: {
        docs: {
            page: overflowTooltipDoc,
        }
    }
}

const TemplateOptions = {
    props: ['text'],
    directives: { overflowTooltip },
    data() {
        return {
            style: {
                width: '256px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                border: 'solid 1px #E5E7EB',
                borderRadius: '4px',
                padding: '4px',
            }
        }
    }
};

export const Default = () => ({
    ...TemplateOptions,
    template: `
        <div class="aco-text">
            <p v-overflow-tooltip="text" :style="style">{{ text }}</p>
        </div>`,
});
Default.args = {
    text: 'Some text that will cause overflow to occur.',
}

export const CustomTarget = () => ({
    ...TemplateOptions,
    template: `
        <div class="aco-text" v-overflow-tooltip="{ tooltipText: text, targetElementId: 'overflow-target' }">
            <p id="overflow-target" :style="style">{{ text }}</p>
        </div>`,
});
CustomTarget.args = {
    text: Default.args.text,
}