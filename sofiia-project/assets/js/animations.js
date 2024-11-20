document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const DELAY_INCREMENT = 0.2;
    const ANIMATION_DURATION = 0.7;
    const START_TRIGGER = 'top 90%';
    const END_TRIGGER = 'bottom 60%';
    const TOGGLE_ACTIONS = 'play none none none';
    const SHOW_MARKERS = false;

    const getAnimationConfig = (animationType, delay) => {
        let fromVars = { opacity: 0 };
        let toVars = {
            opacity: 1,
            delay: delay,
            duration: ANIMATION_DURATION,
            scrollTrigger: {
                trigger: null,
                start: START_TRIGGER,
                end: END_TRIGGER,
                toggleActions: TOGGLE_ACTIONS,
                markers: SHOW_MARKERS,
            },
        };

        switch (animationType) {
            case 'swim-top':
                fromVars.y = 100;
                toVars.y = 0;
                toVars.scrollTrigger.start = 'top 90%';
                toVars.scrollTrigger.end = 'top 70%';
                break;
            case 'swim-down':
                fromVars.y = -100;
                toVars.y = 0;
                toVars.scrollTrigger.start = 'top 90%';
                toVars.scrollTrigger.end = 'top 70%';
                break;
            case 'swim-left':
                fromVars.x = 100;
                toVars.x = 0;
                break;
            case 'swim-right':
                fromVars.x = -100;
                toVars.x = 0;
                break;
            case 'fade':
                break;
            default:
                console.warn(`Unknown animation type: ${animationType}`);
        }

        return { fromVars, toVars };
    };

    const animateElements = (elements, group = false) => {
        elements.forEach((el, index) => {
            const animationType = el.getAttribute('data-animate');
            const delay = group ? index * DELAY_INCREMENT : 0;
            const { fromVars, toVars } = getAnimationConfig(animationType, delay);
            toVars.scrollTrigger.trigger = el;
            gsap.fromTo(el, fromVars, toVars);
        });
    };

    const handleAnimationGroups = groupSelector => {
        document.querySelectorAll(groupSelector).forEach(group => {
            const elements = group.querySelectorAll('[data-animate]');
            elements.forEach((el, index) => {
                const animationType = el.getAttribute('data-animate') || 'swim-top';
                el.setAttribute('data-animate', animationType);
                const delay = index * DELAY_INCREMENT;
                const { fromVars, toVars } = getAnimationConfig(animationType, delay);
                toVars.scrollTrigger.trigger = group; // Група виступає тригером для внутрішніх елементів
                gsap.fromTo(el, fromVars, toVars);
            });
        });
    };

    handleAnimationGroups('[data-animate-group="list"]');
    handleAnimationGroups('[data-animate-group="content"]');

    animateElements(
        document.querySelectorAll(
            '[data-animate]:not([data-animate-group="list"] [data-animate], [data-animate-group="content"] [data-animate])',
        ),
    );
});
