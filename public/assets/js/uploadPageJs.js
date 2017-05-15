$(document).ready(function(){

 $('#add-id').on('click', function(){
  
      var item = $('.form-control').find("option:selected").text();
      if (item === "")
      	return;
     // console.log("item is : " + item);
      $('#tag-list').append('<li>' + item + '</li>');
      console.log($('.form-control').find("option:selected"));
      
      $('.form-control').find("option:selected").remove();
      return false;
	});
 
 $(document).on('click', '#tag-list > li', function() {

                var $this = $(this);
                console.log($this.html());
                $('.form-control').append('<option>' + $this.html() + '</option>');

                $this.remove();

            });

 $('#submit-id').on('click', function (argument) {
 		var text = $('#textarea-id').val();
 		var tags = [];
 		$('#tag-list > li').each(function(i){
   			tags.push(($(this)).text()); 
		});
		console.log(tags);
		console.log(text);
 })
});


