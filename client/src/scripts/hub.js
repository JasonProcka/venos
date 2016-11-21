$(function () {
    $(document).ready(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1950){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-fifth");
        }
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1400){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-fifth");
        }
        if ($(".sub-content").width()<1100){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-4");
        }
	    //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<850){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-third");
	    }
	   if ($(".sub-content").width()>630){
            $(".sub-content").css("margin-right", "40px");
            $(".hub-grid").css("margin-top", "40px");
            $("[class*='col-']").css("margin-bottom", "40px");
            $(".col").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-right", "40px");
            $(".jumbo-content").css("padding-left", "40px");
            $(".jumbo-content").css("padding-right", "40px");
	    }
        if ($(".sub-content").width()<629){
            $(".sub-content").css("margin-right", "20px");
            $(".hub-grid").css("margin-top", "20px");
            $(".col").css("padding-left", "20px");
            $("[class*='col-']").css("margin-bottom", "20px");
            $(".mdl-layout__tab-bar").css("padding-left", "20px");
            $(".mdl-layout__tab-bar").css("padding-right", "20px");
            $(".jumbo-content").css("padding-left", "20px");
            $(".jumbo-content").css("padding-right", "20px");
	    }
	    if ($(".sub-content").width()<540){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-8");
	    }
        var dropWidth = $(".mdl-card").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $("[class*='col-']").css("height", dropWidth + 'px');
        $(".col").css("height", dropWidth + 'px');
    });
    $(window).resize(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1950){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-fifth");
        }
        //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<1400){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-fifth");
        }
        if ($(".sub-content").width()<1100){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-4");
        }
	    //Change the class of the columns, depending on the screen size
        if ($(".sub-content").width()<850){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-third");
	    }
	   if ($(".sub-content").width()>630){
            $(".sub-content").css("margin-right", "40px");
            $(".hub-grid").css("margin-top", "40px");
            $("[class*='col-']").css("margin-bottom", "40px");
            $(".col").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-left", "40px");
            $(".mdl-layout__tab-bar").css("padding-right", "40px");
            $(".jumbo-content").css("padding-left", "40px");
            $(".jumbo-content").css("padding-right", "40px");
	    }
        if ($(".sub-content").width()<629){
            $(".sub-content").css("margin-right", "20px");
            $(".hub-grid").css("margin-top", "20px");
            $(".col").css("padding-left", "20px");
            $("[class*='col-']").css("margin-bottom", "20px");
            $(".mdl-layout__tab-bar").css("padding-left", "20px");
            $(".mdl-layout__tab-bar").css("padding-right", "20px");
            $(".jumbo-content").css("padding-left", "20px");
            $(".jumbo-content").css("padding-right", "20px");
	    }
	    if ($(".sub-content").width()<540){	
            $(".hub-grid").find("[class*='col-']").attr("class", "col-8");
	    }
        var dropWidth = $(".mdl-card").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $("[class*='col-']").css("height", dropWidth + 'px');
        $(".col").css("height", dropWidth + 'px');
        //Change the class of the columns, depending on the screen size

    });
    $(function() {
        $(".create-drop").on("click", function(e) {
            $(".dropzonecontainer").fadeIn(100);
            $(".overlay").fadeIn(100);
        });  
    });
  
    $(function() {
        $(".closeadddrop").on("click", function(e) {
            $(".dropzonecontainer").fadeOut(100);
            $(".overlay").fadeOut(100);
        });  
    });
    
    $(function() {
        $(".hub-card").on("click", function(e) {
            //$(".drop-theater").removeClass("drop-theater-closed");
            $(".drop-theater").fadeIn(100);
            $(".drop-theater-overlay").fadeIn(100);
            //$(".drop-theater-overlay").css("visibility", "visible").delay(1000);
            //$(".drop-theater").addClass("drop-theater-open");
        });  
        
    });
    
    $(function() {
        $(".theater-close").on("click", function(e) {
            //$(".drop-theater").removeClass("drop-theater-open");
            $(".drop-theater-overlay").fadeOut(100);
            //$(".drop-theater-overlay").css("visibility", "hidden").delay(1000);
            //$(".drop-theater").addClass("drop-theater-closed"); 
            $(".drop-theater").fadeOut(100);
            $(".scaled-image").css("width", "calc(100% - 80px)");
            $(".scaled-image").css("height", "calc(100% - 80px)");
        });  
    });
    //Zoom Functionality in Theater
    $(function() {
        var count = 0;
        var zoomoutcount = 0;
        $(".zoom-in").on("click", function() {
            count++;
            console.log(count);
            zoomedWidth = $(".scaled-image").width() * 1.2
            zoomedHeight = $(".scaled-image").height() * 1.2
            console.log(zoomoutcount);
           $(".scaled-image").css("width", zoomedWidth);
           $(".scaled-image").css("height", zoomedHeight);
            if (count != 0) {
                $(".scaled-image").removeClass('draggable');
            }
        });
        $(".zoom-out").on("click", function() {
            count--;
            zoomoutcount++;
            unzoomedWidth = $(".scaled-image").width() / 1.2
            unzoomedHeight = $(".scaled-image").height() / 1.2
            console.log(count);
            console.log(zoomoutcount);
            $(".scaled-image").css("width", unzoomedWidth);
            $(".scaled-image").css("height", unzoomedHeight);
            if (count != 0) {
                $(".scaled-image").removeClass('draggable');
            }
        });
        if (count != 0) {
            $(".scaled-image").drags();
        }
    });
});
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    };
});