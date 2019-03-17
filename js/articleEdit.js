layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$,
        laydate = layui.laydate;


    //文章编辑器部分
    {
        var con = window.wangEditor;
        var e = new con('#content');

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
            'emoticon',  // 表情
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
            e.customConfig.uploadImgServer = 'http://localhost:8088/api/article/article/test';

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
                    console.log(result);
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
        function previewContent(){

            $('#preview').html(e.txt.html());
            console.log(e.txt.html());
            console.log(e.txt.text());

        }
        $('#previewBtn').click(function () {
            console.log('预览');
            previewContent();
        })
    }

    //保存编辑内容（获取编辑器中的内容）
    //保存内容不要使用JSON格式直接获取e.txt.html()
    function addContent(){
        //获取当前编辑器对象
        // var nowContent = new edit('#content');

        //获取当前编辑器内容数据
        console.log(e.txt.html());


    }
    //点击保存
    $("#operation-5").click(function () {
        addContent();
    });



})