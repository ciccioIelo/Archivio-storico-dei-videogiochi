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

    // Determina il link di dettaglio in base al titolo del gioco
    function getDetailsLink(gameTitle) {
        if (gameTitle === "Pong") {
            return "pong.html";
        } else if (gameTitle === "Super Mario Bros") {
            return "mario.html";
        } else {
            // Pagina dinamica per gli altri
            return `dettaglio.html?game=${encodeURIComponent(gameTitle)}`;
        }
    }

    // Ritorna quanti elementi mostrare in base alla larghezza dello schermo
    function getItemsPerPage() {
        if (window.innerWidth < 768) return 1;  // Smartphone grandi
        if (window.innerWidth < 992) return 2;  // Tablet
        return 3;                               // Desktop
    }

    function renderTimeline() {
        const itemsPerPage = getItemsPerPage();
        timeline.innerHTML = "";

        for (let i = currentIndex; i < currentIndex + itemsPerPage && i < games.length; i++) {
            const game = games[i];
            const detailsPage = getDetailsLink(game.title);

            // Card cliccabile
            timeline.innerHTML += `
                <div 
                    class="card" 
                    style="cursor: pointer;" 
                    onclick="window.location.href='${detailsPage}'"
                >
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
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex + itemsPerPage >= games.length);
    }

    // Scorri avanti
    nextBtn.addEventListener("click", () => {
        const itemsPerPage = getItemsPerPage();
        if (currentIndex + itemsPerPage < games.length) {
            currentIndex += itemsPerPage;
            renderTimeline();
        }
    });

    // Scorri indietro
    prevBtn.addEventListener("click", () => {
        const itemsPerPage = getItemsPerPage();
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
            renderTimeline();
        }
    });

    // Ricalcola layout su resize
    window.addEventListener("resize", () => {
        currentIndex = 0;
        renderTimeline();
    });

    // Render iniziale
    renderTimeline();
});
