layui.use('layer',function () {
    var $ = layui.$,
        layer = layui.layer;

    //动画
    {
        $("#register").click(function () {
            $('.page').animate({'scrollTop': 400},500);
        });

        $("#backLogin").click(function () {
            $('.page').animate({'scrollTop': 0},500);
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
                'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            for (; num > 0; num--) {
                var i = Math.floor(Math.random() * 62);
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
                return false;
            }
        }

    }

    //登录注册
    {
        $(".modelBtn2").click(function () {
            if (checkedCode()) {
                layer.msg('验证码正确',{
                    time: 1000
                });
            } else {
                layer.msg('验证码错误',{
                    time: 1000
                });
            }
        });

    }

});