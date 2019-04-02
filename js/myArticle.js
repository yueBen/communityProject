layui.use(['laytpl','layer'],function () {
    var laytpl = layui.laytpl,
        layer = layui.layer,
        $ = layui.$;

    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
        layer.msg("请登录！！！");
    }

    loadMyArticle();

    //点击文章选中
    // $(".myArticle-bottom-articles").on("click",".article-item",function () {
    //     if (this.className.indexOf('article-item-check')<0){
    //         $(this).addClass('article-item-check');
    //     }else{
    //         $(this).removeClass('article-item-check');
    //     }
    // });


    //阻止父级事件冒泡
    // $(".myArticle-bottom-articles").on("click",".article-item-btn",function () {
    //     e.stopPropagation();
    // });

    //新增文章
    $("#addArticle").click(function () {
        window.open("articleEdit.html?status=0");
    });

    //加载我的文章，所有已发布未发布待审批的文章，不加载草稿箱内容
    function loadMyArticle(data) {
        if (data == null) {
            data = {
                "uId": user.uid,
                "id": 2
            }
        }
        $.ajax({
            type: 'get',
            url: path+"/article/article/page",
            data: data,
            success: function (req) {
                $(".myArticle-bottom-articles").append(myArticleHtml(req.data.list));
            },
            error: function () {

            }
        });
    }

    //拼接我的文章页面
    function myArticleHtml(list) {
        var html = '';
        $.each(list,function (i,v) {
            html += '<div class="article-item"><div class="article-item-title">'+ v.title +
                    '</div><div class="article-item-time">'+ toDate(v.updateTime,0) + '</div>'+
                    '<div class="article-item-btn btn-1" name="' + v.id + '">编辑</div><div class="article-item-btn btn-2" name="' + v.id + '">';

            if (v.status == 0) {
                html += '已保存';
            } else if (v.status == 1) {
                html += '已下线';
            } else if (v.status == 2) {
                html += '待审批';
            } else if (v.status == 5) {
                html += '已发布';
            } else if (v.status == 6) {
                html += '待发布';
            } else {
                html += '蛤?';
            }

            html += '</div><div class="article-item-content">' + contentFilter(v.content) + '</div></div>';
        });

        return html;
    }

    //文章编辑
    $(".myArticle-bottom-articles").on("click",".btn-1",function () {
        var aid = $(this).attr("name");
        window.open("articleEdit.html?status=1&aid="+aid);
    });
    
    //文章内容处理只保留文字
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


});
