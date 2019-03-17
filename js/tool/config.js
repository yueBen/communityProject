var path = "http://localhost:8088/api";

/**
 * 获取url中的参数
 * @param paramName
 * @returns {null}
 */
function getParam(paramName) {
    var paramValue = "",
        url = this.location.search;
    if (url.indexOf("?") == 0 && url.indexOf("=") > 1) {
        var param = url.substr(1,url.length);
        var split = param.split("&");
        $.each(split,function (i,v) {
            if (paramName === v.substr(0, paramName.length)) {
                return v.substr(v.indexOf('='), v.length);
            } else {
                return null;
            }
        });

    } else {
        return null;
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

function toDate(date,type) {
    if (typeof date == 'string') {
        if (type == 0) {
            return date;
        } else {
            return date.substr(0,10);
        }
    } else if (typeof date == 'number'){
        var time = new Date(date);
        var yyyy = 1900+time.getYear();
        var MM = time.getMonth()+1;
        var dd = time.getDay();
        var hh = time.getHours();
        var mm = time.getMinutes();
        if (type == 0) {
            return ""+yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm;
        } else {
            return ""+yyyy+"-"+MM+"-"+dd;
        }
    }
}
