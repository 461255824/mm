/**
 * Created by lenovo on 2017/2/5.
 */
$(function(){
    //根据网页去请求对应的数据并执行
    var productid = getQueryString("productid");
    getproduct(productid);
    function getproduct(productid) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getdiscountproduct",
            data:{productid:productid},
            success:function(data) {
                console.log(data);
                //根据得到的数据渲染页面
                var html = template("productTmp",data);
                $(".product").html(html);
            }
        })
    }
    //首先根据ulr来找相应的数据  一个是产品的id 一个是 pageid
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})