/* On click, open detail section. apply class 'active' to current item, 
 * picture and text containers, title, and first picture and text block
 */

$(document).ready(function($) {
    $('#galleroid').find('.galleroid-item').children('.galleroid-preview').click(function(){

        // set variables
        var preview = $(this);
            item = preview.parent(),
            picContainer = preview.children('.galleroid-picture-container'),
            detail = item.children('.galleroid-detail')
            textContainer = detail.children('.galleroid-text-container'),
            title = preview.children('.galleroid-title');
        
        // toggle clicked gallery item's active elements
        preview.toggleClass('active');
        item.toggleClass('active');
        picContainer.toggleClass('active');
        title.toggleClass('active');
        detail.is(":hidden") ? detail.slideDown(500) : detail.slideUp(400);

        // remove active elements from all other gallery items
        $('.galleroid-preview').not(preview).removeClass('active');
        $('.galleroid-item').not(item).removeClass('active');
        $('.galleroid-picture-container').not(picContainer).removeClass('active');
        $('.galleroid-detail').not(detail).slideUp(400);
        $('.galleroid-title').not(title).removeClass('active');
    });
});