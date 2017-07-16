$(document).ready(function(){
    $('#add-id').on('click', function(){

        var item = $('.form-control').find("option:selected").text();
        if (item === "")
            return;
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
;( function( $, window, document, undefined )
{
    $( '.inputfile' ).each( function()
    {
        var $input   = $( this ),
            $label   = $input.next( 'label' ),
            labelVal = $label.html();

        $input.on( 'change', function( e )
        {
            var fileName = '';

            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else if( e.target.value )
                fileName = e.target.value.split( '\\' ).pop();
                $label.html( fileName );
        });

        // // Firefox bug fix
        // $input
        // .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
        // .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
    });
})( jQuery, window, document );
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

