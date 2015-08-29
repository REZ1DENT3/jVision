if (typeof String.prototype.trim == 'undefined') {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

if (typeof String.prototype.toDom == 'undefined') {
    String.prototype.toDom = function () {
        parser = new DOMParser();
        doc = parser.parseFromString(this, "text/html");
        if (typeof doc.body.firstChild != 'undefined') {
            return doc.body.firstChild;
        }
        return undefined;
    };
}