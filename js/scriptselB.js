// Fonction pour trier les options par ordre alphabétique
function sortPokemonOptions(pokemonList) {
    return pokemonList.sort((a, b) => a.name.localeCompare(b.name));
}

// Récupération du contenu du formulaire
let monFormulaire = document.forms["selectPokemon"];
console.log(monFormulaire);

// Création de la variable du bouton de détail via un ID
const detailsButton = document.getElementById('detailsButton');

function afficherDetailsPokemon(data) {
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

    document.querySelector("button").style.visibility = "visible";
    document.querySelector("#evolution").textContent = "Evolution : " + data.apiEvolutions[0].name;

    detailsButton.addEventListener("click", function () {
        // Rediriger vers la deuxième page
        window.location.href = "details.html";
    });
}

// Fonction pour récupérer les données du Pokémon
function getPokemon(selectedPokemon) {
    // URL de l'API avec le nom du Pokémon sélectionné
    const apiUrl = `https://pokebuildapi.fr/api/v1/pokemon/${selectedPokemon}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        })
        .then(data => {
            console.log("ID : ", data.id);
            afficherDetailsPokemon(data);
            
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de l\'API:', error);
        });
}
function sendData(selectedPokemon) {
    // let choice = document.querySelector('input[name="phpbuton"]:').value;
    fetch("./php/getDatas.php", {
        // Tester le rejet avec une erreur comme getDatass.php
        method: "POST",
        body: selectedPokemon,
        headers: {
            "Content-Type": "application/text",
        },
    })
        // On récupère la réponse
        .then((response) => {
                if (response.ok) {
                    return response.json();
                  }
                  return Promise.reject(response); 
        })
        .then(data => {
            console.log("ID : ", data.id);
            afficherDetailsPokemon(data);
            
        })
    }
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
        for (let i = 0; i < sortedData.length; i++) {
            const id = sortedData[i].id;
            const name = sortedData[i].name;
            let uneOption = document.createElement('option');
            uneOption.setAttribute("value", id); // Utilisez l'ID comme valeur de l'option
            uneOption.textContent = name;
            document.querySelector("#monFormulaire").appendChild(uneOption);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API:', error);
    });

    // Gestionnaire d'événements pour le formulaire de sélection
    monFormulaire.addEventListener("submit", function (event) {
        event.preventDefault();
        // Récupérer la valeur du Pokémon sélectionné
        const selectedPokemon = monFormulaire.querySelector('select').value;
        if (event.submitter === document.getElementById("jsButton")) {
            console.log("JS cliqué");
            getPokemon(selectedPokemon);
        } else if (event.submitter === document.getElementById("phpButton")) {
            console.log("PHP cliqué");
            sendData(selectedPokemon);
        }
    });

