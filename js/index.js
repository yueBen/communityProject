layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$;

    //找圆
    $(".user-photo").height($(".user-photo").width());

    var person = JSON.parse(sessionStorage.getItem("user"));
    if (person != null) {
        getUserInfo(person);
    } else {
        $("#userLanding").attr("value","请登录");
    }

    //页面跳转动画和跳转控制
    {
        //记录最近打开的页面
        var isPage = new Array(8);
        isPage[0] = '-';

        //刷新iframe页面
        function refreshIframe(index,url){
            $("#iframe-"+index).attr('src', url);
            // $("#iframe-"+index).reload();
        }

        //再次点击返回上次的界面
        function openlastpage(pageNum) {
            switch(pageNum){
                case 1:
                    closepage();
                    refreshIframe(pageNum,"page/personalCenter.html");
                    $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(1);
                    break;
                case 2:
                    closepage();
                    refreshIframe(pageNum,"page/myAttention.html");
                    $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(2);
                    break;
                case 3:
                    closepage();
                    refreshIframe(pageNum,"page/iRelated.html");
                    $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(3);
                    break;
                case 4:
                    closepage();
                    refreshIframe(pageNum,"page/historical.html");
                    $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(4);
                    break;
                case 5:
                    closepage();
                    refreshIframe(pageNum,"page/myArticle.html");
                    $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(5);
                    break;
                case 6:
                    closepage();
                    refreshIframe(pageNum,"page/draftBox.html");
                    $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(6);
                    break;
                case 7:
                    closepage();
                    refreshIframe(pageNum,"page/notice.html");
                    $('.home-page-body-7').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(7);
                    break;
                default:
                    closepage();
                    $('.home-page-body').animate({width: '56%',height: '90%',margin: '1% 2% 0 2%',opacity: 1},300);
                    $('.home-page-right').animate({width: '18%',height: '65%',margin: '1% 2% 0 0'},400);
                    closeotherpage();
                    break;
            }
        }

        //判断page1是否展开
        isPage[1] = false;
        $('#pers-center').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            }
            if(isPage[1]){
                closepage();
                openlastpage(1);
            }else{
                closepage();
                refreshIframe(1,"page/personalCenter.html");
                $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(1);
            }
            $('.home-page-body-1').addClass('page-body');
        });

        //判断page2是否展开
        isPage[2] = false;
        $('#my-focus').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[2]){
                closepage();
                openlastpage(2);
            }else{
                closepage();
                refreshIframe(2,"page/myAttention.html");
                $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(2);
            }
            $('.home-page-body-2').addClass('page-body');
        });

        //判断page3是否展开
        isPage[3] = false;
        $('#iRelated').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[3]){
                closepage();
                openlastpage(3);
            }else{
                closepage();
                refreshIframe(3,"page/iRelated.html");
                $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(3);
            }
            $('.home-page-body-3').addClass('page-body');
        });

        //判断page4是否展开
        isPage[4] = false;
        $('#historicalRecord').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[4]){
                closepage();
                openlastpage(4);
            }else{
                closepage();
                refreshIframe(4,"page/historical.html");
                $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(4);
            }
            $('.home-page-body-4').addClass('page-body');
        });

        //判断page5是否展开
        isPage[5] = false;
        $('#myArticle').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[5]){
                closepage();
                openlastpage(5);
            }else{
                closepage();
                refreshIframe(5,"page/myArticle.html");
                $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(5);
            }
            $('.home-page-body-5').addClass('page-body');
        });

        //判断page6是否展开
        isPage[6] = false;
        $('#draftBox').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[6]){
                closepage();
                openlastpage(6);
            }else{
                closepage();
                refreshIframe(6,"page/draftBox.html");
                $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(6);
            }
            $('.home-page-body-6').addClass('page-body');
        });

        //判断page7是否展开
        isPage[7] = false;
        $('#notice').click(function () {
            if (person == null) {
                layer.msg("请登陆！！！");
                return;
            } else if ($("#isPersonInfo").val() == 0) {
                layer.msg("请完善个人信息！！！");
                return;
            }
            if(isPage[7]){
                closepage();
                openlastpage(7);
            }else{
                closepage();
                refreshIframe(7,"page/notice.html");
                $('.home-page-body-7').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(7);
            }
            $('.home-page-body-7').addClass('page-body');
        });

        //修改其他页面开关标识
        function closeotherpage(num) {
            $.each(isPage,function (i,v) {
                if(i === num){
                    isPage[i] = true;
                }else if(i === 0){
                    isPage[i] = false;
                }
            })
        }

        //关闭打开的页面
        function closepage(){
            $.each(isPage,function(i,v){
                if(isPage[i]){
                    switch(i){
                        case 1:
                            $('.home-page-body-1').animate({margin: '20% 0 0 0',width: 0,height: 0,opacity: 0},300);
                            isPage[1] = false;
                            break;
                        case 2:
                            $('.home-page-body-2').animate({width: 0,height: 0,margin: '24% 0 0 0',opacity: 0},300);
                            isPage[2] = false;
                            break;
                        case 3:
                            $('.home-page-body-3').animate({width: 0,height: 0,margin: '27.5% 0 0 0',opacity: 0},300);
                            isPage[3] = false;
                            break;
                        case 4:
                            $('.home-page-body-4').animate({width: 0,height: 0,margin: '31% 0 0 0',opacity: 0},300);
                            isPage[4] = false;
                            break;
                        case 5:
                            $('.home-page-body-5').animate({width: 0,height: 0,margin: '34.5% 0 0 0',opacity: 0},300);
                            isPage[5] = false;
                            break;
                        case 6:
                            $('.home-page-body-6').animate({width: 0,height: 0,margin: '38% 0 0 0',opacity: 0},300);
                            isPage[6] = false;
                            break;
                        case 7:
                            $('.home-page-body-7').animate({width: 0,height: 0,margin: '42% 0 0 0',opacity: 0},300);
                            isPage[7] = false;
                            break;
                    }
                }
            });
            $('.home-page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},300);
            $('.home-page-right').animate({width: 0,height: 0,margin: 0},300);
        }

        $('.title-type-item').click(function () {
            $('.title-type-item').removeClass('title-type-item-check');
            $(this).addClass('title-type-item-check');
            $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
            closeotherpage();
            $('.home-page-right').animate({width: '18%',height: '65%',margin: '1% 2% 0 0'},300);
            $('.home-page-body').animate({width: '56%',height: '90%',margin: '1% 2% 0 2%',opacity: 1},400);
            var title = $(this).text();
            if(title === '推荐'){
                $(".page-body-iframe1").attr('src', "page/postlist.html?type=*");
            }else if(title === '学习'){
                $(".page-body-iframe1").attr('src', "page/postlist.html?type=0");
            }else if(title === '生活'){
                $(".page-body-iframe1").attr('src', "page/postlist.html?type=1");
            }else if(title === '兴趣'){
                $(".page-body-iframe1").attr('src', "page/postlist.html?type=2");
            }else if(title === '提问'){
                $(".page-body-iframe1").attr('src', "page/postlist.html?type=3");
            }

        });

    }

    //点击头像跳转到个人中心页面
    $('#user-photo').click(function () {
        window.open('page/bloggerPage.html','blogger');
    });

    //登陆弹窗
    var userOut = 0;
    $("#userLanding").click(function () {
        var value = $(this).attr("value");
        if (value == "请登录") {
            layer.open({
                type: 1,
                title: false,
                content: $("#loginPage"),
                skin: 'modelBg',    //弹窗样式
                area: ['600px','400px'],  //弹窗大小
                // offset: ['0px','250px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0.4,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: false,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false,  //弹窗大小是否可拖动
                scrollbar: true,   // 是否允许浏览器出现滚动条
                cancel: function(index, layero){
                    cleanLoginRegist();
                }
            });
        } else {
            if (userOut == 0) {
                $("#userOut").show(300);
                userOut = 1;
            } else {
                $("#userOut").hide(300);
                userOut = 0;
            }
        }
    });

    //安全退出
    $("#userOut").click(function () {
       sessionStorage.clear();
       window.location.reload();
    });

    //动画
    {
        $("#register").click(function () {
            $('.loginPage').animate({'scrollTop': 400},500);
        });

        $("#backLogin").click(function () {
            $('.loginPage').animate({'scrollTop': 0},500);
        });
    }

    //验证码
    {
        //验证码内容
        var check = getCode(6);

        //生成验证码
        function getCode(num) {
            var checkCode = "";
            var code = ['0','1','2','3','4','5','6','7','8','9',
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];

            for (; num > 0; num--) {
                var i = Math.floor(Math.random() * 61);
                var r = Math.ceil(Math.random() * 150)+105;
                var g = Math.ceil(Math.random() * 150)+105;
                var b = Math.ceil(Math.random() * 150)+105;
                $(".check-code").append('<span style="color: rgb('+ r + ',' + g + ',' + b +')">' + code[i] + '</span>');
                checkCode += code[i];
            }

            return checkCode;
        }

        //点击刷新验证码
        $(".check-code").click(function () {
            $(".check-code").empty();
            check = getCode(6);
        });

        //验证输入码
        function checkedCode() {
            if ($("#check-code-input").val().toUpperCase() == check.toUpperCase()) {
                return true;
            } else {
                return true;
                return false;
            }
        }

    }

    //加载基本信息
    function getUserInfo(user) {
        $("#userLanding").attr("value",user.name);
        $("#user-photo>img").attr("src",path+"/personInfo/personInfo/" + user.uid + "/down?t="+(new Date()).getTime());
    }

    //登录注册
    {
        var isLog = true;
        //登陆
        $(".modelBtn2").click(function () {
            if (checkedCode()) {
                if (isLog) {
                    login();
                } else {
                    layer.msg('请正确输入用户名密码',{
                        time: 1000
                    });
                }
            } else {
                layer.msg('验证码错误',{
                    time: 700
                },function () {
                    $(".check-code").empty();
                    check = getCode(6);
                });
            }
        });

        function login() {
            var user = JSON.stringify({
                "userName": $("#username").val(),
                "userPwd": $("#userpwd").val()
            });
            $.ajax({
                url: path + "/login/user/login",
                type: 'post',
                data:user,
                async:false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                error:function(XMLHttpRequest, textStatus, errorThrown) {

                },
                success: function (data) {
                    if (data.ok) {
                        if (data.respCode == '001') {
                            layer.msg(data.message,{
                                time: 1000
                            },function () {
                                $("#isPersonInfo").val("0");
                                sessionStorage.setItem("user",JSON.stringify(data.data));
                                sessionStorage.setItem("longtime",0);
                                person = JSON.parse(sessionStorage.getItem("user"));
                                getUserInfo(data.data);
                                cleanLoginRegist();
                                layer.closeAll();
                                $("#pers-center").trigger("click");
                            })
                        } else {
                            $("#isPersonInfo").val("1");
                            var longtime = data.data.photoPath;
                            sessionStorage.setItem("user",JSON.stringify(data.data));
                            sessionStorage.setItem("longtime",longtime);
                            person = JSON.parse(sessionStorage.getItem("user"));
                            getUserInfo(data.data);
                            if (data.data.uid == "0000000001") {
                                console.log("toPage");
                                window.open("page/adminIndex.html","_blank");
                            }
                            cleanLoginRegist();
                            layer.closeAll();
                        }
                    } else {
                        layer.msg(data.message,{
                            time: 1000
                        })
                    }

                }
            });
        }

        //用户名验证
        $("#username").blur(function () {
            inputCheck($(this).val());
        });

        //注册用户验证
        $("#regName").blur(function () {
            inputCheck($(this).val());
        });

        //注册密码验证
        $("#regPwd").blur(function () {
            checkPwd($(this).val());
        });


        //注册按钮
        $("#registerBtn").click(function () {
            if ($("#regPwd").val() != $("#regPwdRep").val()) {
                layer.msg('确认密码不一致',{
                    time: 600
                });
            } else {
                if (isLog) {
                    var user = JSON.stringify({
                        "userName": $("#regName").val(),
                        "userPwd": $("#regPwd").val()
                    });
                    $.ajax({
                        url: path + "/login/user/add",
                        type: 'post',
                        data: user,
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.ok) {
                                layer.msg("注册成功！等待管理员审核",{
                                    time: 1000
                                },function () {
                                    cleanLoginRegist();
                                    layer.closeAll();
                                });
                            } else {
                                layer.msg(data.message,{
                                    time: 1000
                                })
                            }
                        }
                    });
                }
            }
        });

        //用户名格式检查
        function inputCheck(content) {
            var patrm = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
            if (!patrm.test(content) && content.length>0) {
                layer.msg('请输入5-16位字母数字下划线,并已字母开头',{
                    time: 600
                });
                isLog = false;
            }
        }

        //密码格式检查
        function checkPwd(content) {
            var patrm = /^[a-zA-Z0-9_]{5,16}$/;
            if (!patrm.test(content) && content.length>0) {
                layer.msg('请输入5-16位字母数字下划线',{
                    time: 600
                });
                isLog = false;
            }
        }

    }

    //关闭清除登陆注册信息
    function cleanLoginRegist() {
        $("#username").val("");
        $("#userpwd").val("");
        $("#regName").val("");
        $("#regPwd").val("");
        $("#regPwdRep").val("");
    }

});