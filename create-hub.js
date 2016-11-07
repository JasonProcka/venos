$(function () {
    $(document).ready(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1400){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-4");
	    }
	    //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<850){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-third");
	    }
  	    if ($(".sub-content").width()<631){	
              $(".hub-grid").find("[class*='col-']").attr("class", "col-8");
              $(".sub-content").css("margin-right", "20px");
              $(".hub-grid").css("margin-top", "20px");
              $(".col").css("padding-left", "20px");
              $("[class*='col-']").css("margin-bottom", "20px");
              $(".mdl-layout__tab-bar").css("padding-left", "20px");
              $(".mdl-layout__tab-bar").css("padding-right", "20px");
              $(".jumbo-content").css("padding-left", "20px");
              $(".jumbo-content").css("padding-right", "20px");
              
              
  	    } else {
              $(".sub-content").css("margin-right", "40px");
              $(".hub-grid").css("margin-top", "40px");
              $("[class*='col-']").css("margin-bottom", "40px");
              $(".col").css("padding-left", "40px");
              $(".mdl-layout__tab-bar").css("padding-left", "40px");
              $(".mdl-layout__tab-bar").css("padding-right", "40px");
              $(".jumbo-content").css("padding-left", "40px");
              $(".jumbo-content").css("padding-right", "40px");
  	    }
        var dropWidth = $(".mdl-card").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $("[class*='col-']").css("height", dropWidth + 'px');
        $(".col").css("height", dropWidth + 'px');
      // Prevent clicking of non-walkthrough elements
      $(".noclick").on("click", function(e) {
        e.preventDefault();
      });
      // Fallback for non-HTML5 Users
      $(function() {
      if ($(".hub-title").is(":focus")) {
      } else {
        $(".hub-title").focus();  
      }  
    });
    $(window).resize(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1400){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-4");
        }
	    //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<850){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-third");
	    }
	    if ($(".sub-content").width()<631){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-8");
            $(".sub-content").css("margin-right", "20px");
            $(".hub-grid").css("margin-top", "20px");
            $(".col").css("padding-left", "20px");
            $("[class*='col-']").css("margin-bottom", "20px");
            $(".mdl-layout__tab-bar").css("padding-left", "20px");
            $(".mdl-layout__tab-bar").css("padding-right", "20px");
            $(".jumbo-content").css("padding-left", "20px");
            $(".jumbo-content").css("padding-right", "20px");
            
            
	    } else {
            $(".sub-content").css("margin-right", "40px");
            $(".hub-grid").css("margin-top", "40px");
            $("[class*='col-']").css("margin-bottom", "40px");
            $(".col").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-right", "40px");
            $(".jumbo-content").css("padding-left", "40px");
            $(".jumbo-content").css("padding-right", "40px");
	    }
        var dropWidth = $(".mdl-card").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $("[class*='col-']").css("height", dropWidth + 'px');
        $(".col").css("height", dropWidth + 'px');
        //Change the class of the columns, depending on the screen size

    });
    var jumboHeight = $(".hub-jumbo").height();
      $(".first").fadeIn(200);
      $(".next-btn1").on("click", function() {
        $(".first").fadeOut(200);
        $(".hub-description").css("visibility", "visible").fadeIn(200);
        $(".hub-title").focusout();
        $(".hub-description").focus();
        $(".second").fadeIn(200);
      });
      $(".next-btn2").on("click", function() {
        $(".second").fadeOut(200);
        $(".customurl").fadeIn().css("transform", "translateY(-55%) translateX(-50%)");
        $('body').css("position", "fixed");
        $(".overlay").css("background-color", "background-color:rgba(0,0,0,0.5);");
        $(".hub-jumbo").css("z-index", 10000);
      });
      // User does not want a custom URL
      $(".next-btn3").on("click", function() {
        
      });
      // User would like a custom URL
      $(".next-btn4").on("click", function() {
        $(".customurl-btns").fadeOut(200);
        $(".customurl p").fadeOut(200, function() {
          $(".customurl .url-input").append("<span class='fieldlabel smooth'>venos.co/</span><input type='text' class='customurl-input' name='huburl'><div class='urlfield-btns'><button class='next-btn5 mdl-button mdl-js-button mdl-button--raised ripple-effect'>CANCEL</button><button class='next-btn6 mdl-button mdl-js-button mdl-button--raised ripple-effect mdl-button--accent'>FINISH</button></div>");
          $(".customurl").css("transform", "translateY(-48%) translateX(-50%)");
          $(".customurl-input").focus();
            // User wants to go back to Would You Like a Custom URL?
            $(".next-btn5").on("click", function() {
              $(".urlfield-btns").fadeOut(200, function() {
                $(".customurl-btns").fadeIn(200);
                $(".customurl p").fadeIn(200);
                $(".fieldlabel, .customurl-input").fadeOut(200);
                $(".customurl").fadeIn().css("transform", "translateY(-55%) translateX(-50%)");
                $(".fieldlabel").remove();
                $(".customurl-input").remove();
                $(".urlfield-btns").remove();
              });
            });
        });      
      });
    });
});