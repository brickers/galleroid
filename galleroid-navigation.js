$(document).ready(function($) {

    $('#galleroid').load('galleroid/galleroid.html', function() {

        var items = $('.galleroid-item')
        
        $('#galleroid').find('.galleroid-picture-container').on('click', function (e) {
            // set variables
            var pic = $(this),
                item = pic.parent(),
                otherItems = items.not(item)

            // prevent standard link behaviour  
            e.preventDefault();

            // activate current gallery item and its constituents
            if (item.hasClass('active')) {
                item.removeAttr('style');
                item.removeClass('active');
            } else {
                setMargins(item);
                item.addClass('active');
            }

            // deactivate all other gallery items
            otherItems.removeClass('active').removeAttr('style');
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
        detailFGPicItems = item.find('.galleroid-fg-picture'),
        detailBGPicItems = item.find('.galleroid-bg-picture'),
        detailTextItems = item.find('.galleroid-caption'),
        detailFGPicItemsCount = detailFGPicItems.length;

    // find index of currently-active detail item
    for (i = 0; i < detailFGPicItemsCount; i++) {
        if (detailFGPicItems.eq(i).hasClass('active')) {
            activeIndex = i;
            i = detailFGPicItemsCount;
        }
    }
    
    var direction = 0,
        classToAdd,
        classToRemove;

    if (goForwards == true) {
        // increment
        if (activeIndex + 1 < detailFGPicItemsCount) {
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
        detailFGPicItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailFGPicItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
        detailBGPicItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailBGPicItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
        detailTextItems.eq(activeIndex).removeClass('active').addClass(classToAdd);
        detailTextItems.eq(activeIndex + direction).removeClass(classToRemove).addClass('active');
    }
}