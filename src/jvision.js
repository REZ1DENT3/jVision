if (typeof String.prototype.trim == 'undefined') {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
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

(function () {

    var jVObject = function (selector) {

        this.treeDom = [];

        this.push = function (newDom) {
            this.treeDom.push(newDom);
        };

        this.setTreeDom = function (value) {
            this.treeDom = value;
        };

        switch (typeof selector) {
            case 'string':
                this.treeDom = document.querySelectorAll(selector);
                break;
            case 'object':
                try {
                    switch (selector.toString()) {
                        case '[object Window]':
                        case '[object HTMLDocument]':
                            this.treeDom = document.querySelectorAll('html');
                            break;
                        case '[object NodeList]':
                            this.treeDom = selector;
                            break;
                        case '[object HTMLLIElement]':
                        case '[object HTMLParagraphElement]':
                        default:
                            this.push(selector);
                    }
                }
                catch (e) {
                    this.push(selector);
                }
                break;
        }

        this.count = function () {
            return this.treeDom.length;
        };

        this.at = function (index) {
            if (typeof index != 'undefined' && this.count() > 0) {
                if (index >= 0) {
                    return this.treeDom[index];
                }
                else {
                    return this.treeDom[this.count() + index];
                }
            }
            return null;
        };

        this.eq = function (index) {
            return new jVObject(this.at(index));
        };

        this.first = function () {
            return this.eq(0);
        };

        this.last = function () {
            return this.eq(-1);
        };

        this.each = function (callback) {
            for (var i = 0; i < this.count(); ++i) {
                callback(this.at(i), i);
            }
        };

        this.call = function (callback) {
            for (var i = 0; i < this.count(); ++i) {
                callback(this.eq(i), i);
            }
        };

        this.text = function (text) {
            var type = typeof text;
            if (type != 'undefined') {
                if (type == 'function') {
                    this.each(function (node) {
                        node.innerText = text(new jVObject(node));
                    });
                }
                else {
                    this.each(function (node) {
                        node.innerText = text;
                    });
                }
                return this;
            }
            if (this.count() == 1) {
                return this.at(0).innerText;
            }
        };

        this.html = function (html) {
            var type = typeof html;
            if (type != 'undefined') {
                if (type == 'function') {
                    this.each(function (node) {
                        node.innerHTML = html(new jVObject(node));
                    });
                }
                else {
                    this.each(function (node) {
                        node.innerHTML = html;
                    });
                }
                return this;
            }
            if (this.count() == 1) {
                return this.at(0).innerHTML;
            }
            return null;
        };

        this.append = function (html) {
            return this.html(this.html() + html);
        };

        this.outerHtml = function () {
            if (this.count() == 1) {
                return this.at(0).outerHTML;
            }
            return null;
        };

        this.attr = function (type, value) {
            if (this.count() == 1) {
                if (typeof value == 'undefined') {
                    if (!this.at(0).hasAttribute(type)) {
                        return null;
                    }
                    return this.at(0).getAttribute(type);
                }
                else if (value == null) {
                    this.at(0).removeAttribute(type);
                }
                else {
                    this.at(0).setAttribute(type, value);
                }
                return this;
            }
            this.each(function (node) {
                node.setAttribute(type, value);
            });
            return null;
        };

        this.css = function (type, value) {
            if (typeof value == 'undefined' && this.count() == 1) {
                return this.at(0).style.getPropertyValue(type);
            }
            this.each(function (node) {
                node.style.setProperty(type, value);
            });
            return this;
        };

        this.width = function () {
            if (this.count() == 1) {
                return this.at(0).clientWidth;
            }
            return null;
        };

        this.height = function () {
            if (this.count() == 1) {
                return this.at(0).clientHeight;
            }
            return null;
        };

        this.toggleClass = function (className) {
            this.each(function (node) {
                node.classList.toggle(className);
            });
            return this;
        };

        this.hasClass = function (className) {
            if (this.count() == 1) {
                return this.at(0).classList.contains(className);
            }
            return null;
        };

        this.addClass = function (className) {
            this.each(function (node) {
                node.classList.add(className);
            });
            return this;
        };

        this.removeClass = function (className) {
            this.each(function (node) {
                node.classList.remove(className);
            });
            return this;
        };

        this.find = function (selector) {
            var list = [];
            this.each(function (node) {
                list.push(node.querySelectorAll(selector));
            });

            var newObject = new jVObject();
            if (list.length == 1) {
                // todo
                newObject.setTreeDom(list[0]);
            }
            else {
                // todo
                newObject.setTreeDom(list);
            }
            return newObject;
        };

        this.animate = function (event, duration, complite) {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timePassed = time - start;
                if (timePassed > duration) {
                    timePassed = duration;
                }
                event(timePassed, start, time, duration);
                if (timePassed < duration) {
                    requestAnimationFrame(animate);
                }
                else if (typeof complite == 'function') {
                    complite();
                }
            });
        };

        // todo
        this.hide = function (timer) {
            var obj = this;
            this.animate(function (timePassed, start, time, duration) {
                obj.css('opacity', 1 - Math.abs(timePassed) / Math.abs(duration));
            }, timer, function () {
                obj.css('display', 'none').css('opacity', 1);
            });
            return this;
        };

        this.show = function (timer) {
            var obj = this;
            obj.css('display', 'block');
            this.animate(function (timePassed, start, time, duration) {
                obj.css('opacity', Math.abs(timePassed) / Math.abs(duration));
            }, timer, function () {
                obj.css('opacity', 1);
            });
            return this;
        };

    };

    var jVision = window.jVision = new (function () {

        this.major = 0;
        this.minor = 0;
        this.maintenance = 5;

        this.version = function () {
            return this.major + '.' + this.minor + '.' + this.maintenance;
        };

        this.ready = function (callback) {
            window.addEventListener("DOMContentLoaded", callback);
            return this;
        };

        this.loader = function (src) {
            var script = document.createElement("script");
            script.src = src;
            script.type = "text/javascript";
            var doc = document.head || document.getElementsByTagName("head")[0];
            doc.appendChild(script);
            return this;
        };

        this.get = function (selector) {
            return new jVObject(selector);
        };

    });

})();