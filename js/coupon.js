/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    $.ajax({
        url:"https://mmb.ittun.com/api/getcoupon",
        success:function(data) {
            //请求到的数据
            console.log(data);
            var html = template("listTmp",data);
            $(".list").html(html);
        }
    })
})