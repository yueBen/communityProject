layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$,
        laydate = layui.laydate;

    var edit = window.wangEditor;

    //保存编辑内容（获取编辑器中的内容）
    function addContent(){
        //获取当前编辑器对象
        var nowContent = new edit('#content');

        //获取当前编辑器内容数据（json格式)
        var json = nowContent.txt.getJSON();
        console.log(json);

    }
    //点击保存
    $("#operation-5").click(function () {
       addContent();
    });

    //文章编辑器部分
    {
        var con = window.wangEditor;
        var e = new con('#content');

        //配置本地图片上传
        {
            //设置上传接口
            e.customConfig.uploadImgServer = 'http://localhost:8085/api/wangEditorPhoto/test';

            //设置上传名称
            e.customConfig.uploadFileName = '22410';

            //设置图片上传大小
            e.customConfig.uploadImgMaxSize = 3*1024*1024;

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
                }
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            //     customInsert: function (insertImg, result, editor) {
            //         // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            //         // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            //
            //         // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            //         var url = result.url
            //         insertImg(url)
            //
            //         // result 必须是一个 JSON 格式字符串！！！否则报错
            //     }
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

        }
        $('#previewBtn').click(function () {
            console.log('预览');
            previewContent();
        })
    }


})