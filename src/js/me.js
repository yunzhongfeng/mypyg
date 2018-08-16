$(function () {
    init();
    function init() {
        // 判断是否已经登录
        if (!$.checkLogin()) {
            // 重新跳转到登录页面
            $.setPage();
            location.href = "/pages/login.html"
            return;
        } else {
            $("body").fadeIn();
        }
        getUserInfo();
        eventList();
    }

    //事件函数
    function eventList(){
        //退出
        $("#loginOutBtn").on("tap",function () {
            mui.confirm("是否要退出登录?","提示",["确定","取消"],function(etype){
                if(etype.index == 0){
                    //0 为确定
                    $.removeUser();
                    $.setPage();
                    location.href = "/pages/login.html";
                }else if(etype.index == 1){
                    //1 为取消 不用跳转
                }
            })
        
        })
    }
    //获得用户信息
    function getUserInfo(){
        $.ajax({
            url: "my/users/userinfo",
            headers: {
                Authorization: $.token()
              },
            success: function(res){
                // console.log(res);
                if(res.meta.status == 200){
                    var htmlStr = template("me_temp",{data:res.data});
                    $(".pyg_userinfo").html(htmlStr);
                }else {
                    mui.toast(res.meta.msg);
                }
            },
            dataType: "json"  
        }); 
    }
})