let b = 1
let c = 2
let a = b + c
console.log(a)

// Очікуємо завантаження DOM перед виконанням скрипту
document.addEventListener("DOMContentLoaded", () => {

    // Реєстрація плагінів GSAP (ScrollTrigger необхідний)
    gsap.registerPlugin(ScrollTrigger);

    // Ініціалізація Lenis для плавного скролу
    // Налаштуйте 'duration' для зміни плавності
    const lenis = new Lenis({
        duration: 1.2, // Тривалість анімації скролу в секундах (збільште для більшої плавності)
        // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Приклад функції згладжування
        // smoothTouch: false, // Увімкнути плавний скрол на тач-пристроях (за замовчуванням false)
    });

    // Прив'язка оновлення ScrollTrigger до подій скролу Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Інтеграція Lenis з тікером GSAP для синхронізації анімації
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Вимкнення згладжування затримок тікера GSAP
    gsap.ticker.lagSmoothing(0);


    // Логіка паралакс-ефекту для шарів
    // Знаходимо всі елементи з атрибутом data-parallax-layers
    document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
        // Створюємо таймлайн GSAP, пов'язаний зі скролом
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement, // Елемент, який запускає анімацію
                start: "0% 0%", // Початок анімації (коли верх трігера досягає верху вікна перегляду)
                end: "100% 0%", // Кінець анімації (коли низ трігера досягає верху вікна перегляду)
                scrub: 0 // Плавне прив'язування анімації до скролу (0 означає без затримки)
            }
        });

        // Визначаємо шари паралаксу та їх відсоток зміщення по осі Y
        const layers = [
            { layer: "1", yPercent: 70 },
            { layer: "2", yPercent: 55 },
            { layer: "3", yPercent: 40 }, // Цей шар, можливо, відповідає за заголовок
            { layer: "4", yPercent: 10 } // Цей шар був відсутній у вашому останньому HTML
        ];

        // Додаємо анімацію для кожного шару на таймлайн
        layers.forEach((layerObj, idx) => {
             // Знаходимо елементи шару всередині triggerElement
             const layerElements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);

             // Перевіряємо, чи знайдені елементи перед додаванням анімації
             if(layerElements.length > 0) {
                 tl.to(
                     layerElements,
                     {
                         yPercent: layerObj.yPercent, // Анімуємо зміщення по осі Y у відсотках
                         ease: "none" // Лінійна анімація без згладжування
                     },
                     // Розміщуємо анімацію цього шару відносно попереднього
                     // '<' означає "почни одночасно з попередньою анімацією"
                     idx === 0 ? undefined : "<"
                 );
             }
        });
    });
});