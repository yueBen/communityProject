layui.use('layer',function () {
    var $ = layui.$,
        layer = layui.layer;

    $("#register").click(function () {
        $('.page').animate({'scrollTop': 400},500);
    });

    $("#backLogin").click(function () {
        $('.page').animate({'scrollTop': 0},500);
    });

});