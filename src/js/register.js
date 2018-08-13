$(function(){
    init();
    function init(){
        eventList();
    }
    //获得短信验证码
    function eventList() {
        //绑定tap点击事件
        $("#valida_code").on("tap",function(){
               /* 
                1 获取手机号码->  合法性的验证
                2 验证不通过 给出用户提示 同时 return
                3 通过 -> 
                1 发送请求 
                1.5 成功了 
                2 按钮禁用
                3 显示倒计时 到了  去除 禁用 重新 设置按钮的文本
               */
             var mobile_txt = $("[name='mobile']").val().trim(); 
            //  debugger;
           //判断手机号是否合法
           if(!$.checkPhone(mobile_txt)){
               //用mui提示用户
               mui.toast("号码非法");
               return;
           }
           //发送ajax请求获得验证码
           $.post("users/get_reg_code",{mobile:mobile_txt},function(res){
            //    console.log(res);
                 if(res.meta.status == 200){
                      //表示成功
                      $("#valida_code").prop("disabled",true);
                      //设置要倒计时的时间
                      var times = 5;
                      $("#valida_code").text(times+"秒后重新获取");
                      var timeId = setInterval(function(){
                          times--;
                          $("#valida_code").text(times+"后重新获取");
                          //判断停下来的条件
                          if(times == 0){
                              clearInterval(timeId);
                              $("#valida_code").text("获取验证码");
                              $("#valida_code").prop("disabled",false);
                          }
                      },1000);
                 }else {
                     mui.toast(res.meta.msg);
                 }
           },"json"); 

        })
        //点击注册时的逻辑
        $("#reg_btn").on("tap",function(){
            var mobile_txt = $("[name='mobile']").val().trim();
            var code_txt = $("[name='code']").val().trim();
            var email_txt = $("[name='email']").val().trim();
            var pwd_txt = $("[name='pwd']").val().trim();
            var pwd2_txt = $("[name='pwd2']").val().trim();
            var gender_txt = $("[name='gender']:checked").val().trim();
            // debugger;
            //先判断手机是否合法
            if(!$.checkPhone(mobile_txt)){
                //用mui提示用户
                mui.toast("号码非法");
                return;
            }
            //验证长度必须为4
            if(code_txt.length != 4){
                mui.toast("验证码不合法");
                return;
            }
            //邮箱
            if(!$.checkEmail(email_txt)){
                mui.toast("邮箱不合法");
                return;
            }
            //密码 以字母开头，长度在6~18之间
            if(!$.checkPassword(pwd_txt)) {
                mui.toast("密码以字母开头长度在6~18之间");
                return;
            }
           //验证重复密码,如果两个密码不一致,非法
           if(pwd_txt != pwd2_txt) {
            mui.toast("两次密码不一致");
            return;
           }
           //开始发送ajax请求
           $.post("users/reg",{
            mobile:mobile_txt,
            code:code_txt,
            email:email_txt,
            pwd:pwd_txt,
            gender:gender_txt
           },function(res){
               if(res.meta.status == 200){
                   mui.toast(res.meta.msg);
                   //延迟一秒之后跳转到登录页面
                   setTimeout(() => {
                        location.href = "/pages/login.html";
                   },1000);
               }else {
                   mui.toast(res.meta.msg);
               }
           },'json');

        })

    }
})