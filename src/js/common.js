$(function () {

    var BaseUrl=" http://api.pyg.ak48.xyz/api/public/v1/";
    // 修改接口的使用方式
    // 拦截器
    // 在每一次发送请求 之前对请求做一些处理 
    // 发送请求之前,提前对于 接口的url进行处理 
    // var oobj={};
    // $.ajax(oobj);
    // http://api.pyg.ak48.xyz/api/public/v1/  +   home/swiperdata
    $.ajaxSettings.beforeSend=function (xhr,obj) {
      obj.url=BaseUrl+ obj.url;
      // console.log(obj.url);
    }
  })