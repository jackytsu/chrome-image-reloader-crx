var $el;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'page') {
        $('img').each(function() {
            var $t = $(this), url = $t.attr('src');
            $t.attr('src', 'about:blank');
            setTimeout(function() {
                $t.attr('src', url);
            }, 10);
        });
    } else if (message.type == 'img') {
        var url = $el.attr('src');
        $el.attr('src', 'about:blank');
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
