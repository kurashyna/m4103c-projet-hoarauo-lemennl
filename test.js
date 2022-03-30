let query = "dynasty"
let data;

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://catchtheshow.herokuapp.com/api/search?name=dynasty')}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then((response) => {
    data = JSON.parse(response.contents);
    console.log(data.length);
});

const afficheData = (id) => console.log(name)   ;