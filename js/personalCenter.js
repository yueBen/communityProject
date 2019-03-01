layui.use('laytpl',function(){
   var laytpl = layui.laytpl,
       $ = layui.$;

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

});