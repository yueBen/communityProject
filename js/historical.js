layui.use(['laytpl','layer'],function () {
    var laytpl = layui.laytpl,
        layer = layui.layer,
        $ = layui.$;

    var user = JSON.parse(sessionStorage.getItem("user"));

    $(".author-content-body").hover(function () {
        $(this).children('div').attr('style','display:none');
        $(this).children('marquee').attr('style','display:inherit')
    },function () {
        $(this).children('marquee').attr('style','display:none');
        $(this).children('div').attr('style','display:inherit')
    });

    initPageArticle();
    function initPageArticle() {
        var data = {
            "page": 1,
            "pageSize": 50,
            "uId":  user.uid
        };
        $.ajax({
            type: "get",
            url: path + "/article/article/historyList",
            data: data,
            contentType: false,
            success: function (data) {
                historyHtml(data.data);
            }
        });
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

    function historyHtml(arr) {
        $(".historical-bottom").html("");
        var h = '';
        $.each(arr, function (i, v) {
            h += '<div class="historical-article-item"><div class="author-photo">' +
                '<img style="width: 100%;height: 100%;border-radius: 50%" src="' + path + '/personInfo/personInfo/' + v.uid + '/down"></div><div class="author-content">' +
                '<div class="i-b-left" style="width: 84%;height: 100px;"><div class="i-b-left" style="width: 400px;line-height: 30px;text-align: center;font-size: 23px;font-family: 楷体;color: #fbffd5;">' +
                v.title + '</div><div class="i-b-left" style="width: 200px;line-height: 30px;text-align: center;font-size: 20px;font-family: 楷体;color: #cee0ff;">' +
                v.authorName + '</div><div class="i-b-left" style="width: 200px;line-height: 30px;text-align: center;font-size: 20px;font-family: 楷体;color: #ff8f1a;">' +
                toDate(v.browseTime, 0) + '</div><div class="author-content-body" style="width: 98%;line-height: 33px;font-size: 18px;margin: 0 0 0 2%">' +
                '<div>' + contentFilter(v.content) + '</div><marquee loop="-1" direction="up" height="60">' + contentFilter(v.content) + '</marquee></div></div>' +
                '</div><div class="article-num"><div class="border-L-rad" style="width: 50%;height: 44px;">' +
                '<img style="width: 80%;height: 80%;margin: 10%;" src="../img/icon/white/13.png"></div>' +
                '<div class="border-R-rad" style="width: 50%;line-height: 44px;background: #d1d4d5;text-align: center;color: #23262E">' +
                v.browseNum + '</div></div><div class="article-num"><div class="border-L-rad" style="width: 50%;height: 44px;">' +
                '<img style="width: 80%;height: 80%;margin: 10%;" src="../img/icon/white/collect_1.png"></div>' +
                '<div class="border-R-rad" style="width: 50%;line-height: 44px;background: #d1d4d5;text-align: center;color: #23262E">' +
                v.collectionNum + '</div></div><div class="article-num"><div class="border-L-rad" style="width: 50%;height: 44px;">' +
                '<img style="width: 80%;height: 80%;margin: 10%;" src="../img/icon/white/4.png"></div>' +
                '<div class="border-R-rad" style="width: 50%;line-height: 44px;background: #d1d4d5;text-align: center;color: #23262E">' +
                v.commentNum + '</div></div><div class="article-num historical-btn-del" name="' + v.id + '">删除记录</div></div>';
        });
        $(".historical-bottom").html(h);
    }

    $("body").on("click", ".historical-btn-del", function () {
        var id = $(this).attr("name");
        $.ajax({
            type: "get",
            url: path + "/article/history/" + id,
            contentType: false,
            success: function (data) {
                if (data.ok) {
                    initPageArticle();
                    layer.msg("删除成功！！！",{
                        time: 1000
                    })
                } else {
                    layer.msg("删除失败！！！",{
                        time: 1000
                    })
                }
            }
        });
    });

});