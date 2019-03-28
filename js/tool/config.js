var path = "http://localhost:8088/api";

/**
 * 获取url中的参数
 * @param paramName
 * @returns {null}
 */
function getParam(paramName,url) {
    var paramValue = "";
    if (url.indexOf("?") == 0 && url.indexOf("=") > 1) {
        var param = url.substr(1,url.length);
        var split = param.split("&");
        $.each(split,function (i,v) {
            if (v.lastIndexOf(paramName) >= 0) {
                paramValue = v.substr(v.indexOf('=')+1, v.length);
                return;
            }
        });
    }
    return paramValue;
}

function test(){
    return 1;
}

/**
 * 判断str并转换成json对象
 * @param str
 * @returns {*}
 */
function toJSON(str) {

    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return obj;
            }else{
                return str;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return str;
        }
    }
    return str;
}

/**
 * 时间转换
 * @param date
 * @param type
 * @returns {*}
 */
function toDate(date,type) {
    var time;
    if (typeof date == 'string') {
        if (type == 0) {
            return date;
        } else {
            time = date.substr(0,11)
            return time;
        }
    } else if (typeof date == 'number'){
        var time = new Date(date);
        var yyyy = 1900+time.getYear();
        var MM = time.getMonth()+1 > 9?time.getMonth()+1:"0"+(time.getMonth()+1);
        var dd = time.getDate() > 9?time.getDate():"0"+time.getDate();
        var hh = time.getHours() > 9?time.getHours():"0"+time.getHours();
        var mm = time.getMinutes() > 9?time.getMinutes():"0"+time.getMinutes();
        var ss = time.getSeconds() > 9?time.getSeconds():"0"+time.getSeconds();
        if (type === 0) {
            time = ""+yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss;
            return time;
        } else {
            time = ""+yyyy+"-"+MM+"-"+dd;
            return time;
        }
    }
    if (date == null || date.length <= 0)  {
        return toDate(new Date(),0);
    }
}

function toHtml(str) {
    var html = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == "\"") {
            html += "\'";
        } else {
            html += str.charAt(i);
        }
    }
    return html;
}

function isNull(data) {
    if (data != null) {
        if (data.length == 0) {
            return null;
        } else {
            return data;
        }
    }

    return null;
}

/**
 * 文章内容过滤只保留文本
 * @param str
 * @returns {string}
 */
function contentFilter(str) {
    str = str.replace(/&nbsp;/g,"");
    var content = "&nbsp;";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == '<') {
            i = str.indexOf('>',i);
        } else {
            content += str.charAt(i);
        }
    }
    return content;
}
