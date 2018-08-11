$(function () {
   
    var BaseUrl = " http://api.pyg.ak48.xyz/";
    // 导入模板变量
    template.defaults.imports.iconUrl =BaseUrl;
    // 修改接口的使用方式
    // 拦截器
    // 在每一次发送请求 之前对请求做一些处理 
    // 发送请求之前,提前对于 接口的url进行处理 
    // var oobj={};
    // $.ajax(oobj);
    // http://api.pyg.ak48.xyz/api/public/v1/  +   home/swiperdata
    //声明总的发送ajax的个数
    var ajaxNum = 0;
    $.ajaxSettings.beforeSend = function (xhr, obj) {
      obj.url = BaseUrl +"api/public/v1/"+ obj.url;
      // console.log(obj.url);
      ajaxNum++;
      // console.log(ajaxNum);
      $('body').addClass("wait");

    }
  //ajax 获得返回值之后会调用一次
  $.ajaxSettings.complete = function() {
      ajaxNum--;
      if(ajaxNum == 0){
        // console.log("最后的ajaxNum="+ajaxNum);
      } $('body').removeClass('wait');   
  }

  function myNewScroll() {
    var goTop = document.getElementById('goTop');
    // 获取被卷去的高度   scroll 监听滚轮事件
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          console.log(scrollTop);
        scrollTop > 680 ? goTop.style.display = "block" : goTop.style.display = "none";
    }
  }
})