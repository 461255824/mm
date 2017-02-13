/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    getdata();
    function getdata() {
        $.ajax({
            url:"https://mmb.ittun.com/api/getbrandtitle",
            success:function(data) {
                //生成标签
                var html = template("listTmp",data);
                console.log(data);
                $(".list").html(html);
            }
        })
    }
})