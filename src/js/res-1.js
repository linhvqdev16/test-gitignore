// JavaScript Document
$(document).ready(function () {
  var h = $(window).height();
  var w = $(window).width();
  if (w > 992) {
    $('.wrapper').css({ transform: "scale(" + w / 1920 + ")" });
    var iw = $(".wrapper")[0].getBoundingClientRect().width;
    var ih = $(".wrapper")[0].getBoundingClientRect().height;
    $('body').css({ height: ih, width: iw });

  }
  else if (320 < w < 992) {
    $('.wrapper').css({ transform: "scale(" + w / 992 + ")" });
    var iw = $(".wrapper")[0].getBoundingClientRect().width;
    var ih = $(".wrapper")[0].getBoundingClientRect().height;
    $('body').css({ height: ih, width: iw });
  }

  $(window).on('resize', function () {
    var h = $(window).height();
    var w = $(window).width();
    if (w > 992) {
      $('.wrapper').css({ transform: "scale(" + w / 1920 + ")" });
      var iw = $(".wrapper")[0].getBoundingClientRect().width;
      var ih = $(".wrapper")[0].getBoundingClientRect().height;
      $('body').css({ height: ih, width: iw });

    }
    else if (320 < w < 992) {
      $('.wrapper').css({ transform: "scale(" + w / 992 + ")" });
      var iw = $(".wrapper")[0].getBoundingClientRect().width;
      var ih = $(".wrapper")[0].getBoundingClientRect().height;
      $('body').css({ height: ih, width: iw });
    }
  });
});

AOS.init({

  disable: function () {
    var maxWidth = 1920;
    return window.innerWidth < maxWidth;
  }
});