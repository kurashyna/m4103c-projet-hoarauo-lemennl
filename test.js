let data;

const queryAPI = (searchValue = null) => {
    $('#prediction').text(" ");
    const queryName = searchValue ?? $("#champRecherche").val(); 
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

	//var resultats = document.getElementById("bloc-resultats");
    $("#bloc-resultats").empty();
    if (data != null) {
        for (show of data) {
            const showDiv = $('<div></div');

            showDiv.append($('<h2></h2>').text(show['name']));
            showDiv.append($('<img></img>').attr('src', "https:" + show['imageUrl']));
            showDiv.append($('<p></p>').text(show['description']));
            showDiv.append($('<p></p>').html("Rating : " + show['rating'] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
             		'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
             	  	'</svg>'));

            $("#bloc-resultats").append(showDiv);
            $("#bloc-resultats").append( $('<hr />') );

            showDiv.attr('onclick', "afficheData(" + "'" + show["id"] + "'" +")");
        }
    } else {
        $("#bloc-resultats").append($('<p> &empty; Pas de résultats </p>'));
    }
    // if (data != null) {
    
    //     for ( var i = 0; i < data.length; i++ ){ 
    //         console.log(data[i]);
    //         //On crée une div pr chaque show et on crée les balises qui correspondent aux données
    //         var resultat = document.createElement("div");
    
    //         var name = document.createElement("h3");
    //         name.textContent = "Titre : " + data[i]["name"];
    
    //         var description = document.createElement("p");
    //     	description.textContent = "Description : " + data["description"];

	// 		var image = document.createElement("img");
    //     	image.src = "https:" + data["imageUrl"];

    //         var rating = document.createElement("p");
    //         rating.innerHTML = "Rating : " + data[i]["rating"] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
	// 		'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
	// 	  	'</svg>';
			

	// 		var hr = document.createElement("hr");
    
    //         //On ajoute les éléments dans la div
    //         resultat.appendChild(name);
    //         resultat.appendChild(description);
    //         resultat.appendChild(image);
    //         resultat.appendChild(rating);
	// 		resultat.appendChild(hr);

			
	// 		$(resultat).attr("onclick", "afficherInfos(" + "'" + data[i]["id"] + "'" +")");
    
    //         // On ajoute la div dans le bloc résultat
    //         resultats.appendChild(resultat);
    //     }
    // } else {
    //     var resultat = document.createElement("div");
    
    //     var vide = document.createElement("p");
    //     vide.textContent = "Il n'y a pas de résultats.";
	// 	resultat.appendChild(vide);
	// 	resultats.appendChild(resultat);
    // }	
}

const afficheData = (id) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api'+ id)}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then ( (response) => {
    show = JSON.parse(response.contents)
    afficherInfos(show, id);
});

const afficheDataPrediction = (elem) => fetch('https://api.allorigins.win/get?url=${encodeURIComponent(\'https://catchtheshow.herokuapp.com/api' + $(elem).attr('id'))

