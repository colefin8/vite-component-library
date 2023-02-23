import AcoFlexibleSticky from './AcoFlexibleSticky.vue';

export default {
    title: 'displays/AcoFlexibleSticky',
    component: 'AcoFlexibleSticky',
    argTypes: {},
};

const FlexibleStickyTemplate = (args, { argTypes }) => ({
    components: {
        AcoFlexibleSticky
    },
    props: Object.keys(argTypes),
    template:
        '<div style="display: flex; gap: 16px;"> \
            <aco-flexible-sticky v-bind="$props"> \
                <div style="width: 256px; height: 650px; background: #eeeeee; display: flex; align-items: center;"> \
                    <div style="margin: auto; padding: 0 16px;"> \
                        <p>This block will stick to the screen, and is easily visible even when it becomes taller than the window height.</p> \
                    </div> \
                </div> \
            </aco-flexible-sticky> \
            <div style="flex-grow: 1;"> \
                <div v-for="i in numRows" :key="i" style="background: #eeeeee; padding: 16px; margin-bottom: 16px;"> \
                    <p>block</p> \
                </div> \
            </div> \
        </div>',
    data() {
        return {
            numRows: 16,
        };
    },
});

export const FlexibleSticky = FlexibleStickyTemplate.bind({});
FlexibleSticky.args = {
    verticalOffset: 16,
};