let query = "dynasty"
let data;

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/apisearch/?name=dynasty')}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then((response) => {
    data = JSON.parse(response.contents);
   
    afficheShows(data);
});

function afficheShows(data) {

	var resultats = document.getElementById("bloc-resultats");

	for ( var i = 0; i < data.length; i++ ){ //On crée une div pr chaque show et on crée les balises qui correspondent avec les données
		var resultat = document.createElement("div");

		var name = document.createElement("p");
		name.value = data[i]("name");

		var description = document.createElement("p");
		description.value = data[i]("description");

		var image = document.createElement("a");
		image.value = data[i]("imageUrl");

		var rating = document.createElement("p");
		rating.value = data[i]("rating");

		// On ajoute les éléments dans la div
		resultat.insertBefore(name, null);
		resultat.insertBefore(description, null);
		resultat.insertBefore(image, null);
		resultat.insertBefore(rating, null);

		// On ajoute la div dans le bloc résultat
		resultats.insertBefore(resultat, null);
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
})
