var count = 0;
$(document).ready(function(){
    $('#add-id').on('click', function(){
        var item = $('.form-control').find("option:selected").text();
        if (item === "")
            return;
        $('#tag-list').append('<input type="hidden" name =tag'+ count+" value = " + item +'>'+ '<li>'+ item+ '</li>');
        $('.form-control').find("option:selected").remove();
        count += 1;
        return false;
    });
    $(document).on('click', '#tag-list > li', function() {
        count -=1;
        var $this = $(this);
        $('.form-control').append('<option>' + $this.html() + '</option>');
        $this.remove();
    });
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
    availableEndings = [".pdf"];
    for(const ending of availableEndings){
        if (name.endsWith(ending)){
            $('#tag-list').append('<input type="hidden" name =counter'+ " value = " + count +'>');
            return true;
        }
    }
    alert("Invalid file format!");
    return false;
};

