layui.use('laytpl',function () {
   var laytpl = layui.laytpl,
       $ = layui.$;
    //页面动画
    {
        //悬浮在已关注博主上时显示取消关注按钮
        $('.my-attention').hover(function () {
            $('.my-attention-name').animate({width: '55.5%'},100,function () {
                $('.my-attention-del').show(100);
            });
        },function () {
            $('.my-attention-name').animate({width: '80.5%'},200,function () {
                $('.my-attention-del').hide(100);
            });
        });
    }
    
    //推荐博主头像显示,background-image: url("../img/6.jpg");
    recommPhoto()
    function recommPhoto() {
        var recommPhotos = $('.myAttention-recommend');
        $.each(recommPhotos,function(i,v){
            $(v).css('background-image','url("../img/'+ (i+1) +'.jpg")');
        });
    }

    //点击搜索展示搜索结果
    $('#queryBloggerBtn').click(function () {
        $('#queryBlogger').show(200);
    });

    //点击搜索结果以外的元素时关闭搜索结果
    $(document).bind('click',function () {
        var id = $(event.target).attr('id'),
            onclass = $(event.target).attr('class');
        console.log(id + "_" + onclass);
        var style = $('#queryBlogger').attr('style');
        console.log(style.indexOf('display: none;'));
        if(style.indexOf('display: none;')<0){
            if(!(id === 'queryBlogger' || id === 'queryBloggerBtn' || onclass === 'query-blogger' || onclass === 'query-blogger-img' ||
                    onclass === 'query-blogger-name' || onclass === 'query-blogger-attention')){
                $('#queryBlogger').hide(200);
            }
        }
    });

});