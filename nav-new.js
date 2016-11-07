$(function() {
    $(document).ready(function() {
      // Close the nav
      $(".navknob").on("click", function() {
        $(".jumboknob").fadeIn(100);
        $(".nav").addClass("navclosed");
        $(".content").addClass("content-nonav");
        $(".hub-jumbo").addClass("jumbo-nonav");
      });
      // Open the nav
      $(".jumboknob").on("click", function() {
        $(".jumboknob").fadeOut(100, function() {
          $(".content").removeClass("content-nonav");
          $(".hub-jumbo").removeClass("jumbo-nonav");  
          $(".nav").removeClass("navclosed");
        });
      });
    });
  // window resize
  $(window).resize(function() {
    var dropWidth = $(".col").width();
    $(".mdl-card__title").css("height", dropWidth + 'px');
    $(".demo-card-image").css("height", dropWidth + 'px');
    $(".demo-card-image").css("width", dropWidth + 'px');
    $(".col, .hub-card").css("height", dropWidth + 'px');
    //$(".tile").css("height", dropWidth + 'px');
  //Change the class of the columns, depending on the screen size
	//  if ($(window).width() <= 800){	
	//    $(".grid").find(".col-4").attr("id", "col-resizer");
	//  }
  });
});