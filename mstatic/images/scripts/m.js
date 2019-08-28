var tabIndex; //底部Tab

$(function () {
    if (tabIndex != undefined && tabIndex != null) {
        var $selectedTab = $("#footer_menu .row a:eq(" + tabIndex + ")");
        $selectedTab.addClass("selected");
    }
});

//点击关注
var FollowUser = function (dom) {
    var $this = $(dom);
    $this.html("<span class='loading'></span>");
    $.post("/m/utility/json.ashx", { "act": "attentionuser", "uid": $this.attr("uid"), "choice": $this.attr("choice"), "rid": Math.random() }, function (data) {
        $this.html("");
        if (data.error_code == 0) {
            if ($this.attr("choice") == "0") {//之前状态是已关注
                $this.attr("choice", "1");
                $this.text("关注");
                $this.removeClass("btn-followed").addClass("btn-unfollow");
            } else {
                $this.attr("choice", "0");
                $this.text("已关注");
                $this.addClass("btn-followed").removeClass("btn-unfollow");
            }
            return false;
        } else {
            warningAlert('', data.error);
        }
    }, "json");

    return false;
}

//倒数
var daoShu = function (num) {
    setTimeout(function () {
        if (num > 0) {
            $("#fs").hide();
            $("#daoshu").show();
            $("#num").text(num);
            daoShu(num - 1);
        } else {
            $("#fs").show();
            $("#daoshu").hide();
            $("#bindPhone-code button").removeAttr("disabled").css("background-color", "#f5f5f5");
        }
    }, 1000);
}
//判断是否是手机号 真是手机号
var isMobile = function (mobile) {
    if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|177)\d{8}$/i.test(mobile)) {
        return false;
    }
    else {
        return true;
    }
}
//一般投注 请求发起
var guessPlaying = function () {
    $(".yes-tz").removeClass("yes-tz-ok");
    $(".yes-tz").html("<span class='loading'></span>");
    var typeId = $(".select-res-yes").parent().attr("gtype");
    var choiceNo = $(".select-res-yes").attr("choice");//选择谁赢
    var choiceOdds = $(".select-res-yes").children(".num-odds").text();
    var playAmount = $("#mask-tz-coin input").val();
    if (parseInt(playAmount) < minMatch) {
        warningAlert("竞猜失败", "金额太少啦");
        $(".yes-tz").addClass("yes-tz-ok").html("确定竞猜");
        return false;
    }
    $.post("/m/utility/json.ashx", { act: "toumatchdata", match_id: match_id, type_id: typeId, choice_no: choiceNo, choice_odds: choiceOdds, play_amount: playAmount, rId: Math.random() }, function (data) {
        $(".yes-tz").html("确定竞猜");
        if (data.error_code == 0) {
            $("#mask-tz-success-button-details").attr("pid", data.play_id);
            var userGameCoin = parseFloat($("#user_game_coin").text()) - parseFloat($("#coinnum").val());
            $("#user_game_coin").text(userGameCoin);
            $(".user-game-coin").text(userGameCoin);

            $("#mask-tz").hide();
            $("#mask-tz-failure").hide();
            $("#mask").show();
            $("#mask-tz-success").show();
        } else {
            warningAlert("竞猜失败", data.error);
        }
    }, "json");
}
// 计算金额
var winCaculate = function () {
    var coinNum = parseInt($("#mask-tz-coin input").val());
    var odds = parseFloat($(".select-res-yes").children(".num-odds").text());
    if ($(".select-res-yes").parent().attr("gtype") == "3") {    
        $(".win-coin").text(Math.round(coinNum * (odds - 1) * 100) / 100);
    } else {
        $(".win-coin").text(Math.round(coinNum * odds * 100) / 100);
    }
}

