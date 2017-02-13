/**
 * Created by lenovo on 2017/2/5.
 */
$(function () {
    //根据请求的网页  向服务器发送请求获得数据

    var productid = getQueryString("productid");
    getproduct(productid);

    function getproduct(productid) {
        //根据传进来的id来获取相应的产品
        $.ajax({
            url:"https://mmb.ittun.com/api/getproduct",
            data:{productid:productid},
            success:function(data) {
                console.log(data);
                //设置上面的数据对应的模板
                var html = template("productTmp",data);
                $(".product").html(html);
                //再获取评论  原则先获取商品  在获取评论
                getproductmessage(productid);
            }
        })
    }


    //获取对应商品的评论
    function getproductmessage(productid) {
        $.ajax({
            url:"https://mmb.ittun.com/api/getproductcom",
            data:{productid:productid},
            success:function(data) {
                console.log(data);
                //用模板生成html插入到相应的模块中
                var html = template("messageTmp",data);
                $(".messagebox").html(html);
            }
        })
    }


    //是用来获取url中的参数的值的 根据参数名获取参数值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})