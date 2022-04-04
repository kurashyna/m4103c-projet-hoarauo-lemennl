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

    if (data != null) {
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