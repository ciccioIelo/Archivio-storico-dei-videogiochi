document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { title: "Pong", year: 1972, genre: "Arcade", img: "assets/img/pong.jpg", staticPage: "pong.html" },
        { title: "Tetris", year: 1984, genre: "Puzzle", img: "assets/img/tetris.jpg" },
        { title: "Super Mario Bros", year: 1985, genre: "Platform", img: "assets/img/mario.jpg", staticPage: "mario.html" },
        { title: "Street Fighter II", year: 1991, genre: "Picchiaduro", img: "assets/img/streetfighter.jpg" },
        { title: "Pokémon Rosso/Blu", year: 1996, genre: "RPG", img: "assets/img/pokemon.jpg" },
        { title: "The Legend of Zelda", year: 1998, genre: "RPG", img: "assets/img/zelda.jpg" }
    ];

    const gameList = document.getElementById("gameList");
    const searchInput = document.getElementById("searchInput");
    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");

    function renderGames(filteredGames) {
        gameList.innerHTML = "";
        filteredGames.forEach(game => {
            let detailsPage = game.staticPage ? game.staticPage : `dettaglio.html?game=${encodeURIComponent(game.title)}`;

            updateMetadata(game);

            gameList.innerHTML += `
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="card" onclick="updateMetadata(${JSON.stringify(game)})">
                        <img src="${game.img}" class="card-img-top" alt="${game.title}">
                        <div class="card-body">
                            <h5 class="card-title">${game.title}</h5>
                            <p class="card-text">${game.year} | ${game.genre}</p>
                            <a href="${detailsPage}" class="btn btn-primary">Scopri di più</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function filterGames() {
        const searchText = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;

        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(searchText) &&
            (selectedGenre === "" || game.genre === selectedGenre) &&
            (selectedYear === "" || game.year >= parseInt(selectedYear))
        );

        renderGames(filteredGames);
    }

    function updateMetadata(game) {
        document.querySelector("meta[name='DC.Title']").setAttribute("content", game.title);
        document.querySelector("meta[name='DC.Subject']").setAttribute("content", "Videogioco del catalogo");
        document.querySelector("meta[name='DC.Description']").setAttribute("content", `${game.title} è un videogioco del ${game.year}, genere ${game.genre}.`);
    }

    searchInput.addEventListener("input", filterGames);
    genreFilter.addEventListener("change", filterGames);
    yearFilter.addEventListener("change", filterGames);

    renderGames(games);
});
