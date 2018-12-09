layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$;


    //顶部输入框获焦，输入框边长
    $('.head-input>input').focus(function () {
        var index = this.id.charAt(this.id.length-1);
        $('#head-input-'+index).animate({width:150},300);
        console.log('.head-input-'+index);
    });
    //顶部输入框失焦，输入框还原
    $('.head-input>input').blur(function () {
        var index = this.id.charAt(this.id.length-1);
        var wid = 60;
        if(index === '2' || index === '3'){
            wid = 110;
        }
        $('#head-input-'+index).animate({width:wid},300);
        console.log('.head-input-'+index);
    });

    //页面跳转动画和跳转控制
    {
        //记录最近打开的页面
        var openPage = new Array('-1');
        var isPage = new Array(8);
        isPage[0] = '-';
        //再次点击返回上次的界面
        function openlastpage(pageNum) {
            switch(pageNum){
                case 1:
                    $('.home-page-body-1').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(1);
                    isPage[1] = true;
                    $('.home-page-body-1').addClass('page-body');
                    break;
                case 2:
                    $('.home-page-body-2').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(2);
                    isPage[2] = true;
                    $('.home-page-body-2').addClass('page-body');
                    break;
                case 3:
                    $('.home-page-body-3').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(3);
                    isPage[3] = true;
                    $('.home-page-body-3').addClass('page-body');
                    break;
                case 4:
                    $('.home-page-body-4').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(4);
                    isPage[4] = true;
                    $('.home-page-body-4').addClass('page-body');
                    break;
                case 5:
                    $('.home-page-body-5').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(5);
                    isPage[5] = true;
                    $('.home-page-body-5').addClass('page-body');
                    break;
                case 6:
                    $('.home-page-body-6').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(6);
                    isPage[6] = true;
                    $('.home-page-body-6').addClass('page-body');
                    break;
                case 7:
                    $('.home-page-body-7').removeClass('page-body');
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                    $('.home-page-body-7').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                    closeotherpage(7);
                    isPage[7] = true;
                    $('.home-page-body-7').addClass('page-body');
                    break;
                default:
                    $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                    $('.home-page-body').animate({width: '56%',height: '90%',margin: '1% 2% 0 2%',opacity: 1},200);
                    $('.home-page-right').animate({width: '18%',height: '65%',margin: '1% 2% 0 0'},400);
                    closeotherpage();
                    break;
            }
        }

        //判断page1是否展开
        isPage[1] = false;
        $('#pers-center').click(function () {
            if(isPage[1]){
                $('.home-page-body-1').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(1);
                $('.home-page-body-1').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-1').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(1);
                isPage[1] = true;
            }
            $('.home-page-body-1').addClass('page-body');
        });

        //判断page2是否展开
        isPage[2] = false;
        $('#my-focus').click(function () {
            if(isPage[2]){
                $('.home-page-body-2').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(2);
                $('.home-page-body-2').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-2').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(2);
                isPage[2] = true;
            }
            $('.home-page-body-2').addClass('page-body');
        });

        //判断page3是否展开
        isPage[3] = false;
        $('#iRelated').click(function () {
            if(isPage[3]){
                $('.home-page-body-3').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(3);
                $('.home-page-body-3').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-3').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(3);
                isPage[3] = true;
            }
            $('.home-page-body-3').addClass('page-body');
        });

        //判断page4是否展开
        isPage[4] = false;
        $('#historicalRecord').click(function () {
            if(isPage[4]){
                $('.home-page-body-4').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(4);
                $('.home-page-body-4').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-4').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(4);
                isPage[4] = true;
            }
            $('.home-page-body-4').addClass('page-body');
        });

        //判断page5是否展开
        isPage[5] = false;
        $('#myArticle').click(function () {
            if(isPage[5]){
                $('.home-page-body-5').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(5);
                $('.home-page-body-5').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-5').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(5);
                isPage[5] = true;
            }
            $('.home-page-body-5').addClass('page-body');
        });

        //判断page6是否展开
        isPage[6] = false;
        $('#draftBox').click(function () {
            if(isPage[6]){
                $('.home-page-body-6').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(6);
                $('.home-page-body-6').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-6').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(6);
                isPage[6] = true;
            }
            $('.home-page-body-6').addClass('page-body');
        });

        //判断page7是否展开
        isPage[7] = false;
        $('#notice').click(function () {
            if(isPage[7]){
                $('.home-page-body-7').animate({width: 0,height: 0,margin: 0,opacity: 0},500);
                openlastpage(openPage[1]);
            }else{
                openPage.unshift(7);
                $('.home-page-body-7').removeClass('page-body');
                $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},400);
                $('.home-page-right').animate({width: 0,height: 0,margin: 0},400);
                $('.home-page-body-7').animate({width: "76%",height: "90%",margin: "1% 2% 0 2%",opacity: 1},500);
                closeotherpage(7);
                isPage[7] = true;
            }
            $('.home-page-body-7').addClass('page-body');
        });

        //修改其他页面开关标识
        function closeotherpage(num) {
            $.each(isPage,function (i,v) {
                if(v != num && i != 0 ){
                    isPage[i] = false;
                }
            })
        }

        $('.title-type-item').click(function () {
            $('.title-type-item').removeClass('title-type-item-check');
            $(this).addClass('title-type-item-check');
            $('.page-body').animate({width: 0,height: 0,margin: 0,opacity: 0},300);
            closeotherpage();
            $('.home-page-right').animate({width: '18%',height: '65%',margin: '1% 2% 0 0'},400);
            $('.home-page-body').animate({width: '56%',height: '90%',margin: '1% 2% 0 2%',opacity: 1},300);
        })

    }


});