var $el, seed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

var getRandomNum = function() {
    var num = '';
    for (var i = 0; i < 16; i++) {
        num += seed[Math.floor(Math.random() * 15)];
    }
    return num;
};

var parseUrl = function(url) {
    if (url.indexOf('ImageReloaderRandomNum=') > -1) {
        var temp = url.split('ImageReloaderRandomNum=');
        url = temp[0] + 'ImageReloaderRandomNum=' + getRandomNum() + temp[1].substring(16);
    } else if (url.indexOf('?') > -1) {
        url += '&ImageReloaderRandomNum=' + getRandomNum();
    } else {
        url += '?ImageReloaderRandomNum=' + getRandomNum();
    }

    console.log(url);
    return url;
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'page') {
        $('img').each(function() {
            var $t = $(this), url = parseUrl($t.attr('src'));
            $t.attr('src', chrome.extension.getURL("icon128.png"));
            setTimeout(function() {
                $t.attr('src', url);
            }, 500);
        });
    } else if (message.type == 'img') {
        var url = parseUrl($el.attr('src'));
        $el.attr('src', chrome.extension.getURL("icon128.png"));
        setTimeout(function() {
            $el.attr('src', url);
        }, 500);
    }

    sendResponse({
        msg: message.type + " reload done.",
    });
});

$(document).on('contextmenu', function(e) {
    $el = $(e.target);
});
