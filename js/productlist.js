/**
 * Created by lenovo on 2017/2/4.
 */
$(function(){
    //根据url分类名获取 这是那一页
    var categoryId = getQueryString("categoryId");
    var pageId = getQueryString("pageid") || 1;
    //得到id
    //先设置行不行
    setproducttitle(categoryId);
    function setproducttitle(categoryId) {
    //传进来一个数值 用来找对应的id应的商品
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorybyid?categoryid="+categoryId,
            success:function(data) {
                console.log(data);
                //设置类名
                $(".categorylist ol li:last-child").text(data.result[0].category)
            }
        })
    }
    //设置商品的名目

    setproductlist(categoryId,pageId);
    function setproductlist(categoryId,pageId) {
        //找商品列表
        $.ajax({
            url:"http://mmb.ittun.com/api/getproductlist",
            data:{
                categoryid:categoryId,
                pageid:pageId
            },
            success:function(data) {
                console.log(data);
                //再利用tempt生成html
                var html = template("listTmp",data);
                $(".category-list").html(html);
                //求出来总共的页数
                var page = data.totalCount/data.pagesize;
                console.log(page);
                var pageli = "";
                for(var i = 0;i < page;i++) {
                    var url = "productlist.html?categoryid=" + categoryId + "&pageid=" + (i + 1);
                    pageli += "<li><a href="+url+">第"+(i+1) +"页/"+page+"页</a>"+"</li>";
                }
                $('#dLabel').html("第" + pageId + "页" + '<span class="caret"></span>');
                //判断上一张和下一张的点击
                //先判断总张数 如果总张数是1 的情况
                pageId = parseInt(pageId);
                if(page<=1) {
                    //这里只有一张
                    pageId = 1;
                    var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + pageId;
                    var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + pageId;
                }else {
                    //这里是超过两张的情况
                    if(Math.ceil(page) ==2 ) {
                        //这里正好是两张
                        var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + 1;
                        var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + 2;
                    }else {
                        //这里是三张以上
                        //判断当前页是第几页
                        //如果是第一页或者最后一页
                        if(pageId <= 1) {
                            //这是第一页
                            var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + pageId;
                            var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (pageId+1);
                        }else if (pageId >= Math.ceil(page)) {
                            //这是最后一页
                            var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (pageId-1);
                            var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + pageId;
                        }else {
                            var prevUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (pageId-1);
                            var nextUrl = "productlist.html?categoryid=" + categoryId + "&pageid=" + (pageId+1);
                        }




                    }

                }
                //用来设置上一张 和下一张的切换的

                $(".page-prev").attr("href",prevUrl);
                $(".page-next").attr("href",nextUrl);
                $(".dropdown-menu").html(pageli);
            }
        })
    }



    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})
//逻辑： 1.通过url中传过来的id获取商品的名称
