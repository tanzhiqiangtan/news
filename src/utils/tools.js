function tplReplace() {
    return /{{(.*?)}}/g
}
function picShow(dom) {
    console.log(this, 1)
    dom.on('load', function () {
        $(this).css('opacity', '1')
    })
}
function scrollToButtom(callback) {
    let re=Math.ceil(_getScrollTop() + _getWindowHeight())
    if (re >= _getScrollHeight()) {
        console.log('前',re)
        console.log('后',re)
        callback()
    }
}
//获取url参数对象
function queryURLParams(url) {
    let obj = {};
    url.replace(/([^?=&#]+)=([^?=&#]+)/g, ($0, $1, $2) => {
        obj[$1] = $2
    });

    url.replace(/^#([^?=&#]+)/g, ($0, $1) => {
        obj['hash'] = $1
    });
    return obj
}

export default {
    tplReplace,
    picShow,
    scrollToButtom,
    queryURLParams
}

/****************************** 内部方法 *********************************/

function _getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

function _getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}