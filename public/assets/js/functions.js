/*
$(function() {
	$('.sidebar .widget ul li:first-child').addClass('first');
	$('#navigation ul li:first-child').addClass('first');
	$('#navigation ul li:last-child').addClass('last');
	$('.footer-nav ul li:first-child').addClass('first');

	$('a.popup').colorbox({
		onComplete: function(){
			$.colorbox.resize();
		}
	})
});
*/
$(document).ready(function(){

  $("#uploadid").on('click',function(){
    $("#content-box-id").empty();
    $.get("uploadPage").done(function(data){
      console.log("aqane var");
      $("#content-box-id").html("&nbsp;"+data);
    });
  });


 $('form').on('submit', function(){

      var item = $('form input');
      console.log("Ae aq var");

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
	});

});