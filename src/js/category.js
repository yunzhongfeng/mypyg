$(function () {
    init();
    /* 页面加载就运行的代码 */
    function init() {
        setHTML();
        getData();
        
    }

    /* 获取分类数据 */
    function getData(){
        $.get("categories",function(res){
            var htmlStr = template("left_tmpl",{arr:res.data});
            // console.log(htmlStr);
            $(".left").html(htmlStr);
            var myScroll1 = new IScroll('.left');
            var rightStr = template("right_tmpl",{arr:res.data});
            console.log(rightStr);
            var myScroll2 = new IScroll('.right');

        },"json");
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