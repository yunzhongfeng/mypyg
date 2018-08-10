 $(function(){
    init();
     /* 出来就要调用的代码 */
     function init(){
        getSwiperData();
        getCatitems();
        getGoodslist();
     }

     /* 获取轮播图中的数据  home/swiperdata*/
    function getSwiperData() {
        $.get("home/swiperdata",function(res){
            //  console.log(res);
            var htmlStr = template("slide_tmpl",{'arr':res.data});
            //  console.log(htmlStr);
            $('.mui-slider').html(htmlStr);
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:3500//自动轮播周期，若为0则不自动播放，默认为0；
            });
        },'json');
    }
    /* 获取首页分类数据 home/catitems */
    function getCatitems() {
        $.get("home/catitems",function(res){
            var htmlStr = template("nav_tmpl",{arr:res.data});
            $('.index_nav').html(htmlStr);
        },"json")
    }
    /* 获取商品列表数据 home/goodslist */
    function getGoodslist() {
        $.get("home/goodslist",function(res){
            var htmlStr = template('goods_tmpl',{arr:res.data});
            $('.index_goodslist').html(htmlStr);
        },'json');
    }
 })