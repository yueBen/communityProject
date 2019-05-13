layui.use(['laydate','layer','laydate'],function () {
    var laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$;

    laydate.render({
        elem: "#TimeStart"
    });

    laydate.render({
        elem: "#TimeEnd"
    });

    var user = JSON.parse(sessionStorage.getItem("user"));

    //初始化通知消息
    initNotice();
    function initNotice(data) {
        $("#articleNum").text(user.messageNum);
        $("#commNum").text(user.commentNum);
        $("#colleNum").text(user.ranking);
        $("#likeNum").text(user.praiseNum);
        if (!data) {
            data = {
                "id": user.uid
            }
        }
        $.ajax({
            type: "get",
            url: path + "/personInfo/notice/page",
            data: data,
            contentType: false,
            success: function (data) {
                console.log(data);
                initNoticeHtml(data.data);
            }
        });
    }

    function initNoticeHtml(arr) {
        $(".iRelated-bottom").html("");
        var h = '';
        $.each(arr, function (i, v) {
            if (v.isRead == 0) {
                h += '<div class="iRelated-message-item unread-item">'
            } else {
                h += '<div class="iRelated-message-item">'
            }
            h += '<div class="massage-item-title">' +
                '<div class="item-title-time i-b-left">' + toDate(v.createTime, 1) + '</div>' +
                '<div class="item-title-btn i-b-left item-read" style="margin: 5px 0 5px 10%;" name="' + v.id + '">已读</div>\n' +
                '<div class="item-title-btn i-b-left item-del" name="' + v.id + '">删除</div></div>' +
                '<hr style="width: 94%;border: 0.5px solid #000000;margin: 0 3% 0 3%;"><div class="massage-item-content">\n' +
                '<div style="line-height: 32px;">' + v.content + '</div></div></div>';
        });
        $(".iRelated-bottom").html(h);
    }

    //搜索
    $("#selBtn").click(function () {
        selectNoticle();
    });
    function selectNoticle() {
        var data = {
            "createTime1": $("#TimeStart").val(),
            "createTime2": $("#TimeEnd").val(),
            "id": user.uid
        };
        initNotice(data);
    }

    //重置
    $("#repBtn").click(function () {
        $("#TimeStart").val("");
        $("#TimeEnd").val("");
        initNotice();
    });

    //全部已读
    $("#btn1").click(function () {
        $.ajax({
            type: "get",
            url: path + "/personInfo/notice/readAll",
            contentType: false,
            success: function (data) {
                if (data.ok) {
                    initNotice();
                }
            }
        });
    });

    //已读未读切换
    var lookRead = true;
    $("#btn2").click(function () {
        if (lookRead) {
            var data = {
                "id": user.uid,
                "isRead": 0
            };
            initNotice(data);
            lookRead = false;
        } else {
            var data = {
                "id": user.uid,
                "isRead": 1
            };
            initNotice(data);
            lookRead = true;
        }
    });

    //清空已读
    $("#btn3").click(function () {
        $.ajax({
            type: "get",
            url: path + "/personInfo/notice/readDel",
            contentType: false,
            success: function (data) {
                if (data.ok) {
                    initNotice();
                }
            }
        });
    });

    //已读
    $("body").on("click", ".item-read", function () {
        var id = $(this).attr("name");
        var data = {
            "id": id,
            "isRead": 1
        }
        readOrDel(data);
    });

    //删除
    $("body").on("click", ".item-del", function () {
        var id = $(this).attr("name");
        var data = {
            "id": id,
            "isRead": 2
        }
        readOrDel(data);
    });

    function readOrDel(data) {
        $.ajax({
            type: "get",
            url: path + "/personInfo/notice/updateItem",
            data: data,
            contentType: false,
            success: function (data) {
                if (data.ok) {
                    initNotice();
                }
            }
        });
    }

});