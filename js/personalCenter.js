layui.use(['laytpl','layer','laydate'],function(){
   var laytpl = layui.laytpl,
       layer = layui.layer,
       laydate = layui.laydate,
       $ = layui.$;

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

    //model
    {
        //添加好友
        $("#addFriend").click(function () {
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

    //update_info_model
    {
        //头像上传按钮
        $("#photoUpload").click(function () {
            $("#photoUpload-hidden").click();
        });

        //个人信息上传
        $(".modelBtn2").click(function () {
            var formDate = new FormData($("#info")[0]);
            console.log(formDate);
            $.ajax({
                type: "post",
                url: personPath + "add",
                data: formDate,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                success: function (rep) {
                    console.log(rep);
                    if (rep.ok) {

                        layer.msg(rep.message, {
                            time: 1000,
                            offset: ['400px','400px']
                        }, function () {

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
            console.log("222");
        });

        //时间选择
        laydate.render({
            elem: '#birthday'
        })
    }


});