let query = "dynasty"
let data;

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/apisearch/?name=dynasty')}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then(data => console.log(data.contents));
.then((response) => {
    data = JSON.parse(response.contents);
   
    afficheData(data[0]['id']);
});

function afficheShows() {
	
	var resultat = document.createElement("div");
	var name = document.createElement("p");
	name.value = 



	var resultats = document.getElementById("bloc-resultats");
	document.resultats.insertBefore(resultat, null);
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
