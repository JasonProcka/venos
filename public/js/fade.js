var FadeIn =
{

 init: function()
 {

  var content = Core.getElementsByClass("fade");
  FadeIn.makeTransparent(content);

  $(".fade").fadeTo(3000, 0.9);

 },

 makeTransparent: function(content)
 {

  $(".fade").css("opacity", 0);
  $(".fade").css("filter", "alpha(opacity=0)");

 }

};