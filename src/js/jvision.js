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