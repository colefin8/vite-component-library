/**
 * all boolean props should be the same as their HTML equivalent if possible.  If not, they should start with an indicating verb
 * such as 'isReadOnly' or 'showDropdown'
 */

export default [
    'disabled', //same as HTML 'disabled' attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
    'isInteractive', //similar to readonly (but without data specifically being read) Boolean value for if user can interact with the component
    'isMobile', // used for displaying a mobile-friendly version of a component
    'options', // used for displaying a list of selectable options 
    'placeholder', // same as HTML 'placeholder' attribute for input elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder
    'placement', //used for tooltip placement, potential to use for other fixed elements
    'readonly', // same as HTML 'readonly' attribute for input elements
    'selectedValue', //use to indicate which value out of a list of options is selected (often is v-modeled)
    'showXIcon', // whether to show an X icon that would close/remove the component
    'size', //used for any prop indicating different sizes of a component.  see prop types for available values
    'status', //used for status prop type, indicating the status of an input or alert such as warning, positive, neutral, etc.
    'useColors', //whether to use the primary/secondary colors in the component, vs some other base color version
]
