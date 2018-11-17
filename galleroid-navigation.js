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
                loadImages(pic);
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

function loadImages(container) {
    var fgPics = $(container).find('.galleroid-fg-picture[src=""]');
    var bgPics = $(container).find('.galleroid-bg-picture[src=""]');
    swapDatasrcToSrc(fgPics);
    swapDatasrcToSrc(bgPics);
}

function swapDatasrcToSrc(list) {
    for (let picture of list) {
        picture.src = picture.dataset.src;
        picture.dataset.src = "";
    }
}

function setMargins(element) {
    if (element.length < 1) { return };

    var offset = element.parent()[0].getBoundingClientRect();
    var currentCentreX = (offset.width / 2) + offset.left;
    var currentCentreY = (offset.height / 2) + offset.top;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var windowCentreX = windowWidth / 2;
    var windowCentreY = windowHeight / 2;
    var height = windowHeight - (windowWidth * 0.04);
    var activeMarginTop = windowCentreY - currentCentreY;
    var activeMarginLeft = windowCentreX - currentCentreX;
    element.css({'margin-top': activeMarginTop,'margin-left': activeMarginLeft, 'margin-bottom': '0', 'margin-right': '0', 'height': height});
}

function navigateDetail(goForwards, item) {
    var activeIndex = 3;
    var detailFGPicItems = item.find('.galleroid-fg-picture');
    var detailBGPicItems = item.find('.galleroid-bg-picture');
    var detailTextItems = item.find('.galleroid-caption');
    var detailFGPicItemsCount = detailFGPicItems.length;

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