layui.use(['laytpl','layer','laydate'],function(){
   var laytpl = layui.laytpl,
       layer = layui.layer,
       laydate = layui.laydate,
       $ = layui.$;

   var index = 1;//页码

   var user = JSON.parse(sessionStorage.getItem("user"));
   if (user != null) {
       userInfo(user);
   }

    queryfriendArticle();

   $("#longTime").text(sessionStorage.getItem("longtime"));

    //用户基本信息
    function userInfo(user) {
        $("#ranking").text(user.ranking);
        $("#comment_num").text(user.commentNum);
        $("#message_num").text(user.messageNum);
        $("#browse_num").text(user.browseNum);
        $("#like_num").text(user.praiseNum);
        $("#name").text(user.name);
        $("#phone").text(user.phone);
        $("#id").text(user.uid);
        $("#birth").text(toDate(user.birthday,1));
        $("#addr").text(user.address);
        $("#gender").text(user.gender);
        $("#notice").text(user.introduce);
        $("#uid").attr("value",user.uid);
        $(".personalCenter-top-right>img").attr("src",path+"/personInfo/personInfo/" + user.uid + "/down?t="+(new Date()).getTime());
        $("#updateName").val(user.name);
        $("#updatePhone").val(user.phone);
        $("#birthday").val(toDate(user.birthday,1));
        $("#updateAddr").val(user.address);
        $("#updateNot").val(user.introduce);
        $("#photoShow").attr("src",path+"/personInfo/personInfo/" + user.uid + "/down?t="+(new Date()).getTime());
        window.parent.document.getElementById("img-photo").setAttribute("src",path+"/personInfo/personInfo/" + user.uid + "/down?t="+(new Date()).getTime());
        window.parent.document.getElementById("userLanding").setAttribute("value",user.name);
    }

   //页面动画
    {
        $('.personalCenter-bottom-left').click(function () {
            $('#bottom-center-hidden').hide("normal");
            $('.personalCenter-bottom-center').animate({width: '6%'},400);
            $('.personalCenter-bottom-left').animate({width: '70%'},400,function () {
                $('#bottom-left-hidden').show("normal");
            });
        });

        $('.personalCenter-bottom-center').click(function () {
            $('#bottom-left-hidden').hide("normal");
            $('.personalCenter-bottom-left').animate({width: '6%'},400);
            $('.personalCenter-bottom-center').animate({width: '70%'},400);
            $('#bottom-center-hidden').css('display','inherit');
            $(".personalCenter-bottom-center-title").show("normal");
        });
    }

    //添加好友弹窗
    {
        //添加好友
        $("#addFriend").click(function () {
            $(".add-items").html("");
            $("#firName").val("");
            layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#addFriendModel"),
                skin: 'modelBg',    //弹窗样式
                area: ['800px','300px'],  //弹窗大小
                offset: ['150px','175px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 0,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0.2,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: true,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                // cancel: function () {} 右上角关闭按钮触发的回调
            });
        });

        //修改个人信息
        $("#updateInfo").click(function () {
            layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#updateInfoModel"),    //弹出内容,当前为HTML路径
                skin: 'modelBg',    //弹窗样式
                area: ['600px','800px'],  //弹窗大小
                offset: ['0px','250px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 0,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0.2,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: true,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                // cancel: function () {} 右上角关闭按钮触发的回调
            });
        });
        //留言回复
        $(".message-reply").click(function () {
           layer.open({
                type: 2,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: '', //弹出内容,当前为HTML路径
                skin: 'modelBg',    //弹窗样式
                area: ['600px','400px'],  //弹窗大小
                offset: ['100px','220px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 0,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0.2,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: true,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                // cancel: function () {} 右上角关闭按钮触发的回调
            });
        })
    }

    //个人信息修改
    {
        //头像上传按钮
        $("#photoUpload").click(function () {
            $("#photoUpload-hidden").click();
        });

        //个人信息上传
        $(".modelBtn2").click(function () {
            var formDate = new FormData($("#info")[0]);
            $.ajax({
                type: "post",
                url: path + "/personInfo/personInfo/add",
                data: formDate,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                success: function (rep) {
                    if (rep.ok) {
                        userInfo(rep.data);
                        window.parent.document.getElementById("isPersonInfo").setAttribute("value","1");
                        sessionStorage.setItem("user",JSON.stringify(rep.data));
                        layer.msg(rep.message, {
                            time: 1000,
                            offset: ['400px','500px']
                        },function () {
                            window.location.reload();
                            layer.closeAll();
                        });
                    }
                },
                error: function (err) {
                    layer.msg(err.message, {
                        time: 1000,
                        offset: ['400px','400px']
                    }, function () {

                    });
                }
            });
        });

        //头像选择回显
        $("#photoUpload-hidden").change(function () {
            var fr = new FileReader();
            fr.readAsDataURL(this.files[0]);
            fr.onloadend = function () {
                $("#photoShow").attr("src", this.result)
            }
        });

        //时间选择
        laydate.render({
            elem: '#birthday'
        })

        laydate.render({
            elem: '#selTimeSta'
        })

        laydate.render({
            elem: '#selTimeEnd'
        })
    }

    //好友文章列表加载
    function queryfriendArticle() {
        $(".personalCenter-bottom-center-body").html("");
        var data = {
            "page": index,
            "pageSize": 50,
            "uId":  user.uid
        };

        $.ajax({
            type: "get",
            url: path + "/article/article/friPage",
            data: data,
            contentType: false,
            success: function (data) {
                var h = htmlAddFriItem(data.data.list);
                $(".personalCenter-bottom-center-body").append(h);
            }
        });
    }

    //拼接好友文章项
    function htmlAddFriItem(list) {
        var h = '';
        $.each(list,function (i,v) {
            h += '<div class="friendsArticle-item"><div class="friendsArticle-item-title">'+
                '<div class="friendsArticle-item-title-1">'+
                '<a href="articlePage.html?id=' + v.id + '" target="_blank" style="color: #e5e5a4">' + v.title + '</a>'+
                '</div><div class="friendsArticle-item-title-2">'+
                '<span style="color: #FF5722;width: 65%;float:left;text-align: right;">' + toDate(v.updateTime,0) + '</span>'+
                '<span style="color: #FFFFBB;width: 35%;float: left;text-align: center;">' + v.labelId + '</span></div></div>' +
                '<div class="friendsArticle-item-content"><p><marquee direction="left" behavior="scroll" '+
                'onmouseover=this.stop() onmouseout=this.start()>' + contentFilter(v.content) + '</marquee></p></div></div>'
        });

        return h;
    }


    //搜索
    {
        //重置
        $("#queryResetFri").click(function () {
           $(".personalCenter-bottom-center-title>input").val("");
           $("#type").val("");
        });
    }

    //搜索好友
    $("#addBtnFir").on("click", function () {
        var data = {
            "uId": user.uid,
            "id": "1",
            "name": $("#firName").val()
        };
        $.ajax({
            type: "get",
            url: path + "/personInfo/personInfo/SelAddFri",
            data: data,
            contentType: false,
            success: function (data) {
                addFri(data.data);
            }
        });
    });

    //拼接搜索好友项
    function addFri(arr) {
        var h = '';
        $.each(arr,function(i,v){
            h += '<div class="add-item"><div style="display: inline-block;float: left;width: 75%;height: 80px;">'+
                 '<div class="add-item-name">' + v.name + '</div>'+
                 '<hr style="margin: 0 10%;background: #494118;width: 80%;">'+
                 '<div class="add-item-id">' + v.uid + '</div></div>'+
                 '<div class="add-item-add" name="' + v.uid + '"><i class="layui-icon">&#xe61f;</i></div></div>'
        });
        $(".add-items").html(h);
    }

    //添加好友
    $("body").on("click", ".add-item-add", function () {
       var uid = $(this).attr("name");
        layer.open({
            type: 1,    //弹窗类型,2为页面层
            title: false,   //弹出标题
            content: $("#addFriNote"),
            skin: 'modelBg',    //弹窗样式
            area: ['300px','200px'],  //弹窗大小
            offset: ['200px','425px'],  //弹窗位置[top,left]，默认auto垂直水平居中
            closeBtn: 1,     //右上角关闭按钮，有1、2两种样式，0是不显示
            shade: 0.2,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
            shadeClose: true,  //点击弹层外区域关闭
            anim: 0,    //弹出动画
            isOutAnim: true,    //关闭动画
            fixed: true,    //鼠标滚动时，层是否固定在可视区域
            resize: false  //弹窗大小是否可拖动
            //scrollbar: true   // 是否允许浏览器出现滚动条
            // cancel: function () {} 右上角关闭按钮触发的回调
        });

        $("body").on("click", ".addUserFriBtn", function () {
            var data = JSON.stringify({
                "type": 0,
                "uid1": user.uid,
                "uid2": uid,
                "note": $("#noteInput").val()
            });
            $.ajax({
                url: path + "/personInfo/relation/add",
                type: "post",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    console.log(data);
                    if (data.ok) {
                        layer.closeAll();
                        layer.msg(data.data,{
                            time: 1000
                        })
                    }

                }
            });
        });

    });

    getUser();

    function getUser() {
        $.ajax({
            type: "get",
            url: path + "/personInfo/personInfo/getUser",
            data: {
                "uId": user.uid,
                "id": "1"
            },
            contentType: false,
            success: function (data) {
                myFriUser(data.data);
            }
        });
    }

    //拼接我的好友
    function myFriUser(arr) {
        var h = '';
        $.each(arr,function (i, v) {
            h += '<div class="friends-item" name="' + v.uid + '"><div class="friends-item-img i-b-left">'+
                 '<img src="' + path + '/personInfo/personInfo/' + v.uid + '/down">'+
                 '</div><div class="friends-item-name i-b-left bg-4" name="' + v.uid + '">' + v.name + '</div>'+
                 '<div class="friends-item-del i-b-left" style="display: none;" name="' + v.uid + '">' +
                 '<i class="layui-icon" style="font-size: 35px;">&#xe640;</i></div></div>';
        })
        $(".friends-items").html(h);
    }

    $(".friends-items").on("mouseenter", ".friends-item", function () {
        var uid = $(this).attr("name");
        $(".friends-item-name[name=" + uid + "]").animate({width: '60%'},400,function () {
            $(".friends-item-del[name=" + uid + "]").show();
        });
    });

    $(".friends-items").on("mouseleave", ".friends-item", function () {
        var uid = $(this).attr("name");
        $(".friends-item-del[name=" + uid + "]").hide(400, function () {
            $(".friends-item-name[name=" + uid + "]").animate({width: '76%'},400);
        });
    });

    $(".friends-items").on("click", ".friends-item-del", function () {
        var uid = $(this).attr("name");
        var data = JSON.stringify({
            "id": "4",
            "uid1": uid,
            "uid2": user.uid,
            "type": 0,
            "status": 1
        });
        $.ajax({
            url: path + "/personInfo/relation/update",
            type: "post",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.ok) {
                    getUser();
                    queryfriendArticle();
                } else {
                    data = JSON.stringify({
                        "id": "4",
                        "uid1": user.uid,
                        "uid2": uid,
                        "type": 0,
                        "status": 1
                    });
                    $.ajax({
                        url: path + "/personInfo/relation/update",
                        type: "post",
                        data: data,
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            console.log(data);
                            if (data.ok) {
                                getUser();
                                queryfriendArticle();
                            }
                        }
                    });
                }

            }
        });
    });

});