let data;

const queryAPI = (searchValue = null) => {
    $('#prediction').text(" ");
    const queryName = searchValue ?? $("#champRecherche").val(); 
    console.log(queryName);
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

function afficheShows(data){

	var resultats = document.getElementById("bloc-resultats");
        $(resultats).empty();

    if (data != null) {
    
        for ( var i = 0; i < data.length; i++ ){ //On crée une div pr chaque show et on crée les balises qui correspondent aux données
            var resultat = document.createElement("div");
    
            var name = document.createElement("h3");
            name.textContent = "Titre : " + data[i]["name"];
    
            var description = document.createElement("p");
            description.textContent = "Description : " + data[i]["description"];
    
            var image = document.createElement("img");
            image.src = "https:" + data[i]["imageUrl"];
    
            var rating = document.createElement("p");
            rating.innerHTML = "Rating : " + data[i]["rating"] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
			'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
		  	'</svg>';
			

			var hr = document.createElement("hr");
    
            // On ajoute les éléments dans la div
            resultat.appendChild(name);
            resultat.appendChild(description);
            resultat.appendChild(image);
            resultat.appendChild(rating);
			resultat.appendChild(hr);

			resultat.onclick = afficherInfos(data[i]["id"]);
    
            // On ajoute la div dans le bloc résultat
            resultats.appendChild(resultat);
        }
    } else {
        var resultat = document.createElement("div");
    
        var vide = document.createElement("p");
        vide.textContent = "Il n'y a pas de résultats.";
		resultat.appendChild(vide);
		resultats.appendChild(resultat);
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
function afficherInfos(id){
	var resultats = document.getElementById("bloc-resultats");
        $(resultats).empty();

    if (data != null) {

		// Affichage des infos générales du show
		var infosGnrl = document.createElement("div");

		var creators = document.createElement("p");
        creators.textContent = "Créateurs : " + data[i]["creators"];
    
        var name = document.createElement("p");
        name.textContent = "Titre : " + data[i]["name"];
    
        var description = document.createElement("p");
        description.textContent = "Description : " + data[i]["description"];
    
        var image = document.createElement("img");
        image.src = "https:" + data[i]["imageUrl"];
		
		var status = document.createElement("p");
		status.textContent = "Statut : " + data[i]["status"];

        var rating = document.createElement("p");
        rating.innerHTML = "Rating : " + data[i]["rating"] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
		'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
		'</svg>';
		
		var hr = document.createElement("hr");

		// Affichage des infos du prochain épisode du show
		var prochainEp = document.createElement("div");
		var intitule = document.createElement("h4");
		intitule.textContent = "Prochain épisode :";

		var nameEp = document.createElement("p");
		nameEp.textContent = "Titre : " + data[i]["nextEpisode"]["name"];

		var dateEp = document.createElement("p");
		dateEp.textContent = "Date : " + data[i]["nextEpisode"]["day"] + "/" + data[i]["nextEpisode"]["month"] + "/" + data[i]["nextEpisode"]["year"];

		var seasonEp = document.createElement("p");
		seasonEp.textContent = "Saison : " + data[i]["nextEpisode"]["season"] + " numéro d'épisode : " + data[i]["nextEpisode"]["episode"];

		
        // On ajoute les infos principales dans la div attitrée
        infosGnrl.appendChild(name);
		infosGnrl.appendChild(creators);
        infosGnrl.appendChild(description);
        infosGnrl.appendChild(image);
		infosGnrl.appendChild(status);
        infosGnrl.appendChild(rating);
		infosGnrl.appendChild(hr);
		
		// On ajoute les infos du prochain épisode dans la div attitrée
		prochainEp.appendChild(nameEp);
		prochainEp.appendChild(dateEp);
		prochainEp.appendChild(seasonEp);

        // On ajoute la div dans le bloc résultat
        resultats.appendChild(infosGnrl);
		resultats.appendChild(prochainEp);

	} else {
		var resultat = document.createElement("div");
    
        var vide = document.createElement("p");
        vide.textContent = "Erreur. Le show est inconnu.";
		resultat.appendChild(vide);
		resultats.appendChild(resultat);
	}
}

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
                        listePrediction.append($('<li></li>').text(data[i]['name']).attr('id', data[i]['id']).attr('onclick', 'afficheData(\'' +  data[i]['id'] + '\')').css("cursor", "pointer"));
    
                    }
                    $('#prediction').text(" ").append(listePrediction);
                    $('#prediction').append($('<hr/>'));
                } else {
                    $('#prediction').text(" ").append('<p> &empty; Pas de résultats </p>');
                }
            });
    }
}

const addFavori = () => {
    let favoris = [];
    if (localStorage.getItem("favoris") != ''){
        favoris.push(localStorage.getItem("favoris"));
    }
    favoris.push($("#champRecherche").val());
    localStorage.setItem("favoris", favoris);
    getFavoris();
}

const getFavoris = () => {
    if (localStorage.getItem("favoris") == '') {
        const divFavoris = $('#liste-favoris').html("").html(' &empty; Aucune recherche enregistrée');
    } else {
        const favorisList = localStorage.getItem("favoris").split(',');
        const divFavoris = $('#liste-favoris');
        divFavoris.html(" ");
        for (favori of favorisList) {
            const itemFavori = $('<li></li>').attr('id', favori);
            const spanFavori = $('<span></span>').text(favori).attr('onclick', 'queryAPI('+ "\'"+ favori + "\'" +  ')');
            const delFavori = $('<img></img>').attr('src', 'images/croix.svg').attr('onclick', 'delFavori(' + favori + ')').attr('width', '15px');
            itemFavori.append(spanFavori);
            itemFavori.append(delFavori);
            divFavoris.append(itemFavori);
        }
    }   
}

const delFavori = (elem) => {
    let favoris = localStorage.getItem("favoris").split(',');
    const index = favoris.indexOf($(elem).attr('id'));
    console.log(index);
    favoris.splice(index, 1);
    localStorage.setItem("favoris", favoris);
    getFavoris();
}
const addSerieFav = () => {
    let series = [];
    if (localStorage.getItem("series") != ''){
        series.push(localStorage.getItem("series"));
    }
    if ($("#champRecherche").val() != " "){
        series.push($("#champRecherche").val());
    }
    localStorage.setItem("series", series);
    getFavoris();
}

const getSeriesFav = () => {
    if (localStorage.getItem("series") == '' || localStorage.getItem("series") == null) {
        const divSeriesFav = $('#liste-series-favorites').html("").html(' &empty; Aucune recherche enregistrée');
    } else {
        const seriesList = localStorage.getItem("series").split(',');
        const divSeriesFav = $('#liste-series-favorites');
        divSeriesFav.html(" ");
        for (serie of seriesList) {
            const itemSerie = $('<li></li>').attr('id', serie);
            const spanSerie = $('<span></span>').text(serie).attr('onclick', 'afficheData('+ "\'/"+ serie + "\'" +  ')');
            const delSerie = $('<img></img>').attr('src', 'images/croix.svg').attr('onclick', 'delSerie(' + serie + ')').attr('width', '15px');
            itemSerie.append(spanSerie);
            itemSerie.append(delSerie);
            divSeriesFav.append(itemSerie);
        }
    }   
}

const delSerieFav = (elem) => {
    let series = localStorage.getItem("favoris").split(',');
    const index = series.indexOf($(elem).attr('id'));
    series.splice(index, 1);
    localStorage.setItem("series", series);
    getSeriesFav();
}
getSeriesFav();
getFavoris();