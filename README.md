# jVision
JS Framework 

```javascript
function generateColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

jVision.ready(function () {

    jHTML = jVision.get(document);
    console.log([jHTML.width(), jHTML.height()]);

    jBody = jHTML.find('body');
    jBody.html('<h1>Hello jVision!</h1>');

    jH1 = jBody.find('h1');
    jH1.css('color', generateColor());

    for (i = 2; i < 7; ++i) {
        jTemp = jBody.append('<h' + i + '></h' + i + '>');
        jTemp.find('h' + i)
                .css('font-size', 30 / i)
                .text(jVision.version())
                .css('color', generateColor())
    }

    jBody.append('<ul></ul>');
    jUl = jBody.find('ul');
    for (i = 1; i <= 10; ++i) {
        jUl.append('<li>' + i + '</li>');
        jUl.find('li').last().css('color', generateColor());
    }

});
```

