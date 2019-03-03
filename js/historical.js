layui.use('laytpl',function () {
    var laytpl = layui.laytpl,
        $ = layui.$;

    $(".author-content-body").hover(function () {
        $(this).children('div').attr('style','display:none');
        $(this).children('marquee').attr('style','display:inherit')
    },function () {
        $(this).children('marquee').attr('style','display:none');
        $(this).children('div').attr('style','display:inherit')
    });

});