//比分投注 请求发起
var guessScore = function () {
    $(".bar-score-yes").removeClass("yes-tz-ok");
    $(".bar-score-yes").html("<span class='loading'></span>");

    $.post("/m/utility/json.ashx", {
        act: "guessscore", match_id: match_id,
        "score_0_0": $(".select-res:eq(0)").attr("res"), "score_2_0": $(".select-res:eq(8)").attr("res"),
        "score_0_1": $(".select-res:eq(1)").attr("res"), "score_2_1": $(".select-res:eq(9)").attr("res"),
        "score_0_2": $(".select-res:eq(2)").attr("res"), "score_2_2": $(".select-res:eq(10)").attr("res"),
        "score_0_3": $(".select-res:eq(3)").attr("res"), "score_2_3": $(".select-res:eq(11)").attr("res"),
        "score_1_0": $(".select-res:eq(4)").attr("res"), "score_3_0": $(".select-res:eq(12)").attr("res"),
        "score_1_1": $(".select-res:eq(5)").attr("res"), "score_3_1": $(".select-res:eq(13)").attr("res"),
        "score_1_2": $(".select-res:eq(6)").attr("res"), "score_3_2": $(".select-res:eq(14)").attr("res"),
        "score_1_3": $(".select-res:eq(7)").attr("res"), "score_3_3": $(".select-res:eq(15)").attr("res"),
        "score_9_9": $(".select-res:eq(16)").attr("res"), rId: Math.random()
    }, function (data) {
        $(".bar-score-yes").addClass("yes-tz-ok").html("确定竞猜");
        if (data.error_code == 0) {
            var userGameCoin = parseFloat($("#user_game_coin").text()) - (minScore * $(".select-res-yes").length);
            $("#user_game_coin").text(userGameCoin);
            $(".select-res-yes").removeClass("select-res-yes");

            $("#mask-tz-failure").hide();
            $("#mask-tz-success").show();
            $("#mask").show();

            $(".guess-bar-score").hide();
            $(".guess-bar-user").show();

        } else {
            if (data.error_code == 1013) {

            } else {
                warningAlert("竞猜失败", data.error);
            }
        }
    }, "json");
}

//比分 计算金额
var scoreWinCaculate = function () {
    var resLength = $(".select-res-yes").length;
    $("#score-num").val(resLength * minScore);
    $(".bar-score-num span").text(resLength);
}

//登陆检查
var loginCheck = function () {
    if (cur_user_id == 0) {
        location.href = "/m/user/login?urls=" + escape(window.location.href);
        return false;
    }
    return true;
}

//点击关注
var rankAttention = function (dom) {
    var $this = $(dom);
    $this.html("<span class='loading'></span>");
    $.post("/m/utility/json.ashx", { "act": "attentionuser", "user_id": $this.attr("uid"), "choice": $this.attr("choice"), "rid": Math.random() }, function (data) {
        $this.html("");
        if (data.error_code == 0) {
            if ($this.attr("choice") == "0") {//之前状态是已关注
                $this.attr("choice", "1");
                $this.text("关注");
                $this.removeClass("btn-followed").addClass("btn-unfollow");
            } else {
                $this.attr("choice", "0");
                $this.text("已关注");
                $this.addClass("btn-followed").removeClass("btn-unfollow");
            }
            return false;
        } else {
            warningAlert('', data.error);
        }
    }, "json");

    return false;
}

//显示警告框
var returnUrl = '';
var warningAlert = function (title, summary) {
    $("#mask, #mask .hides").hide();
    $("#warning-alert-title").html(title);
    $("#warning-alert-summary").html(summary);
    $("#mask, #mask-warning-alert").show();

    $("#warning-alert-confirm").click(function () {
        if(returnUrl != '')
            location.href = returnUrl;
        else
            $("#mask, #mask .hides").hide();
    });
}

