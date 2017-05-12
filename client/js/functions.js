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


$(document).one('ready',function(){
	$.ajax({
        type: 'POST',
        url: '/',
        success: function(){
          //do something with the data via front-end framework
          
          location.reload();
        }
     });


});