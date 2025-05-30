let b = 1
let c = 2
let a = b + c
console.log(a)

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
        ];

        layers.forEach((layerObj, idx) => {
             const layerElements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);

             if(layerElements.length > 0) {
                 tl.to(
                     layerElements,
                     {
                         yPercent: layerObj.yPercent,
                         ease: "none"
                     },
                     idx === 0 ? undefined : "<"
                 );
             }
        });
    });

    const searchButton = document.querySelector('.search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchButton = document.getElementById('close-search-button');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');

    const searchData = [
        { name: "Геральт з Рівії", url: "geralt.html" },
        { name: "Цірілла", url: "ciri.html" },
        { name: "Йеннефер", url: "yenn.html" },
        { name: "Трісс Мерігольд", url: "triss.html" },
        { name: "Любисток", url: "dand.html" },
    ];

    searchButton.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
        searchResultsContainer.innerHTML = '';
    });

    closeSearchButton.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResultsContainer.innerHTML = '';
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        searchResultsContainer.innerHTML = '';

        if (query.length === 0) {
            return;
        }

        const filteredResults = searchData.filter(item =>
            item.name.toLowerCase().includes(query)
        );

        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const resultLink = document.createElement('a');
                resultLink.href = item.url;
                resultLink.textContent = item.name;
                searchResultsContainer.appendChild(resultLink);
            });
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = "Нічого не знайдено...";
            searchResultsContainer.appendChild(noResults);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchButton.click();
        }
    });
});