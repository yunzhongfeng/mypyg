$(function () {
    init();
    function init() {
        getDetail();
    }
    //获取商品详情
    function getDetail(){
        $.get("goods/detail",{goods_id:$.getUrlValue("goods_id")},function(res){
            // console.log(res);
            var htmlStr = template("goods_tmpl",{data:res.data});
            $(".pyg_view").html(htmlStr);
             //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:1500//自动轮播周期，若为0则不自动播放，默认为0；
            });
        },'json');
    }
})