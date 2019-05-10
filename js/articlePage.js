layui.use(['laytpl','layer','laydate'],function () {
   var laytpl = layui.laytpl,
       layer = layui.layer,
       $ = layui.$;

   var aid = getParam('id',location.search);

    var user = JSON.parse(sessionStorage.getItem("user"));

   //加载作者头像
   $('.article-author-photo').append('<img src="../img/1.jpg" style="width: 100%;height: 100%;border-radius: 50%;">');

   //加载文章内容
    $.ajax({
        type: 'get',
        url: path + '/article/article/' + aid,
        success: function (req) {
            console.log(req);
            $(".article-title-center").text(req.data.title);
            $('.article-content').html(req.data.content);
            $('#articleBrwose>.article-title-left-item-num').text(req.data.browseNum);
            $('#articleHot>.article-title-left-item-num').text(12);
            $('#articleComment>.article-title-left-item-num').text(req.data.commentNum);
            $('#articleLike>.article-title-right-item-num').text(req.data.likeNum);
            $('#articleDisLike>.article-title-right-item-num').text(req.data.dislikeNum);
            $('#articleCollect>.article-title-right-item-num').text(req.data.collectionNum);
            $('#authorId').val(req.data.uid);
        },
        error: function () {

        }
    });

    initArticleComment();

    function initArticleComment() {
        $.ajax({
            type: 'get',
            // url: '../A_Simulated_json/articlecomments.json',
            // dataType: 'json',
            url: path + "/article/article/friPage",
            data: {"pId": "-", "onId": $('#authorId').val()},
            contentType: false,
            success: function (data) {
                commentLevel1(data.data.list);
            }
        });
    }

    //评论部分
    {
        //评论输入框折叠
        $('#article-comments-text').focus(function () {
            $('#article-comments-text').animate({height: 60},300);
            $('.article-comments-add').css('display','inherit');
            $('.article-comments-add').animate({height: 33},300);
        });
        // $('#article-comments-text').blur(function () {
        //     $('#article-comments-text').animate({height: 30},300);
        //     $('.article-comments-add').animate({height: 0},300);
        //     setTimeout(function () {
        //         $('.article-comments-add').css('display','none');
        //     },300);
        // });

        //加载评论
        var dataBuffer;

        
        //加载主评论（一级评论）
        function commentLevel1(data) {
            $.each(data,function(i,v){
                var h = '';
                if(v.pid === '-'){
                    h +='<div class="article-comment-content-item" id="article-comment_' + v.id + '">'+
                        '<div class="article-comment-content-item-body">'+
                        '<div class="article-comment-content-item-body-user">' + v.user + '：</div>'+
                        '<div class="article-comment-content-item-body-content">' + v.content + '</div>'+
                        '<div class="article-comment-content-item-body-operation">'+
                        '<div class="commentTime">' + v.time + '</div>'+
                        '<div class="commentLike" id="commentLike_' + v.id + '">'+
                        '<img src="../img/icon/white/like_1.png" style="display: inline-block;">'+
                        '<img src="../img/icon/like_2.png" style="display: none;">'+'<div>'+ v.like + '</div>'+'</div>'+
                        '<div class="commentDisLike" id="commentDisLike_' + v.id + '">'+
                        '<img src="../img/icon/white/disLike_1.png" style="display: inline-block;">'+
                        '<img src="../img/icon/disLike_2.png" style="display: none;">'+'<div>'+ v.dislike + '</div>'+'</div>'+
                        '<div class="commentCom" id="commentCom_' + v.id + '">'+
                        '<img src="../img/icon/white/comment.png">' + '<div>' + v.commentNum + '</div>' + '</div>' + '</div>'+
                        '<div class="article-comment-content-item-body-textarea" id="commentText_' + v.id + '">'+
                        '<hr style="width: 100%;border: 0.5px solid #5e5e5e">'+
                        '<textarea placeholder="说点什么吧。。。"></textarea>'+
                        '<span>还可以输入<span id="commentNum_'+ v.id +'" style="font-size: 14px;">X</span>个字符</span><div>发表</div>'+
                        '</div></div>'+'<div id="childComment_' + v.id + '"></div>'+
                        '</div>';
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
            if($('#commentText_'+id).attr('style') != 'display: inherit;'){
                $('#commentText_'+id).css('display','inherit');
                initComment(getCommentData1(id),id);
            }else{
                $('#commentText_'+id).css('display','none');
                $('#childComment_'+id).empty();
            }

        });

        //模拟请求数据(加载子评论)
        function getCommentData1(id){
            var getList = new Array();
            $.each(dataBuffer,function(i,v){
               if(v.pid === id){
                   getList.push(v);
               }
            });
            return getList;
        }
        //模拟查询（输入id查找父id的姓名）
        function getCommentData2(id){
            var pid = '';
            var pName = '';
            $.each(dataBuffer,function(i,v){
               if(v.pid != '_'){
                   if(v.id === id){
                       pid = v.pid;
                       return;
                   }
               }
            });
            $.each(dataBuffer,function(i,v){
                if(v.id === pid){
                    pName = v.user;
                    return;
                }
            });

            return pName;
        }
        //加载评论
        function initComment(arr,id) {
            $.each(arr,function(i,v){
                var h = '';
                h +='<div class="article-comment-content-item-body">'+
                    '<div class="article-comment-content-item-body-user">' + v.user + '    回复了__' + getCommentData2(v.id) + '：</div>'+
                    '<div class="article-comment-content-item-body-content">' + v.content + '</div>'+
                    '<div class="article-comment-content-item-body-operation">'+
                    '<div class="commentTime">' + v.time + '</div>'+
                    '<div class="commentLike" id="commentLike_' + v.id + '">'+
                    '<img src="../img/icon/white/like_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/like_2.png" style="display: none;">'+'<div>'+ v.like + '</div>'+'</div>'+
                    '<div class="commentDisLike" id="commentDisLike_' + v.id + '">'+
                    '<img src="../img/icon/white/disLike_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/disLike_2.png" style="display: none;">'+'<div>'+ v.dislike + '</div>'+'</div>'+
                    '<div class="commentCom" id="commentCom_' + v.id + '">'+
                    '<img src="../img/icon/white/comment.png">' + '<div>' + v.commentNum + '</div>' + '</div>' + '</div>'+
                    '<div class="article-comment-content-item-body-textarea" id="commentText_' + v.id + '">'+
                    '<hr style="width: 100%;border: 0.5px solid #5e5e5e">'+
                    '<textarea placeholder="说点什么吧。。。"></textarea>'+
                    '<span>还可以输入<span id="commentNum_'+ v.id +'" style="font-size: 14px;">X</span>个字符</span><div>发表</div>'+
                    '</div></div>'+'<div id="childComment_' + v.id + '"></div>';
                $('#childComment_'+id).append(h);
            });
        }

    }

    //标题头部操作
    {

    }

    //发表文章评论
    {
        $('#article-comments-text').keyup(function () {
            var curLength = $(this).val().trim().length;
            $('#commentCharNum').text(500-curLength);
        });

        //文章评论发布
        $('#btnArticleComm').on('click',function () {
            if (user) {
                addComm("-", $('#article-comments-text').val());
            } else {
                layer.msg("请登录！！！",{
                    time: 2000,
                    // offset: ['150px','1600px'],
                    skin: 'msg-bg'
                });
            }
        });
    }

    function addComm(pid, text) {
        var data = JSON.stringify({
            "uid": user.uid,
            "onId": $('#authorId').val(),
            "pid": $('#authorId').val(),
            "type": 0,
            "content": text
        });
        console.log(data);
        $.ajax({
            url: path + "/article/comment/add",
            type: 'post',
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (req) {
                if (req.ok) {
                    alert("ok");
                } else {
                    alert("fail");
                }
            }
        });
    }
});