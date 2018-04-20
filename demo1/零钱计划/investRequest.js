/**
 * Created by huamin on 2017/10/26.
 */

var DomFun = {
    init: function(){
        this.getRequsetInfo();      // 初始化调取数据
    },
    // 页面交互
    cancelRequest: function(e){
        var _this = this;
        var totalAmt = numFormat(_this.dataset.totalamt);               //申购赎回金额
        var applyAmt = numFormat(_this.dataset.applyamt);             //剩余金额
        DomFun.srId = _this.dataset.srid;                             //交易记录ID
        var couponAmt = numFormat(_this.dataset.couponamt);             //抵用券金额
        var getCouponAmt = numFormat(_this.dataset.getcouponamt);       //已到账抵用券金额
        if(Number(couponAmt) !=0 && getCouponAmt==0){
            var bouncedText = '您使用的代金券金额还未入账<br/>请稍后再试，谢谢。'
        }else{
            if(totalAmt == '0.00'){
                var bouncedText = '确认取消申购请求？'
            }else{
                var bouncedText = '您有 <span class="redTex">'+totalAmt+'元</span> 资产已经购买成功。<br/>剩余 <span class="redTex">'+applyAmt+'元</span> 可以申请取消，<br/>确定取消吗';
            }
        }
        const bounceOption = {
            type: 2,
            bouncedText:bouncedText,
            method1: "DomFun.confirmCancel"
        };
        bouncedEvent(bounceOption);
        $(".bouncedCancelBtn").click(DomFun.bouncedNone);  //  绑定事件

    },
    srId: "",
    confirmCancel: function(){
        ajaxRequest(contextPath + "webClient?functionId=cancelSR", {'data':JSON.stringify({'srId':this.srId})}, this.successCancel);
    },
    successCancel: function(data){
        if(data.resCode == "0000"){
            errorMessage(data.resMsg);
        }else{
            errorMessage(data.resMsg);
        }
        $("#bounced").remove();
        setTimeout(function(){
            window.location.reload();  //   取消之后 当前页面刷新
        },1000);
    },
    getRequsetInfo: function(){
        var data = JSON.stringify({'current':'1','pageSize':'8'});
        ajaxRequest(contextPath + "webClient?functionId=getSrList", {'data':data}, this.getSrList,"POST"); //活期申购赎回列表
    },
    getMoreSrList: function(page){  //获取更多
        var data = JSON.stringify({'current':page,'pageSize':'8'});
        ajaxRequest(contextPath + "webClient?functionId=getSrList", {'data':data},this.getSrList,"POST");
    },
    // 接口回调函数
    getSrList: function(data){
        if(data.resCode == "0000"){
            data.pageObject = {
                "pageNum":data.current,"totlePages":data.pages
            };
            var html = "";
            if(data.records == "" || data.records == null) {
                html += '<div class="listNull">';
                html += '<img src="../../pic/weixin/list.png">';
                html += '<p class="p1">暂无撮合数据</p>';
                html += '<p class="p2">如果有撮合数据，您将在这里看到</p>';
                html += '</div>';
            }else{
                $(data.records).each(function(i,Obj){
                    if(Obj.tradeType == "2"){
                        return true;
                    }
                    var totalAmt = Number(Obj.applyAmt) - Number(Obj.remainAmt);
                    html += '<li class="transMoney clearfix whiteBkg PLR3P MT15">';
                    html += '<div class="fl textL">';
                    if(Obj.tradeType == "1"){
                        html += '<div class="blackTex font18 transTate">处理中 '+numFormat(totalAmt)+'元</div>';
                    }else if(Obj.tradeType == "3"){
                        html += '<div class="blackTex font18 transTate">赎回中 '+numFormat(totalAmt)+'元</div>'
                    }
                    html += '<div class="font14 grayTex PT10">'+ Obj.tradeDate.substr(0,16) +'</div>';
                    html += '</div><div class="fr">';
                    if(Obj.tradeType == "1"){
                        html += '<div class="redTex font18 transAmount textR">-'+ numFormat(Obj.applyAmt) +'元</div>';
                    }else if(Obj.tradeType == "3"){
                        html += '<div class="redTex font18 transAmount textR">+'+ numFormat(Obj.applyAmt) +'元</div>';
                    }
                    if(Obj.tradeType == "1"){
                        html += '<a data-totalAmt="'+totalAmt+'" data-couponAmt="'+Obj.couponAmt+'" data-getCouponAmt="'+Obj.getCouponAmt+'" data-applyAmt="'+Obj.applyAmt+'" data-srId="'+Obj.srId+'" class="cancelBtn grayBkg inlineB heigh40 radius3 MT7">取消</a>';
                    }
                    html += '</div></li>';
                });
            }
            $(".contentList").append(html);
            $("#exchangeListPaging").html(pagingMobile(data, "DomFun.getMoreSrList"));
            $(".cancelBtn").click(DomFun.cancelRequest);  // 绑定取消按钮事件
        }
    },
    //取消隐藏弹框
    bouncedNone: function(e){
        $("#bounced").remove();
    }


};

// 初始化绑定事件
DomFun.init();