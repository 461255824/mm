/**
 * Created by lenovo on 2017/2/5.
 */
$(function(){
    //������ҳȥ�����Ӧ�����ݲ�ִ��
    var productid = getQueryString("productid");
    getproduct(productid);
    function getproduct(productid) {
        $.ajax({
            url:"http://mmb.ittun.com/api/getmoneyctrlproduct",
            data:{productid:productid},
            success:function(data) {
                console.log(data);
                //���ݵõ���������Ⱦҳ��
                var html = template("productTmp",data);
                $(".product").html(html);
            }
        })
    }
    //���ȸ���ulr������Ӧ������  һ���ǲ�Ʒ��id һ���� pageid
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})