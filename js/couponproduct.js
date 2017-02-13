/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    //直接请求数据  进行渲染页面

    var couponid = getQueryString("couponid");
    getproduct(couponid);
    function getproduct(couponid) {
        $.ajax({
            url:"https://mmb.ittun.com/api/getcouponproduct",
            data:{couponid:couponid},
            success:function(data) {
                console.log(data);
                var html = template("productTmp",data);
                $(".procuctlist ul").html(html);
            }

        })
    }


    //获取coupoid
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