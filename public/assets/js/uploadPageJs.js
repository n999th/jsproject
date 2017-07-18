$(document).ready(function(){
    $('#add-id').on('click', function(){

        var item = $('.form-control').find("option:selected").text();
        if (item === "")
            return;
        $('#tag-list').append('<li name ='+item+" value = " + item +'>'+ item+ '</li>');
        $('.form-control').find("option:selected").remove();
        return false;
    });
    $(document).on('click', '#tag-list > li', function() {
        var $this = $(this);
        $('.form-control').append('<option>' + $this.html() + '</option>');
        $this.remove();
    });

    $('#submit-id').on('click', function (argument) {
        var text = $('#textarea-id').val();
        var tags = [];
        $('#tag-list > li').each(function(i){
            tags.push(($(this)).text()); 
        });
        $.ajax({
            type: 'POST',
            url: '/uploadPage/',
            data:{text:text,tagList:tags},
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
        });
    })
;( function(){
    $( '.inputfile' ).each( function(){
        var $input   = $( this ),
            $label   = $input.next( 'label' );
        $input.on( 'change', function(e){
            fileName = e.target.value.split( '\\' ).pop();
            $label.html( fileName );
        });
    });
})();
});
function validate(){
    console.log("validate");
    var name = $('input[type=file]').val().split('\\').pop();
    availableEndings = [".doc",".docx",".pdf",".txt"];
    for(const ending of availableEndings){
        if (name.endsWith(ending)){
            return true;
        }
    }
    alert("Invalid file format!");
    return false;
};

