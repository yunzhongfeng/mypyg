$(function(){
     init();
    function init(){
          // 判断是否已经登录
    if (!$.checkLogin()) {
        // 重新跳转到登录页面
        $.setPage();
        location.href = "/pages/login.html"
        return;
      } else {
        $("body").fadeIn();
      }
      queryOrders();
    }
    //查询订单,发送ajax http://api.pyg.ak48.xyz/api/public/v1/my/orders/all
    function queryOrders(){
        $.ajax({
            url:"my/orders/all",
            data:{type:1},
            headers: {
              Authorization: $.token()
            },
            success: function(res){
                console.log(res);
                 if(res.meta.status == 200){
                     var arr = res.data;
                     var htmlStr = template("order_tmpl",{arr:arr});
                     $("#item1 ul").html(htmlStr);
                 }else {
                     mui.toast(res.meta.msg);
                 }
            },
            dataType: "json"

        });
    }
})