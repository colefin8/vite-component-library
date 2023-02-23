import AcoRichText from './AcoRichText.vue';
import AcoButton from '../AcoButton/AcoButton.vue';

export default {
    title: 'inputs/AcoRichText',
    component: AcoRichText,
    argTypes: {}
};

const TemplateExample = (args, { argTypes }) => ({
    components: { AcoButton, AcoRichText },
    props: Object.keys(argTypes),
    data() {
        return {
            text: null,
            updated: null,
        };
    },
    template: `<div>
        <aco-rich-text v-bind="$props" @change="onChange" v-model="text"></aco-rich-text>
        <div>
            <div>Output: {{ updated }}</div>
            <pre style="margin:1em;padding:1em;background:lightyellow;white-space:normal;">{{ text }}</pre>
        </div>
        <aco-button @click="update" size="small">Insert Date, Time</aco-button>
    </div>`,
    methods: {
        onChange() {
            this.updated = '"Updated"';
            setTimeout(() => this.updated=null, 500);
        },
        update() {
            this.text = new Date().toLocaleString();
        },
    }
});

export const DefaultButtons = TemplateExample.bind({});
DefaultButtons.args = {
    
};

export const MoreButtons = TemplateExample.bind({});
MoreButtons.args = {
    default: `<p>Hello World</p>`,
    toolbarButtons: {
        moreText: {
            buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
            align: 'left',
            buttonsVisible: 3,
        },
        moreParagraph: {
            buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
            align: 'left',
            buttonsVisible: 3
        },
        moreRich: {
            buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
            align: 'left',
            buttonsVisible: 3
        },
        moreMisc: {
            buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
            align: 'right',
            buttonsVisible: 2
        }
    },
    quickInsertButtons: ['image', 'video', 'table', 'ol', 'ul', 'hr'],
    pastePlain: true,
};

export const CustomIcons = TemplateExample.bind({});
CustomIcons.args = {
    default: `<p>Hello World</p>`,
    toolbarButtons: [
        ['bold', 'italic', 'underline', 'clearFormatting'],
        ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
        ['formatOL', 'formatUL', 'outdent', 'indent'],
        ['insertLink'],
        ['undo', 'redo', 'selectAll'],
        ['variables']
    ],
    customIcons: {
        iconName: 'variables',
        defineIcon: { PHICON: 'tag', template: 'phicon'},
        registerCommand: {
            title: 'Variables',
                type: 'dropdown',
                focus: true,
                undo: true,
                refreshAfterCallback: true,
                options: ['1','2','3','4'],
                callback: function (cmd, val) {
                    this.html.insert(val);
                }
            }
        }
}