//TODO : Afficher les shows 
function afficherInfos(show, id){
    $("#bloc-resultats").empty();
    console.log(show);
    if (show != null){
        const divInfos = $('<div></div>');
        divInfos.append($('<h2></h2>').text(show['name']));
        divInfos.append($('<p></p>').text("Ajouter aux séries favorites").attr('onclick', 'addSerieFav(' + "'" + id + "'"+ ')'))
        divInfos.append($('<img></img>').attr('src', "https:" + show['imageUrl']));
        divInfos.append($('<p></p>').html("Rating : " + show['rating'] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
        '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
          '</svg>' + " - " + show['status'])); 
        divInfos.append($('<hr />'));
        divInfos.append($('<p></p>').text(show['description']));
        if (show['nextEpisode'] != undefined){
            divInfos.append($('<h3></h3>').text("Prochain épisode : "));
            divInfos.append($('<hr />'));
            let countdown = show['nextEpisode']['countdown'];
            divInfos.append($('<p></p>').text(show['nextEpisode']['name']));
            divInfos.append($('<p></p>').text("dans : " + countdown));
            divInfos.append($('<p></p>').text("Saison " + show['nextEpisode']['season'] + " - Episode " + show['nextEpisode']['episode']));
        }
        $("#bloc-resultats").append(divInfos);
    }
	// var resultats = document.getElementById("bloc-resultats");
    //     $(resultats).empty();


    // if (data != null) {

	// 	// Affichage des infos générales du show
	// 	var infosGnrl = document.createElement("div");

	// 	var creators = document.createElement("p");
    //     creators.textContent = "Créateurs : " + data["creators"];
    
    //     var name = document.createElement("p");
    //     name.textContent = "Titre : " + data["name"];
    
    //     var description = document.createElement("p");
    //     description.textContent = "Description : " + data["description"];
    
    //     var image = document.createElement("img");
    //     image.src = "https:" + data["imageUrl"];
		
	// 	var status = document.createElement("p");
	// 	status.textContent = "Statut : " + data["status"];

    //     var rating = document.createElement("p");
    //     rating.innerHTML = "Rating : " + data["rating"] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
	// 	'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
	// 	'</svg>';
		
	// 	var hr = document.createElement("hr");

	// 	// Affichage des infos du prochain épisode du show
	// 	var prochainEp = document.createElement("div");
	// 	var intitule = document.createElement("h4");
	// 	intitule.textContent = "Prochain épisode :";

	// 	var nameEp = document.createElement("p");
	// 	console.log(data);
	// 	nameEp.textContent = "Titre : " + data["nextEpisode"]["name"];

	// 	var dateEp = document.createElement("p");
	// 	dateEp.textContent = "Date : " + data["nextEpisode"]["day"] + "/" + data["nextEpisode"]["month"] + "/" + data["nextEpisode"]["year"];

	// 	var seasonEp = document.createElement("p");
	// 	seasonEp.textContent = "Saison : " + data["nextEpisode"]["season"] + " numéro d'épisode : " + data["nextEpisode"]["episode"];

		
    //     // On ajoute les infos principales dans la div attitrée
    //     infosGnrl.appendChild(name);
	// 	infosGnrl.appendChild(creators);
    //     infosGnrl.appendChild(description);
    //     infosGnrl.appendChild(image);
	// 	infosGnrl.appendChild(status);
    //     infosGnrl.appendChild(rating);
	// 	infosGnrl.appendChild(hr);
		
	// 	// On ajoute les infos du prochain épisode dans la div attitrée
	// 	prochainEp.appendChild(nameEp);
	// 	prochainEp.appendChild(dateEp);
	// 	prochainEp.appendChild(seasonEp);

    //     // On ajoute la div dans le bloc résultat
    //     resultats.appendChild(infosGnrl);
	// 	resultats.appendChild(prochainEp);

	// } else {
	// 	var resultat = document.createElement("div");
    
    //     var vide = document.createElement("p");
    //     vide.textContent = "Erreur. Le show est inconnu.";
	// 	resultat.appendChild(vide);
	// 	resultats.appendChild(resultat);
	// }
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
    favoris.push(localStorage.getItem("favoris"));
    if (favoris = ['']){
       favoris = [];
    } 
    console.log(favoris);
    if ($("#champRecherche").val() != ""){
        let favoris = localStorage.getItem("favoris").split(',');
        if (!favoris.includes($("#champRecherche").val())) {
            favoris.push($("#champRecherche").val());
            localStorage.setItem("favoris", favoris);
        } else {
            alert("Déja en favoris");
        }
    } else {
        alert("Entrer une valeur.")
    }
    getFavoris();
}

const getFavoris = () => {
    if (localStorage.getItem("favoris") == ''|| localStorage.getItem("favoris") == null) {
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
    favoris.splice(index, 1);
    localStorage.setItem("favoris", favoris);
    getFavoris();
}
const addSerieFav = (id) => {
    let series = [];
    if (localStorage.getItem("series") != ''){
        series.push(localStorage.getItem("series"));
    }
    splitedSeries = series[0].split(',');
    if (!splitedSeries.includes(id)){
        series.push(id);
        localStorage.setItem("series", series);
        getSeriesFav();
    } else {
        alert("Série déja favorite");
    }
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
            const spanSerie = $('<span></span>').text(serie).attr('onclick', 'afficheData('+ "\'"+ serie + "\'" +  ')');
            const delSerie = $('<img></img>').attr('src', 'images/croix.svg').attr('onclick', 'delSerieFav(' + "'" + serie + "'"+ ')').attr('width', '15px');
            itemSerie.append(spanSerie);
            itemSerie.append(delSerie);
            divSeriesFav.append(itemSerie);
        }
    }   
}

const delSerieFav = (elem) => {
    let series = localStorage.getItem("series").split(',');
    const index = series.indexOf(elem);
    series.splice(index, 1);
    localStorage.setItem("series", series);
    getSeriesFav();
}
getSeriesFav();
getFavoris();