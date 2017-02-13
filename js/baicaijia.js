/**
 * Created by lenovo on 2017/2/5.
 */
$(function () {

    gettitle()
    //生成标题再说
    function gettitle() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiatitle",
            success: function (data) {
                //拿到标题列表
                var html = template("titleTmp", data);
                $(".title").html(html);
                //动态计算出每一个li标签的宽度 相加   设置个ul
                var width = 0;
                $(".title li").each(function () {
                    width += $(this).width();
                })

                $(".title").width(width + 1);
                //设置标签比不颜色
                $(".title li").eq(0).addClass("active");
                //根据titleId渲染数据
                getproduct(0);
                setSwip();
            }
        })
    }

    //获取商品数据
    function getproduct(titleId) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
            data: {titleid: titleId},
            success: function (data) {
                var html = template("productTmp", data);
                $(".productlist").html(html);
            }
        })
    }

    //滑动函数
    function setSwip() {
        //使ul标签能左右拖动
        //点击ul标签的时候得到点击的坐标点  滑动的时候   进行记录    ul跟着移动
        var startx = 0;
        var movex = 0;
        var currentx = 0;
        var disx = 0;
        var lix = 0;
        //最大  和最小  缓冲距离
        var minmove = -($(".title").width()-$("nav").width() + 100);
        var maxmove = 100;
        $(".title").on("touchstart", function (e) {
            startx = e.originalEvent.touches[0].clientX;
        })
        $(".title").on("touchmove", function (e) {
            $(".title").css("transition","all 0s");
            movex = e.originalEvent.touches[0].clientX;
            disx = movex - startx + currentx;
            //在move的时候设置ul的位置
            //得到ul现在的偏移量
            //根据最大最小距离进行设置
            //if(disx>maxmove) {
            //    disx = maxmove;
            //} else if (disx < minmove) {
            //    disx = minmove;
            //}
            $(".title").css("transform", "translateX(" + disx + "px)");
        })
        //结束后参数归0

        $("nav").on("touchend", function (e) {
            startx = 0;
            movex = 0;
            //记录下当前这次移动移动了多少距离
            currentx = disx;
            if(0 <= currentx ) {
                //先增加返回函数
                $(".title").css("transform", "translateX(" + 0 + "px)");
                currentx = 0;
            }else if (currentx <= -($(".title").width()-$("nav").width())) {
                $(".title").css("transform", "translateX(-" + ($(".title").width()-$("nav").width()) + "px)");
                currentx = -($(".title").width()-$("nav").width());
            }
        })

        ////点击li标签时移动
        //$(".title li").on("click",function(){
        //    //计算出点击的li之前有多少个li  即需要移动的距离
        //    var lis = $(this).prevAll("li");
        //    for(var i =0;i < lis.length;i++) {
        //        lix += $(lis[i]).width();
        //    }
        //    currentx = -lix;
        //    if(0 <= currentx ) {
        //        //先增加返回函数
        //        $(".title").css("transform", "translateX(" + 0 + "px)");
        //        currentx = 0;
        //    }else if (currentx <= -($(".title").width()-$("nav").width())) {
        //        $(".title").css("transform", "translateX(-" + ($(".title").width()-$("nav").width()) + "px)");
        //        currentx = -($(".title").width()-$("nav").width());
        //    } else {
        //        $(".title").css("transform", "translateX(" + currentx+ "px)");
        //    }
        //})
        $(".title li span").on("click",function(){
            $(".title li").removeClass("active");
            $(this).parent().addClass("active");
            var titleid = $(this).attr("date-titleid");
            console.log(titleid);
            //点击的时候让box移动
            $(".title").css("transition","all 1s");
            var width = 0;
            //计算出要移动距离
            var lis = $(".active").prevAll("li");
            for(var i = 0;i < lis.length;i++) {
                width += $(lis[i]).width();
            }
            console.log(width);
            //判断width的值 如果大于  ul长度 - 屏幕宽度  就等于  这个值
            var chax = $(".title").width() - $(window).width();
            console.log(chax);
            if(width > chax) {
                width = chax;
            }
            currentx = -width;
            $(".title").css("transform","translateX("+(currentx)+"px)");
            getproduct(titleid);
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