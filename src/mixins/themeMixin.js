import { _optionsTheme } from '../propTypes';

//! If this mixin is changed to have anything other than just "props" it may break on some components!
export default {
    props: {
        /** Determines whether or not the component should use branding colors */
        theme: {
            type: String,
            required: false,
            default: _optionsTheme.DEFAULT_THEME,
            validator(value) {
                return Object.values(_optionsTheme).includes(value);
            }
        }
    },
    computed: {
        acoTheme() {
            return _optionsTheme.ACO_THEME;
        },
    }
}