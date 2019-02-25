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
})