//让球描述
var RQ2CnDesc = function (goal, typeEle, noteEle, zdHomeScore, zdGuestScore) {
    var note = "";
    var pk;
    var curScore = "";
    if (zoudiHomeScore > -1 && zdGuestScore > -1){
        curScore = "当前比分" + zdHomeScore + ":" + zdGuestScore + "，";
    }
    if (goal == 0) {
        typeEle.html("竞彩亚盘：" + curScore + "主队和客队互不让球的结果是？");
        noteEle.html("*基于当前比分，如果主队和客队进球数相同，竞猜将无效，本金会退回");
    }
    else if (goal > 0) {
        if (((goal * 10) % 5) == 0) {
            pk = goal.toString();
            if (pk.indexOf(".") == -1) {
                note = "*基于当前比分，如果主队正好赢客队" + pk + "个球，竞猜将无效，本金会退回";
            }
            typeEle.html("竞彩亚盘：" + curScore + "主队让客队" + pk + "个球后的结果？");
            noteEle.html(note);
        }
        else {
            pk = (parseFloat(goal) - 0.25) + "-" + (parseFloat(goal) + 0.25);
            if (pk.split('-')[0].indexOf(".") == -1) {
                note = "*基于当前比分，如果主队正好赢客队" + pk.split('-')[0] + "个球，竞猜“主队胜”将会损失本金的50%，竞猜“客队胜”将会只获得收益的50%";
            }
            else {
                note = "*基于当前比分，如果主队正好赢客队" + pk.split('-')[1] + "个球，竞猜“主队胜”将会只获得收益的50%，竞猜“客队胜”将会损失本金的50%";
            }
            typeEle.html("竞彩亚盘：" + curScore + "主队让客队(" + pk + ")个球后的结果？");
            noteEle.html(note);
        }
    }
    else {
        goal = Math.abs(goal);
        if (((goal * 10) % 5) == 0) {
            pk = goal.toString();
            if (pk.indexOf(".") == -1) {
                note = "*基于当前比分，如果客队正好赢主队" + pk + "个球，竞猜将无效，本金会退回";
            }
            typeEle.html("竞彩亚盘：" + curScore + "客队让主队" + pk + "个球后的结果？");
            noteEle.html(note);
        }
        else {
            pk = (parseFloat(goal) - 0.25) + "-" + (parseFloat(goal) + 0.25);
            if (pk.split('-')[0].indexOf(".") == -1) {
                note = "*基于当前比分，如果客队正好赢主队" + pk.split('-')[0] + "个球，竞猜“主队胜”将会只获得收益的50%，竞猜“客队胜”将会损失本金的50%";
            }
            else {
                note = "*基于当前比分，如果客队正好赢主队" + pk.split('-')[1] + "个球，竞猜“主队胜”将会损失本金的50%，竞猜“客队胜”将会只获得收益的50%";
            }
            typeEle.html("竞彩亚盘：" + curScore + "客队让主队(" + pk + ")个球后的结果？");
            noteEle.html(note);
        }
    }
};
//大小描述
var DX2CnDesc = function (goal, typeEle, noteEle) {
    var note = "";
    var pk;
    if (((goal * 10) % 5) == 0) {
        pk = goal.toString();
        if (pk.indexOf(".") == -1) {
            note = "*如果总进球数正好为" + pk + "个，竞猜将无效，本金会退回";
        }
        typeEle.html("大小球：本场比赛总进球数能否超过" + pk + "个？");
        noteEle.html(note);
    }
    else {
        pk = (parseFloat(goal) - 0.25) + "-" + (parseFloat(goal) + 0.25);
        if (pk.split('-')[0].indexOf(".") == -1) {
            note = "*如果总进球数正好为" + pk.split('-')[0] + "个，选择“能”将会损失本金的50%，选择“不能”将会只获得收益的50%";
        }
        else {
            note = "*如果总进球数正好为" + pk.split('-')[1] + "个，选择“能”将会只获得收益的50%，选择“不能”将会损失本金的50%";
        }
        typeEle.html("大小球：本场比赛总进球数能否超过(" + pk + ")个？");
        noteEle.html(note);
    }
};
//赔率变化
var zdShake = function (ele, cls, times) {
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

//获得cookie
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

//写入cookie
function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) +
        ((expires) ? ';expires=' + expires_date.toGMTString() : '') + //expires.toGMTString()
        ((path) ? ';path=' + path : '') +
        ((domain) ? ';domain=' + domain : '') +
        ((secure) ? ';secure' : '');
}

//删除cookie
function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}