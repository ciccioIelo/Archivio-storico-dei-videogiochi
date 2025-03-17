document.addEventListener("DOMContentLoaded", () => {
  const gamesData = {
    "Tetris": {
      title: "Tetris",
      year: 1984,
      genre: "Puzzle",
      developer: "Alexey Pajitnov",
      publisher: "AcademySoft / Nintendo",
      description: "Il puzzle game più iconico di sempre...",
      cover: "assets/img/tetris.jpg",
      videoUrl: "https://www.youtube.com/embed/_fQtxKmgJC8",
      rating: "9.0/10"
    },
    // ... Street Fighter, Pokémon, Zelda ...
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

  // Inseriamo RDFa: ad esempio un <div> con typeof="dc:InteractiveResource" 
  // ma puoi anche metterlo direttamente su #game-details-container
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
