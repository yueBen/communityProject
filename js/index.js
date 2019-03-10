layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$;


    //找圆
    $(".user-photo").height($(".user-photo").width());

    //页面跳转动画和跳转控制
    {
        //记录最近打开的页面
        var isPage = new Array(8);
        isPage[0] = '-';

        //刷新iframe页面
        function refreshIframe(index){
            $("#iframe-"+index).attr('src', $("#iframe-"+index).attr('src'));
            // $("#iframe-"+index).reload();
        }

        //再次点击返回上次的界面
        function openlastpage(pageNum) {
            switch(pageNum){
                case 1:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(1);
                    break;
                case 2:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(2);
                    break;
                case 3:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(3);
                    break;
                case 4:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(4);
                    break;
                case 5:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(5);
                    break;
                case 6:
                    closepage();
                    refreshIframe(pageNum);
                    $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                    closeotherpage(6);
                    break;
                case 7:
                    closepage();
                    refreshIframe(pageNum);
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
            if(isPage[1]){
                closepage();
                openlastpage(1);
            }else{
                closepage();
                refreshIframe(1);
                $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(1);
            }
            $('.home-page-body-1').addClass('page-body');
        });

        //判断page2是否展开
        isPage[2] = false;
        $('#my-focus').click(function () {
            if(isPage[2]){
                closepage();
                openlastpage(2);
            }else{
                closepage();
                refreshIframe(2);
                $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(2);
            }
            $('.home-page-body-2').addClass('page-body');
        });

        //判断page3是否展开
        isPage[3] = false;
        $('#iRelated').click(function () {
            if(isPage[3]){
                closepage();
                openlastpage(3);
            }else{
                closepage();
                refreshIframe(3);
                $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(3);
            }
            $('.home-page-body-3').addClass('page-body');
        });

        //判断page4是否展开
        isPage[4] = false;
        $('#historicalRecord').click(function () {
            if(isPage[4]){
                closepage();
                openlastpage(4);
            }else{
                closepage();
                refreshIframe(4);
                $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(4);
            }
            $('.home-page-body-4').addClass('page-body');
        });

        //判断page5是否展开
        isPage[5] = false;
        $('#myArticle').click(function () {
            if(isPage[5]){
                closepage();
                openlastpage(5);
            }else{
                closepage();
                refreshIframe(5);
                $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(5);
            }
            $('.home-page-body-5').addClass('page-body');
        });

        //判断page6是否展开
        isPage[6] = false;
        $('#draftBox').click(function () {
            if(isPage[6]){
                closepage();
                openlastpage(6);
            }else{
                closepage();
                refreshIframe(6);
                $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},400);
                closeotherpage(6);
            }
            $('.home-page-body-6').addClass('page-body');
        });

        //判断page7是否展开
        isPage[7] = false;
        $('#notice').click(function () {
            if(isPage[7]){
                closepage();
                openlastpage(7);
            }else{
                closepage();
                refreshIframe(7);
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

        sessionStorage.setItem("type",1);
        $('.title-type-item').click(function () {
            $('.title-type-item').removeClass('title-type-item-check');
            $(this).addClass('title-type-item-check');
            $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
            closeotherpage();
            $('.home-page-right').animate({width: '18%',height: '65%',margin: '1% 2% 0 0'},300);
            $('.home-page-body').animate({width: '56%',height: '90%',margin: '1% 2% 0 2%',opacity: 1},400);
            var title = $(this).text();
            if(title === '推荐'){
                $('.body-content').empty();
                $('.body-content').append('<iframe src="page/postlist.html" class="page-body-iframe1"></iframe>');
                sessionStorage.setItem("type",1);
            }else if(title === '学习'){
                $('.body-content').empty();
                $('.body-content').append('<iframe src="page/postlist.html" class="page-body-iframe1"></iframe>');
                sessionStorage.setItem("type",2);
            }else if(title === '生活'){
                $('.body-content').empty();
                $('.body-content').append('<iframe src="page/postlist.html" class="page-body-iframe1"></iframe>');
                sessionStorage.setItem("type",3);
            }else if(title === '兴趣'){
                $('.body-content').empty();
                $('.body-content').append('<iframe src="page/postlist.html" class="page-body-iframe1"></iframe>');
                sessionStorage.setItem("type",4);
            }else if(title === '提问'){
                $('.body-content').empty();
                $('.body-content').append('<iframe src="page/postlist.html" class="page-body-iframe1"></iframe>');
                sessionStorage.setItem("type",5);
            }

        });

    }

    //点击头像跳转到个人中心页面
    $('#user-photo').click(function () {
        window.open('page/bloggerPage.html','blogger');
    });

    //登录注册

    //用户登录注销
    $('#userLanding').click(function () {
        layer.open({
            type: 2,
            title: false,
            content: 'page/model/userLogin.html',
            area: ['600px','400px'],
            skin: 'modelBg',
            closeBtn:1,
            shadeClose: true
        })
    });



});