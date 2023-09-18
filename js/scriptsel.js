// Récupération du contenu du formulaire
let monFormulaire = document.forms["selectPokemon"];
console.log(monFormulaire);

// Ajouter un événement de changement au menu déroulant
document.querySelector("#monFormulaire").addEventListener("change", function () {
    // Récupérer la valeur du Pokémon sélectionné
    const selectedPokemon = monFormulaire.querySelector('select').value;
    console.log("Selected Pokemon : ", selectedPokemon);

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
            // Afficher les détails du Pokémon à partir des données de l'API
            document.querySelector("h3").textContent = "Voici les informations de " + data.name;
            document.querySelector("img").setAttribute("src", data.image);

            let types = [];
            data.apiTypes.forEach(type => {
                types.push(type.name);
            });
            let lesTypes = types.join("/");
            document.querySelector("#element").textContent = "Element : " + lesTypes;

            document.querySelector("#evolution").textContent = "Evolution : " + data.apiEvolutions[0].name;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de l\'API:', error);
        });
});

// Boucle pour créer les options du menu déroulant avec les noms des Pokémon
fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué.');
        }
        return response.json();
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let uneOption = document.createElement('option');
            uneOption.setAttribute("value", data[i].name);
            uneOption.textContent = data[i].name;
            document.querySelector("#monFormulaire").appendChild(uneOption);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API:', error);
    });