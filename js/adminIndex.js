layui.use(['laytpl','layer'],function(){
    var laytpl = layui.laytpl,
        layer = layui.layer,
        $ = layui.$;

    //页面动画
    {
        var showNum = 2;//判断当前展开页

        //展开用户管理页
        $(".userManage").click(function () {
            if (showNum != 1){
                $(".notice-hidden-hint").hide(100,function () {
                    $(".noticeManage").animate({width: 0,margin: "0 0 0 1%"},200);
                });

                $(".articleManage").animate({width: "6%"},300,function () {
                    $(".article-hidden-hint").show(200);
                });
                $(".user-hidden-hint").hide(100,function () {
                    $(".userManage").animate({width: "88%"},200,function () {
                        $(".userManage-query").show("normal");
                        $(".userManage-items").show("normal");
                    });
                });

                showNum = 1;
            }
        });

        //展开文章管理页
        $(".articleManage").click(function () {
           if (showNum != 2){
               if (showNum == 1) {
                   $(".userManage-query").hide("normal");
                   $(".userManage-items").hide("normal");
                   $(".userManage").animate({width: "6%"},300,function () {
                       $(".user-hidden-hint").show(200);
                   });
                   $(".article-hidden-hint").hide(100,function () {
                       $(".articleManage").animate({width: '80%'},200);
                   });
                   $(".noticeManage").animate({width: "6%",margin: "2% 2% 2% 1%"},300,function () {
                       $(".notice-hidden-hint").show(200);
                   });
               }
               if (showNum == 3){
                   $(".noticeManage").animate({width: "6%"},300,function () {
                       $(".notice-hidden-hint").show(200);
                   });
                   $(".userManage-query").hide("normal",function () {
                       $(".userManage").animate({width: "6%"},200);
                   });
                   $(".article-hidden-hint").hide(100,function () {
                       $(".articleManage").animate({width: '80%'},200);
                   });
                   $(".userManage").animate({width: "6%",margin: "2% 1% 2% 2%"},300,function () {
                       $(".user-hidden-hint").show(200);
                   });
               }
               showNum = 2;
           }
        });

        //展开公告管理页
        $(".noticeManage").click(function () {
            if (showNum != 3){
                $(".user-hidden-hint").hide(100,function () {
                    $(".userManage").animate({width: 0,margin: "0 1% 0 0"},200);
                });

                $(".articleManage").animate({width: "6%"},300,function () {
                    $(".article-hidden-hint").show(200);
                });
                $(".notice-hidden-hint").hide(100,function () {
                    $(".noticeManage").animate({width: "88%"},300);
                });
                showNum = 3;
            }
        })

    }

    //悬浮提示
    {
        //记录弹窗层
        var tipsTh;

        $(".item-createTime").hover(function () {
            tipsTh = layer.tips("注册时间",this,{
                tips: 1
            })
        },function () {
            layer.close(tipsTh)
        });

        $(".item-onlineTime").hover(function () {
            tipsTh = layer.tips("上线时间",this,{
                tips: 1
            })
        },function () {
            layer.close(tipsTh)
        });

        $(".item-violate").hover(function () {
            tipsTh = layer.tips("等级",this,{
                tips: 1
            })
        },function () {
            layer.close(tipsTh)
        });

        $(".item-ranking").hover(function () {
            tipsTh = layer.tips("排名",this,{
                tips: 1
            })
        },function () {
            layer.close(tipsTh)
        });
    }

    //用户管理滚动到底部加载数据
    {
        var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
        var nScrollTop = 0;   //滚动的距离
        var nDivHight = $(".userManage-items").height();  //div高度
        $(".userManage-items").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if(nScrollTop + nDivHight >= nScrollHight){
                layer.load(1,{time: 2000});
            }
        });
    }

}
)