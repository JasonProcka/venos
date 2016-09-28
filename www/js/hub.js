$(function() {
  
  // fade the page in after it is loaded
  $(document).ready(function() {
      $('body').addClass('loaded');  
  }); 
  
  // five-column click
  var rightVal = -350; // base value
  $(".five-column").click(function() {
    event.stopPropagation();
    rightVal = (rightVal * -1) - 350; // calculate new value
    $(".drop-details").animate({
      right: rightVal + 'px'
    }, {
      queue: false,
      duration: 500
    });
  });

  // close-detail click
  var closeRightVal = -350;
  $(".close-details").click(function() {
    event.stopPropagation();
    $(".drop-details").animate({
      right: closeRightVal + 'px'
    }, {
      queue: false,
      duration: 500
    });
  });

  // nav-custom touchmove
  $(".nav-custom").on('touchmove', function(e) {
    e.preventDefault();
  });

  // inner-nav touchmove
  $(".inner-nav").on('touchmove', function(e) {
    e.preventDefault();
  });

  // initial scale
  $(function() {
    var dropWidth = $(".five-column").width();
    $(".drop").css("height", dropWidth + 'px');
    $(".five-column").css("min-height", dropWidth + 'px');
    $(".page-content").css("margin-left", ($(".nav-custom").width()));
  });
  // window resize
  $(window).resize(function() {
    var dropWidth = $(".five-column").width();
    $(".drop").css("height", dropWidth + 'px');
    $(".five-column").css("min-height", dropWidth + 'px');
  });
});