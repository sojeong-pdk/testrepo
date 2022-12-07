var SELECT_NUM;
var TXT_ARR = [
  "모바일전용 10%할인쿠폰",
  "1000포인트",
  "사은품 쿠폰",
  "5%할인쿠폰",
  "5000포인트",
  "무료배송쿠폰",
  ]
$(function(){
	$('.trigger').click(function(){
  	SELECT_NUM = Math.floor(Math.random() * 6);
  	$('.roulette').addClass('loop_'+ (SELECT_NUM + 1));
    	$('.roulette').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e) {
        $('.roulette').removeClass('loop_'+ (SELECT_NUM + 1))
    	  alert(TXT_ARR[SELECT_NUM]);
    });
  })
})