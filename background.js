chrome.contextMenus.create({
    "title": '重新加载所有图片',
    "contexts": ['all'],
    "onclick": function(info, tab) {
        chrome.tabs.sendMessage(tab.id, {
            type: "page"
        }, function(response) {
            console.log(response.msg);
        });
    }
});
chrome.contextMenus.create({
    "title": '重新加载当前图片',
    "contexts": ['image'],
    "onclick": function(info, tab) {
        chrome.tabs.sendMessage(tab.id, {
            type: "img"
        }, function(response) {
            console.log(response.msg);
        });
    }
});
