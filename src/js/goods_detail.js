$(function () {
    //声明商品详情信息变量
    var GoodsObj;
    init();
    function init() {
        getDetail();
        eventList();
    }
    function eventList(){
        $(".goods_add").on("tap",function(){
             // 判断永久存储中有没有userinfo
             if(!$.checkLogin()){
                 //取反进来了表示没有用户数据,没登录过
                    //提示未登陆
                    mui.toast("未登陆");
                    //回话存储当前路径
                    $.setPage();
                    // debugger;
                    setTimeout(() => {
                        location.href = "/pages/login.html";
                    }, 1000);
                    return; //不向下继续执行
             }
             // 发送到后台的参数分为两种
            // 1 常规的参数   $.ajax({data:obj})
            // 2 token 登录验证使用 => 请求头中 
            /* 发送ajax请求 */
            // var token = JSON.parse(localStorage.getItem("userinfo")).token;
            var token = $.token();
            var getGoodsObj = {
                cat_id: GoodsObj.cat_id,
                goods_id: GoodsObj.goods_id,
                goods_name: GoodsObj.goods_name,
                goods_number: GoodsObj.goods_number,
                goods_price: GoodsObj.goods_price,
                goods_weight: GoodsObj.goods_weight,
                goods_small_logo: GoodsObj.goods_small_logo
            };
            $.ajax({
                url:"my/cart/add",
                type: "post",
                data:{info:JSON.stringify(getGoodsObj)},
                headers:{Authorization: token},  //在响应头中设置token
                success: function(res){
                    if(res.meta.status == 401){
                            //提示未登陆
                            mui.toast("未登陆");
                            //回话存储当前路径
                            $.setPage();
                            // debugger;
                            setTimeout(() => {
                                location.href = "/pages/login.html";
                            }, 1000);
                        }else if(res.meta.status == 200){
                            /* 1 弹出一个确认框  2 跳转到购物车页面 3 留在当前页面  */
                           mui.confirm("是否跳转到购物车","添加成功",["确定","取消"],function(etype){
                               console.log(etype);
                              if(etype.index == 0){
                                  //跳转到购物车
                                 setTimeout(() => {
                                    location.href = "/pages/cart.html";
                                 }, 1000);
                              }else if(etype.index == 1) {
                                //   不跳转
                              }
                           })
                        }
                },
                dataType: "json"
            });








            // $.post("my/cart/add",{},function(res){
            //     console.log(res);
            //     if(res.meta.status == 401){
            //         //提示未登陆
            //         mui.toast("未登陆");
            //         //回话存储当前路径
            //         sessionStorage.setItem("pageUrl",location.href);
            //         // debugger;
            //         setTimeout(() => {
            //             location.href = "/pages/login.html";
            //         }, 1000);
            //     }
            // },"json")
        })
    }
    //获取商品详情
    function getDetail(){
        $.get("goods/detail",{goods_id:$.getUrlValue("goods_id")},function(res){
            console.log(res);
            // 把商品信息赋值给全局变量
             GoodsObj = res.data;
            //  console.log(GoodsObj);
            var htmlStr = template("goods_tmpl",{data:res.data});
            $(".pyg_view").html(htmlStr);
             //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:2500//自动轮播周期，若为0则不自动播放，默认为0；
            });
        },'json');
    }
})