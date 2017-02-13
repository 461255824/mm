/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    //直接请求数据
    var brandtitleid = getQueryString("brandTitleId");

    getproduct(brandtitleid);
    getcount(brandtitleid);

    function getproduct(brandtitleid) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrand",
            data:{brandtitleid:brandtitleid},
            success:function(data) {
                console.log(data);
                var html = template("productlistTmp",data);
                $(".productlist").html(html);
            }
        })
    }
    function getcount(brandtitleid) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrandproductlist",
            data:{brandtitleid:brandtitleid,pagesize:4},
            success:function(data) {
                console.log(data);
                var html = template("countlistTmp",data);
                $(".countlist").html(html);
                if (data.result.length) {
                    //如果有数据且不为0
                    //在这里拿到函数调用评论函数  得到第一个data.result[0].productId
                    var productId = data.result[0].productId;
                    getmessage(productId);
                }

            }
        })
    }
    function getmessage(productid) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getproductcom",
            data:{productid:productid},
            success:function(data) {
                console.log(data);
                var html = template("messagelistTmp",data);
                $(".messagelist").html(html);
                //手动设置up上边的图片和名称
                var imgsrc = $(".countlist img").attr("src");
                var protitle = $(".countlist .title").eq(0).text();
                $(".messagelist img").attr("src",imgsrc);
                $(".messagelist .title").text(protitle);
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
