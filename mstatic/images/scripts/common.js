function AddToFavorite(FavName, FavUrl) {
    if (window.sidebar && "object" == typeof (window.sidebar) && "function" == typeof (window.sidebar.addPanel)) {
        //  firefox
        window.sidebar.addPanel(FavName, FavUrl, '');
    }
    else if (document.all && "object" == typeof (window.external)) {
        //  ie
        window.external.addFavorite(FavUrl, FavName);
    }
}
//设定Cookie值
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) +
        ((expires) ? ';expires=' + expires_date.toGMTString() : '') + //expires.toGMTString()
        ((path) ? ';path=' + path : '') +
        ((domain) ? ';domain=' + domain : '') +
        ((secure) ? ';secure' : '');
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function TabBlock(Xname, Cname, Lenght, j) { for (i = 1; i < Lenght; i++) { eval("document.getElementById('" + Xname + i + "').className=''"); } eval("document.getElementById('" + Xname + j + "').className='selected'"); for (i = 1; i < Lenght; i++) { eval("document.getElementById('" + Cname + i + "').style.display='none'"); eval("document.getElementById('" + Cname + j + "').style.display='block'"); } }

function checkNum(e) //测试是否是数字
{
    if (window.event) {
        var k = window.event.keyCode;
        if ((k < 48 || k > 57) && (k != 13)) {
            //alert("你输入的不是数字！");
            window.event.keyCode = 0;
        }
    }
}


function ShowOK(did, flag) {
    var html = "操作失败";
    if (flag) {
        html = "操作成功";
        html = "<div style=\"float:left;width:100%;border-bottom:1px dotted #83B623;padding-bottom:0px;margin-bottom:15px;line-height:20px;color:#467903;\"><span style=\"float:left;font-weight:normal;font-size:12px;padding-left:1px;\">" + html + "</span><span style=\"float:right\"><a title=\"关闭\" class=\"showok\" onclick=\"CloseDiv('" + did + "')\">关闭</a></span></div>";
    }
    else {
        html = "<div style=\"float:left;width:100%;border-bottom:1px dotted #EC831D;padding-bottom:0px;margin-bottom:15px;line-height:20px;color:#D44904;\"><span style=\"float:left;font-weight:normal;font-size:12px;padding-left:1px;\">" + html + "</span><span style=\"float:right\"><a title=\"关闭\" class=\"showok\" onclick=\"CloseDiv('" + did + "')\">关闭</a></span></div>";
    }
    return html;
}
function CloseDiv(div) {
    jQuery(div).hide();
}
//显示正确信息
function ShowRightResult(msg) {
    try {
        var htmls = ShowOK("#top_rightmsg", true);
        htmls += msg.replace("succs", "");
        jQuery("#top_rightmsg").html(htmls);
        jQuery("#top_rightmsg").show();
        ShowPosition("top_rightmsg");
        setTimeout(function () {
            jQuery("#top_rightmsg").hide();
        }, 3000);
    }
    catch (e) { }
}

//显示错误信息
function ShowErrorResult(msg) {
    var htmls = ShowOK("#top_errormsg", false);
    htmls += msg;
    jQuery("#top_errormsg").html(htmls);
    jQuery("#top_errormsg").show();
    ShowPosition("top_errormsg");
    setTimeout(function () {
        jQuery("#top_errormsg").hide();
    }, 5000);
}
function ShowPosition(div) {
    var scrolltop = document.documentElement.scrollTop;
    if (scrolltop == 0) {
        scrolltop = document.body.scrollTop;
    }
    var ofHeight = document.documentElement.offsetHeight;
    if (ofHeight > window.screen.availHeight) ofHeight = window.screen.availHeight;
    var scrollTop = scrolltop;
    if (scrollTop == 0) {
        try {
            scrollTop = parent.document.documentElement.scrollTop;
        } catch (e) { }
    }
    var top = (ofHeight) / 2 - document.getElementById(div).offsetHeight / 2 + scrollTop - 10;
    //    var left = document.documentElement.offsetWidth / 2 - document.getElementById(div).offsetWidth;
    var left = document.documentElement.offsetWidth / 2 - document.getElementById(div).offsetWidth / 2;
    document.getElementById(div).style.top = top + "px";
    document.getElementById(div).style.left = left + "px";
}

