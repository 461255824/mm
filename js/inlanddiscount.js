/**
 * Created by lenovo on 2017/2/5.
 */
$(function(){
    getdata();
    var count = 0;
    var newdata = {};
    //先在newdata中就包含全部要的数据
    //滑动到一定距离就追加四个
    addproduct();
    function addproduct() {
        $(".loading").on("click",function(){
            getdata();
        })
        //改条件为滑动动一定范围时才追加
        //当滚出屏幕外的高度  大于  页面的高度 减去屏幕高度成时候
        var scrolltop = 0;
        var winheight = $(window).height();
        var pageheight = $(".product").height() + $("header").height();
        var dis = pageheight - winheight;
        $(window).on("scroll",function(){
            scrolltop = $(window).scrollTop();
            pageheight = $(".product").height() + $("header").height();
            dis = pageheight - winheight;
            if(scrolltop > dis ) {
                $(".loading").show();
                setTimeout(function(){getdata();},2000)
            }

        })
        if(scrolltop > dis ) {
            $(".loading").show();
            setTimeout(function(){getdata();},2000)
        }

    }

    function getdata() {
        $.ajax({
            url:"http://mmb.ittun.com/api/getinlanddiscount",
            success:function(data) {
                console.log(data);
                //每次只渲染四个
                //var html = template("productTmp",data);
                //$(".list").append(html);
                //每次只加载4个元素
                //在这里把数据存到本地

                newdata.result = [];
                console.log(newdata.result.length);
                var num = count;
                for(;count<num+4;count++) {
                    newdata.result.push(data.result[count]);
                }
                //有正常数据的情况下才加
                if(newdata.result[0]) {
                    var html = template("productTmp",newdata);
                    $(".list").append(html);
                    $(".loading").hide();
                }
            }
        })
    }
})