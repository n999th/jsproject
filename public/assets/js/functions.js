$(document).ready(function(){
/*
  $("#uploadid").on('click',function(){
    $.get("uploadPage").done(function(data){
      console.log("aqane var");
      
      $("#jandaba").html("<div class='content-box' id='content-box-id'></div>");
      $("#content-box-id").html("&nbsp;"+data);
    });
  });
*/
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      alert("ariqaa");
       $.ajax({
          type: 'post',
          url: '/loadMore'
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
      });  
    }
});
 $('form').on('submit', function(){

      var item = $('form input');
 

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