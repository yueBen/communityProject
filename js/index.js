layui.use('layer',function () {
    var layer = layui.layer,
        $ = layui.$;


    //顶部输入框获焦，输入框边长
    $('.head-input>input').focus(function () {
        var index = this.id.charAt(this.id.length-1);
        $('#head-input-'+index).animate({width:150},300);
        console.log('.head-input-'+index);
    });
    //顶部输入框失焦，输入框还原
    $('.head-input>input').blur(function () {
        var index = this.id.charAt(this.id.length-1);
        var wid = 60;
        if(index === '2' || index === '3'){
            wid = 110;
        }
        $('#head-input-'+index).animate({width:wid},300);
        console.log('.head-input-'+index);
    });

    //跟换页面样式
    $('#user-photo').click(function () {
        console.log(2);
        $('.home-page-right').animate({width: 0,height: 0,margin: 0,padding: 0},400);
        $('.home-page-body').animate({width: "76%",margin:"1% 0 0 2%"},500);
    })

});