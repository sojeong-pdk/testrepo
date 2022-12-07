'use strict';

// 한번 값이 들어갔을 때 변하지 않는 변수는 모두 대문자로 작성
var LENGTH = 6; 
var DEG;
var SELECT_NUM; 
var TXT_ARR = [
  "모바일전용 10%할인쿠폰",
  "1000포인트",
  "사은품 쿠폰",
  "5%할인쿠폰",
  "5000포인트",
  "무료배송쿠폰",
];

$(function() {
  $('.roulette__trigger').on('click', function() {
    SELECT_NUM = Math.floor(Math.random() * LENGTH); // 0~5    
    // DEG = 
    // deg = [0, 60, 120, 180, 240, 300]

    // $('.roulette__img').addClass('loop_' + (SELECT_NUM + 1));
    console.log(360 / SELECT_NUM);
  });
});

