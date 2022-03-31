let data;

const queryAPI = () => {
    const queryName = $("#champRecherche").val(); 
    if (queryName != null) {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api/search/?name=' + queryName)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then((response) => {
            data = JSON.parse(response.contents);
            afficheShows(data);
        })
    } else {
        afficheShows(null);
    }
    
};

function afficheShows(data) {

    if (data == null) {
        var resultats = document.getElementById("bloc-resultats");
        $(resultats).empty();
    
        for ( var i = 0; i < data.length; i++ ){ //On crée une div pr chaque show et on crée les balises qui correspondent aux données
            var resultat = document.createElement("div");
    
            var name = document.createElement("p");
            name.textContent = data[i]["name"];
    
            var description = document.createElement("p");
            description.textContent = data[i]["description"];
    
            var image = document.createElement("img");
            image.src = "https:" + data[i]["imageUrl"];
    
            var rating = document.createElement("p");
            rating.textContent = data[i]["rating"] + "/5";
    
            // On ajoute les éléments dans la div
            resultat.appendChild(name);
            resultat.appendChild(description);
            resultat.appendChild(image);
            resultat.appendChild(rating);
    
            // On ajoute la div dans le bloc résultat
            resultats.appendChild(resultat);
        }
    } else {
        //TODO : Gérer quand data vide
    }	
}

const afficheData = (id) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api'+ id)}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then ( (response) => {
    show = JSON.parse(response.contents)
    console.log(show);
});

const afficheDataPrediction = (elem) => fetch('https://api.allorigins.win/get?url=${encodeURIComponent(\'https://catchtheshow.herokuapp.com/api' + $(elem).attr('id'))

//TODO : Afficher les shows 

// Prédiction de recherche
function showResults(val) {
    if (val.length == 0){
        $('#prediction').text(" ");
    }
    else if (val.length < 3) {
        $('#prediction').text(" ").append($('<p> &empty; Entrer au moins 3 lettres</p>'));
    } else {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api/search/?name=' + val)}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then( (response) => {
                data = JSON.parse(response.contents);
                if (data.length != 0) {
                    var listePrediction = $('<ul></ul>');
                    for (let i=0; i < data.length; i++ ){
                        // TODO : Finir cette ligne
                        listePrediction.append($('<li></li>').text(data[i]['name']).attr('id', data[i]['id']));
                    }
                    $('#prediction').text(" ").append(listePrediction);
                } else {
                    $('#prediction').text(" ").append('<p> &empty; Pas de résultats </p>');
                }
            });
    }

}
