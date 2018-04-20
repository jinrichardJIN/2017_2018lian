function carousel(){

}
//获取dom节点
carousel.prototype.Dom=function(){
    this.bannerObj=$(this.settings.bannerObj);
    this.carouselDot=$(this.settings.carouselDot);
    this.imgLi=this.bannerObj.find("li");
    this.preObj=$(this.settings.preObj);
    this.nextObj=$(this.settings.nextObj);
    this.wrap=$(this.settings.wrap);
};
//初始化
carousel.prototype.init=function(options){
	     this.settings={
         };
    $.extend(this.settings,options);
        this.num=0;
        this.num2=0;
        this.timer=null;
        this.Dom();
    if(this.imgLi.length>1){//banner数量小于2是不轮播、不添加轮播点
        this.bannerObj.width((this.imgLi.length+1)*this.imgLi[0].clientWidth);
        this.bannerObj.find('li:first').clone().appendTo(this.bannerObj);
        this.carouselDot.width(this.imgLi.length*25);
        if(!this.settings.dot){
            this.carouselDot.addClass("none")
        }else{
            this.carouselDot.removeClass("none")
        }
        for(var i=0; i<this.imgLi.length; i++){
            var Li=$('<li>');
            this.carouselDot.append(Li);
        }
        this.btnList=this.carouselDot.find('li');
        this.btnList.eq(0).addClass("current");
        this.slide();
    }
};
//轮播主功能1
carousel.prototype.slide=function(){
    var self=this;
    this.onOff=true;
    this.nextObj.click(function () {
        if(self.onOff) {
            self.move(1);
        }
    });

        this.preObj.click(function () {
            if(self.onOff){
            self.move(-1);
            }
        });
        this.btnList.click(function () {
            self.num = 0;
            self.num2= 0;
            self.move($(this).index())
        });
    this.wrap.hover(function () {
        clearInterval(self.timer);
        self.preObj.removeClass("none");
        self.nextObj.removeClass("none");
    }, function () {
        clearInterval(self.timer);
        self.preObj.addClass("none");
        self.nextObj.addClass("none");
        self.timer = setInterval(function () {
            self.move(1)
        }, self.settings.delay)
    });
    this.timer = setInterval(function () {
        self.move(1)
    },self.settings.delay);
};
// 轮播主功能2
carousel.prototype.move=function(i){
        this.onOff=false;
        var self=this;
        this.num += i;
        var dis = (this.imgLi.length) * this.imgLi.eq(0).width();
        if (this.num > this.imgLi.length) {
            this.num = 1;
            this.bannerObj.css('left', 0)
        }
        if (this.num < 0) {
            this.num = this.imgLi.length - 1;
            this.bannerObj.css('left', -dis)
        }
        this.bannerObj.stop().animate({
            'left':-1*this.num * this.imgLi.eq(0).width()
        }, 1000,function(){
            self.onOff=true;
        });
        this.num2 += i;
        if (this.num2 >  this.btnList.length - 1) {
            this.num2 = 0;
        }
        if (this.num2 < 0) {
            this.num2 =  this.btnList.length - 1;
        }
        this.btnList.eq(this.num2).addClass('current').siblings().removeClass('current');
};

var banner=new carousel();
banner.init({
     bannerObj  :"#banner",
     delay      :4000,//ms
     preObj     :".left",
     nextObj    :".right",
     carouselDot:"#carouselDot",
     wrap       :".wrap",
     dot        :true//是否有轮播点
});
// export default banner