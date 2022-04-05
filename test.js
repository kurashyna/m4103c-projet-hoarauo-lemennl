let data;

//Fetch les infos des différents shows
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

//Affiche les infos générales des shows aux noms semblables au champ
function afficheShows(data){
    $("#bloc-resultats").empty();
    if (data != null) { //Si des shows existent avec ce nom, on affiche leurs infos générales
        for (show of data) {
            const showDiv = $('<div></div').css("cursor", "pointer"); //Clarté, pointeur en main pr clic

            showDiv.append($('<h2></h2>').text(show['name']));
            showDiv.append($('<img></img>').attr('src', "https:" + show['imageUrl']));
            showDiv.append($('<p></p>').html("<strong>Synopsis : </strong>" + show['description']));
            showDiv.append($('<p></p>').html("Rating : " + show['rating'] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
             		'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
             	  	'</svg>'));

            $("#bloc-resultats").append(showDiv); //On met toutes les infos correspondantes dans le bloc-resultats
            $("#bloc-resultats").append( $('<hr />') );

            showDiv.attr('onclick', "afficheData(" + "'" + show["id"] + "'" +")"); //On clique sur la div pour afficher ses infos détaillées
        }
    }
}

//Fetch les infos d'un show via son id
const afficheData = (id) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api'+ id)}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then ( (response) => {
    show = JSON.parse(response.contents)
    afficherInfos(show, id);
});

//Fetch les possibles shows avec un nom semblable (prédiction)
const afficheDataPrediction = (elem) => fetch('https://api.allorigins.win/get?url=${encodeURIComponent(\'https://catchtheshow.herokuapp.com/api' + $(elem).attr('id'))

//Affiche les infos d'un show via son id
function afficherInfos(show, id){
    $("#bloc-resultats").empty();
    console.log(show);
    if (show != null){ //Si le show existe (on clic sur un show particulier), on affiche ses infos générales
        const divInfos = $('<div></div>');
        divInfos.append($('<h2></h2>').text(show['name']));
        divInfos.append($('<p></p>').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">' +
        '<path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>' +
        '<path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>' +
        '</svg>' + " Ajouter aux séries favorites").attr('onclick', 'addSerieFav(' + "'" + id + "'"+ ')').css("cursor", "pointer")); //Clarté, pointeur en main pr clic

        divInfos.append($('<p></p>').text("Statut : " + show['status']));
        divInfos.append($('<p></p>').html("<strong>Synopsis : </strong>" + show['description']));
        divInfos.append($('<img></img>').attr('src', "https:" + show['imageUrl']));
        divInfos.append($('<p></p>').html("Rating : " + show['rating'] + "/5 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">' +
        '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
          '</svg>')); 
        divInfos.append($('<hr />'));

        if (show['nextEpisode'] != undefined){ //Si il y a un prochain épisode, alors on présente ses infos
            divInfos.append($('<h3></h3>').text("Prochain épisode : "));
            let countdown = show['nextEpisode']['countdown'];
            divInfos.append($('<p></p>').text("Nom de l'épisode : " + show['nextEpisode']['name']));
            divInfos.append($('<p></p>').text("Sort dans : " + countdown));
            divInfos.append($('<p></p>').text("Saison " + show['nextEpisode']['season'] + " - Episode " + show['nextEpisode']['episode']));
        }
        $("#bloc-resultats").append(divInfos); //On met toutes les infos correspondantes dans le bloc-resultats
    }
}

