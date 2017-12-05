/* On click, open detail section. apply class 'active' to current item, 
 * picture and text containers, title, and first picture and text block
 */

$(document).ready(function ($) {
    $('#galleroid').find('.galleroid-item').children('.galleroid-preview').on('click', function (e) {

        // set variables
        var preview = $(this),
            item = preview.parent(),
            picContainer = preview.children('.galleroid-picture-container'),
            detail = item.children('.galleroid-detail'),
            textContainer = detail.children('.galleroid-text-container'),
            title = preview.children('.galleroid-title');

        // toggle clicked gallery item's active elements
        preview.toggleClass('active');
        item.toggleClass('active');
        picContainer.toggleClass('active');
        title.toggleClass('active');
        detail.is(":hidden") ? detail.slideDown(250) : detail.slideUp(200);

        // remove active elements from all other gallery items
        $('.galleroid-preview').not(preview).removeClass('active');
        $('.galleroid-item').not(item).removeClass('active');
        $('.galleroid-picture-container').not(picContainer).removeClass('active');
        $('.galleroid-detail').not(detail).slideUp(200);
        $('.galleroid-title').not(title).removeClass('active');

        // delay scroll until after resizing has finished
        var href = preview.attr("href"),
            headerHeight = 1;//$("header").outerHeight() + 1;

        e.preventDefault();
        setTimeout(function () {
            var offsetTop = href === "#" ? 0 : $(href).offset().top - headerHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 500, 'swing'
        )}, 200); //needs to be set to same duration as gallery close animation
    });
});