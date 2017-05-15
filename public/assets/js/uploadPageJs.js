$(document).ready(function(){

 $('form').on('submit', function(){

      var item = $('form input');
      $.ajax({
        type: 'POST',
        url: '/uploadPage',
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
	});

});