layui.use('laytpl',function(){
   var laytpl = layui.laytpl,
       $ = layui.$;
   $('.personalCenter-bottom-left').click(function () {
       $('.personalCenter-bottom-center').animate({width: '6%'},400);
       $('.personalCenter-bottom-left').animate({width: '70%'},400);
       setTimeout(function () {
           $('#bottom-center-hidden').css('display','none');
           $('#bottom-left-hidden').css('display','inherit');
       },350);
   });

    $('.personalCenter-bottom-center').click(function () {
        $('.personalCenter-bottom-left').animate({width: '6%'},400);
        $('.personalCenter-bottom-center').animate({width: '70%'},400);
        setTimeout(function () {
            $('#bottom-left-hidden').css('display','none');
            $('#bottom-center-hidden').css('display','inherit');
        },350);
    });
});