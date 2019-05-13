layui.use(['laytpl','layer','laydate'],function(){
    var laytpl = layui.laytpl,
        layer = layui.layer,
        laydate = layui.laydate,
        $ = layui.$;

    laydate.render({
        elem: "#time1"
    });

    laydate.render({
        elem: "#time2"
    });


    //用户管理
    {
        function initUserS(data) {
            $.ajax({
                type: "get",
                url: path + "/login/user/queryList",
                data: data,
                contentType: false,
                success: function (data) {
                    initUserHtml(data.data);
                }
            });
        }

        function initUserHtml(arr) {
            $(".userManage-items").html("");
            var h = '';
            $.each(arr, function (i, v) {
                h += '<div class="user-item"><div class="item-photo">' +
                    '<img src="' + path + '/personInfo/personInfo/' + v.id + '/down"></div>' +
                    '<div class="item-createTime">' + toDate(v.createTime,0) + '</div>' +
                    '<div class="item-name">' + v.name + '<br>' + toDate(v.birthday, 1) + '</div>' +
                    '<div class="item-onlineTime">' + toDate(v.onlineTime,0) + '</div>' +
                    '<div class="item-violate">';

                switch (v.accountLevel) {
                    case 1:
                        h += 'I';break;
                    case 2:
                        h += 'II';break;
                    case 3:
                        h += 'III';break;
                    case 4:
                        h += 'IV';break;
                    case 5:
                        h += 'V';break;
                }

                h += '</div><div class="item-ranking">' + v.ranking + '</div><div class="item-state">';

                switch (v.status) {
                    case 0:
                        h += '待审批';break;
                    case 1:
                        h += '正常';break;
                    case 2:
                        h += '已禁言';break;
                    case 3:
                        h += '已删除';break;
                }

                h += '</div><div class="user-operation">';

                if (v.status == 0) {
                    h += '<div class="user-operation-btn user-operation-1" style="color: #2b7a2d" name="' + v.id + '" value="1">通过</div>'+
                        '<div class="user-operation-btn user-operation-2" style="color: #00557d" name="' + v.id + '">禁言</div>';
                } else if (v.status == 1){
                    h += '<div class="user-operation-btn user-operation-1" style="color: #949592;border-color: #949592;" name="' + v.id + '">已审批</div>'+
                        '<div class="user-operation-btn user-operation-2" style="color: #00557d" name="' + v.id + '">禁言</div>';
                } else if (v.status == 2) {
                    h += '<div class="user-operation-btn user-operation-1" style="color: #949592;border-color: #949592;" name="' + v.id + '">已审批</div>'+
                        '<div class="user-operation-btn user-operation-2" style="color: #00557d" name="' + v.id + '" value="1">解禁</div>';
                }
                h += '<div class="user-operation-btn user-operation-3" style="color: #7d0001" name="' + v.id + '">删除</div>' +
                    '<div class="user-operation-btn user-operation-4" style="color: #7d7b40" name="' + v.id + '">等级修改</div>' +
                    '</div></div>';
            });
            $(".userManage-items").html(h);
        }

        $("#userSelBtn").click(function () {
            var data = {
                "name": $("#userSel1").val(),
                "id": $("#userSel2").val(),
                "createTime1": $("#time1").val(),
                "createTime2": $("#time2").val(),
                "accountLevel": $("#userSel3").val(),
                "status": $("#userSel4").val()
            };
            initUserS(data);

        });

        $("#userRepBtn").click(function () {
            $("#userSel1").val("");
            $("#userSel2").val("");
            $("#time1").val("");
            $("#time2").val("");
            $("#userSel3").val("");
            $("#userSel4").val("");
            initUserS();
        });

        $("body").on("click", ".user-operation-1", function () {
            var id = $(this).attr("name");
            var attr = $(this).attr("value");
            if ($(this).attr("value") == '1') {
                var data = JSON.stringify({
                    "id": id,
                    "status": 1
                });
                updateUser(data);
            }
        });

        $("body").on("click", ".user-operation-2", function () {
            var id = $(this).attr("name");
            if ($(this).attr("value") == '1') {
                var data = JSON.stringify({
                    "id": id,
                    "status": 1
                });
                updateUser(data);
            } else {
                var data = JSON.stringify({
                    "id": id,
                    "status": 2
                });
                updateUser(data);
            }
        });

        $("body").on("click", ".user-operation-3", function () {
            var id = $(this).attr("name");
            var data = JSON.stringify({
                "id": id,
                "status": 3
            });
            updateUser(data);

        });

        var thisId;
        $("body").on("click", ".user-operation-4", function () {
            thisId = $(this).attr("name");
            layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#userLevel"),
                skin: 'modelBg',    //弹窗样式
                area: ['300px','150px'],  //弹窗大小
                offset: ['300px','780px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: false,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false,  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                cancel: function () {
                    //右上角关闭按钮触发的回调
                    $("#userLevelSel").val("");
                },
                success: function () {
                    $("#userLevelBtn").click(function () {
                        var data = JSON.stringify({
                            "id": id,
                            "accountLevel": $("#userLevelSel").val()
                        });
                        updateUser(data);
                    });

                }
            });
        });

        $("#userLevelBtn").click(function () {
            var data = JSON.stringify({
                "id": thisId,
                "accountLevel": $("#userLevelSel").val()
            });
            updateUser(data);
        });

        function updateUser(data) {
            $.ajax({
                url: path + "/login/user/update",
                type: "post",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.ok){
                        initUserS();
                        $("#userLevelSel").val("");
                        layer.closeAll();
                    }
                }
            });
        }


    }

    //敏感词管理
    {
        initLexicon();
        function initLexicon(data) {
            $.ajax({
                type: "get",
                url: path + "/admin/lexicon/page",
                data: data,
                contentType: false,
                success: function (data) {
                    initLexiconHtml(data.data.list)
                }
            });
        }
        function initLexiconHtml(arr) {
            $(".article-lexicon-items").html("");
            var h = '';
            $.each(arr, function (i, v) {
                h += '<div class="lexicon-item"><p>' + v.word + '</p>' +
                    '<i class="layui-icon lexicon-item-del" name="' + v.id + '">&#x1006;</i></div>';
            });
            $(".article-lexicon-items").html(h);
        }

        $("body").on("click", ".lexicon-item-del", function () {
            var id = $(this).attr("name");
            $.ajax({
                type: "get",
                url: path + "/admin/lexicon/" + id,
                contentType: false,
                success: function (data) {
                    if (data.ok) {
                        initLexicon();
                    }
                }
            });
        })

        $("#lexiconSel").click(function () {
            var data = {
                "word": $("#userLevelSelName").val()
            };
            initLexicon(data);
        });

        $("#lexiconRep").click(function () {
            $("#userLevelSelName").val("");
            initLexicon();
        });

        $("#addLexicon").click(function () {
            layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#lexiconAdd"),
                skin: 'modelBg',    //弹窗样式
                area: ['300px','200px'],  //弹窗大小
                offset: ['150px','800px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: false,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false,  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                cancel: function () {
                    //右上角关闭按钮触发的回调
                    $("#addLexiconName").val("");
                    $("#addLexiconLevel").val("");
                },
                success: function () {

                }
            });
        });

        $("#addLevelBtn").click(function () {
            $.ajax({
                url: path + "/admin/lexicon/add",
                type: "post",
                data: JSON.stringify({
                    "word": $("#addLexiconName").val(),
                    "level": $("#addLexiconLevel").val()
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.ok) {
                        $("#addLexiconName").val("");
                        $("#addLexiconLevel").val("");
                        layer.closeAll();
                        layer.msg("添加成功！！！",{
                            time: 1000
                        });
                        initLexicon();
                    }
                }
            });
        });
    }

    //文章管理
    {
        initArticle();
        function initArticle() {
            $.ajax({
                type: "get",
                url: path + "/article/article/adminReview",
                contentType: false,
                success: function (data) {
                    initArticleHtml(data.data);
                }
            });
        }
        function initArticleHtml(arr) {
            $(".article-massage-items").html("");
            var h = '';
            $.each(arr, function (i, v) {
                h += '<div class="articleMassage-item"><div class="articleMassage-item-operation">' +
                    '<div class="articleMassageBtn1" name="' + v.id + '">查看</div>' +
                    '<div class="articleMassageBtn2" name="' + v.id + '">驳回</div></div>' +
                    '<div class="articleMassage-item-title"><p>' + v.title + '</p>' +
                    '</div><div class="articleMassage-item-time">' + toDate(v.updateTime, 0) + '</div></div>';
            });
            $(".article-massage-items").html(h);
        }

        $("body").on("click",".articleMassageBtn1",function () {
            var aid = $(this).attr("name");
            window.open("articleEdit.html?status=2&aid="+aid);
        });

        $("body").on("click",".articleMassageBtn2",function () {
            var aid = $(this).attr("name");
            $.ajax({
                url: path + "/article/article/update",
                type: "post",
                data: JSON.stringify({
                    "status": 7,
                    "id": aid
                }),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.ok) {
                        layer.msg("文章已驳回！！", {
                            time: 1000
                        });
                        initArticle();
                    }
                }
            });
        });
    }

    //公告管理
    {
        //新增
        $("#addaffiche").click(function () {
            openModel(false, null);
        });

        function openModel(edit,data) {
            if (edit) {
                $("#afficheModel-title-input").val(data.title);
                $(".afficheModel-info-time").text(toDate(data.createTime,0));
                $("#img").attr("src", path + "/article/article/" + data.phontPath + "/down");
                $("#upload").attr("value", data.phontPath);
                $("#content").val(data.content);
            }
            layer.open({
                type: 1,    //弹窗类型,2为页面层
                title: false,   //弹出标题
                content: $("#afficheModel"),
                skin: 'modelBg',    //弹窗样式
                area: ['500px','750px'],  //弹窗大小
                offset: ['100px','780px'],  //弹窗位置[top,left]，默认auto垂直水平居中
                closeBtn: 2,     //右上角关闭按钮，有1、2两种样式，0是不显示
                shade: 0,     //弹层外区域,可自定义样式shade: [0.8, '#393D49']
                shadeClose: false,  //点击弹层外区域关闭
                anim: 0,    //弹出动画
                isOutAnim: true,    //关闭动画
                fixed: true,    //鼠标滚动时，层是否固定在可视区域
                resize: false,  //弹窗大小是否可拖动
                //scrollbar: true   // 是否允许浏览器出现滚动条
                cancel: function () {
                    //右上角关闭按钮触发的回调
                },
                success: function () {

                }
            });
        }

        //上传图片
        $("#img").click(function () {
            $("#photo").trigger("click");
        });
        //头像选择回显
        $("#photo").change(function () {
            var fr = new FileReader();
            fr.readAsDataURL(this.files[0]);
            fr.onloadend = function () {
                $("#img").attr("src", this.result)
            }
        });

        $("#upload").click(function () {
            var formData = new FormData();
            formData.append('articleImg',$("#photo")[0].files[0]);
            $.ajax({
                url: path + "/article/article/imgUpLoad",
                type: 'POST',
                cache: false, //上传文件不需要缓存
                data: formData,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false,
                success: function (data) {
                    if (data.ok) {
                        $("#img").attr("src", path + "/article/article/" + data.data + "/down");
                        $("#upload").attr("value",data.data);
                        layer.msg("上传成功！",{
                            time: 1000
                        });
                    }

                }
            });
        });
        
        $("#afficheModel-btn1").click(function () {
            var data = JSON.stringify({
                "uid": "0000000001",
                "type": 0,
                "title": $("#afficheModel-title-input").val(),
                "content": $("#content").val(),
                "phontPath": $("#upload").attr("value")
            });
            afficheAdd(data);
        });
        $("#afficheModel-btn2").click(function () {
            var data = JSON.stringify({
                "uid": "0000000001",
                "type": 2,
                "title": $("#afficheModel-title-input").val(),
                "content": $("#content").val(),
                "phontPath": $("#upload").attr("value")
            });
            afficheAdd(data);
        });
        
        function afficheAdd(data) {
            $.ajax({
                url: path + "/admin/affiche/add",
                type: "post",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.ok) {
                        initAffiche();
                        layer.closeAll();
                    }
                }
            });
        }

        initAffiche();
        function initAffiche(data){
            $.ajax({
                type: "get",
                url: path + "/admin/affiche/page",
                data: data,
                contentType: false,
                success: function (data) {
                    if (data.ok){
                        initAfficheHtml(data.data.list);
                    }
                }
            });
        }
        function initAfficheHtml(arr) {

            $(".toPublished-items").html("");
            var h = '';
            $.each(arr,function (i, v) {
                h += '<div class="toPublished-item"><div class="toPublished-item-title">\n' +
                    v.title +
                    '</div><div class="toPublished-item-time">\n' +
                    toDate(v.createTime,0) +
                    '</div><div class="toPublished-item-operation">\n' +
                    '<div class="btn-reset-this">';

                if (v.type == 0) {
                    h += '未上线';
                } else {
                    h += '已上线';
                }

                h += '</div>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<div class="btn-reset btn-edit" name="' + v.id + '">编辑</div>\n' +
                    '<div class="btn-reset btn-del" name="' + v.id + '">删除</div>\n' +
                    '</div><div class="toPublished-item-body">\n' +
                    '<img src="' + path+'//article/article/' + v.phontPath + '/down' + '"><p>\n' +
                    v.content +
                    '</p></div></div>';
            });
            $(".toPublished-items").html(h);

        }

        $("body").on("click", ".btn-edit", function () {
            var id = $(this).attr("name");
            $.ajax({
                type: "get",
                url: path + "/admin/affiche/"+id,
                contentType: false,
                success: function (data) {
                    openModel(true, data.data);
                }
            });
        });
        $("body").on("click", ".btn-del", function () {
            var id = $(this).attr("name");
            $.ajax({
                type: "get",
                url: path + "/admin/affiche/delete/"+id,
                contentType: false,
                success: function (data) {
                    if (data.ok) {
                        initAffiche();
                        layer.msg("删除成功！！！",{
                            time: 1000
                        })
                    }
                }
            });
        })


    }

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
                        initUserS();
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

    // //用户管理滚动到底部加载数据
    // {
    //     var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    //     var nScrollTop = 0;   //滚动的距离
    //     var nDivHight = $(".userManage-items").height();  //div高度
    //     $(".userManage-items").scroll(function () {
    //         nScrollHight = $(this)[0].scrollHeight;
    //         nScrollTop = $(this)[0].scrollTop;
    //         if(nScrollTop + nDivHight >= nScrollHight){
    //             layer.load(1,{time: 2000});
    //         }
    //     });
    // }

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


})