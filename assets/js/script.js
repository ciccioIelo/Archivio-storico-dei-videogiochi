document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { year: 1972, title: "Pong", img: "assets/img/pong.jpg", desc: "Il primo videogioco arcade di successo commerciale." },
        { year: 1984, title: "Tetris", img: "assets/img/tetris.jpg", desc: "Il puzzle game più iconico di sempre." },
        { year: 1985, title: "Super Mario Bros", img: "assets/img/mario.jpg", desc: "Il platformer che ha rivoluzionato il gaming." },
        { year: 1991, title: "Street Fighter II", img: "assets/img/streetfighter.jpg", desc: "Il picchiaduro che ha dominato gli anni '90." },
        { year: 1996, title: "Pokémon Rosso/Blu", img: "assets/img/pokemon.jpg", desc: "L'inizio di una delle saghe più amate." },
        { year: 1998, title: "The Legend of Zelda", img: "assets/img/zelda.jpg", desc: "Considerato uno dei migliori giochi di sempre." }
    ];

    let currentIndex = 0;
    const timeline = document.getElementById("timeline");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Funzione per ottenere il numero di elementi visibili in base alla larghezza dello schermo
    function getItemsPerPage() {
        if (window.innerWidth < 768) return 1;  // Smartphone grandi
        if (window.innerWidth < 992) return 2;  // Tablet
        return 3; // Desktop
    }

    function renderTimeline() {
        const itemsPerPage = getItemsPerPage(); // Ricalcola sempre il numero di elementi visibili
        timeline.innerHTML = "";
        for (let i = currentIndex; i < currentIndex + itemsPerPage && i < games.length; i++) {
            const game = games[i];
            timeline.innerHTML += `
                <div class="card">
                    <img src="${game.img}" class="card-img-top" alt="${game.title}">
                    <div class="card-body">
                        <h5 class="card-title">${game.year} - ${game.title}</h5>
                        <p class="card-text">${game.desc}</p>
                    </div>
                </div>
            `;
        }
        updateButtons(itemsPerPage);
    }

    function updateButtons(itemsPerPage) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex + itemsPerPage >= games.length;
    }

    nextBtn.addEventListener("click", () => {
        const itemsPerPage = getItemsPerPage();
        if (currentIndex + itemsPerPage < games.length) {
            currentIndex += itemsPerPage;
            renderTimeline();
        }
    });

    prevBtn.addEventListener("click", () => {
        const itemsPerPage = getItemsPerPage();
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
            renderTimeline();
        }
    });

    // Ricalcola gli elementi visibili e aggiorna la timeline quando la finestra viene ridimensionata
    window.addEventListener("resize", () => {
        currentIndex = 0; // Reset per evitare bug
        renderTimeline();
    });

    renderTimeline();
});
