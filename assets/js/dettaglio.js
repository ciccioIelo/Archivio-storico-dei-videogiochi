document.addEventListener("DOMContentLoaded", () => {
  const gamesData = {
    "Pong": {
      title: "Pong",
      year: 1972,
      genre: "Arcade",
      developer: "Atari",
      publisher: "Atari",
      description: "Il primo videogioco arcade di successo commerciale, uno dei pionieri del gaming.",
      cover: "assets/img/pong.jpg",
      videoUrl: "https://www.youtube.com/embed/fhd7FfGCdCo",
      rating: "8.5/10"
    },
    "Space Invaders": {
      title: "Space Invaders",
      year: 1978,
      genre: "Arcade",
      developer: "Taito",
      publisher: "Taito",
      description: "Un’icona dei cabinati arcade, ha definito il genere degli shooter a schermata fissa.",
      cover: "assets/img/space_invaders.jpg",
      videoUrl: "https://www.youtube.com/embed/437Ld_rKM2s",
      rating: "8.7/10"
    },
    "Pac-Man": {
      title: "Pac-Man",
      year: 1980,
      genre: "Arcade",
      developer: "Namco",
      publisher: "Namco",
      description: "L'eroe giallo mangia-palline che ha conquistato le sale giochi di tutto il mondo.",
      cover: "assets/img/pacman.jpg",
      videoUrl: "https://www.youtube.com/embed/dScq4ZAASAI",
      rating: "9.0/10"
    },
    "Donkey Kong": {
      title: "Donkey Kong",
      year: 1981,
      genre: "Platform",
      developer: "Nintendo",
      publisher: "Nintendo",
      description: "Il debutto di Mario (Jumpman) in un platform arcade che ha segnato la storia.",
      cover: "assets/img/donkey_kong.jpg",
      videoUrl: "https://www.youtube.com/embed/XN6c7pVlnZs",
      rating: "8.9/10"
    },
    "Tetris": {
      title: "Tetris",
      year: 1984,
      genre: "Puzzle",
      developer: "Alexey Pajitnov",
      publisher: "AcademySoft / Nintendo",
      description: "Il puzzle game più iconico di sempre, basato su blocchi che cadono dall'alto.",
      cover: "assets/img/tetris.jpg",
      videoUrl: "https://www.youtube.com/embed/_fQtxKmgJC8",
      rating: "9.0/10"
    },
    "Super Mario Bros": {
      title: "Super Mario Bros",
      year: 1985,
      genre: "Platform",
      developer: "Nintendo",
      publisher: "Nintendo",
      description: "Il platform che ha rivoluzionato il gaming su console, introducendo Mario al mondo.",
      cover: "assets/img/mario.jpg",
      videoUrl: "https://www.youtube.com/embed/-avspZlbOWU",
      rating: "9.5/10"
    },
    "Metroid": {
      title: "Metroid",
      year: 1986,
      genre: "Platform",
      developer: "Nintendo",
      publisher: "Nintendo",
      description: "Un’avventura di esplorazione non lineare con l’iconica Samus Aran, pioniera del genere ‘Metroidvania’.",
      cover: "assets/img/metroid.jpg",
      videoUrl: "https://www.youtube.com/embed/6Ax2UqWyb_c",
      rating: "8.8/10"
    },
    "Street Fighter II": {
      title: "Street Fighter II",
      year: 1991,
      genre: "Picchiaduro",
      developer: "Capcom",
      publisher: "Capcom",
      description: "Il picchiaduro più famoso degli anni ’90, ha consacrato il genere dei fighter arcade.",
      cover: "assets/img/streetfighter.jpg",
      videoUrl: "https://www.youtube.com/embed/Bo6sP5GvBek",
      rating: "9.2/10"
    },
    "Pokémon Rosso/Blu": {
      title: "Pokémon Rosso/Blu",
      year: 1996,
      genre: "RPG",
      developer: "Game Freak",
      publisher: "Nintendo",
      description: "L'inizio di una delle saghe più amate di tutti i tempi, con 151 Pokémon da catturare.",
      cover: "assets/img/pokemon.jpg",
      videoUrl: "https://www.youtube.com/embed/WoJ21iPOzU4",
      rating: "9.0/10"
    },
    "The Legend of Zelda": {
      title: "The Legend of Zelda",
      year: 1998,
      genre: "Action-Adventure",
      developer: "Nintendo",
      publisher: "Nintendo",
      description: "Considerato uno dei migliori giochi di sempre, ha definito l’action-RPG su console.",
      cover: "assets/img/zelda.jpg",
      videoUrl: "https://www.youtube.com/embed/wvdoS23HwMY",
      rating: "9.6/10"
    }
  };

  // Leggi il parametro dalla query string (es. ?game=Tetris)
  const params = new URLSearchParams(window.location.search);
  const gameTitle = params.get("game");

  const container = document.getElementById("game-details-container");

  // Se il gioco non esiste nei dati => messaggio di errore
  if (!gamesData[gameTitle]) {
    container.innerHTML = `
      <h2>Videogioco non trovato</h2>
      <p>Il gioco "<strong>${gameTitle}</strong>" non è presente o è una pagina statica.</p>
      <a href="catalogo.html" style="color: #fff; text-decoration: underline;">Torna al Catalogo</a>
    `;
    return;
  }

  const currentGame = gamesData[gameTitle];

  container.insertAdjacentHTML("afterBegin", `
    <!-- Inizio RDFa -->
    <div typeof="dc:InteractiveResource" about="#${gameTitle}">
      <h1 property="dc:title">${currentGame.title}</h1>
      <h2 class="game-year">
        <!-- Puoi anche inserire la data come dc:date -->
        <span property="dc:date">${currentGame.year}</span>
      </h2>
  
      <img src="${currentGame.cover}" alt="${currentGame.title}" class="game-image">
  
      <div class="game-info">
        <p><strong>🎮 Genere:</strong> 
           <span property="dc:subject">${currentGame.genre}</span>
        </p>
        <p><strong>🏢 Sviluppatore:</strong> 
           <span property="dc:creator">${currentGame.developer}</span>
        </p>
        <p><strong>📅 Anno di Rilascio:</strong> 
           <span property="dc:date">${currentGame.year}</span>
        </p>
        <p><strong>📝 Descrizione:</strong> 
           <span property="dc:description">${currentGame.description}</span>
        </p>
      </div>
  
      <div class="game-video">
        <h3>🎥 Guarda il Gameplay</h3>
        <iframe width="560" height="315" src="${currentGame.videoUrl}"
                frameborder="0"></iframe>
      </div>
  
      <div class="nav-buttons">
        <a href="index.html" class="back-button">⬅ Torna alla Home</a>
        <a href="catalogo.html" class="catalog-button">📚 Vai al Catalogo</a>
      </div>
  
      <div class="game-stats">
        <h3>📊 Statistiche e Voti</h3>
        <p><strong>Valutazione Media:</strong> ${currentGame.rating}</p>
      </div>
    </div>
    <!-- Fine RDFa -->
  `);

  // Aggiorna i meta tag Dublin Core nel <head>
  document.querySelector("meta[name='DC.Title']").setAttribute("content", currentGame.title);
  document.querySelector("meta[name='DC.Creator']").setAttribute("content", currentGame.developer);
  document.querySelector("meta[name='DC.Subject']").setAttribute("content", "Videogioco storico");
  document.querySelector("meta[name='DC.Description']").setAttribute("content", currentGame.description);
  document.querySelector("meta[name='DC.Publisher']").setAttribute("content", currentGame.publisher);
  document.querySelector("meta[name='DC.Date']").setAttribute("content", currentGame.year);
  document.querySelector("meta[name='DC.Type']").setAttribute("content", currentGame.genre);
});