//Affiche la prédiction de recherche
function showResults(val) {
    if (val.length == 0){ //On affiche pas de prédictions si le champ est vide
        $('#prediction').text(" ");
    }
    else if (val.length < 3) { //Nécessité d'au moins 3 lettres dans le champ pr afficher une prédiction
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

//Ajout aux favoris une recherche
const addFavori = () => {
    var Favoris = {"recherches": [], "series": []};
    if (localStorage.getItem("favoris") != null){
        favorisJSON = JSON.parse(localStorage.getItem("favoris"));

        if ( Array.isArray(favorisJSON['series']) && favorisJSON['series'].length){
            Favoris['series'] = favorisJSON['series'];
        }
        if ( Array.isArray(favorisJSON['recherches']) && favorisJSON['recherches'].length){
            Favoris['recherches'] = favorisJSON['recherches'];
        }
    }
    if( $("#champRecherche").val() != "" ){
        if (!Favoris['recherches'].includes($("#champRecherche").val())) {
            Favoris['recherches'].push($("#champRecherche").val());
        } else {
            alert("Valeur déjà présente.");
        }
        
    }
    
    favoriStorage = JSON.stringify(Favoris);
    localStorage.setItem("favoris", favoriStorage);
    getFavoris();
}

//Affiche les favoris de recherche
const getFavoris = () => {
    var Favoris = {"recherches": [], "series": []};
    if (localStorage.getItem("favoris") == null){
        localStorage.setItem("favoris", JSON.stringify(Favoris));
    }
    favoris = JSON.parse(localStorage.getItem("favoris"));
    recherches = favoris['recherches'];
    if (Array.isArray(recherches) && recherches.length) {
        const divFavoris = $('#liste-favoris');
        divFavoris.html(" ");
        for (favori of recherches) {
            const itemFavori = $('<li></li>').attr('id', favori).attr('class', 'favori');
            const spanFavori = $('<span></span>').text(favori).attr('onclick', 'queryAPI('+ "\'"+ favori + "\'" +  ')');
            const delFavori = $('<img></img>').attr('src', 'images/croix.svg').attr('onclick', 'delFavori(' + favori + ')').attr('width', '15px');
            itemFavori.append(spanFavori);
            itemFavori.append(delFavori);
            divFavoris.append(itemFavori);
        }
    } else {
        const divFavoris = $('#liste-favoris').html("").html(' &empty; Aucune recherche enregistrée');
    } 
}

//Supprime le favori de recherche sélectionné
const delFavori = (elem) => {
    favoris = JSON.parse(localStorage.getItem("favoris"));
    recherches = favoris['recherches'];
    const index = recherches.indexOf(elem.id);
    recherches.splice(index, 1);
    favoriStorage = JSON.stringify(favoris);
    localStorage.setItem("favoris", favoriStorage);
    getFavoris();
}

//Ajout aux favoris une série
const addSerieFav = (id) => {
    console.log(id);
    var Favoris = {"recherches": [], "series": []};
    if (localStorage.getItem("favoris") != null){
        favorisJSON = JSON.parse(localStorage.getItem("favoris"));

        if ( Array.isArray(favorisJSON['series']) && favorisJSON['series'].length){
            Favoris['series'] = favorisJSON['series'];
        }
        if ( Array.isArray(favorisJSON['recherches']) && favorisJSON['recherches'].length){
            Favoris['recherches'] = favorisJSON['recherches'];
        }
    }
    if( id != null ){
        if (!Favoris['series'].includes(id)) {
            Favoris['series'].push(id);
        } else {
            alert("Valeur déjà présente.");
        } 
    }

    favoriStorage = JSON.stringify(Favoris);
    localStorage.setItem("favoris", favoriStorage);
    getSeriesFav();
}

//Affiche les favoris de séries  
const getSeriesFav = () => {


    var Favoris = {"recherches": [], "series": []};
    if (localStorage.getItem("favoris") == null){
        localStorage.setItem("favoris", JSON.stringify(Favoris));
    }
    favoris = JSON.parse(localStorage.getItem("favoris"));
    series = favoris['series'];
    if (Array.isArray(series) && series.length) {
        const divSeriesFav = $('#liste-series-favorites');
            divSeriesFav.html(" ");
            for (serie of series) {
                const itemSerie = $('<li></li>').attr('id', serie);
                const spanSerie = $('<span></span>').text(serie).attr('onclick', 'afficheData('+ "\'"+ serie + "\'" +  ')');
                const delSerie = $('<img></img>').attr('src', 'images/croix.svg').attr('onclick', 'delSerieFav(' + "'" + serie + "'"+ ')').attr('width', '15px');
                itemSerie.append(spanSerie);
                itemSerie.append(delSerie);
                divSeriesFav.append(itemSerie);
            }
    } else {
        const divFavoris = $('#liste-favoris').html("").html(' &empty; Aucune recherche enregistrée');
    }   
}

//Supprime le favori de série sélectionné
const delSerieFav = (elem) => {
    favoris = JSON.parse(localStorage.getItem("favoris"));
    series = favoris['series'];
    const index = series.indexOf(elem);
    series.splice(index, 1);
    favoriStorage = JSON.stringify(favoris);
    localStorage.setItem("favoris", favoriStorage);
    getSeriesFav();
}
getSeriesFav();
getFavoris();