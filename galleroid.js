/* On click, open detail section. apply class 'active' to current item, 
 * picture and text containers, title, and first picture and text block
 */

$(document).ready(function($) {
    $('#galleroid').find('.galleroid-item').children('.galleroid-preview').click(function(){
        var preview = $(this);
            item = preview.parent(),
            picContainer = preview.children('.galleroid-picture-container'),
            detail = item.children('.galleroid-detail')
            textContainer = detail.children('.galleroid-text-container'),
            title = preview.children('.galleroid-title');
        
        preview.toggleClass('active');
        item.toggleClass('active');
        picContainer.toggleClass('active');
        detail.toggleClass('active');
        textContainer.toggleClass('active');
        title.toggleClass('active');

        $('.galleroid-preview').not(preview).removeClass('active');
        $('.galleroid-item').not(item).removeClass('active');
        $('.galleroid-picture-container').not(picContainer).removeClass('active');
        $('.galleroid-detail').not(detail).removeClass('active');
        $('.galleroid-text-container').not(textContainer).removeClass('active');
        $('.galleroid-title').not(title).removeClass('active');
    });
});