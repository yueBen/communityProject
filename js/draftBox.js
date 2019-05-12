layui.use(['layer','laydate'],function () {
    var layer = layui.layer,
        laydate = layui.laydate,
        $ = layui.$;

    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
        layer.msg("请登录！！！");
    }

    loadMyDraftBox();

    //页面动画
    {
        $(".draftBox-items").on('mouseenter','.draftBox-item',function(){
            var id = $(this).attr('name');
            $('.draftBox-item-title[name=' + id + ']').animate({width: '59%'},100);
            $('.draftBox-item-edit[name=' + id + ']').animate({width: '19.8%'},100,function () {
                $('.draftBox-item-edit[name=' + id + ']').css('display','inherit');
            });
        });
        $(".draftBox-items").on('mouseleave','.draftBox-item',function(){
            var id = $(this).attr('name');
            $('.draftBox-item-edit[name=' + id + ']').hide(200);
            $('.draftBox-item-edit[name=' + id + ']').animate({width: 0},100);
            $('.draftBox-item-title[name=' + id + ']').animate({width: '79%'},100);
        });
    }

    //加载草稿箱内容
    function loadMyDraftBox(data) {
        if (data == null) {
            data = {
                "uId": user.uid,
                "status": 3,
                "id": "_"
            }
        }
        $.ajax({
            type: 'get',
            url: path+"/article/article/page",
            data: data,
            success: function (req) {
                $(".draftBox-items").html(draftBoxHtml(req.data.list));
            },
            error: function () {

            }
        });
    }

    //拼接草稿箱页面
    function draftBoxHtml(list) {
        var html = '';
        $.each(list, function (i, v) {
           html += '<div class="draftBox-item" name="' + v.id + '"><div class="draftBox-item-time"><div class="draftBox-item-time-value">' +
               '<p>' + toDate(v.updateTime,0) + '</p></div><div class="draftBox-item-time-line"></div></div>' +
               '<div class="draftBox-item-title" name="' + v.id + '"><div class="draftBox-item-title-title"><p name="' + v.id + '">' + v.title + '</p></div>' +
               '<div class="draftBox-item-title-content"><p>' + contentFilter(v.content) + '</p></div></div>' +
               '<div class="draftBox-item-edit" name="' + v.id + '"><div class="draftBox-item-edit-update" name="' + v.id + '"><p>编 辑</p></div>' +
               '<div class="draftBox-item-edit-line"></div><div class="draftBox-item-edit-del" name="' + v.id + '"><p>删 除</p></div></div></div>';
        });
        return html;
    }

    //文章内容处理只保留文字
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

    //文章编辑
    $(".draftBox-items").on('click','.draftBox-item-edit-update',function () {
        var id = $(this).attr("name");
        window.open("articleEdit.html?status=1&aid="+id);
    });
    //删除文章
    $(".draftBox-items").on('click','.draftBox-item-edit-del',function () {
        var id = $(this).attr("name");
        var idList = "del_" + id;
        $("#deleteNum").text($('p[name=' + id + ']').text());
        var thisOpen = layer.open({
            type: 1,    //弹窗类型,2为页面层
            title: false,   //弹出标题
            content: $("#articleDelete"),
            skin: 'modelBg',    //弹窗样式
            area: ['300px','150px'],  //弹窗大小
            offset: ['150px','450px'],  //弹窗位置[top,left]，默认auto垂直水平居中
            closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
            shade: 0,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
            shadeClose: false,  //点击弹层外区域关闭
            anim: 0,    //弹出动画
            isOutAnim: true,    //关闭动画
            fixed: true,    //鼠标滚动时，层是否固定在可视区域
            resize: false,  //弹窗大小是否可拖动
            //scrollbar: true   // 是否允许浏览器出现滚动条
            // cancel: function () {} 右上角关闭按钮触发的回调
            success: function () {
                $("#articleDelete-btn").click(function () {
                    var data = JSON.stringify({
                        "id": idList
                    });
                    $.ajax({
                        url: path + "/article/article/update",
                        type: "post",
                        data: data,
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.ok) {
                                layer.close(thisOpen);
                                layer.msg("删除成功!!!",{
                                    time: 1800,
                                    offset: ['210px','520px']
                                },function () {
                                    loadMyDraftBox(null);
                                });
                            } else {
                                layer.msg(data.message,{
                                    time: 1800,
                                    offset: ['210px','520px']
                                });
                            }
                        }
                    });
                });
            }
        });

    });

    //搜索
    {
        laydate.render({
            elem: "#updateStart"
        });

        laydate.render({
            elem: "#updateEnd"
        });

        //重置
        $("#reset").click(function () {
            $("#updateStart").val("");
            $("#updateEnd").val("");
            $("#title").val("");
            $("#type").val("");
            loadMyDraftBox(null);
        });

        //搜索
        $("#search").click(function () {
            var data = {
                "uId": user.uid,
                "id": "_",
                "updateTime1": $("#updateStart").val(),
                "updateTime2": $("#updateEnd").val(),
                "title": $("#title").val(),
                "type": $("#type").val(),
                "status": 3
            };
            loadMyDraftBox(data);
        });
    }

});