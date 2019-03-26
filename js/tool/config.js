var path = "http://localhost:8088/api";

/**
 * 获取url中的参数
 * @param paramName
 * @returns {null}
 */
function getParam(paramName,url) {
    var paramValue = "";
    console.log(paramName);
    console.log(url);
    if (url.indexOf("?") == 0 && url.indexOf("=") > 1) {
        var param = url.substr(1,url.length);
        var split = param.split("&");
        $.each(split,function (i,v) {
            if (v.lastIndexOf(paramName) >= 0) {
                paramValue = v.substr(v.indexOf('=')+1, v.length);
                console.log(paramValue);
                return paramValue;
            }
        });
    }
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
    if (typeof date == 'string') {
        if (type == 0) {
            return date;
        } else {
            return date.substr(0,11);
        }
    } else if (typeof date == 'number'){
        var time = new Date(date);
        var yyyy = 1900+time.getYear();
        var MM = time.getMonth()+1 > 9?time.getMonth()+1:"0"+(time.getMonth()+1);
        var dd = time.getDate() > 9?time.getDate():"0"+time.getDate();
        var hh = time.getHours() > 9?time.getHours():"0"+time.getHours();
        var mm = time.getMinutes() > 9?time.getMinutes():"0"+time.getMinutes();
        var ss = time.getSeconds() > 9?time.getSeconds():"0"+time.getSeconds();
        if (type == 0) {
            return ""+yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss;
        } else {
            return ""+yyyy+"-"+MM+"-"+dd;
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
