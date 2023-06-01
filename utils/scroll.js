import Lenis from '@studio-freight/lenis'

let LenisManager = null

function rAF(time) {
  LenisManager?.raf(time)

  requestAnimationFrame(rAF)
}

const togglePointerEvents = (disable) => {
    console.log(`togglePointerEvents called with disable = ${disable}`);
    const elements = document.querySelectorAll('video, iframe');

    elements.forEach(element => {
        if (disable) {
            element.classList.add('disabled');
            console.log(`Added 'disabled' class to element: `, element);
        } else {
            element.classList.remove('disabled');
            console.log(`Removed 'disabled' class to element: `, element);

        }
    });
};


if (typeof window !== 'undefined') {
  LenisManager = new Lenis({
    direction: 'vertical',
    duration: 1,
    gestureDirection: 'vertical',
    mouseMultiplier: 0.5,
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
  })

    let isScrolling;

    LenisManager.on('scroll', () => {
        console.log("Scroll event triggered");
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            togglePointerEvents(false);
        }, 66);

        togglePointerEvents(true);
    });

    requestAnimationFrame(rAF)
}

export default LenisManager
