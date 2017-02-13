/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    //直接请求数据
    getdata();
    function getdata(){
        $.ajax({
            url:"https://mmb.ittun.com/api/getsitenav",
            success:function(data) {
                console.log(data);
                var html = template("listTmp",data);
                 $(".list").html(html);
            }
        })
    }
})