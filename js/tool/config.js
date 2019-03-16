var personPath = "http://localhost:8088/api/personInfo/personInfo/";

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