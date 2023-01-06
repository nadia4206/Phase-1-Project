//constants
const url1 = 'http://localhost:3000/shows'
const url2 = 'https://api.tvmaze.com/singlesearch/shows?q='
const tvForm = document.querySelector('#tv-form')
const tvShowCollection = document.querySelector('#tv-show-collection')
let likes 

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////FETCHING LOCALLY////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const fetchFirst = () => {
    fetch(url1)
    .then(res => res.json())
    .then(data => {
        //forEach
        data.forEach(show => {
            getLocalDetails(show)
        })
    })
}

function getLocalDetails(show){
    let div = document.createElement('div')
    div.classList.add('card')

    let img = document.createElement('img')
    img.classList.add('img')
    img.src = show.image
    img.addEventListener('mouseover', () => {
        alert(`This show premiered on ${show.release_date}`)
    })

    let title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = show.title

    let averageRating = document.createElement('p')
    averageRating.classList.add('average-rating')
    averageRating.textContent = `Average Show Rating: ${show.average_rating}`

    likes = document.createElement('p')
    likes.classList.add('likes')
    likes.textContent = `${show.likes} Likes`

    let likeButton = document.createElement('button')
    likeButton.textContent = "Click to Like"

    //event listener
    likeButton.addEventListener('click', (e) => {
        clickLike(e)
    })

    // const commentInput = document.createElement('input');
    // commentInput.type = 'text';
    // commentInput.placeholder = 'Enter your comment';
    // const commentButton = document.createElement('button');
    // commentButton.textContent = 'Submit';   

    // commentButton.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const comment = commentInput.value;
    //     commentInput.value = '';
    // })

    div.appendChild(img)
    div.appendChild(title)
    div.appendChild(averageRating)
    div.appendChild(likes)
    div.appendChild(likeButton)
    // div.appendChild(commentInput);
    // div.appendChild(commentButton);

    tvShowCollection.append(div)


}

//event listener
function clickLike(e){
    likes = e.target.previousElementSibling
    console.log(likes)
    likes.textContent = `${parseInt(likes.textContent.split(' ')[0]) + 1} Likes`
    
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////FETCHING FROM PUBLIC API /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//Get TV Data from API

const submitSearch = () => {
    tvForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = encodeURI(e.target['show-name'].value)
        console.log(query)

        fetch(`${url2}/${query}`)
        .then(res => res.json())
        .then(data => getTVDetails(data))
    })
}



//Display TV Data
function getTVDetails(show){

    let div = document.createElement('div')
    div.classList.add('card')
    
    let img = document.createElement('img')
    img.classList.add('img')
    img.src = show.image.medium

    //event listener: 
    img.addEventListener('mouseover', () => {
        alert(`This show premiered on ${show.premiered}`)
    })

    let title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = show.name

    let pAverageRating = document.createElement('p')
    pAverageRating.classList.add('average-rating')
    pAverageRating.textContent = `Average Show Rating: ${show.rating.average}`

    likes = document.createElement('p')
    likes.classList.add('likes')
    likes.textContent = '0 Likes'

    let likeButton = document.createElement('button')
    likeButton.textContent = 'Click to Like'

    //event listener:
    likeButton.addEventListener('click', (e) => {
            clickLike(e) 
    })

    div.appendChild(img)
    div.appendChild(title)
    div.appendChild(pAverageRating)
    div.appendChild(likes)
    div.append(likeButton)
    tvShowCollection.append(div)
}   

//event listener
document.addEventListener('DOMContentLoaded', () => {
    fetchFirst()
    submitSearch()
})