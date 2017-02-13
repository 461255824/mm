/**
 * Created by lenovo on 2017/2/6.
 */
$(function(){
    //先给按钮设置点击
    //点击上面的标题得到对应  商店名称  和 地区
    getshop();
    getarea();
    getproduct(0,0)
    function getshop() {
        //给shop注册点击事件
        $(".shopheader").on("click",function(){
            //点击之后发送ajax请求
            var url = $(this).attr("data-link");
            $.ajax({
                url:url,
                success:function(data) {
                    console.log(data);
                    //生成对应的html加入到shoplist中
                    var html = template("shoplistTmp",data);
                    $(".shoplist").html(html);
                    $(".shoplist").toggle();
                    //给列表中的数据添加点击事件
                    $(".shoplist li a").on("click",function(){
                        var str = $(this).text() + "<span class='caret'></span>"
                        $(".shopheader").html(str);
                        //重新设置数据
                        var shopid = $(this).attr("data-shopid");
                        var areaid = $(".arealist a").attr("data-areaid");
                        console.log(shopid)
                        console.log(areaid)
                        $(".shoplist").toggle();
                        getproduct(shopid,areaid);
                    })
                }
            })
        })
    }

    function getarea() {
        //给shop注册点击事件
        $(".areaheader").on("click",function(){
            //点击之后发送ajax请求
            var url = $(this).attr("data-link");
            $.ajax({
                url:url,
                success:function(data) {
                    console.log(data);
                    //生成对应的html加入到shoplist中
                    var html = template("arealistTmp",data);
                    $(".arealist").html(html);
                    $(".arealist").toggle();
                    //给列表中的数据添加点击事件
                    $(".arealist li a").on("click",function(){
                        var str = $(this).text().split("（")[0] + "<span class='caret'></span>"
                        $(".areaheader").html(str);
                        //重新设置数据
                        var shopid = $(".shoplist a").attr("data-shopid");
                        var areaid = $(this).attr("data-areaid");
                        console.log(shopid)
                        console.log(areaid)
                        $(".arealist").toggle();
                        getproduct(shopid,areaid);
                    })
                }
            })
        })
    }
    //请求页面数据
    function getproduct(shopid,areaid) {
        $.ajax({
            url:"https://mmb.ittun.com/api/getgsproduct",
            data:{shopid:shopid,areaid:areaid},
            success:function(data){
                console.log(data);
                var html = template("productTmp",data);
                $(".productlist").html(html);
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