/**
 * Created by lenovo on 2017/2/5.
 */
$(function () {
  //请求数据  如果没有默认值为1
    var pageId = getQueryString("pageid") || 1;
    getproduct(pageId);
    function getproduct(pageId) {
        $.ajax({
            url:"https://mmb.ittun.com/api/getmoneyctrl",
            data:{pageid:pageId},
            success:function(data) {
                console.log(data);
                var html = template("listTmp",data);
                $(".category-list").html(html);

                //生成页码
                var page = Math.ceil(data.totalCount / data.pagesize);
                var pagenow = "第"+ pageId +"页" +'<span class="caret"></span>';
                console.log(pagenow);
                $("#dLabel").html(pagenow);
                console.log(page)
                //使用for循环生成LI标签  把li标签加到相应的位置 并且 有a标签 和相应的跳转地址
                var pageli = "";
                for(var i =0 ; i < page;i++) {
                    var url = "moneyctrl.html?pageid=" + (i + 1);
                    pageli += '<li><a href='+url+'>第'+(i+1)+'页/'+(page)+'页</a></li>';
                }
                $(".dropdown-menu").html(pageli);
                //设置生成的上一页和下一页pageid
                console.log(page);
                pageId = parseInt(pageId);

                var prevurl = "moneyctrl.html?pageid=" + (pageId - 1 || 1);
                var nexturl = "moneyctrl.html?pageid=" + (pageId = pageId == page?pageId:pageId+1);
                $(".page-prev").attr("href",prevurl);
                $(".page-next").attr("href",nexturl);
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