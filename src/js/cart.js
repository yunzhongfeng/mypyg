$(function () {
    init();
    function init(){
         //判断是否登录了
         if(!$.checkLogin()){
             //跳转到登录页面
             sessionStorage.setItem("pageUrl",location.href);
             location.href = "/pages/login.html";
             return;
         }else {
             $('body').fadeIn();
         }
         getCartData();
         eventList(); 
    }
    //给数字输入框+ - 添加tap点击事件 计算总价格
    function eventList(){
         //动态生成的要用到事件委托
         $('.p_cart_con').on("tap","button",function(){
             countAll();
         })
        //点击编辑按钮 => 完成
        $("#edit_btn").on("tap",function(){
            console.log(124);
            $("body").toggleClass("edit_status");
            //动态切换按钮文字内容
            if($("body").hasClass("edit_status")) {
                $("#edit_btn").text("完成");
            }else {
                $("#edit_btn").text("编辑");
            }
        })

    }
    // 查询购物车数据
    function getCartData() {
        //获取token
        var token = $.token();
        //ajax
        $.ajax({
            url:"my/cart/all",
            headers: {Authorization:token},
            success: function(res){
                console.log(res);
               if(res.meta.status == 200){
                var cart_info = JSON.parse(res.data.cart_info);
                // console.log(cart_info);
                var htmlStr = template("cart_tmpl",{"obj":cart_info});
                $(".pyg_cart ul").html(htmlStr);
                //因为是动态生成的,要初始化数字输入框
                mui(".mui-numbox").numbox();
                countAll();
               }else {
                   console.log(res.meta.msg);
               }
            },
            dataType: "json"
        });  
    }
    //计算总价格
    function countAll() {
        //获取所有li标签
        var lis = $(".p_cart_con li");
        //总价格
        var total = 0;
        for(var i=0; i< lis.length;i++){
              var li = lis[i];
              var obj = $(li).data("obj");
              //获得商品的单价
              var tmp_goods_price = obj.goods_price;
              //获得购买的数量
              var nums = $(li).find(".mui-numbox-input").val();
              //计算总价格
              total += tmp_goods_price * nums;
        }
        // console.log(total);
        //给总价格框赋值
        $(".total_price").text(total);
    }

})