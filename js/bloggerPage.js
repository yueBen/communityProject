layui.use('laytpl',function(){
   var laytpl = layui.laytpl,
       $ = layui.$;

   //页面动画
    {
        $('.bloggerPage-left').click(function () {
            $('.bloggerPage-center').animate({width: '6%'},300);
            $('.bloggerPage-left').animate({width: '72%'},300);
        });

        $('.bloggerPage-center').click(function () {
            $('.bloggerPage-left').animate({width: '6%'},300);
            $('.bloggerPage-center').animate({width: '72%'},300);
        })
    }
});