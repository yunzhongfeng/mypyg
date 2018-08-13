$(function(){
    init();
    function init(){
        eventList();
    }
    function eventList(){
        $("#btn_login").on("tap",function(){
               /* 
                1 验证值合法性
                2 非法 给出提示
                3 合法 跳转页面 暂时 index.html
               */
              var mobile_txt = $("[name='mobile']").val().trim();
              var pwd_txt = $("[name='pwd']").val().trim();
              //验证手机号码
              if(!$.checkPhone(mobile_txt)){
                  mui.toast("号码非法");
                  return;
              }
              //验证密码 密码 以字母开头，长度在6~18之间
              if(!$.checkPassword(pwd_txt)) {
                  mui.toast("密码以字母开头长度在6~18之间");
                  return;
              }
              //发送ajax请求
              $.post("login",{
                  username:mobile_txt,
                  password:pwd_txt
                },function(res){
                    if(res.meta.status==200){
                        //提示登录成功
                        mui.toast(res.meta.msg);
                        setTimeout(() => {
                            location.href ="/index.html";
                        }, 1000);
                    }else {
                        mui.toast(res.meta.msg);
                    }
                },'json');

        })
      
    }
    
})