if (typeof Array.prototype.shuffle == 'undefined') {
    Array.prototype.shuffle = function () {
        var get = function (index) {
            return Math.floor(Math.random() * index);
        };
        for (var i = this.length, j, x; i;) {
            j = get(i--);
            this[j] = [this[i], this[i] = this[j]][0];
        }
        return this;
    };
}
