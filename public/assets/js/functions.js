$(document).ready(function(){

  $("#uploadid").on('click',function(){
    $.get("uploadPage").done(function(data){
      console.log("aqane var");
      
      $("#jandaba").html("<div class='content-box' id='content-box-id'></div>");
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