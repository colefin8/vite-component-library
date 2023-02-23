import AcoFancyTree from './AcoFancyTree.vue';
import AcoIcon from '../icons/AcoIcon/AcoIcon.vue';
import { _optionsTheme } from '../../../propTypes';

export default {
    title: 'displays/AcoFancyTree',
    component: AcoFancyTree,
    argTypes: {
        theme: {
            options: Object.values(_optionsTheme),
            control: { type: 'inline-radio' },
        },
    }
};

const FancyTreeExample = (args, { argTypes }) => ({
    components: { AcoFancyTree, AcoIcon },
    props: Object.keys(argTypes),
    template:  `<div style="width: 500px">
                    <input type="text" v-model="filter" placeholder="Filter" style="width: 100%">
                    <aco-fancy-tree v-bind="$props" @selected="setSelectedNode"/>
                    <div style="padding-top: 12px">Selected Node: {{ selectedNode.title }}</div>
                </div>`,
    data() {
        return {
            selectedNode: {title: 'None'},
            filter: ''
        }
    },
    methods: {
        setSelectedNode(e) {
            this.selectedNode = e;
        }
    }
});

export const FancyTree = FancyTreeExample.bind({});
FancyTree.args = {
    root: [
        {
            title: 'Item 1',
            key: '1',
            children: [
                {
                    title: 'Item 1.1',
                    key: '1.1',
                    children: []
                },
                {
                    title: 'Item 1.2',
                    key: '1.2',
                    children: []
                },
                {
                    title: 'Item 1.3',
                    key: '1.3',
                    children: []
                }
            ]
        },
        {
            title: 'Item 2',
            key: '2',
            children: []
        },
        {
            title: 'Item 3',
            key: '3',
            children: [
                {
                    title: 'Item 3.1',
                    key: '3.1',
                    children: [
                        {
                            title: 'Item 3.1.1',
                            key: '3.1.1',
                            children: []
                        }
                    ]
                },
                {
                    title: 'Item 3.2',
                    key: '3.2',
                    children: []
                },
                {
                    title: 'Item 3.3',
                    key: '3.3',
                    children: [
                        {
                            title: 'Item 3.3.1',
                            key: '3.3.1',
                            children: [
                                {
                                    title: 'Item 3.3.1.1',
                                    key: '3.3.1.1',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
FancyTree.parameters = {
    controls: { exclude: ['selected'] }
};