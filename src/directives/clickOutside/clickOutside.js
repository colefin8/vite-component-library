export default {
    bind: function(el, binding, vnode) {
        var vm = vnode.context;
        var callback = binding.value;
        el.clickOutsideEvent = function(event) {
            if (!(el == event.target || el.contains(event.target))) {
                return callback.call(vm, event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};