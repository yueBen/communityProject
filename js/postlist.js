layui.use('laytpl',function () {
    var laytpl = layui.laytpl,
        $ = layui.$;
    $.ajax({
        type: 'post',
        url: '../A_Simulated_json/postlist.json',
        dataType: 'json',
        success: function (data) {
            laytpl(postlistContentScr.innerHTML).render(data,function (html) {
                $("#postlistContentScr").after(html);
            });
        }
    });

    // $('.postlist-search').text(sessionStorage.getItem("type"));
    
});
