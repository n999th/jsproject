$(document).ready(function(){

 $('#add-id').on('click', function(){
  
      var item = $('.form-control').find("option:selected").text();
      console.log("item is : " + item);
      
      return false;
	});

});


