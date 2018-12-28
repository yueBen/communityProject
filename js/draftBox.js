layui.use('laytpl',function () {
    var laytpl = layui.laytpl,
        $ = layui.$;

    //页面动画
    {
        $('.draftBox-item').hover(function () {
            var id = $(this).attr('id').split('_')[1];
            $('#draftBox-title_'+id).animate({width: '59%'},100);
            $('#draftBox-edit_'+id).animate({width: '19.8%'},100,function () {
                $('#draftBox-edit_'+id).css('display','inherit');
            });
        },function () {
            var id = $(this).attr('id').split('_')[1];
            $('#draftBox-edit_'+id).hide(200);
            $('#draftBox-edit_'+id).animate({width: 0},100);
            $('#draftBox-title_'+id).animate({width: '79%'},100);
        });
    }

    //刷新页面
    $('#textF5').click(function(){
       location.reload();
    });

});