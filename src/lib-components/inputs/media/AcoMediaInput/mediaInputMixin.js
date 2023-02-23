import { _optionsStatus } from '../../../../propTypes';

export default {
    props: {
        /**
         * Should be an array of objects with the following form:
         *  {
         *      src: 'someStringProbablyACloudinaryLink',
         *      alt: 'some descriptive alt text',
         *      fileType: 'video'     // optional parameter, will default to 'img'. Include this if you want a video to be rendered initially.
         *  }
         * As media is selected, a `file` attribute will also be present, so that it can be handled
         * accordingly, whether uploaded or otherwise.
         */
        mediaList: {
            type: Array,
            required: true,
        },
        /**
         * Needs to be unique across the page. Present for usage in forms.1
         */
        id: {
            type: String,
            required: false,
            default: ''
        },
        /**
         * Should be a csv string of media types. Useful if only certain media types are allowed.
         * Example: 'image/png, image/jpeg, image/svg+xml, image/jpg'
         */
        accept: {
            type: String,
            required: false,
            default: 'image/*, video/*'
        },
        /**
         * How the media should be displayed within its container; "object-fit" property
         */
        mediaFit: {
            type: String,
            default: 'cover',
            validator: val => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(val)
        },
        /**
         * What kind of form alert should be shown with the status message.
         */
        status: {
            type: String,
            default: '',
            validator: val => val === '' || Object.values(_optionsStatus).includes(val)
        },
        /**
         * A non-empty status message will show the form alert with whatever status is passed in above.
         */
        statusMessage: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isDragging: false,
        }
    },
    computed: {
        inputStatusClass() {
            if (this.status === 'neutral') {
                return '';
            }
            let modifier = this.mediaList.length > 0 ? '-solid' : '';
            return this.status ? `media-input--${this.status}${modifier}` : '';
        }
    },
}