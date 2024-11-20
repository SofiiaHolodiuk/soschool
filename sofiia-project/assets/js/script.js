document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('-scrolled');
        } else {
            header.classList.remove('-scrolled');
        }
    });
});

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        dots: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
        },
        onInitialized: function () {
            $('.owl-prev').empty().append('<img src="assets/images/icons/arrow.svg" alt="Previous" />');
            $('.owl-next').empty().append('<img src="assets/images/icons/arrow.svg" alt="Next" />');
        },
    });
});

$(document).ready(function () {
    $('#unite-gallery').unitegallery({
        gallery_theme: 'tiles',
        tile_border_width: 3,
        tile_enable_outline: false,
        tile_show_link_icon: true,
        tile_link_newpage: false,
        gallery_width: '100%',
        gallery_height: 'auto',
        tiles_type: 'justified',
        tiles_space_between_cols: 6,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const anchors = document.querySelectorAll('a[href^="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 200;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    }
});

// Accordions

$(document).on('click', '.--accordion__open', function () {
    const accordion = $(this).closest('.--accordion');
    const isAccordionLock =
        accordion.find('[data-accordion-in-process]').length ||
        accordion.parent().closest('[data-accordion-in-process]').length;

    if (isAccordionLock) return;

    accordion.attr('data-accordion-in-process', true);

    const isOpen = accordion.hasClass('-open');

    if (isOpen) {
        closeCustomAccordion(accordion);
    } else {
        openCustomAccordion(accordion);
    }
});

function openCustomAccordion(accordion) {
    const container = accordion.find('.--accordion__content-container').eq(0);
    const contentHeight = accordion.find('.--accordion__content').eq(0).outerHeight();

    accordion.addClass('-open');
    accordion.find('.--accordion__open').first().addClass('-active');
    container.css('height', `${contentHeight}px`);

    closeSameAccordionGroup(accordion);
}

function closeCustomAccordion(accordion) {
    const container = accordion.find('.--accordion__content-container').eq(0);
    const containerCurrentHeight = container.outerHeight();

    container.css({
        height: `${containerCurrentHeight}px`,
        transition: 'unset',
    });

    container.outerHeight(); // Lifehack

    container.css({
        height: '0px',
        transition: '',
    });

    accordion.removeClass('-open');
    accordion.find('.--accordion__open').first().removeClass('-active');

    closeAccordionChildren(accordion);
}

function closeAccordionChildren(accordion) {
    if (accordion.is('[data-close-children]')) {
        accordion.find('.--accordion').each(function () {
            closeCustomAccordion($(this));
        });
    }
}

function closeSameAccordionGroup(accordion) {
    const groupName = accordion.attr('data-accordion-group');

    if (groupName) {
        $(`.--accordion[data-accordion-group="${groupName}"]`).each(function () {
            if (accordion[0] !== this) {
                closeCustomAccordion($(this));
            }
        });
    }
}

fullTransitionendCallback(
    '.--accordion__content-container',
    function (e) {
        const accordion = $(e.target).closest('.--accordion');
        const isOpen = accordion.hasClass('-open');

        accordion.removeAttr('data-accordion-in-process');

        if (isOpen) {
            $(e.target).css('height', 'auto');
        }
    },
    'height',
);

// Selector full transitionend callback

function fullTransitionendCallback(element, callback, customProperty = false) {
    if ($(element).length === 0) return;

    const transitionProperties = $(element)
        .css('transition-property')
        .split(',')
        .map(property => {
            return property.trim();
        });

    const transitionDurations = $(element)
        .css('transition-duration')
        .split(',')
        .map(duration => {
            return parseFloat(duration);
        });

    let longestProperty = false;

    if (transitionProperties.length > 1 && customProperty === false) {
        longestProperty = transitionProperties[transitionDurations.indexOf(Math.max(...transitionDurations))];
    }

    $(element).on('transitionstart', function () {
        $(this).removeAttr('data-transitionend-triggered');
    });

    $(element).on('transitionend', function (e) {
        const isTriggered = $(this).is('[data-transitionend-triggered]');

        if (isTriggered) return;

        const isCustomProperty = customProperty && e.originalEvent.propertyName === customProperty;
        const isSingleCallback =
            customProperty === false && longestProperty === false && typeof callback === 'function';
        const isLongestPropertyCallback =
            longestProperty && e.originalEvent.propertyName === longestProperty && typeof callback === 'function';

        if (isCustomProperty || isSingleCallback || isLongestPropertyCallback) {
            $(this).attr('data-transitionend-triggered', true);
            callback(e);
        }
    });
}

function lockScroll() {
    document.documentElement.classList.add('-scroll-lock');
    document.body.classList.add('-scroll-lock');
}

function unlockScroll() {
    document.documentElement.classList.remove('-scroll-lock');
    document.body.classList.remove('-scroll-lock');
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.video-modal');
    const openModalBtn = document.querySelector('.open-modal-btn');
    const closeModalBtn = modal.querySelector('.modal-close');

    openModalBtn.addEventListener('click', e => {
        e.stopPropagation();
        modal.classList.add('-active');
        lockScroll();
    });

    closeModalBtn.addEventListener('click', e => {
        e.stopPropagation();
        modal.classList.remove('-active');
        unlockScroll();
    });

    document.addEventListener('click', e => {
        if (!modal.contains(e.target) && modal.classList.contains('-active')) {
            modal.classList.remove('-active');
            unlockScroll();
        }
    });

    modal.addEventListener('click', e => {
        e.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const title = document.getElementById('subscriptionTitle');
    const description = document.getElementById('subscriptionDescription');

    form.addEventListener('submit', e => {
        e.preventDefault();

        form.style.display = 'none';
        title.style.display = 'none';
        description.style.display = 'none';

        thankYouMessage.classList.remove('-hidden');
    });
});
