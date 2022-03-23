let query = "dynasty"

var requestHeaders = new Headers();
var requestInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'no-cors',
    cache: 'default'
}
fetch("https://catchtheshow.herokuapp.com/api/search?name=dynasty")
    .then(response => response.text())
    .then(res => console.log(res));