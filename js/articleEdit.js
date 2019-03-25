layui.use(['layer','laydate'],function () {
    var layer = layui.layer,
        $ = layui.$,
        laydate = layui.laydate;

    //判断是新增(0)还是修改(1)文章
    var status = location.search.substr(8,9);
    
    var user = JSON.parse(sessionStorage.getItem("user"));

    var con = window.wangEditor;
    var e = new con('#content');

    //加载标签
    loadingLabel();

    //文章编辑器部分
    {
        //配置编辑器参数
        e.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            //'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];

        //配置本地图片上传
        {
            //设置上传接口
            e.customConfig.uploadImgServer = path+'/article/article/imgUpLoad';

            //设置上传名称
            e.customConfig.uploadFileName = 'articleImg';

            //设置图片上传大小
            e.customConfig.uploadImgMaxSize = 10*1024*1024;

            //设置一次上传最多文件数
            e.customConfig.uploadImgMaxLength = 5;

            //处理返回数据
            e.customConfig.uploadImgHooks = {

                before: function (xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function (xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function (xhr,editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = "http://localhost:8088/api/article/article/" + result.data + "/down";
                    insertImg(url);

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }

        }

        //上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
        e.customConfig.customAlert = function(){
            layer.msg("图片上传失败")
        }

        e.create();
        //内容预览
        $('#previewBtn').click(function () {
            $('#preview').html(e.txt.html());
        })
    }

    //保存编辑内容（获取编辑器中的内容）
    //保存内容不要使用JSON格式直接获取e.txt.html()
    //文章提交
    function addArticle(data) {
        var url = "";
        if (status == 0) {
            url = "/article/article/add";
        } else {
            url = "/article/article/update";
        }
        $.ajax({
            url: path + url,
            type: "get",
            data: data,
            success: function (data) {
                if (data.ok) {
                    //成功
                    console.log("success");
                } else {
                    if (data.respCode == 0) {
                        //删除
                        console.log("error1");
                    } else if (data.respCode == 1) {
                        //提示移交管理员
                        console.log("error2");
                    } else if (data.respCode == 2) {
                        //检查确认发布
                        console.log("error3");
                    }
                }
            }
        });
    }

    //发布按钮
    $("#operation-4").click(function () {
        console.log(toHtml(e.txt.html()));
        var data = {
            "content": toHtml(e.txt.html()),
            "labelId": $("#operation-2").val(),
            "type": $("#operation-1").val(),
            "uId": user.uid,
            "releaseTime": toDate($("#operation-3").val(),0),
            "status": 5,
            "title": $("#title").val()
        };
        addArticle(data);
    });

    laydate.render({
        elem: '#operation-3'
    });

    //保存按钮
    $("#operation-5").click(function () {
        console.log(toHtml(e.txt.html()));
        var data = {
            "content": e.txt.html(),
            "labelId": $("#operation-2").val(),
            "type": $("#operation-1").val(),
            "uId": user.uid,
            "releaseTime": null,
            "status": 0,
            "title": $("#title").val()
        };
        addArticle(data);
    });

    //保存草稿箱
    $("#operation-6").click(function () {
        var data = {
            "content": e.txt.html(),
            "labelId": $("#operation-2").val(),
            "type": $("#operation-1").val(),
            "uid": user.uid,
            "releaseTime": null,
            "status": 3,
            "title": $("#title").val()
        };
        addArticle(data);
    });

    //加载文章标签列表
    function loadingLabel() {
        $.ajax({
            type: "get",
            data: {"uId": user.uid},
            url: path+"/article/label/list",
            success: function (data) {
                $.each(data.data,function (i,v) {
                    $("#operation-2").append("<option value='" + v.id + "'>" + v.labelName + "</option>")
                });
            }
        });
    }

    function queryUpdateArticle() {
        $.ajax({
            type: "get",
            url: path+"/article/article/"
        });
    }

});