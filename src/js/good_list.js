$(function(){
    //获得查询参数
    var QueryObj = {
        query : "",
        cid : $.getUrlValue("cid"),
        pagenum: 1,
        pagesize: 6
    }
   //设置初始的总页数
   var totalPage = 1;

    init();
    function init(){
        eventList();
        mui.init({
            pullRefresh: {
              container: ".pyg_view",
              down: {
                auto: true,
                //  触发下拉刷新时自动触发
                callback: function () {
                    //发送ajax请求 获取数据 动态渲染=> 结束下拉刷新组件
                    $(".pyg_view ul").html("");
                    QueryObj.pagenum =1;
                    search(function(){
                             mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                            // 重置 上拉组件
                            mui('.pyg_view').pullRefresh().refresh(true);
                        });
                    }
                },
              up:{
                   //  触发上拉刷新时自动触发
                   callback:function () {
                        /* 
                        1 判断还没有下一页 有 QueryObj.pagenum++;
                        2 没有了 不执行了!! 
                        3 计算总页数 
                        totalPage=Math.ceil(total/QueryObj.pagesize)
                        4 当前页码和总页数做判断 
                        */
                       if(QueryObj.pagenum >= totalPage) {
                           console.log("没有数据了");
                           // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
                           mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                           return;
                       }else {
                           QueryObj.pagenum++;
                           search(function(){
                               console.log($('.pyg_view li').length);
                               mui('.pyg_view').pullRefresh().endPullupToRefresh(); 
                           })
                       }

                   }
                }
             }
          });
    }
    //给内容中的a标签绑定tap事件,因为mui阻止了a标签的默认跳转行为
    function eventList(){
        //动态生成的,用事件委托
       $(".pyg_view").on("tap","a",function(){
           var href = this.href;
          location.href = href;
       })
    }
    // 获取列表数据
    function search(callback){
        $.get("goods/search",QueryObj,function(res){
            //获得总页数
            totalPage = Math.ceil(res.data.total / QueryObj.pagesize);
            console.log("总页数为:"+totalPage);
            var htmlStr = template("goods_tmpl",{arr:res.data.goods});
            // console.log(htmlStr);
            $(".pyg_view ul").append(htmlStr);
            callback&&callback();
        },'json');
    }
})