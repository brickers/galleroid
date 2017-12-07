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
            href = pic.attr("href"),
            enterDuration = 250,
            exitDuration = 200;

        // prevent standard link behaviour
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
            }, exitDuration);
        }

        // activate current gallery item
        item.toggleClass('active');
        pic.toggleClass('active');
        title.toggleClass('active');
        text.is(":hidden") ? text.stop(true, true).slideDown({  duration: enterDuration,
                                                                complete: function(){text.addClass('active')}}) : 
                             text.stop(true, true).slideUp({    duration: exitDuration,
                                                                complete: function(){text.removeClass('active')}});
        prev.is(":hidden") ? prev.stop(true, true).addClass('active').css('display', 'none').fadeIn(enterDuration) :
                             prev.stop(true, true).fadeOut({    duration: exitDuration,
                                                                complete: function(){prev.removeClass('active')}});
        next.is(":hidden") ? next.stop(true, true).addClass('active').css('display', 'none').fadeIn(enterDuration) :
                             next.stop(true, true).fadeOut({    duration: exitDuration,
                                                                complete: function(){next.removeClass('active')}});

        // deactivate all other gallery items
        $('.galleroid-item').not(item).removeClass('active');
        $('.galleroid-picture-container').not(pic).removeClass('active');
        $('.galleroid-title').not(title).removeClass('active');
        $('.galleroid-text-container').not(text).stop(true, true).slideUp({ duration: exitDuration, 
                                                                            complete: function(){$('this').removeClass('active')}});
        $('.galleroid-previous-button').not(prev).stop(true, true).fadeOut({duration: exitDuration,
                                                                            complete: function(){$('this').removeClass('active')}});
        $('.galleroid-next-button').not(next).stop(true, true).fadeOut({    duration: exitDuration,
                                                                            complete: function(){$('this').removeClass('active')}});
    });
});