document.addEventListener("DOMContentLoaded", () => {
    // Dati dei videogiochi direttamente nel codice
    const games = [
        { year: 1972, title: "Pong", img: "assets/img/pong.jpg", desc: "Il primo videogioco arcade di successo commerciale." },
        { year: 1984, title: "Tetris", img: "assets/img/tetris.jpg", desc: "Il puzzle game più iconico di sempre." },
        { year: 1985, title: "Super Mario Bros", img: "assets/img/mario.jpg", desc: "Il platformer che ha rivoluzionato il gaming." },
        { year: 1991, title: "Street Fighter II", img: "assets/img/streetfighter.jpg", desc: "Il picchiaduro che ha dominato gli anni '90." },
        { year: 1996, title: "Pokémon Rosso/Blu", img: "assets/img/pokemon.jpg", desc: "L'inizio di una delle saghe più amate." },
        { year: 1998, title: "The Legend of Zelda: Ocarina of Time", img: "assets/img/zelda.jpg", desc: "Considerato uno dei migliori giochi di sempre." }
    ];

    let currentIndex = 0;
    const itemsPerPage = 3;
    const timeline = document.getElementById("timeline");

    function renderTimeline() {
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
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex + itemsPerPage < games.length) {
            currentIndex += itemsPerPage;
            renderTimeline();
        }
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
            renderTimeline();
        }
    });

    renderTimeline();
});
