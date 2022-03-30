let query = "dynasty"
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

const afficheData = (id) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api'+ id)}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then ( (response) => {
    show = JSON.parse(response.contents)
    console.log(show);
});
