$(function () {
    $(document).ready(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".content").width()<1400){	
            $(".grid").find("[class*='col-']").attr("class", ".col-4");
	    }
	    //Change the class of the columns, depending on the screen size
        if ($(".content").width()<1000){	
            $(".grid").find("[class*='col-']").attr("class", ".col-3");
	    }
	    if ($(".content").width()<800){	
            $(".grid").find("[class*='col-']").attr("class", ".col-2");
	    }
        var dropWidth = $(".col").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $(".demo-card-image").css("height", dropWidth + 'px');
        $(".demo-card-image").css("width", dropWidth + 'px');
        $(".col, .filler-card").css("height", dropWidth + 'px');
    });
    $(window).resize(function() {
        //Change the class of the columns, depending on the screen size
        if ($(".content").width()<1400){	
            $(".grid").find("[class*='col-']").attr("class", ".col-4");
	    }
	    //Change the class of the columns, depending on the screen size
        if ($(".content").width()<1000){	
            $(".grid").find("[class*='col-']").attr("class", ".col-3");
	    }
	    if ($(".content").width()<800){	
            $(".grid").find("[class*='col-']").attr("class", ".col-2");
	    }
        var dropWidth = $(".col").width();
        $(".mdl-card").css("height", dropWidth + 'px');
        $(".demo-card-image").css("height", dropWidth + 'px');
        $(".demo-card-image").css("width", dropWidth + 'px');
        $(".col, .filler-card").css("height", dropWidth + 'px');
        //Change the class of the columns, depending on the screen size

    });
});