document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // 1. DATI & VARIABILI PER LA TIMELINE
    // ==================================================
    const games = [
        // Anni '70
        { 
          year: 1972, 
          title: "Pong", 
          img: "assets/img/pong.jpg", 
          desc: "Il primo videogioco arcade di successo commerciale." 
        },
        { 
          year: 1978, 
          title: "Space Invaders", 
          img: "assets/img/space_invaders.jpg", 
          desc: "Un’icona dei cabinati arcade, ha definito il genere degli shooter a schermata fissa." 
        },
      
        // Anni '80
        { 
          year: 1980, 
          title: "Pac-Man", 
          img: "assets/img/pacman.jpg", 
          desc: "L'eroe giallo mangia-palline che ha conquistato le sale giochi di tutto il mondo." 
        },
        { 
          year: 1981, 
          title: "Donkey Kong", 
          img: "assets/img/donkey_kong.jpg", 
          desc: "Il debutto di Mario (chiamato Jumpman) in un platform arcade targato Nintendo." 
        },
        { 
          year: 1984, 
          title: "Tetris", 
          img: "assets/img/tetris.jpg", 
          desc: "Il puzzle game più iconico di sempre." 
        },
        { 
          year: 1985, 
          title: "Super Mario Bros", 
          img: "assets/img/mario.jpg", 
          desc: "Il platformer che ha rivoluzionato il gaming." 
        },
        { 
          year: 1985, 
          title: "Ghosts and Goblins", 
          img: "assets/img/ghosts_goblins.jpg", 
          desc: "Un platform arcade leggendario, famoso per la sua elevata difficoltà." 
        },
        { 
          year: 1986, 
          title: "Metroid", 
          img: "assets/img/metroid.jpg", 
          desc: "Ha introdotto l’esplorazione non lineare e un’eroina (Samus Aran) icastica." 
        },
      
        // Anni '90
        { 
          year: 1991, 
          title: "Street Fighter II", 
          img: "assets/img/streetfighter.jpg", 
          desc: "Il picchiaduro che ha dominato gli anni '90." 
        },
        { 
          year: 1991, 
          title: "Sonic the Hedgehog", 
          img: "assets/img/sonic.jpg", 
          desc: "La risposta di SEGA a Mario, un platform veloce e graficamente accattivante." 
        },
        { 
          year: 1992, 
          title: "Mortal Kombat", 
          img: "assets/img/mortal_kombat.jpg", 
          desc: "Il picchiaduro controverso per il suo livello di violenza, ha segnato la cultura pop." 
        },
        { 
          year: 1996, 
          title: "Pokémon Rosso/Blu", 
          img: "assets/img/pokemon.jpg", 
          desc: "L'inizio di una delle saghe più amate." 
        },
        { 
          year: 1996, 
          title: "Resident Evil", 
          img: "assets/img/resident_evil.jpg", 
          desc: "Ha gettato le basi del survival horror moderno con zombie e tensione continua." 
        },
        { 
          year: 1997, 
          title: "Final Fantasy VII", 
          img: "assets/img/ffvii.jpg", 
          desc: "RPG cult di Square Enix, ha portato il genere al grande pubblico internazionale." 
        },
        { 
          year: 1998, 
          title: "The Legend of Zelda", 
          img: "assets/img/zelda.jpg", 
          desc: "Considerato uno dei migliori giochi di sempre." 
        },
        { 
          year: 1998, 
          title: "Crash Bandicoot 3", 
          img: "assets/img/crash3.jpg", 
          desc: "Platform frenetico di Naughty Dog, ha contribuito all’enorme popolarità di PlayStation." 
        }
      ];

    let currentIndex = 0;
    const timeline = document.getElementById("timeline");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // ==================================================
    // 2. FUNZIONI PER LA TIMELINE
    // ==================================================
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
        if (window.innerWidth < 768) return 1;  // Smartphone
        if (window.innerWidth < 992) return 2;  // Tablet
        return 3;                               // Desktop
    }

    // Renderizza la timeline orizzontale
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

    // Aggiorna lo stato dei pulsanti Avanti/Indietro
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

    // Render iniziale della timeline
    renderTimeline();


    // ==================================================
    // 3. CHART.JS: GRAFICO "GIOCHI PER ANNO"
    // ==================================================
    // Funzione per raggruppare i videogiochi per anno
    function getGamesPerYear(gamesArray) {
        const countByYear = {};

        gamesArray.forEach(game => {
            const anno = game.year;
            if (!countByYear[anno]) {
                countByYear[anno] = 0;
            }
            countByYear[anno]++;
        });

        // Converti in due array paralleli (ordinati per anno)
        const sortedYears = Object.keys(countByYear)
            .map(year => parseInt(year))
            .sort((a, b) => a - b);

        const labels = [];
        const data = [];

        sortedYears.forEach(year => {
            labels.push(year);
            data.push(countByYear[year]);
        });

        return { labels, data };
    }

    // Se esiste il canvas #gamesChart nel DOM, costruiamo il grafico
    const chartCanvas = document.getElementById('gamesChart');
    if (chartCanvas) {
        // 1. Estraiamo i dati da visualizzare
        const { labels, data } = getGamesPerYear(games);

        // 2. Creiamo il grafico con Chart.js
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Numero di videogiochi pubblicati',
                    data: data,
                    borderWidth: 1,
                    // Puoi aggiungere "backgroundColor" o "borderColor" se vuoi personalizzare
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Conteggio'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Anno'
                        }
                    }
                }
            }
        });
    }
});
