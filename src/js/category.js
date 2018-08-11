$(function () {
    //后台数据
    var Datas;
    //左侧的滚动条
    var myScroll1;
    init();
    /* 页面加载就运行的代码 */
    function init() {
        setHTML();
        eventList();
        getCategories();
        
    }
    // 绑定左侧菜单的点击事件,因为是动态生成的,所以要用委托
    function eventList() {
        $(".left").on("tap","li",function(){
            var index = $(this).data("index");
            $(this).addClass("active").siblings().removeClass("active");
            myScroll1.scrollToElement(this);
            renderRight(index);
        })
    }
    /* 获取分类数据 */
    function getCategories(){
        $.get("categories",function(res){
            // console.log(res);
            var htmlStr = template("left_tmpl",{arr:res.data});
            $(".left").html(htmlStr);
           myScroll1 = new IScroll('.left');
            //  console.log(res);
            Datas = res.data;
            renderRight(0);
        },"json");
    }
    //根据索引来渲染右侧的数据
    function renderRight(index) {
      var arr = Datas[index].children;
      var rightStr = template("right_tmpl",{arr:arr});
      $('.right').html(rightStr);
     // console.log(rightStr);
    // 获取要渲染的图片的长度
    var nums = $(".right img").length;
    $(".right img").on("load",function () {
         nums--;
         if(nums==0){
         new IScroll(".right");
        } 
    })
    }
   //获得当前html根元素的font-size,设置rem
    function setHTML() {
        //基础值
        var baseVal = 100;
        //设计稿的宽度
        var pageWidth = 375;
        //要适配的屏幕的宽度
        var screenWidth = document.querySelector("html").offsetWidth;
        //需要设置的font
        var fontSize = screenWidth * baseVal / pageWidth;
        //设置回html页面中去
        document.querySelector('html').style.fontSize = fontSize + "px";
        // console.log(fontSize);
    }

    // 为了在pc端更好的去调试
    window.onresize = function () {
        setHTML();
    }


})