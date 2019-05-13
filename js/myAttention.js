layui.use('laytpl',function () {
   var laytpl = layui.laytpl,
       $ = layui.$;

    var user = JSON.parse(sessionStorage.getItem("user"));

    //页面动画
    {
        //悬浮在已关注博主上时显示取消关注按钮
        $("body").on('mouseenter','.my-attention',function(){
            var id = $(this).attr('name');
            $('.my-attention-name[name=' + id + ']').animate({width: '55.5%'},100,function () {
                $('.my-attention-del[name=' + id + ']').show(100);
            });
        });
        $("body").on('mouseleave','.my-attention',function(){
            var id = $(this).attr('name');
            $('.my-attention-name[name=' + id + ']').animate({width: '80.5%'},200,function () {
                $('.my-attention-del[name=' + id + ']').hide(100);
            });
        });

    }

    initPageArticle();
    function initPageArticle() {
        var data = {
            "page": 1,
            "pageSize": 50,
            "uId":  user.uid
        };

        $.ajax({
            type: "get",
            url: path + "/article/article/attePage",
            data: data,
            contentType: false,
            success: function (data) {
                attentionHtml(data.data);
            }
        });
    }

    //拼接我的关注文章
    function attentionHtml(arr) {
        $(".myAttention-left").html("");
        var h = '';
        $.each(arr, function (i,v) {
           h += '<div class="myAttention-left-item"><div class="item-photo">'+
               '<img src="' + path + '/personInfo/personInfo/' + v.uid + '/down"></div>'+
               '<div class="item-article"><div class="item-article-title">' + v.title + '</div>'+
               '<div class="item-article-time">' + v.releaseTime + '</div>'+
               '<div class="item-article-author">' + v.labelId + '</div>'+
               '<div class="item-article-text"><p>' + contentFilter(v.content) + '</p></div></div>'+
               '<div class="item-state"><div style="width: 100%;height: 36px;margin: 0 0 4px 0;border-radius: 10px;overflow: hidden">'+
               '<div class="item-state-item" style="margin: 0 2.5% 0 0;"><div class="item-state-item-img">'+
               '<img src="../img/icon/white/like_1.png"></div><div class="item-state-item-num">' + v.likeNum + '</div></div>'+
               '<div class="item-state-item" style="margin: 0 0 0 2.5%;"><div class="item-state-item-img">'+
               '<img src="../img/icon/white/disLike_1.png"></div><div class="item-state-item-num">' + v.dislikeNum + '</div></div></div>'+
               '<div style="width: 100%;height: 36px;margin: 8px 0 0 0;border-radius: 10px;overflow: hidden">'+
               '<div class="item-state-item" style="margin: 0 2.5% 0 0;"><div class="item-state-item-img">'+
               '<img src="../img/icon/white/collect_1.png"></div><div class="item-state-item-num">' + v.collectionNum + '</div></div>'+
               '<div class="item-state-item" style="margin: 0 0 0 2.5%;"><div class="item-state-item-img">'+
               '<img src="../img/icon/white/comment.png"></div><div class="item-state-item-num">' + v.browseNum + '</div></div></div></div></div>'+
               '<hr class="layui-bg-blue" style="width: 94%;margin: 0 0 0 2%">'
        });
        $(".myAttention-left").html(h);
    }

    function contentFilter(str) {
        str = str.replace(/&nbsp;/g,"");
        var content = "&nbsp;";
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '<') {
                i = str.indexOf('>',i);
            } else {
                content += str.charAt(i);
            }
        }
        return content;
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
        var style = $('#queryBlogger').attr('style');
        if(style.indexOf('display: none;')<0){
            if(!(id === 'queryBlogger' || id === 'queryBloggerBtn' || onclass === 'query-blogger' || onclass === 'query-blogger-img' ||
                    onclass === 'query-blogger-name' || onclass === 'query-blogger-attention')){
                $('#queryBlogger').hide(200);
            }
        }
        $("#queryBloggerName").val("");
    });

    //关注查询
    $("#queryBloggerBtn").on("click", function () {
        var data = {
            "uId": user.uid,
            "id": "2",
            "name": $("#queryBloggerName").val()
        };
        $.ajax({
            type: "get",
            url: path + "/personInfo/personInfo/SelAddFri",
            data: data,
            contentType: false,
            success: function (data) {
                selBloggerItemHtml(data.data)
            }
        });
    });
    function selBloggerItemHtml(arr) {
        $("#queryBlogger").html("");
        var h = '';
        $.each(arr, function (i, v) {
            h += '<div class="query-blogger"><div class="query-blogger-img">'+
                '<img src="' + path + '/personInfo/personInfo/' + v.uid + '/down" style="width: 100%;height: 100%;border-radius: 50%"></div>'+
                '<div class="query-blogger-name">' + v.name + '</div>'+
                '<div class="query-blogger-attention" name="' + v.uid + '">关注</div></div>';
        });
        $("#queryBlogger").html(h);
    }

    getUser();
    function getUser() {
        $.ajax({
            type: "get",
            url: path + "/personInfo/personInfo/getUser",
            data: {
                "uId": user.uid,
                "id": "2"
            },
            contentType: false,
            success: function (data) {
                bloggerUserHtml(data.data);
            }
        });
    }
    function bloggerUserHtml(arr) {
        $(".my-attentions").html("");
        var h = '';
        $.each(arr, function (i, v) {
            h += '<div class="my-attention" name="' + v.uid + '"><div class="my-attention-img">'+
                '<img src="' + path + '/personInfo/personInfo/' + v.uid + '/down" style="width: 100%;height: 100%;border-radius: 50%">'+
                '</div><div class="my-attention-name" name="' + v.uid + '">' + v.name + '</div>\n' +
                '<div class="my-attention-del" style="display: none" name="' + v.uid + '">del</div></div>';
        });
        $(".my-attentions").html(h);
    }

    $("body").on("click", '.query-blogger-attention', function () {
        var uid = $(this).attr("name");
        var data = JSON.stringify({
                "id": "5",
                "uid1": user.uid,
                "uid2": uid,
                "type": 3,
                "status": 1
            });

        $.ajax({
            url: path + "/personInfo/relation/update",
            type: "post",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.ok) {
                    getUser();
                    initPageArticle();
                } else {
                    $.ajax({
                        url: path + "/personInfo/relation/add",
                        type: "post",
                        data: JSON.stringify({
                            "uid1": user.uid,
                            "uid2": uid,
                            "type": 3
                        }),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.ok) {
                                getUser();
                                initPageArticle();
                            }
                        }
                    });
                }

            }
        });
    });

    $("body").on("click", '.my-attention-del', function () {
       var uid = $(this).attr("name");
       var data = JSON.stringify({
           "id": "3",
           "uid1": user.uid,
           "uid2": uid,
           "type": 3,
           "status": 0
       });
        $.ajax({
            url: path + "/personInfo/relation/update",
            type: "post",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.ok) {
                    getUser();
                    initPageArticle();
                }
            }
        });
    });


});