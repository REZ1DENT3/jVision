# jVision
JS Framework 

http://rez1dent3.github.io/jVision

```javascript
function generateColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.$ = function (selector) {
    switch (typeof selector) {
        case 'function':
            return jVision.ready(selector);
        default:
            return jVision.get(selector);
    }
};

$(function () {

    console.info('jVision ' + jVision.version());

    var jHTML = $(document);

    var jBody = jHTML.find('body');
    jBody.html('<h1 id="hello-world">Hello jVision!</h1>');

    var jH1 = jBody.find('h1').addClass('hello');

    for (i = 2; i < 7; ++i) {
        jBody
            .append('<h' + i + '></h' + i + '>')
            .find('h' + i)
            .css('font-size', (50 / i) + 'px')
            .css('color', generateColor())
            .text(jVision.version());
    }

    jBody.append('<ul></ul>');

    var jUl = jBody.find('ul');

    var jLi = null;
    for (i = 1; i <= 10; ++i) {
        jUl.append('<li>' + i + '</li>');
        if (i == 1) {
            jLi = jUl.find('li');
        }
        else {
            jLi = jLi.next();
        }
        jLi.css('color', generateColor());
    }

    jH1.attr('id', '');

});
```

