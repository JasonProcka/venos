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
  
  $(function() {
  var ink, d, x, y;
    $(".btn").click(function(e){
	   element = $(this);
      ripplecolor = "rgba(0,0,0,0.2)";
	  //create .ink element if it doesn't exist
	if(element.find(".ink").length == 0)
		element.prepend("<span class='ink'></span>");
  $('.ink').css("background-color", ripplecolor);
	ink = element.find(".ink");
	//incase of quick double clicks stop the previous animation
	ink.removeClass("animate");
	
	//set size of .ink
	if(!ink.height() && !ink.width())
	{
		//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
		d = Math.max(element.outerWidth(), element.outerHeight());
		ink.css({height: d, width: d});
	}
	
	//get click coordinates
	//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
	x = e.pageX - element.offset().left - ink.width()/2;
	y = e.pageY - element.offset().top - ink.height()/2;
	
	//set the position and add class .animate
	ink.css({top: y+'px', left: x+'px'}).addClass("animate");
})  
  });
});