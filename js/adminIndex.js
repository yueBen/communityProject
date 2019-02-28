layui.use('laytpl',function(){
    var laytpl = layui.laytpl,
        $ = layui.$;

    //页面动画
    {
        var showNum = 2;//判断当前展开页

        //展开用户管理页
        $(".userManage").click(function () {
            if (showNum != 1){
                $(".noticeManage").animate({width: 0,margin: "0 0 0 1%"},300);
                $(".articleManage").animate({width: "6%"},300);
                $(".userManage").animate({width: "88%"},300);
                showNum = 1;
            }
        });

        //展开文章管理页
        $(".articleManage").click(function () {
           if (showNum != 2){
               if (showNum == 1) {
                   $(".userManage").animate({width: "6%"},300);
                   $(".articleManage").animate({width: '80%'},300);
                   $(".noticeManage").animate({width: "6%",margin: "2% 2% 2% 1%"},300);
               }
               if (showNum == 3){
                   $(".noticeManage").animate({width: "6%"},300);
                   $(".articleManage").animate({width: '80%'},300);
                   $(".userManage").animate({width: "6%",margin: "2% 1% 2% 2%"},300);
               }
               showNum = 2;
           }
        });

        //展开公告管理页
        $(".noticeManage").click(function () {
            if (showNum != 3){
                $(".userManage").animate({width: 0,margin: "0 1% 0 0"},300);
                $(".articleManage").animate({width: "6%"},300);
                $(".noticeManage").animate({width: "88%"},300);
                showNum = 3;
            }
        })

    }

}
)