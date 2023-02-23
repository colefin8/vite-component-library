export default {
    components: {
        AcoLabel: () => import('../lib-components/displays/AcoLabel/AcoLabel.vue').then(d => d.default),
    },
    props: {
        /** The id for the input tag, auto-generated if not given. */
        id: {
            type: [String, Number],
            required: false,
            default: undefined,
        },
        /** A label message above the text input.
         *  Will attempt to be translated automatically. */
        label: {
            type: String,
            required: false,
            default: undefined,
        },
        /** Visually determines if the input requires input from the user.
         *  Adds a red '*' by the input to signify to the user that the field is required. */
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        /** Further extends the 'required' prop for adding a descriptive message.
         *  This will display next the the red '*' to add additional context for the user.
         *  Will attempt to be translated automatically. */
        requiredText: {
            type: String,
            required: false,
            default: 'Required',
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * The icon to the left of the label.  Non-interactive
         */
        labelPrefixIcon: {
            type: String,
            default: undefined,
            required: false,
        },
        /**
         * Text in parenthesis that appears to the right of the label
         */
        labelContext: {
            type: String,
            default: '',
            required: false,
        },
        /**
         * Text for a tooltip after the label text.  If set will show an information icon by default
         */
        labelTooltipText: {
            type: String,
            default: '',
            required: false,
        },
        /**
         * Icon to be used for the above tooltip
         */
        labelTooltipIcon: {
            type: String,
            default: undefined,
            required: false,
        },
    },
    computed: {
        inputId() {
            return this.id || `aco-input-${this._uid}`;
        },
    },
}