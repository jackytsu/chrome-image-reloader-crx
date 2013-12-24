var $el, seed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

var getRandomNum = function() {
    var num = '';
    for (var i = 0; i < 16; i++) {
        num += seed[Math.floor(Math.random() * 15)];
    }
    return num;
};

var parseUrl = function(url) {
    var prefix = '', suffix = '';
    if (url.search(/url\(([^\)]*)\)/img) > -1) {
        prefix = 'url(';
        suffix = url.replace(/url\(([^\)]*)\)/img, '$1');
    } else {
        suffix = url;
    }

    if (suffix.indexOf('ImageReloaderRandomNum=') > -1) {
        var temp = suffix.split('ImageReloaderRandomNum=');
        suffix = temp[0] + 'ImageReloaderRandomNum=' + getRandomNum() + temp[1].substring(16);
    } else if (url.indexOf('?') > -1) {
        suffix += '&ImageReloaderRandomNum=' + getRandomNum();
    } else {
        suffix += '?ImageReloaderRandomNum=' + getRandomNum();
    }

    // console.log(prefix + suffix + (prefix.length > 0 ? ')' : ''));
    return prefix + suffix + (prefix.length > 0 ? ')' : '');
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'page') {
        $('*').each(function() {
            var $t = $(this);
            if ($t.css('backgroundImage') && $t.css('backgroundImage') != 'none') {
                var url = $t.css('backgroundImage');
                if (url.indexOf('http') != 0 && url.indexOf('url(') != 0) {
                    return;
                }

                url = parseUrl($t.css('backgroundImage'));
                $t.css('backgroundImage', chrome.extension.getURL("icon128.png"));
                setTimeout(function() {
                    $t.css('backgroundImage', url);
                }, 10);
            } else if (this.tagName.toLowerCase() == 'img') {
                var url = parseUrl($t.attr('src'));
                $t.attr('src', chrome.extension.getURL("icon128.png"));
                setTimeout(function() {
                    $t.attr('src', url);
                }, 10);
            }
        });
    } else if (message.type == 'img') {
        var url = parseUrl($el.attr('src'));
        $el.attr('src', chrome.extension.getURL("icon128.png"));
        setTimeout(function() {
            $el.attr('src', url);
        }, 10);
    }

    sendResponse({
        msg: message.type + " reload done.",
    });
});

$(document).on('contextmenu', function(e) {
    $el = $(e.target);
});
