/**
 * Created by lenovo on 2017/2/4.
 */
$(function(){
    //测试
    //对页面进行渲染   利用ajax请求列表  要求闭包请求
    getIndex();
    function getIndex(){
        $.ajax({
            url:"https://mmb.ittun.com/api/getindexmenu",
            success:function(data) {
                //成功请求回来得到参数
                console.log(data);
                //生成标签
                var html = template("menuTmp",data);
                $("#menu").html(html);
                //点击第8个更多选项  控制后四个的出现与隐藏
                $("#menu>.row>div:nth-child(8)").on("click",function(){
                    $("#menu>.row>div:nth-last-child(-n+4)").toggle(200);
                })
            }
        })
    }
    //渲染折扣价格
    getRecommen();
    function getRecommen() {
        $.ajax({
            url:"https://mmb.ittun.com/api/getmoneyctrl",
            success:function(data) {
                //成功的回调函数
                console.log(data);
                var html = template("recommenTmp",data);
                $(".recommen-list").html(html);
            }
        })
    }

})

