const url = 'http://openlibrary.org/search.json?q=harry+potter'

fetch(url)
.then(res => res.json())
.then(data => console.log(data))