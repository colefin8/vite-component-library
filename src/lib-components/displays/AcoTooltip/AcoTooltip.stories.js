import AcoTooltip from './AcoTooltip.vue';
import { _optionsPlacement } from '../../../propTypes';

export default {
    title: 'displays/AcoTooltip',
    component: AcoTooltip,
    argTypes: {
        default: { 
            description: 'The tooltip target should NOT have any padding or margin on the parent container or the tooltip positioning will not work correctly.',
            control: { type: 'text' }
        },
        placement: {
            options: Object.values(_optionsPlacement),
            control: { type: 'inline-radio' },
        }
    }
};

const TooltipTemplateUpdated = (args, { argTypes }) => ({
    components: { AcoTooltip },
    props: Object.keys(argTypes),
    template: `
        <div style="padding: 96px 256px;">
            <aco-tooltip v-bind="$props">
                <a class="aco-text">Hover Over Me</a>
            </aco-tooltip>
        </div>`,
});

export const TooltipDefault = TooltipTemplateUpdated.bind({});
TooltipDefault.args = {
    content: 'This is a tooltip. It allows you to show additional information'
};

const TooltipTemplateWithHTML = (args, { argTypes }) => ({
    components: { AcoTooltip },
    props: Object.keys(argTypes),
    template: `
        <div style="padding: 96px 256px;">
            <aco-tooltip v-bind="$props">
                <span class="aco-text">Hover Over Me</span>
                <template #content>
                    <p>This is a tooltip. It allows you to show additional information</p>
                    <p>It includes <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text in two paragraphs</p>
                </template>
            </aco-tooltip>
        </div>`,
});

export const TooltipWithHTML = TooltipTemplateWithHTML.bind({});
TooltipWithHTML.args = {};

export const TooltipEmpty = TooltipTemplateUpdated.bind({});
TooltipEmpty.args = {
    content: ''
};

export const TooltipTop = TooltipTemplateUpdated.bind({});
TooltipTop.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.TOP,
};

export const TooltipTopStart = TooltipTemplateUpdated.bind({});
TooltipTopStart.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.TOP_START,
};

export const TooltipTopEnd = TooltipTemplateUpdated.bind({});
TooltipTopEnd.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.TOP_END,
};

export const TooltipRight = TooltipTemplateUpdated.bind({});
TooltipRight.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.RIGHT,
};

export const TooltipBottom = TooltipTemplateUpdated.bind({});
TooltipBottom.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.BOTTOM,
};

export const TooltipBottomStart = TooltipTemplateUpdated.bind({});
TooltipBottomStart.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.BOTTOM_START,
};

export const TooltipBottomEnd = TooltipTemplateUpdated.bind({});
TooltipBottomEnd.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.BOTTOM_END,
};

export const TooltipLeft = TooltipTemplateUpdated.bind({});
TooltipLeft.args = {
    ...TooltipDefault.args,
    placement: _optionsPlacement.LEFT,
};

const TooltipTemplate = (args, { argTypes }) => ({
    components: { AcoTooltip },
    props: Object.keys(argTypes),
    template: `
        <div style="padding: 96px 256px;">
            <aco-tooltip v-bind="$props">
                <template #hover><a class="aco-text" style="cursor: pointer">Hover Over Me</a></template>
                <template #content>This is a tooltip. It allows you to show additional information</template>
            </aco-tooltip>
        </div>`,
});

export const TooltipDeprecated = TooltipTemplate.bind({});
TooltipDeprecated.args = {
    id: 'tooltip1',
};

const TooltipTemplateInScroll = (args, { argTypes }) => ({
    components: { AcoTooltip },
    props: Object.keys(argTypes),
    template: `
        <div style="height: 50px; padding: 20px; overflow: auto; position: relative; outline: 1px solid;">
            <p class="aco-text">Fixed Position allows the tooltip to appear correctly in a scrollable, absolutely or relatively positioned element</p>
            <aco-tooltip v-bind="$props">
                <a class="aco-text">Hover Over Me</a>
            </aco-tooltip>
            <p class="aco-text">The tooltip will follow the element that is hovered over.</p>
        </div>`,
});

export const TooltipInScroll = TooltipTemplateInScroll.bind({});
TooltipInScroll.args = {
    content: 'This is a tooltip. It allows you to show additional information',
    fixedPosition: true,
};

const TooltipTemplateSetWidth = (args, { argTypes }) => ({
    components: { AcoTooltip },
    props: Object.keys(argTypes),
    template: `
        <div style="padding: 96px 256px;">
            <p class="aco-text">An element that is small with positioning shows a narrow tooltip.  Setting the width overcomes this.</p>
            <aco-tooltip v-bind="$props" style="width: 25px; position: relative;">
                <a class="aco-text">Me</a>
            </aco-tooltip>
        </div>`,
});

export const TooltipSetWidth = TooltipTemplateSetWidth.bind({});
TooltipSetWidth.args = {
    content: 'This is a tooltip. It allows you to show additional information',
    width: 200,
};
