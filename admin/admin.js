$(function() {
    $(document).ready(function() {
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