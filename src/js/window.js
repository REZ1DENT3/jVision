window.$ = function (selector) {
    switch (typeof selector) {
        case 'function':
            return jVision.ready(selector);
        default:
            return jVision.get(selector);
    }
};