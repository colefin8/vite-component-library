/** 
 * Refer to aco-design-system Storybook for documentation on how to use this directive
 * /docs/directives-overflowtooltip--default#overflow-tooltip-directive
 */

const conditionallyAddTooltip = (el, binding) => {
    let targetElement = null;
    if (binding.value?.targetElementId) {
        targetElement = document.getElementById(binding.value.targetElementId);
    } else {
        targetElement = el;
    }

    let overflowBefore = targetElement.style.overflow;

    targetElement.style.overflow = 'hidden';

    if (targetElement.clientWidth < targetElement.scrollWidth) {
        let tooltipText = null;

        if (binding.value.tooltipText) {
            tooltipText = binding.value.tooltipText;
        } else {
            tooltipText = binding.value;
        }

        el.setAttribute('title', tooltipText);
    } else {
        el.removeAttribute('title');
    }

    targetElement.style.overflow = overflowBefore;
}

export default {
    inserted(el, binding) {
        conditionallyAddTooltip(el, binding);
    },
    componentUpdated(el, binding) {
        // holds function from running before components are done loading
        setTimeout(() => {
            conditionallyAddTooltip(el, binding);
        }, 1);
    },
};