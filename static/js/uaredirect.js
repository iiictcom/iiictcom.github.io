function uaredirect(f){try{if(document.getElementById("bdmark")!=null){return}var b=false;if(arguments[1]){var e=window.location.host;var a=window.location.href;if(isSubdomain(arguments[1],e)==1){f=f+"/#m/"+a;b=true}else{if(isSubdomain(arguments[1],e)==2){f=f+"/#m/"+a;b=true}else{f=a;b=false}}}else{b=true}if(b){var c=window.location.hash;if(!c.match("fromapp")){if((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))){location.replace(f)}}}}catch(d){}}function isSubdomain(c,d){this.getdomain=function(f){var e=f.indexOf("://");if(e>0){var h=f.substr(e+3)}else{var h=f}var g=/^www\./;if(g.test(h)){h=h.substr(4)}return h};if(c==d){return 1}else{var c=this.getdomain(c);var b=this.getdomain(d);if(c==b){return 1}else{c=c.replace(".","\\.");var a=new RegExp("\\."+c+"$");if(b.match(a)){return 2}else{return 0}}}};

function ajax(options) {
    options = options || {};
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } 
        }
    }
    xhr.open("POST", options.url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(formatParams(options.data));
}

function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}

ajax({
	url: "https://qiming.yw11.com/expert_weixin.php?type=9",
	success: function (msg) {
		if(!!document.getElementById("right_ad")){
			document.querySelector("#right_ad img").src=JSON.parse(msg).icon
		}
		if(!!document.getElementById("right_ad1")){
			document.querySelector("#right_ad1 img").src=JSON.parse(msg).icon
		}
	}
});





var s=document.referrer;
console.log(s);
//判断变量是否存在
if(typeof(arc_id)!="undefined" && typeof(arc_url)!="undefined" && typeof(arc_title)!="undefined"){
	//获取来源地址
	if(s.indexOf("baidu")>=0){
		//判断当前文章业务去路，往提交标题追加隐藏域标识，跟踪当前用户订单
		//1.智能起名 2.智能测名 3.公司起名 4.店铺起名 5.起网名 6.英文起名 7.起小名 8.宠物起名
		ajax({
			url: "https://qiming.yw11.com/api/article/baidu_count_keyword_arc",
			data:{
				article_id:arc_id,
				arcurl:arc_url,
				keyword:arc_title
			},
			success: function (data) {
				var data = JSON.parse(data);
				console.log(data);
				if(data.code == 1){
					var hidinput = '<input type="hidden" name="from_source" value="'+data.data.countid+'">';
					document.getElementsByTagName("form")[1].innerHTML+=hidinput;
				}
			}
		});
	}
}