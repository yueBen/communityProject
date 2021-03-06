layui.use(['laytpl','layer','laydate'],function () {
    var laytpl = layui.laytpl,
        layer = layui.layer,
        laydate = layui.laydate,
        $ = layui.$;

    //当前选择的标签
    var checkLabel = "";

    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
        layer.msg("请登录！！！");
    }

    //加载文章
    loadMyArticle();
    //加载我的标签
    queryMyLabel();

    //点击文章选中
    $(".myArticle-bottom-articles").on("click",".article-item",function () {
        if (this.className.indexOf('article-item-check')<0){
            $(this).addClass('article-item-check');
        }else{
            $(this).removeClass('article-item-check');
        }
    });


    //阻止父级事件冒泡
    $(".myArticle-bottom-articles").on("click",".article-item-btn",function (e) {
        e.stopPropagation();
    });
    $(".class-item").on("click",".del-label-item",function (e) {
        e.stopPropagation();
        $(this)
    })

    //新增文章
    $("#addArticle").click(function () {
        window.open("articleEdit.html?status=0");
    });

    //加载我的文章，所有已发布未发布待审批的文章，不加载草稿箱内容
    function loadMyArticle(data) {
        if (data == null) {
            data = {
                "uId": user.uid,
                "id": 2
            }
        }
        $.ajax({
            type: 'get',
            url: path+"/article/article/page",
            data: data,
            success: function (req) {
                $(".myArticle-bottom-articles").empty();
                $(".myArticle-bottom-articles").append(myArticleHtml(req.data.list));
            },
            error: function () {

            }
        });
    }

    //拼接我的文章页面
    function myArticleHtml(list) {
        var html = '';
        $.each(list,function (i,v) {
            html += '<div class="article-item" name="' + v.id + '"><div class="article-item-title" name="' + v.id + '">'+ v.title +
                    '</div><div class="article-item-time">'+ toDate(v.updateTime,0) + '</div>'+
                    '<div class="article-item-btn btn-1" name="' + v.id + '">编辑</div><div class="article-item-btn btn-2" name="' + v.id + '" value="' + v.status + '">';

            if (v.status == 0) {
                html += '已保存';
            } else if (v.status == 1) {
                html += '已下线';
            } else if (v.status == 2) {
                html += '待审批';
            } else if (v.status == 5) {
                html += '已发布';
            } else if (v.status == 6) {
                html += '待发布';
            } else if (v.status == 7) {
                html += '已驳回';
            } else if (v.status == 8) {
                html += '已通过';
            } else {
                html += '蛤?';
            }

            html += '</div><div class="article-item-content">' + contentFilter(v.content) + '</div></div>';
        });

        return html;
    }

    //文章编辑
    $(".myArticle-bottom-articles").on("click",".btn-1",function () {
        var aid = $(this).attr("name");
        window.open("articleEdit.html?status=1&aid="+aid);
    });
    
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

    //新增标签弹窗
    $(".add-class").click(function () {
        layer.open({
            type: 1,    //弹窗类型,2为页面层
            title: false,   //弹出标题
            content: $("#addLabel"),
            skin: 'modelBg',    //弹窗样式
            area: ['240px','60px'],  //弹窗大小
            offset: ['75px','1175px'],  //弹窗位置[top,left]，默认auto垂直水平居中
            closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
            shade: 0,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
            shadeClose: false,  //点击弹层外区域关闭
            anim: 0,    //弹出动画
            isOutAnim: true,    //关闭动画
            fixed: true,    //鼠标滚动时，层是否固定在可视区域
            resize: false  //弹窗大小是否可拖动
            //scrollbar: true   // 是否允许浏览器出现滚动条
            // cancel: function () {} 右上角关闭按钮触发的回调
        });
    });

    //文章状态修改按钮监听
    $(".myArticle-bottom-articles").on("click",".btn-2",function () {
        var aid = $(this).attr("name");
        var status = $(this).attr("value");
        var articleName = $(".article-item-title[name=" + aid + "]").text();
        if (status == 5) {
            //是否下线
            $(".articleOffline-title").text(articleName);
            var thisOpen = layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#articleOffline"),
                skin: 'modelBg',    //弹窗样式
                area: ['300px','130px'],  //弹窗大小
                offset: ['175px','400px'],  //弹窗位置[top,left]，默认auto垂直水平居中
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
                    $("#articleOffline-btn").click(function () {
                        var data = JSON.stringify({
                            "status": 1,
                            "id": aid
                        });
                        updateArticleStatus(data, "下线成功！！！", thisOpen);
                    });
                }
            });
        } else if (status == 2 || status == 7) {
            //提示
            var title = "";
            if (status == 2) {
                title = "管理员正在审核！！！请耐心等待。"
            } else {
                title = "您的文章未通过审核！！！请重新编辑。"
            }
            layer.msg(title,{
                time: 2000,
                offset: ['375px','425px']
            });
        } else {
            //选择发布
            $(".republication-title").text(articleName);
            var thisOpen = layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#republication"),
                skin: 'modelBg',    //弹窗样式
                area: ['300px','150px'],  //弹窗大小
                offset: ['175px','400px'],  //弹窗位置[top,left]，默认auto垂直水平居中
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
                    $("#republication-btn").click(function () {
                        var data = JSON.stringify({
                            "status": 5,
                            "releaseTime": toDate($("#republicationTime").val(),0),
                            "id": aid
                        });
                        updateArticleStatus(data, "发布成功！！！", thisOpen);
                    });
                }
            });
        }
        
    });

    //文章状态修改
    function updateArticleStatus(data, hint, thisOpen) {
        $.ajax({
            url: path + "/article/article/update",
            type: "post",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.ok) {
                    layer.close(thisOpen);
                    layer.msg(hint,{
                        time: 1800,
                        offset: ['210px','520px']
                    },function () {
                        loadMyArticle(null);
                    });
                } else {
                    layer.msg(data.message,{
                        time: 1800,
                        offset: ['210px','520px']
                    });
                }
            }
        });
    }

    //新增标签
    $("#btnAddLabel").click(function () {
        addMyLabel();
    });

    //添加标签
    function addMyLabel() {
        var data = JSON.stringify({
            "labelName": $("#labelName").val(),
            "uid": user.uid
        });
        $.ajax({
            url: path + "/article/label/add",
            type: 'post',
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (req) {
                if (req.ok) {
                    $(".class-items").empty();
                    $(".class-items").append(addLabelItem(req.data));
                    $("#labelName").val("");
                    layer.closeAll();
                } else {
                    layer.msg(req.message,{
                        time: 1000
                    });
                }
            }
        });
    }

    //加载我的标签
    function queryMyLabel() {
        $.ajax({
            url: path + "/article/label/list",
            type: 'get',
            data: {
                "uId": user.uid
            },
            success: function (req) {
                if (req.ok) {
                    $(".class-items").empty();
                    $(".class-items").append(addLabelItem(req.data));
                } else {
                    layer.msg(req.message,{
                        time: 1000
                    });
                }
            }
        });
    }

    //拼接我的文章标签项
    function addLabelItem(data) {
        var html = '';
        $.each(data,function (i,v) {
            html += '<div class="class-item" name="' + v.id + '"><p>' + v.labelName
                + '</p><div class="del-label-item" name="' + v.id + '"><i class="layui-icon">&#xe640;</i></div></div>';
        });
        return html;
    }

    //搜索按钮监听
    $("#search").click(function () {
        selectMyArticle();
    });

    function selectMyArticle() {
        var data = {
            "uId": user.uid,
            "id": 2,
            "updateTime1": $("#updateStart").val(),
            "updateTime2": $("#updateEnd").val(),
            "title": $("#title").val(),
            "labelId": $("#label").val(),
            "type": $("#type").val(),
            "status": $("#status").val()
        };
        if (checkLabel) {
            data.labelId = checkLabel;
        }
        loadMyArticle(data);
    }

    //搜索内容重置
    $("#reset").click(function () {
        $("#updateStart").val("");
        $("#updateEnd").val("");
        $("#title").val("");
        $("#label").val("");
        $("#type").val("");
        $("#status").val("");
        checkLabel = "";
        loadMyArticle(null);
    });

    laydate.render({
        elem: "#updateStart"
    });

    laydate.render({
        elem: "#updateEnd"
    });

    laydate.render({
        elem: '#republicationTime',
        type: 'datetime',
        value: new Date()
    });

    //悬浮标签出现删除按钮
    var isOut = true;
    $(".class-items").on('mouseenter mouseleave','.class-item',function(){
        var id = $(this).attr("name");
        if (isOut) {
            $(".del-label-item[name=" + id + "]").show();
            isOut = false;
        } else{
            $(".del-label-item[name=" + id + "]").hide();
            isOut = true;
        }

    });

    $(".class-items").on('click','.class-item',function(){
        checkLabel = $(this).attr("name");
        selectMyArticle();
    });

    $(".class-items").on("click",'.del-label-item',function () {
        var id = $(this).attr("name");
        $.ajax({
            url: path + "/article/label/" + id,
            type: 'get',
            success: function (req) {
                if (req.ok) {
                    queryMyLabel();
                    layer.msg("删除成功！！",{
                        time: 1000
                    });
                    isOut = true;
                } else {
                    layer.msg("删除失败！该标签下可能还有文章！！！",{
                        time: 1000
                    });
                }
            }
        });
    });

    //删除选中的文章
    $("#del").click(function () {
        var delNum = 0;
        var idList = "del";
        $(".article-item-check").each(function (i, v) {
            delNum++;
            idList += "_" + $(v).attr("name");
        });
        if (delNum === 0) {
            layer.msg("请选择要删除的文章！！！",{
                time: 2000,
                offset: ['375px','425px']
            });
        } else {
            $("#deleteNum").text(delNum);
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
                        updateArticleStatus(data, "删除成功！！！", thisOpen);
                    });
                }
            });
        }
    });


});
