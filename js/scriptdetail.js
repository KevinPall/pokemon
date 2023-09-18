// Récupérer la valeur du Pokémon sélectionné depuis le localStorage
const selectedPokemon = sessionStorage.getItem('selectedPokemon');
const selectediDPokemon = sessionStorage.getItem('selectediDPokemon');

// Utilisez la valeur pour afficher les données pertinentes sur la deuxième page
  // Appel de l'API avec la valeur sélectionnée
  fetch(`https://pokebuildapi.fr/api/v1/pokemon/${selectediDPokemon}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('La requête a échoué.');
      }
      return response.json();
  })
  .then(data => {
      // Afficher les données du Pokémon
      document.querySelector("h3").textContent = "Nom du Pokemon : " + data.name;
      document.querySelector("#base").textContent = "Statistique de base";
      document.querySelector("#pv").textContent = "Points de vie : " + data.stats.HP;
      document.querySelector("#attk").textContent = "Attaque : " + data.stats.attack;
      document.querySelector("#def").textContent = "Défense : " + data.stats.defense;
      document.querySelector("#attkS").textContent = "Attaque spéciale : " + data.stats.special_attack;
      document.querySelector("#defS").textContent = "Défense spéciale : " + data.stats.special_defense;
      document.querySelector("#speed").textContent = "Vitesse : " + data.stats.speed;
    
  })
