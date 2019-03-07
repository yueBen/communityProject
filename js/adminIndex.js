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

                $(".articleManage-hidden").hide(100,function () {
                    $(".articleManage").animate({width: "6%"},200,function () {
                        $(".article-hidden-hint").show(200);
                    });
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
                       $(".articleManage-hidden").show(100);
                   });
                   $(".noticeManage").animate({width: "6%",margin: "2% 2% 2% 1%"},300,function () {
                       $(".notice-hidden-hint").show(200);
                   });
               }
               if (showNum == 3){
                   $(".noticeManage-hidden").hide(200)
                   $(".noticeManage").animate({width: "6%"},300,function () {
                       $(".notice-hidden-hint").show(200);
                   });
                   $(".userManage-query").hide("normal",function () {
                       $(".userManage").animate({width: "6%"},200);
                   });
                   $(".article-hidden-hint").hide(100,function () {
                       $(".articleManage").animate({width: '80%'},200);
                       $(".articleManage-hidden").show(100);
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


                $(".articleManage-hidden").hide(100,function () {
                    $(".articleManage").animate({width: "6%"},200,function () {
                        $(".article-hidden-hint").show(200);
                    });
                });

                $(".notice-hidden-hint").hide(100,function () {
                    $(".noticeManage").animate({width: "88%"},300);
                    $(".noticeManage-hidden").show(200)
                });
                showNum = 3;
            }
        })

    }

    //悬浮提示
    {
        //记录弹出层
        var tips;

        //用户管理弹窗层

        $(".item-createTime").hover(function () {
            tips = layer.tips("注册时间",this,{
                tips: 1
            })
        },function () {
            layer.close(tips)
        });

        $(".item-onlineTime").hover(function () {
            tips = layer.tips("上线时间",this,{
                tips: 1
            })
        },function () {
            layer.close(tips)
        });

        $(".item-violate").hover(function () {
            tips = layer.tips("等级",this,{
                tips: 1
            })
        },function () {
            layer.close(tips)
        });

        $(".item-ranking").hover(function () {
            tips = layer.tips("排名",this,{
                tips: 1
            })
        },function () {
            layer.close(tips)
        });

        //文章标题弹出层
        $(".articleMassage-item-title>p").hover(function () {
            tips = layer.tips($(this).text(),this,{
                tips: 3
            });
        },function () {
            layer.close(tips);
        });

        //记录用户公告申请弹窗栏
        $(".user-notice-pending-item-title>p").hover(function () {
            tips = layer.tips($(this).text(),this,{
                tips: 1
            });
        },function () {
            layer.close(tips);
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

    //页面按钮
    {
        //用户公告申请时间排序按钮
        $("#userNotice-timeRank").click(function () {

        })

        //添加敏感词
        $("#addLexicon").click(function () {
            openAddLexicon()
        });
    }

    //模态框弹出层
    {
        function openAddLexicon() {
            // layer.open({
            //     type: 2,
            //     title: false,
            //     content: '../page/model/text.html',
            //     skin: 'modelBg',
            //     area: ['800px', '400px'],
            //     closeBtn:1
            // });
        }
    }

}
)