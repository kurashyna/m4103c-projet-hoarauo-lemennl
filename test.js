let query = "dynasty"

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/apisearch/?name=dynasty')}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then(data => console.log(data.contents));


function afficheShows() {
	
	var resultat = document.createElement("div");
	var name = document.createElement("p");
	name.value = 



	var resultats = document.getElementById("bloc-resultats");
	document.resultats.insertBefore(resultat, null);
}