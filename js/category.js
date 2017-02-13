/**
 * Created by lenovo on 2017/2/4.
 */
$(function(){
    //发送ajax请求  生成列表
    getIndex() ;
    function getIndex(){
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorytitle",
            success:function(data) {
                //这里的data就是返回的数据列表 标题 生成模板 加个盒子

                console.log(data);
                var html = template("categorytitle",data);
                $(".panel-group").html(html);
                //给每一个标题添加点击事件
                $(".panel-group  a").on("click",function(e){
                    var that  = this;
                   var titleId =  $(this).attr("data-titleId");
                //然后发送ajax请求  并携带参数  titleId
                    $.ajax({
                        url:"http://mmb.ittun.com/api/getcategory?titleid="+titleId,
                        success:function(data) {
                            //这是点击后返回的数据
                            console.log(data);
                            //将数据生成模板  插入到  自己的内部座位那啥
                            var html = template('insethtml',data);
                            $("#collapse"+titleId).html(html);
                        }
                    })
                })
            }
        })
    }

})