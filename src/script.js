let b = 1
let c = 2
let a = b + c
console.log(a)

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Parallax Layers
    document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "0% 0%",
                end: "100% 0%",
                scrub: 0
            }
        });
        const layers = [
            { layer: "1", yPercent: 70 },
            { layer: "2", yPercent: 55 },
            { layer: "3", yPercent: 40 },
            { layer: "4", yPercent: 10 }
        ];
        layers.forEach((layerObj, idx) => {
            tl.to(
                triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                {
                    yPercent: layerObj.yPercent,
                    ease: "none"
                },
                idx === 0 ? undefined : "<"
            );
        });
    });

    /* Lenis */
    const lenis = new Lenis({
        duration: 1.2, // Тут встановлюється тривалість анімації скролу в секундах
        // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Можете розкоментувати та змінити easing, якщо потрібно
        // smoothTouch: false, // За потреби увімкніть плавний скрол на тач-пристроях
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

}); // Кінець DOMContentLoaded