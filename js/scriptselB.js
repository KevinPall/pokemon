// Fonction pour trier les options par ordre alphabétique
function sortPokemonOptions(pokemonList) {
    return pokemonList.sort((a, b) => a.name.localeCompare(b.name));
}

// Récupération du contenu du formulaire
let monFormulaire = document.forms["selectPokemon"];
console.log(monFormulaire);

//Crée la variable de mon detail bouton via un ID 
const detailsButton = document.getElementById('detailsButton');

function getPokemon(objPokemon) {
    console.log("TOTO :", objPokemon);
    monFormulaire.addEventListener("submit", function (event) {
        event.preventDefault();
        
    
        // Récupérer la valeur du Pokémon sélectionné
        const selectedPokemon = monFormulaire.querySelector('select').value;
        console.log("Selected Pokemon : ", selectedPokemon);
        
        // Stocker la valeur dans le localStorage
        sessionStorage.setItem('selectedPokemon', selectedPokemon);
    
        // URL de l'API avec le nom du Pokémon sélectionné
        const apiUrl = `https://pokebuildapi.fr/api/v1/pokemon/${selectedPokemon}`;
    
        // Faire une requête à l'API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué.');
                }
                return response.json();
            })
            .then(data => {
                    // Stocker la valeur dans le localStorage
                console.log("ID : ", data.id);
                sessionStorage.setItem('selectediDPokemon', data.id);
                // Afficher les détails du Pokémon à partir des données de l'API
                document.querySelector("h3").textContent = "Voici les informations de " + data.name;
                document.querySelector("img").style.visibility = "visible";
                document.querySelector("img").setAttribute("src", data.image);
    
                let types = [];
                data.apiTypes.forEach(type => {
                    types.push(type.name);
                });
                let lesTypes = types.join("/");
                document.querySelector("#element").textContent = "Element : " + lesTypes;
                // bouton detail
                document.querySelector("button").style.visibility = "visible";
                document.querySelector("#evolution").textContent = "Evolution : " + data.apiEvolutions[0].name;
                //Crée une fonction pour le click sur mon bouton details
                detailsButton.addEventListener("click", function () {
                    // Redirigez vers la deuxième page
                    window.location.href = "details.html";
                    
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'API:', error);
            });
    
    });
}
// Réactivez le gestionnaire d'événements "submit"



// Boucle pour créer les options du menu déroulant avec les noms des Pokémon
fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué.');
        }
        return response.json();
    })
    .then(data => {
        const sortedData = sortPokemonOptions(data);
        let objPokemon = []; // Créez un tableau pour stocker les Pokémon avec leur ID et nom
        console.log("sortedData : ", sortedData);
        for (let i = 0; i < sortedData.length; i++) {
            const id = sortedData[i].id;
            const name = sortedData[i].name;
            objPokemon.push({ id, name }); // Stockez l'ID et le nom dans un objet
            let uneOption = document.createElement('option');
            uneOption.setAttribute("value", id); // Utilisez l'ID comme valeur de l'option
            uneOption.textContent = name;
            document.querySelector("#monFormulaire").appendChild(uneOption);
        }
        getPokemon(objPokemon);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API:', error);
    });