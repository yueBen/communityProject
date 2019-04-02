layui.use(['laytpl','laydate','layer'],function () {
    var laytpl = layui.laytpl,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$;

    var type = location.search.substr(6,1);

    queryArticles();

    laydate.render({
       elem: '#releaseTimeStart'
    });

    laydate.render({
        elem: '#releaseTimeEnd'
    });

    function queryArticles(data){
        if (data == null) {
            data = {
                "id": 1,
                "type": type
            };
        }

        $.ajax({
            type: 'get',
            url: path + '/article/article/page',
            data: data,
            success: function (data) {
                laytpl(postlistContentScr.innerHTML).render(data,function (html) {
                    $("#postlistContentScr").after(html);
                });
            }
        });
    }

    //重置按钮
    $("#resetBtn").click(function () {
        $("#releaseTimeEnd").val("");
        $("#releaseTimeStart").val("");
        $("#queryAuthor").val("");
        $("#queryTitle").val("");
    });

    //搜索按钮
    $("#searchBtn").click(function () {
        var data = {
            "id": 1,
            "type": type,
            "releaseTime1": $("#releaseTimeStart").val(),
            "releaseTime2": $("#releaseTimeEnd").val(),
            "title": $("#queryTitle").val(),
            "labelId": $("#queryAuthor").val()
        }
        if ($("#releaseTimeEnd").val() >= $("#releaseTimeStart").val()) {
            if ($("#releaseTimeStart").val() == null && $("#releaseTimeStart").val() == "") {
                delete data.releaseTime1;
            }
            if ($("#releaseTimeEnd").val() == null && $("#releaseTimeEnd").val() == "") {
                delete data.releaseTime2;
            }
            if ($("#queryTitle").val() == null && $("#queryTitle").val() == "") {
                delete data.title;
            }
            if ($("#queryAuthor").val() == null && $("#queryAuthor").val() == "") {
                delete data.labelId;
            }
            queryArticles(data);
        } else {
            layer.msg("结束时间应该大于开始时间",{
                time: 800
            });
        }
    });


    
});
