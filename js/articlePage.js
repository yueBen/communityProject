layui.use(['laytpl','layer','laydate'],function () {
   var laytpl = layui.laytpl,
       layer = layui.layer,
       $ = layui.$;

   var aid = getParam('id',location.search);

    var user = JSON.parse(sessionStorage.getItem("user"));

   //加载文章内容
    $.ajax({
        type: 'get',
        url: path + '/article/article/' + aid,
        success: function (req) {
            $(".article-title-center").text(req.data.title);
            $('.article-content').html(req.data.content);
            $('#articleBrwose>.article-title-left-item-num').text(req.data.browseNum);
            $('#articleHot>.article-title-left-item-num').text(12);
            $('#articleComment>.article-title-left-item-num').text(req.data.commentNum);
            $('#articleLike>.article-title-right-item-num').text(req.data.likeNum?req.data.likeNum:0);
            $('#articleDisLike>.article-title-right-item-num').text(req.data.dislikeNum?req.data.dislikeNum:0);
            $('#articleCollect>.article-title-right-item-num').text(req.data.collectionNum?req.data.collectionNum:0);
            $('#authorId').val(req.data.uid);
            $('#articleId').val(req.data.id);
            initArticleComment(req.data.id);
            initAuthor(req.data.uid);
        },
        error: function () {

        }
    });
    
    function initAuthor(uid) {
        $.ajax({
            type: 'get',
            url: path + '/personInfo/personInfo/' + uid,
            success: function (req) {
                $("#num1").text(req.data.messageNum);
                $("#num2").text(req.data.praiseNum);
                $("#num3").text(req.data.commentNum);
                $("#num4").text("1年");
                $("#num5").text(req.data.browseNum);
                $("#num6").text(req.data.ranking);
                $("#articleAuthorName").text(req.data.name);
                $('.article-author-photo').append('<img src="' + path + '/personInfo/personInfo/' + req.data.uid + '/down" style="width: 100%;height: 100%;border-radius: 50%;">');
                $.ajax({
                    url: path + "/personInfo/relation/isAtten",
                    type: "get",
                    data: {
                        "uId1": user.uid,
                        "uId2": $('#authorId').val()
                    },
                    contentType: false,
                    success: function (data) {
                        console.log(data);
                        if (data.ok) {
                            $("#articleAuthorNameBtn").text(data.data);
                        }
                    }
                });
            },
            error: function () {

            }
        });
    }

    function initArticleComment(pid) {
        var data = {"pId": pid, "onId": $('#authorId').val()};
        $.ajax({
            type: 'get',
            url: path + "/article/comment/list",
            data: data,
            contentType: false,
            success: function (data) {
                $(".article-comment-content").empty();
                commentLevel1(data.data);
            }
        });
    }

    //关注作者
    $("#articleAuthorNameBtn").on("click", function () {
        var url = "";
        var data;
        var isB = $("#articleAuthorNameBtn").text() == "关注";
        if (isB) {
            data = JSON.stringify({
                "id": "5",
                "uid1": user.uid,
                "uid2": $('#authorId').val(),
                "type": 3,
                "status": 1
            });
        } else {
            data = JSON.stringify({
                "id": "3",
                "uid1": user.uid,
                "uid2": $('#authorId').val(),
                "type": 3,
                "status": 0
            });
        }
        $.ajax({
            url: path + "/personInfo/relation/update",
            type: "post",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.ok) {
                    if (data.data.status == 0) {
                        $("#articleAuthorNameBtn").text("关注");
                    } else {
                        $("#articleAuthorNameBtn").text("已关注");
                    }
                } else {
                    $.ajax({
                        url: path + "/personInfo/relation/add",
                        type: "post",
                        data: JSON.stringify({
                            "uid1": user.uid,
                            "uid2": $('#authorId').val(),
                            "type": 3
                        }),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            $("#articleAuthorNameBtn").text("已关注");
                        }
                    });
                }

            }
        });
    });



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
        
        //加载主评论（一级评论）
        function commentLevel1(data) {
            $.each(data,function(i,v){
                var h = '';
                h +='<div class="article-comment-content-item" id="article-comment_' + v.id + '">'+
                    '<div class="article-comment-content-item-body">'+
                    '<div class="article-comment-content-item-body-user">' + v.nameA + '：</div>'+
                    '<div class="article-comment-content-item-body-content">' + v.content + '</div>'+
                    '<div class="article-comment-content-item-body-operation">'+
                    '<div class="commentTime">' + toDate(v.time, 0) + '</div>'+
                    '<div class="commentLike" id="commentLike_' + v.id + '">'+
                    '<img src="../img/icon/white/like_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/like_2.png" style="display: none;">'+'<div>'+ v.like + '</div>'+'</div>'+
                    '<div class="commentDisLike" id="commentDisLike_' + v.id + '">'+
                    '<img src="../img/icon/white/disLike_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/disLike_2.png" style="display: none;">'+'<div>'+ v.dislike + '</div>'+'</div>'+
                    '<div class="commentCom" id="commentCom_' + v.id + '" value="' + v.uid + '">'+
                    '<img src="../img/icon/white/comment.png">' + '<div>' + v.comentNum + '</div>' + '</div>' + '</div>'+
                    '<div class="article-comment-content-item-body-textarea" id="commentText_' + v.id + '">'+
                    '<hr style="width: 100%;border: 0.5px solid #5e5e5e">'+
                    '<textarea placeholder="说点什么吧。。。" id="content_' + v.id + '" class="article-textarea" name="' + v.id + '"></textarea>'+
                    '<span>还可以输入<span id="commentNum_'+ v.id +'" style="font-size: 14px;">500</span>个字符</span>'+
                    '<div class="article-release-btn" name="' + v.id + '" value="' + v.uid + '">发表</div>'+
                    '</div></div>'+'<div id="childComment_' + v.id + '"></div>'+
                    '</div>';
                $('.article-comment-content').append(h);
            });
        }

        //点赞和踩
        $(document).on('click','.commentLike',function () {
            var id = $(this).attr('id').split('_')[1];
            var isLike = $($('#commentLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            var isDisLike = $($('#commentDisLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            var likeNum = $('#commentLike_'+id).children('div')[0];
            var DislikeNum = $('#commentDisLike_'+id).children('div')[0];
            if(isDisLike) {
                likeOrDisLike(id,true,2);
            }
            likeOrDisLike(id,isLike,1);

            if (!isLike && !isDisLike) {
                //新赞
                likeOrDisLikeUpdate(id, 0, likeNum, DislikeNum);
            } else if (isLike && !isDisLike) {
                //取消赞
                likeOrDisLikeUpdate(id, 2, likeNum, DislikeNum);
            } else if (!isLike && isDisLike) {
                //踩转赞
                likeOrDisLikeUpdate(id, 5, likeNum, DislikeNum);
            }
        });
        $(document).on('click','.commentDisLike',function () {
            var id = $(this).attr('id').split('_')[1];
            var isDisLike = $($('#commentDisLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            var isLike = $($('#commentLike_'+id).children('img')[0]).attr('style') === 'display: none;';
            var likeNum = $('#commentLike_'+id).children('div')[0];
            var DislikeNum = $('#commentDisLike_'+id).children('div')[0];
            if(isLike) {
                likeOrDisLike(id,true,1);
            }
            likeOrDisLike(id,isDisLike,2);

            if (!isDisLike && !isLike) {
                //新踩
                likeOrDisLikeUpdate(id, 1, likeNum, DislikeNum);
            } else if (isDisLike && !isLike) {
                //取消踩
                likeOrDisLikeUpdate(id, 3, likeNum, DislikeNum);
            } else if (!isDisLike && isLike) {
                //赞转踩
                likeOrDisLikeUpdate(id, 4, likeNum, DislikeNum);
            }
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

        function likeOrDisLikeUpdate(id, status, likeNum, DisLikeNum) {
            var data = {"id": id, "status": status};
            $.ajax({
                type: 'get',
                url: path + "/article/comment/update",
                data: data,
                contentType: false,
                success: function (data) {
                    $(likeNum).text(data.data.likeNum);
                    $(DisLikeNum).text(data.data.dislikeNum);
                }
            });
        }

        //展开评论
        $(document).on('click','.commentCom',function () {
            var id = $(this).attr('id').split('_')[1],
                uid = $(this).attr("value");
            if($('#commentText_'+id).attr('style') != 'display: inherit;'){
                $('#commentText_'+id).css('display','inherit');
                getCommentData(id, uid);
            }else{
                $('#commentText_'+id).css('display','none');
                $('#childComment_'+id).empty();
            }

        });

        function getCommentData(pid, onId) {
            var data = {"pId": pid, "onId": onId};
            $.ajax({
                type: 'get',
                url: path + "/article/comment/list",
                data: data,
                contentType: false,
                success: function (data) {
                    initComment(data.data, pid);
                }
            });
        }

        //加载评论
        function initComment(arr,id) {
            $.each(arr,function(i,v){
                var h = '';
                h +='<div class="article-comment-content-item-body">'+
                    '<div class="article-comment-content-item-body-user">' + v.nameA + '    回复了__' + v.nameB + '：</div>'+
                    '<div class="article-comment-content-item-body-content">' + v.content + '</div>'+
                    '<div class="article-comment-content-item-body-operation">'+
                    '<div class="commentTime">' + toDate(v.time, 0) + '</div>'+
                    '<div class="commentLike" id="commentLike_' + v.id + '">'+
                    '<img src="../img/icon/white/like_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/like_2.png" style="display: none;">'+'<div>'+ v.like + '</div>'+'</div>'+
                    '<div class="commentDisLike" id="commentDisLike_' + v.id + '">'+
                    '<img src="../img/icon/white/disLike_1.png" style="display: inline-block;">'+
                    '<img src="../img/icon/disLike_2.png" style="display: none;">'+'<div>'+ v.dislike + '</div>'+'</div>'+
                    '<div class="commentCom" id="commentCom_' + v.id + '" value="' + v.uid + '">'+
                    '<img src="../img/icon/white/comment.png">' + '<div>' + v.comentNum + '</div>' + '</div>' + '</div>'+
                    '<div class="article-comment-content-item-body-textarea" id="commentText_' + v.id + '">'+
                    '<hr style="width: 100%;border: 0.5px solid #5e5e5e">'+
                    '<textarea placeholder="说点什么吧。。。" class="article-textarea"id="content_' + v.id + '" name="' + v.id + '"></textarea>'+
                    '<span>还可以输入<span id="commentNum_'+ v.id +'" style="font-size: 14px;">500</span>个字符</span>'+
                    '<div class="article-release-btn" name="' + v.id + '" value="' + v.uid + '">发表</div>'+
                    '</div></div>'+'<div id="childComment_' + v.id + '"></div>';
                $('#childComment_'+id).append(h);
            });
        }

    }

    //标题头部操作
    {
        var isLike = false;
        var disLike = false;
        var isCollect = false;
        $("#articleLike").on("click",function () {
            var data;
            if (isLike) {
                $("#articleLike>.article-title-right-item-img>img").attr("src", "../img/icon/white/like_1.png");
                isLike = false;
                data = JSON.stringify({
                    "id": aid,
                    "likeNum": Number($('#articleLike>.article-title-right-item-num').text())-1
                });
                updateArticle(data);
            } else {
                $("#articleLike>.article-title-right-item-img>img").attr("src", "../img/icon/like_2.png");
                isLike = true;
                if (disLike) {
                    $("#articleDisLike>.article-title-right-item-img>img").attr("src", "../img/icon/white/disLike_1.png");
                    disLike = false;

                    data = JSON.stringify({
                        "id": aid,
                        "likeNum": Number($('#articleLike>.article-title-right-item-num').text())+1,
                        "dislikeNum": Number($('#articleDisLike>.article-title-right-item-num').text())-1
                    });
                    updateArticle(data);
                } else {
                    data = JSON.stringify({
                        "id": aid,
                        "likeNum": Number($('#articleLike>.article-title-right-item-num').text())+1
                    });
                    updateArticle(data);
                }
            }

        });

        $("#articleDisLike").on("click",function () {
            var data;
            if (disLike) {
                $("#articleDisLike>.article-title-right-item-img>img").attr("src", "../img/icon/white/disLike_1.png");
                disLike = false;
                data = JSON.stringify({
                    "id": aid,
                    "dislikeNum": Number($('#articleDisLike>.article-title-right-item-num').text())-1
                });
                updateArticle(data);
            } else {
                $("#articleDisLike>.article-title-right-item-img>img").attr("src", "../img/icon/disLike_2.png");
                disLike = true;
                if (isLike) {
                    $("#articleLike>.article-title-right-item-img>img").attr("src", "../img/icon/white/like_1.png");
                    isLike = false;

                    data = JSON.stringify({
                        "id": aid,
                        "likeNum": Number($('#articleLike>.article-title-right-item-num').text())-1,
                        "dislikeNum": Number($('#articleDisLike>.article-title-right-item-num').text())+1
                    });
                    updateArticle(data);
                } else {
                    data = JSON.stringify({
                        "id": aid,
                        "dislikeNum": Number($('#articleDisLike>.article-title-right-item-num').text())+1
                    });
                    updateArticle(data);
                }
            }

        });

        $("#articleCollect").on("click",function () {
            var data;
            if (isCollect) {
                $("#articleCollect>.article-title-right-item-img>img").attr("src", "../img/icon/white/collect_1.png");
                isCollect = false;
                data = JSON.stringify({
                    "id": aid,
                    "collectionNum": Number($('#articleCollect>.article-title-right-item-num').text())-1
                });
                updateArticle(data);
            } else {
                $("#articleCollect>.article-title-right-item-img>img").attr("src", "../img/icon/collect_2.png");
                isCollect = true;
                data = JSON.stringify({
                    "id": aid,
                    "collectionNum": Number($('#articleCollect>.article-title-right-item-num').text())+1
                });
                updateArticle(data);
            }

        });

        //修改文章赞踩收藏
        function updateArticle(data) {
            $.ajax({
                url: path + "/article/article/update",
                type: "post",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.ok) {
                        $('#articleLike>.article-title-right-item-num').text(data.data.likeNum?data.data.likeNum:0);
                        $('#articleDisLike>.article-title-right-item-num').text(data.data.dislikeNum?data.data.dislikeNum:0);
                        $('#articleCollect>.article-title-right-item-num').text(data.data.collectionNum?data.data.collectionNum:0);
                    }
                }
            });
        }
    }

    //发表文章评论
    {
        $('#article-comments-text').keyup(function () {
            var curLength = $(this).val().trim().length;
            $('#commentCharNum').text(500-curLength);
        });

        $(".article-comment-content").on("keyup", ".article-textarea", function () {
            var curLength = $(this).val().trim().length;
            var id = $(this).attr("name");
            $('#commentNum_'+id).text(500-curLength);
        });

        //文章评论发布
        $('#btnArticleComm').on('click',function () {
            if (user) {
                addComm($('#articleId').val(), $('#authorId').val(), $('#article-comments-text').val());
            } else {
                layer.msg("请登录！！！",{
                    time: 2000,
                    // offset: ['150px','1600px'],
                    skin: 'msg-bg'
                });
            }
        });

        $(".article-comment-content").on("click", ".article-release-btn", function () {
            var id = $(this).attr("name"),
                uid = $(this).attr("value");
            if (user) {
                addComm(id, uid, $('#content_'+id).val());
            } else {
                layer.msg("请登录！！！",{
                    time: 2000,
                    // offset: ['150px','1600px'],
                    skin: 'msg-bg'
                });
            }
        });

        function addComm(pid, onId, text) {
            var data = JSON.stringify({
                "uid": user.uid,
                "onId": onId,
                "pid": pid,
                "type": 0,
                "content": text
            });
            $.ajax({
                url: path + "/article/comment/add",
                type: 'post',
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (req) {
                    if (req.ok) {

                        $('#article-comments-text').animate({height: 30},300);
                        $('.article-comments-add').animate({height: 0},300);
                        setTimeout(function () {
                            $('.article-comments-add').css('display','none');
                        },300);

                        $("#article-comments-text").val("");
                        $("#commentCharNum").text(500);
                        initArticleComment($('#articleId').val());
                        layer.msg("发表成功！",{
                            time: 2000,
                            // offset: ['150px','1600px'],
                            skin: 'msg-bg'
                        });
                    } else {
                        layer.msg("失败！",{
                            time: 800,
                            // offset: ['150px','1600px'],
                            skin: 'msg-bg'
                        });
                    }
                }
            });
        }
    }




});