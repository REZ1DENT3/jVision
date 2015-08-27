if (typeof String.prototype.trim == 'undefined') {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

if (typeof String.prototype.htmlToDom == 'undefined') {
    String.prototype.htmlToDom = function () {
        parser = new DOMParser();
        doc = parser.parseFromString(this, "text/html");
        if (typeof doc.body.firstChild != 'undefined') {
            return doc.body.firstChild;
        }
        return undefined;
    };
}

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();

}

if (typeof jVision == 'undefined') {

    var jVision = window.jVision = new (function () {

        this._version = ['###vision-js-maker~#~#major#~#~', '###vision-js-maker~#~#minor#~#~', '###vision-js-maker~#~#maintenance#~#~', '###vision-js-maker~#~#build#~#~'];

        this.major = function () {
            return this._version[0];
        };

        this.minor = function () {
            return this._version[1];
        };

        this.maintenance = function () {
            return this._version[2];
        };

        this.build = function () {
            return this._version[3];
        };

        this.version = function () {
            return this._version.join('.');
        };

        this.call = function (type, callback) {
            window.addEventListener(type, callback);
            return this;
        };

        this.ready = function (callback) {
            return this.call("DOMContentLoaded", callback);
        };

        this.get = function (selector) {
            return new jVObject(selector);
        };

    });

}