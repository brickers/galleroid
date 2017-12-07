/* On click, open detail section. apply class 'active' to current item, 
 * picture and text containers, and title
 */

$(document).ready(function ($) {
    $('#galleroid').find('.galleroid-picture-container').on('click', function (e) {

        // set variables
        var pic = $(this),
            item = pic.parent(),
            prev = item.children('.galleroid-previous-button'),
            title = item.children('.galleroid-title'),
            next = item.children('.galleroid-next-button'),
            text = item.children('.galleroid-text-container'),
            itemActiveAtClick = pic.hasClass('active') ? true : false,
            href = pic.attr("href");

        e.preventDefault();

        // scroll to item when expanding only
        if (!itemActiveAtClick) {
            // delay scroll until after resizing has finished
            setTimeout(function () {
                var itemMarginTop = (item.outerWidth(true) - item.outerWidth()) / 2;
                var offsetTop = href === "#" ? 0 : $(href).offset().top - itemMarginTop;
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 500, 'swing')
            }, 200); //needs to be set to same duration as gallery close animation
        }

        // toggle clicked gallery item's active elements
        item.toggleClass('active');
        pic.toggleClass('active');
        prev.toggleClass('active');
        title.toggleClass('active');
        next.toggleClass('active');
        text.is(":hidden") ? text.slideDown(250) : text.slideUp(200);

        // remove active elements from all other gallery items
        $('.galleroid-previous-button').not(prev).removeClass('active');
        $('.galleroid-next-button').not(next).removeClass('active');
        $('.galleroid-item').not(item).removeClass('active');
        $('.galleroid-picture-container').not(pic).removeClass('active');
        $('.galleroid-text-container').not(text).slideUp(200);
        $('.galleroid-title').not(title).removeClass('active');
    });
});