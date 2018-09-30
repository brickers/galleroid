$(document).ready(function($) {

    $('#galleroid').load('galleroid.html', function() {

        var items = $('.galleroid-item'),
            pics = $('.galleroid-picture-container'),
            titles = $('.galleroid-title'),
            texts = $('.galleroid-text-container'),
            prevs = $('.galleroid-previous-button'),
            nexts = $('.galleroid-next-button'),
            enterDuration = 250,
            exitDuration = 200;
        
        $('#galleroid').find('.galleroid-picture-container').on('click', function (e) {

            // set variables
            var pic = $(this),
                item = pic.parent(),
                prev = item.children('.galleroid-previous-button'),
                title = item.children('.galleroid-title'),
                next = item.children('.galleroid-next-button'),
                text = item.children('.galleroid-text-container'),
                isTextHidden = text.is(":hidden"),
                isPrevHidden = prev.is(":hidden"),
                isNextHidden = next.is(":hidden"),
                otherItems = items.not(item),
                otherPics = pics.not(pic),
                otherTitles = titles.not(title),
                otherTexts = texts.not(text),
                otherPrevs = prevs.not(prev),
                otherNexts = nexts.not(next);

            // prevent standard link behaviour
            e.preventDefault();

            // activate current gallery item and its constituents
            if (!(item.hasClass('active'))) {
                setMargins(item);
                item.addClass('active');
            } else {
                item.removeAttr('style');
                item.removeClass('active');
            }

            pic.toggleClass('active');
            title.toggleClass('active');
            isTextHidden ? text.stop(true, true).addClass('active').css('display', 'none').fadeIn(enterDuration) : 
                           text.stop(true, true).removeClass('active');
            isPrevHidden ? prev.stop(true, true).addClass('active').css('display', 'none').fadeIn(enterDuration) :
                           prev.stop(true, true).fadeOut({  duration: exitDuration,
                                                            complete: function(){prev.removeClass('active')}});
            isNextHidden ? next.stop(true, true).addClass('active').css('display', 'none').fadeIn(enterDuration) :
                           next.stop(true, true).fadeOut({  duration: exitDuration,
                                                            complete: function(){next.removeClass('active')}});

            // deactivate all other gallery items
            otherItems.removeClass('active').removeAttr('style');
            otherPics.removeClass('active');
            otherTitles.removeClass('active');
            otherTexts.stop(true, true).slideUp({duration: exitDuration, 
                                                 complete: function(){$('this').removeClass('active')}});
            otherPrevs.stop(true, true).fadeOut({duration: exitDuration,
                                                 complete: function(){$('this').removeClass('active')}});
            otherNexts.stop(true, true).fadeOut({duration: exitDuration,
                                                 complete: function(){$('this').removeClass('active')}});
        });

        $('.galleroid-previous-button').on('click', function (e) {
            var item = $(this).parent();
            navigateDetail(false, item);
        });

        $('.galleroid-next-button').on('click', function (e) {
            var item = $(this).parent();
            navigateDetail(true, item);
        });

        $(window).resize(function() {
            setMargins($('.galleroid-item.active'));
        });
    });
});

function setMargins(element) {
    var targetMargin;
          
    // make galleroid responsive by reducing margin size on big screens
    if ($(window).width() >= 750) {
        targetMargin = $(window).width() / 100;
    } else {
        targetMargin = $(window).width() / 50;
    }

    var offset = element.parent()[0].getBoundingClientRect(),
        activeMarginTop = targetMargin - offset.top,
        activeMarginLeft = targetMargin - offset.left;

    element.css({'margin-top': activeMarginTop,'margin-left': activeMarginLeft, 'margin-bottom': '0', 'margin-right': '0'});
}

function navigateDetail(goForwards, item) {
    var activeIndex = 3,
        detailPicItems = item.find('.galleroid-picture'),
        detailBGPicItems = item.find('.galleroid-bg-picture'),
        detailTextItems = item.find('.galleroid-text'),
        detailPicItemsCount = detailPicItems.length;

    // find index of currently-active detail item
    for (i = 0; i < detailPicItemsCount; i++) {
        if (detailPicItems.eq(i).hasClass('active')) {
            activeIndex = i;
            i = detailPicItemsCount;
        }
    }
    
    var direction = 0,
        classToAdd,
        classToRemove;

    if (goForwards == true) {
        // increment
        if (activeIndex + 1 < detailPicItemsCount) {
            direction = 1;
            classToAdd = 'hidden-left';
            classToRemove = 'hidden-right';
        }
    } else if (goForwards == false) {
        // decrement
        if (activeIndex > 0) {
            direction = -1;
            classToAdd = 'hidden-right';
            classToRemove = 'hidden-left';
        }
    }

    if (direction != 0) {
        detailPicItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailPicItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
        detailBGPicItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailBGPicItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
        detailTextItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailTextItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
    }
}