//文字闪动
function Shake(ele, cls, times) {
    var i = 0, t = false, o = ele.attr("class") + " ", c = "", times = times || 2;
    if (t) return;
    t = setInterval(function () {
        i++;
        c = i % 2 ? o + cls : o;
        ele.attr("class", c);
        if (i == 2 * times) {
            clearInterval(t);
            ele.removeClass(cls);
        }
    }, 200);
};

//验证手机号码
function IsMobile(mobile) {
    var tel = mobile;
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (reg.test(mobile)) {
        return true;
    } else {
        return false;
    }
}

//验证邮箱地址
function IsEmail(email){   
    var reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/
    if(reg.test(email)){
        return true;   
    }else{ 
        return false;
    }
}
//身份证
function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
        return false;
    } else {
        return true;
    }
}

//验证qq
function isQQ(QQ) {
    var reg = /^[1-9]{1}[0-9]{4,8}$/;
    if (reg.test(QQ)) { return true; }
    return false;
}

//
function isNumber(number) {
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.test(number))
        return false
    return true
}

//获取 邮箱登录url
function GetEmailHttp(email) {
    var emailType = email.substring(email.indexOf('@') + 1), emailUrl = '', html = '';
    emailType = emailType.toLowerCase();
    switch (emailType) {
        case 'qq.com':
        case 'vip.qq.com':
        case 'foxmail.com':
            emailUrl = 'http://mail.qq.com/';
            break;
        case '163.com':
        case '126.com':
        case 'yeah.net':
        case 'vip.163.com':
        case '188.com':
            emailUrl = 'http://email.163.com/';
            break;
        case 'tom.com':
            emailUrl = 'http://mail.tom.com/';
            break;
        case 'sina.com':
        case 'vip.sina.com':
        case 'sina.com.cn':
            emailUrl = 'http://mail.sina.com.cn/';
            break;
        case 'sohu.com':
        case 'souhu.com':
        case 'vip.sohu.com':
            emailUrl = 'http://mail.sohu.com/';
            break;
        case '139.com':
        case '136.com':
            emailUrl = 'http://mail.10086.cn/';
            break;
        case 'gmail.com':
            emailUrl = 'http://mail.google.com/';
            break;
        case 'hotmail.com':
        case 'msn.com':
        case 'live.cn':
        case 'live.com':
        case 'msn.cn':
        case 'hotmail.com.cn':
            emailUrl = 'https://login.live.com/';
            break;
        case 'yahoo.com.cn':
        case 'yahoo.cn':
        case 'yahoo.com':
            emailUrl = 'http://mail.cn.yahoo.com/';
            break;
        case '21cn.com':
        case '21cn.net':
            emailUrl = 'http://mail.21cn.com/';
            break;
        case 'sogou.com':
            emailUrl = 'http://mail.sogou.com/';
            break;
        case '189.cn':
            emailUrl = 'http://www.189.cn/';
            break;
        case 'eyou.com':
            emailUrl = 'http://www.eyou.com/';
            break;
        default:
            emailUrl = 'http://www.' + emailType + '/';
    }
    return emailUrl;
}

var Backtop = function () {
    h = $(window).height();
    t = $(document).scrollTop();
    if (t > h) {
        $('#BackToTop').show();
    } else {
        $('#BackToTop').hide();
    }
}

$(window).scroll(function (e) {
    Backtop();
})
$(document).ready(function () {
    $('#BackToTop').click(function () {
        $(document).scrollTop(0);
    })
    
});

function InitBlockUI() {
    $.blockUI.defaults = {
        growlCSS: {
            width: '350px',
            top: '45%',
            left: '40%',
            border: '1px solid #d6e9c6',
            padding: '5px',
            opacity: 1,
            cursor: 'default',
            color: ' #356635',
            backgroundColor: '#dff0d8',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            'border-radius': '10px'
        }
    };
}

function ShowSuccessMsg(message) {
    InitBlockUI();
    $.growlUI('', '', message);
}