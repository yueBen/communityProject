layui.use('laytpl',function(){
   var laytpl = layui.laytpl,
       $ = layui.$;



   $('.personalCenter-bottom-left').click(function () {
       $(".personalCenter-bottom-center-title").hide();
       $('#bottom-center-hidden').hide(400);
       $('.personalCenter-bottom-center').animate({width: '6%'},400);
       $('#bottom-left-hidden').show("slow");
       $('.personalCenter-bottom-left').animate({width: '70%'},400);
   });

    $('.personalCenter-bottom-center').click(function () {
        $('#bottom-left-hidden').hide(400);
        $('.personalCenter-bottom-left').animate({width: '6%'},400);
        $('.personalCenter-bottom-center').animate({width: '70%'},400);
        $('#bottom-center-hidden').css('display','inherit');
        $(".personalCenter-bottom-center-title").show("normal");
    });

});