layui.use('laytpl',function(){
   var laytpl = layui.laytpl,
       $ = layui.$;
   $('.personalCenter-bottom-left').click(function () {
       $('#bottom-center-hidden').hide(400);
       $('.personalCenter-bottom-center').animate({width: '6%'},400);
       $('#bottom-left-hidden').show("slow");
       $('.personalCenter-bottom-left').animate({width: '70%'},400);
   });

    $('.personalCenter-bottom-center').click(function () {
        $('#bottom-left-hidden').hide(400);
        $('.personalCenter-bottom-left').animate({width: '6%'},400);
        $('#bottom-center-hidden').show("slow");
        $('.personalCenter-bottom-center').animate({width: '70%'},400);
    });
});