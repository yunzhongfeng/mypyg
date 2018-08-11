$(function () {
  init();
  function init() {
    basuUrl();
  }
  function basuUrl() {
    var BaseUrl = " http://api.pyg.ak48.xyz/api/public/v1/";
    // 修改接口的使用方式
    // 拦截器
    // 在每一次发送请求 之前对请求做一些处理 
    // 发送请求之前,提前对于 接口的url进行处理 
    // var oobj={};
    // $.ajax(oobj);
    // http://api.pyg.ak48.xyz/api/public/v1/  +   home/swiperdata
    $.ajaxSettings.beforeSend = function (xhr, obj) {
      obj.url = BaseUrl + obj.url;
      // console.log(obj.url);
    }
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