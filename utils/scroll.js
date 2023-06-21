import Lenis from '@studio-freight/lenis'

let LenisManager = null

function rAF(time) {
    LenisManager?.raf(time)

    requestAnimationFrame(rAF)
}

const togglePointerEvents = (disable) => {
    const elements = document.querySelectorAll('video, iframe');

    elements.forEach(element => {
        if (disable) {
            element.classList.add('disabled');
        } else {
            element.classList.remove('disabled');

        }
    });
};


if (typeof window !== 'undefined') {
    LenisManager = new Lenis({
        direction: 'vertical',
        duration: 1.2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        gestureDirection: 'vertical',
        // mouseMultiplier: '0.5',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    })

    let isScrolling;

    LenisManager.on('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            togglePointerEvents(false);
        }, 66);

        togglePointerEvents(true);
    });

    requestAnimationFrame(rAF)
}

export default LenisManager
