let data;

const queryAPI = () => {
    const queryName = $("#champRecherche").val(); 
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api/search/?name=' + queryName)}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then((response) => {
        data = JSON.parse(response.contents);
        afficheData(data[0]['id']);
    })
};

function afficheShows(data) {

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
