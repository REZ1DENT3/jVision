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

var jVObject = function (selector) {

    this.treeDom = [];

    this.pointerTreeDom = undefined;

    this.push = function (newDom) {
        this.reset();
        this.treeDom.push(newDom);
    };

    this.setTreeDom = function (value) {
        this.reset();
        this.treeDom = value;
    };

    this.reset = function () {
        this.pointerTreeDom = 0;
    };

    switch (typeof selector) {
        case 'string':
            dom = document.querySelectorAll(selector);
            this.setTreeDom(dom);
            break;
        case 'object':
            try {
                switch (selector.toString()) {
                    case '[object Window]':
                    case '[object HTMLDocument]':
                        dom = document.querySelectorAll('html');
                        this.setTreeDom(dom);
                        break;
                    case '[object NodeList]':
                        this.setTreeDom(selector);
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

    this.currentNode = function () {
        return this.get(this.pointerTreeDom);
    };

    this.cloneCurrentNode = function () {
        return this.currentNode().cloneNode(true);
    };

    this.get = function (index) {
        if (this.count() > 0) {
            if (typeof index != 'undefined') {
                if (index >= 0) {
                    return this.treeDom[index];
                }
                else {
                    return this.treeDom[this.count() + index];
                }
            }
            return undefined;
        }
        return null;
    };

    this.eq = function (index) {
        return new jVObject(this.get(index));
    };

    this.first = function () {
        return this.eq(0);
    };

    this.last = function () {
        return this.eq(-1);
    };

    this.each = function (callback) {
        for (var i = 0; i < this.count(); ++i) {
            callback(this.get(i), i, this.treeDom);
        }
    };

    this.call = function (callback) {
        for (var i = 0; i < this.count(); ++i) {
            callback(this.eq(i), i, this.treeDom);
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
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.innerText;
        }
        return undefined;
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
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.innerHTML;
        }
        return undefined;
    };

    this.parent = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            dom = currentNode.parentNode;
            if (dom != null) {
                return new jVObject(dom);
            }
        }
        return undefined;
    };

    this.prev = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            dom = currentNode.previousElementSibling;
            if (dom != null) {
                return new jVObject(dom);
            }
        }
        return undefined;
    };

    this.next = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            dom = currentNode.nextElementSibling;
            if (dom != null) {
                return new jVObject(dom);
            }
        }
        return undefined;
    };

    this.remove = function () {
        this.each(function (node) {
            node.parentNode.removeChild(node);
        });
        return undefined;
    };

    this.append = function (html) {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            currentNode = currentNode.appendChild(html.toDom());
            return this;
        }
        return undefined;
    };

    this.outerHtml = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.outerHTML;
        }
        return undefined;
    };

    this.attr = function (type, value) {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            if (typeof value == 'undefined') {
                if (!currentNode.hasAttribute(type)) {
                    return null;
                }
                return currentNode.getAttribute(type);
            }
            else if (value == '') {
                currentNode.removeAttribute(type);
            }
            else {
                currentNode.setAttribute(type, value);
            }
            return this;
        }
        this.each(function (node) {
            node.setAttribute(type, value);
        });
        return undefined;
    };

    this.css = function (type, value) {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined' && typeof value == 'undefined') {
            return currentNode.style.getPropertyValue(type);
        }
        this.each(function (node) {
            node.style.setProperty(type, value);
        });
        return this;
    };

    this.width = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.clientWidth;
        }
        return undefined;
    };

    this.height = function () {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.clientHeight;
        }
        return undefined;
    };

    this.toggleClass = function (className) {
        this.each(function (node) {
            node.classList.toggle(className);
        });
        return this;
    };

    this.hasClass = function (className) {
        var currentNode = this.currentNode();
        if (typeof currentNode != 'undefined') {
            return currentNode.classList.contains(className);
        }
        return undefined;
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
        if (list.length == 1) {
            return new jVObject(list[0]);
        }
        return new jVObject(list);
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