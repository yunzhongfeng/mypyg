$(function () {
    init();

    function init() {
        //判断是否登录了
        if (!$.checkLogin()) {
            //跳转到登录页面
            $.setPage();
            location.href = "/pages/login.html";
            return;
        } else {
            $('body').fadeIn();
        }
        getCartData();
        eventList();
    }

    function eventList() {
        //给数字输入框+ - 添加tap点击事件 计算总价格
        //动态生成的要用到事件委托
        $('.p_cart_con').on("tap", "button", function () {
            countAll();
        })
        //点击编辑按钮 => 完成
        $("#edit_btn").on("tap", function () {
            // console.log(124);
            $("body").toggleClass("edit_status");
            //动态切换按钮文字内容
            if ($("body").hasClass("edit_status")) {
                $("#edit_btn").text("完成");
            } else {
                $("#edit_btn").text("编辑");
                /* 0 获取所有的li标签 
                   1判断有没有商品
                   2 循环 li标签 */
                var lis = $(".p_cart_con li");
                //1 判断有没有商品在购物车中
                if (lis.length == 0) {
                    mui.toast("购物车空空如也~");
                    return;
                }
                //2 循环li标签
                //2.1 先声明发送到后台的infos对象
                var infos = {};
                for (var i = 0; i < lis.length; i++) {
                    var li = lis[i];
                    //2.2获得商品对象,存在li标签data-obj自定义属性中
                    var obj = $(li).data("obj");
                    //2.3动态改变购买数量 amount
                    obj.amount = $(li).find(".mui-numbox-input").val();
                    infos[obj.goods_id] = obj;
                }
                //2.4 开始调用封装好的函数同步数据
                syncCart(infos);
            }
        })
        //点击删除按钮 清除对应数据
        $("#delete_btn").on("tap", function () {
            //1 获取被选中的多选框
            var chks = $(".p_cart_con [name='g_chk']:checked");
            //    console.log(chks);
            //    debugger;
            if (chks.length == 0) {
                mui.toast("还没选中商品");
                return;
            }
            //2 弹出确认框 
            mui.confirm("是否要删除?", "温馨提示", ["确定", "取消"], function (etype) {
                if (etype.index == 0) {
                    //确认删除 获取未被选中的商品=> 获取为被选中的复选框的父元素li
                    var unSelectLis = $(".p_cart_con [name='g_chk']").not(":checked").parents("li");
                    //声明被删除的对象字段
                    var infos = {};
                    for (var i = 0; i < unSelectLis.length; i++) {
                        //获取每个未选中的复选框父元素li
                        var li = unSelectLis[i];
                        var obj = $(li).data("obj");
                        infos[obj.goods_id] = obj;
                    }
                    //开始发送ajax请求,同步数据
                    syncCart(infos);
                } else if (etype.index == 1) {
                    //点击了取消按钮
                    console.log("取消");
                }
            })
        })
        // 给生成订单按钮绑定点击事件
        $(".or_create").on("tap", function () {
            /* 0 获取所有的li标签 
                1判断有没有商品
                2 循环 li标签 */
            var lis = $(".p_cart_con li");
            //1 判断有没有商品在购物车中
            if (lis.length == 0) {
                mui.toast("你还没有购买过商品~");
                return;
            }
            //设置要发送的参数
            var paramsObj = {
                order_price: $(".total_price").text(),
                consignee_addr: "广州市天河区吉山幼儿园",
                goods:[]
            }
            //循环获得li标签中保存的对象值
            for(var i=0; i<lis.length; i++) {
                var li = lis[i];
                var obj = $(li).data("obj");
                var tmp = {
                    goods_id:obj.goods_id,
                    goods_price:obj.goods_price,
                    goods_number:$(li).find(".mui-numbox-input").val()
                }
                paramsObj.goods.push(tmp);//将tmp对象保存为paramsObj对象属性goods的值
                //开始发送数据
                orderCreate(paramsObj);
            }
        })
    }
    // 查询购物车数据
    function getCartData() {
        //获取token
        var token = $.token();
        //ajax
        $.ajax({
            url: "my/cart/all",
            headers: {
                Authorization: token
            },
            success: function (res) {
                console.log(res);
                if (res.meta.status == 200) {
                    //判断有没有商品在购物车
                    if (res.data.cart_info) {
                        var cart_info = JSON.parse(res.data.cart_info);
                        console.log(cart_info);
                        var htmlStr = template("cart_tmpl", {
                            "obj": cart_info
                        });
                        $(".pyg_cart ul").html(htmlStr);
                        //因为是动态生成的,要初始化数字输入框
                        mui(".mui-numbox").numbox();
                        countAll();
                    }
                } else {
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
        for (var i = 0; i < lis.length; i++) {
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
    //同步购物车数据
    function syncCart(infos) {
        $.ajax({
            url: "my/cart/sync",
            type: "post",
            data: {
                infos: JSON.stringify(infos)
            }, //JSON.stringify(infos) 转成json格式字符串
            headers: {
                Authorization: $.token()
            },
            success: function (res) {
                if (res.meta.status == 200) {
                    // 成功
                    mui.toast(res.meta.msg);
                    getCartData();
                } else {
                    //失败
                    mui.toast(res.meta.msg);
                }
            }

        });
    }
    //生成订单
    function orderCreate(paramsObj) {
        $.ajax({
            url:"my/orders/create",
            type: "post",
            data:paramsObj,
            headers: {
                Authorization: $.token()
              },
            success: function(res){
                // console.log(res);
                // debugger;
                if(res.meta.status == 200){
                    //成功
                    mui.toast(res.meta.msg);
                    //跳转订单页面
                    setTimeout(() => {
                        location.href = "/pages/order.html";
                    }, 1000);
                }else {
                    mui.toast(res.meta.msg);
                }
            },
            dataType: "json"
        });
    }
})