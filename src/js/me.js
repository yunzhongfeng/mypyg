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