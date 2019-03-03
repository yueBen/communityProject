layui.use('laytpl',function () {
    var laytpl = layui.laytpl,
        $ = layui.$;

    //点击文章选中
    $(".article-item").click(function () {
        if (this.className.indexOf('article-item-check')<0){
            $(this).addClass('article-item-check');
        }else{
            $(this).removeClass('article-item-check');
        }
    });

    //阻止父级事件冒泡
    $(".article-item-btn").click(function (e) {
        e.stopPropagation();
    });

});
