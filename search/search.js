$(function() {
    $(document).ready(function() {
      var dropWidth = $(".col").width();
      $(".col, .hub").css("height", dropWidth / 2 + 'px');
      //$(".tile").css("height", dropWidth + 'px');
      //Change the class of the columns, depending on the screen size
	    //  if ($(window).width() <= 800){	
	    //    $(".grid").find(".col-4").attr("id", "col-resizer");
    	//  }
    });
      // window resize
  $(window).resize(function() {
    var dropWidth = $(".col").width();
    $(".col, .hub").css("height", dropWidth / 2 + 'px');
    //$(".tile").css("height", dropWidth + 'px');
  //Change the class of the columns, depending on the screen size
	//  if ($(window).width() <= 800){	
	//    $(".grid").find(".col-4").attr("id", "col-resizer");
	//  }
  });
});