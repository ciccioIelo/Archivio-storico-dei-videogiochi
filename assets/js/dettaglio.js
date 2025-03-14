document.addEventListener("DOMContentLoaded", () => {
    // Giochi da caricare dinamicamente (escludi Mario e Pong, che hanno pagina statica)
    const gamesData = {
      "Tetris": {
        title: "Tetris",
        year: 1984,
        genre: "Puzzle",
        developer: "Alexey Pajitnov",
        publisher: "AcademySoft / Nintendo",
        description: "Il puzzle game più iconico di sempre, con i tetramini colorati.",
        cover: "assets/img/tetris.jpg",
        videoUrl: "https://www.youtube.com/embed/_fQtxKmgJC8",
        rating: "9.0/10"
      },
      "Street Fighter II": {
        title: "Street Fighter II",
        year: 1991,
        genre: "Picchiaduro",
        developer: "Capcom",
        publisher: "Capcom",
        description: "Lo storico picchiaduro che ha definito il genere negli anni '90.",
        cover: "assets/img/streetfighter.jpg",
        videoUrl: "https://www.youtube.com/embed/OULhbR0c5wk",
        rating: "9.3/10"
      },
      "Pokémon Rosso/Blu": {
        title: "Pokémon Rosso/Blu",
        year: 1996,
        genre: "RPG",
        developer: "Game Freak",
        publisher: "Nintendo",
        description: "Il primo capitolo della serie Pokémon, con centinaia di mostriciattoli da catturare.",
        cover: "assets/img/pokemon.jpg",
        videoUrl: "https://www.youtube.com/embed/_nRzoTzeyxU",
        rating: "8.8/10"
      },
      "The Legend of Zelda": {
        title: "The Legend of Zelda",
        year: 1998,
        genre: "Action-Adventure",
        developer: "Nintendo",
        publisher: "Nintendo",
        description: "Uno dei migliori giochi di sempre, con un mondo ricco di puzzle e segreti.",
        cover: "assets/img/zelda.jpg",
        videoUrl: "https://www.youtube.com/embed/uLIyo9t4ZSE",
        rating: "9.7/10"
      }
      // Aggiungi gli altri che vuoi gestire dinamicamente
    };
  
    // Leggi parametro game dalla query string (es. ?game=Tetris)
    const params = new URLSearchParams(window.location.search);
    const gameTitle = params.get("game"); // "Tetris" ecc.
  
    // Ottieni il container dove inietterai il contenuto
    const container = document.getElementById("game-details-container");
  
    // Se nel database non c’è un gioco con quel titolo => messaggio di errore
    if (!gamesData[gameTitle]) {
      container.innerHTML = `
        <h2>Videogioco non trovato</h2>
        <p>Il gioco "<strong>${gameTitle}</strong>" non è presente o è una pagina statica.</p>
        <a href="catalogo.html" style="color: #fff; text-decoration: underline;">Torna al Catalogo</a>
      `;
      return;
    }
  
    const currentGame = gamesData[gameTitle];
  
    // Genera l'HTML dinamico
    container.insertAdjacentHTML("afterBegin",`
      <h1>${currentGame.title}</h1>
      <h2 class="game-year">${currentGame.year}</h2>
  
      <img src="${currentGame.cover}" alt="${currentGame.title}" class="game-image">
  
      <div class="game-info">
        <p><strong>🎮 Genere:</strong> ${currentGame.genre}</p>
        <p><strong>🏢 Sviluppatore:</strong> ${currentGame.developer}</p>
        <p><strong>📅 Anno di Rilascio:</strong> ${currentGame.year}</p>
        <p><strong>📝 Descrizione:</strong> ${currentGame.description}</p>
      </div>
  
      <!-- Video (se hai un videoUrl) -->
      <div class="game-video">
        <h3>🎥 Guarda il Gameplay</h3>
        <iframe width="560" height="315" src="${currentGame.videoUrl}" frameborder="0"></iframe>
      </div>
  
      <div class="nav-buttons">
        <a href="index.html" class="back-button">⬅ Torna alla Home</a>
        <a href="catalogo.html" class="catalog-button">📚 Vai al Catalogo</a>
      </div>
  
      <div class="game-stats">
        <h3>📊 Statistiche e Voti</h3>
        <p><strong>Valutazione Media:</strong> ${currentGame.rating}</p>
      </div>
    `);
  
    // Aggiorna i meta tag Dublin Core
    document.querySelector("meta[name='DC.Title']").setAttribute("content", currentGame.title);
    document.querySelector("meta[name='DC.Creator']").setAttribute("content", currentGame.developer);
    document.querySelector("meta[name='DC.Subject']").setAttribute("content", "Videogioco storico");
    document.querySelector("meta[name='DC.Description']").setAttribute("content", currentGame.description);
    document.querySelector("meta[name='DC.Publisher']").setAttribute("content", currentGame.publisher);
    document.querySelector("meta[name='DC.Date']").setAttribute("content", currentGame.year);
    document.querySelector("meta[name='DC.Type']").setAttribute("content", currentGame.genre);
  });
  