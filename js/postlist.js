layui.use('laytpl',function () {
    var laytpl = layui.laytpl,
        $ = layui.$;

    var type = location.search.substr(6,1);


    queryArticles();


    function queryArticles(data){
        if (data == null) {
            data = {
                "releaseTime": toDate(new Date().getTime(),0),
                "status": 5,
                "type": type
            };
        }

        $.ajax({
            type: 'get',
            url: path + '/article/article/page',
            data: data,
            success: function (data) {
                laytpl(postlistContentScr.innerHTML).render(data,function (html) {
                    $("#postlistContentScr").after(html);
                });
            }
        });
    }


    
});
