layui.use('laytpl',function () {
   var laytpl = layui.laytpl,
       $ = layui.$;

   //加载作者头像
   $('.article-author-photo').append('<img src="../img/1.jpg" style="width: 100%;height: 100%;border-radius: 50%;">');

   //评论部分
    {
        //评论输入框折叠
        $('#article-comments-text').focus(function () {
            $('#article-comments-text').animate({height: 60},300);
            $('.article-comments-add').css('display','inherit');
            $('.article-comments-add').animate({height: 33},300);
        });
        $('#article-comments-text').blur(function () {
            $('#article-comments-text').animate({height: 30},300);
            $('.article-comments-add').animate({height: 0},300);
            setTimeout(function () {
                $('.article-comments-add').css('display','none');
            },300);
        });

        //加载评论
        $.ajax({
            type: 'post',
            url: '../A_Simulated_json/articlecomments.json',
            dataType: 'json',
            success: function (data) {
                commentLevel1(data.data.list);
            }
        });
        
        //加载主评论（一级评论）
        function commentLevel1(data) {
            $.each(data,function(i,v){
                var h = '';
                if(v.pid === '-'){
                    h +='<div class="article-comment-content-item" id="article-comment_' + v.id + '">'+
                        '<div class="article-comment-content-item-body">'+
                        '<div class="article-comment-content-item-body-user">' + v.user + '</div>'+
                        '<div class="article-comment-content-item-body-content">' + v.content + '</div>'+
                        '<div class="article-comment-content-item-body-operation">'+
                        '<div class="commentTime">' + v.time + '</div>'+
                        '<div class="commentLike" id="commentLike_' + v.id + '">'+
                        '<img src="../img/icon/like_1.png" style="display: inline-block;">'+
                        '<img src="../img/icon/like_2.png" style="display: none;">'+'<div>'+ v.like + '</div>'+'</div>'+
                        '<div class="commentDisLike" id="commentDisLike_' + v.id + '">'+
                        '<img src="../img/icon/disLike_1.png" style="display: inline-block;">'+
                        '<img src="../img/icon/disLike_2.png" style="display: none;">'+'<div>'+ v.dislike + '</div>'+'</div>'+
                        '<div class="commentCom" id="commentCom_' + v.id + '">'+
                        '<img src="../img/icon/comment.png">' + '<div>' + v.commentNum + '</div>' + '</div>' + '</div>'+
                        '<div class="article-comment-content-item-body-textarea" id="commentText_' + v.id + '">'+
                        '<hr style="width: 100%;border: 0.5px solid #5e5e5e">'+
                        '<textarea placeholder="说点什么吧。。。"></textarea>'+
                        '<span>还可以输入<span id="commentNum_'+ v.id +'" style="font-size: 14px;">X</span>个字符</span><div>发表</div>'+
                        '</div></div></div>';
                    $('.article-comment-content').append(h);
                }
            });
        }

        //点赞和踩
        $(document).on('click','.commentLike',function () {
            var id = $(this).attr('id').split('_')[1];
            var isLike = $($('#commentLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            if($($('#commentDisLike_'+id).children('img')[0]).attr('style') === 'display: none;') likeOrDisLike(id,true,2);
            likeOrDisLike(id,isLike,1);
        });
        $(document).on('click','.commentDisLike',function () {
            var id = $(this).attr('id').split('_')[1];
            var isDisLike = $($('#commentDisLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            if($($('#commentLike_'+id).children('img')[0]).attr('style') === 'display: none;') likeOrDisLike(id,true,1);
            likeOrDisLike(id,isDisLike,2);
        });
        function likeOrDisLike(elem,is,type){
            var id = '';
            if(type === 1){
                id = '#commentLike_'+elem;
            }else{
                id = '#commentDisLike_'+elem;
            }
            var imgs = $(id).children('img');
            if(is){
                $(id).css('color','#FFFFFF');
                $(imgs[0]).css('display','inline-block');
                $(imgs[1]).css('display','none');
            }else{
                $(id).css('color','#C1272D');
                $(imgs[0]).css('display','none');
                $(imgs[1]).css('display','inline-block');
            }
        }

        //展开评论
        $(document).on('click','.commentCom',function () {
            var id = $(this).attr('id').split('_')[1];
            $('#commentText_'+id).css('display','inherit')

        });

    }

});