    $(document).ready(function() {
      var colWidth = $(".col").width();
      $(".tile").css("height", colWidth + 'px');
      $(".col, .filler-card").css("height", colWidth + 'px');
    });
      // window resize
  $(window).resize(function() {
    var dropWidth = $(".col").width();
    $(".mdl-card__title").css("height", colWidth + 'px');
    $(".demo-card-image").css("height", colWidth + 'px');
    $(".demo-card-image").css("width", colWidth + 'px');
    $(".col, .hub-card").css("height", colWidth + 'px');
    $(".tile").css("height", colWidth + 'px');
  });
