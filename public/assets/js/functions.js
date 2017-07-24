$(document).ready(function(){
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {  
        var pathname = window.location.pathname;
        var targetUrl = '';
        if(pathname === '/oldest'){
            targetUrl = '/loadOld';
        }else{
            targetUrl = '/loadNew'
        }
      $.ajax({
            url: targetUrl,
            type: 'GET',
            success: function(res) {
              for(var i =0; i < res.length; i+=1){
                var str = '<div class="content-box" id="content-box-id"><b>'+ res[i].title+'</b>' ;
                str = str+'<embed src=/uploads/'+res[i].username+'/'+res[i].filename +' type="application/pdf">'+
                                '<b>Author:'+res[i].username+'</b> <b>Tags:'+res[i].tags+' </b></div>';
                $('#contents_id').append(str);
                console.log(str);
              }
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
