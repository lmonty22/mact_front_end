document.addEventListener('DOMContentLoaded', function(){
    console.log('Dom Loaded')
    // const id = 1 
    fetchMact()
})

// function fetchMacts(){
//     fetch('http://localhost:3000/macts')
//     .then(response => response.json())
//     .then(mactArray => mactArray.forEach(mact => console.log(mact)))
// }

// function fetchMact(id){
//     fetch(`http://localhost:3000/macts/${id}`)
//     .then(response => response.json())
//     .then(beer => console.log(beer))
// }

function fetchMact(){
    fetch(`http://localhost:3000/macts`)
    .then(response => response.json())
    .then(mactArray => displayMact(mactArray[0]))
}

function displayMact(mact){
    const mactDiv = document.querySelector('.mact-container')
    const image = document.createElement('img')
    image.className = "image"
    image.src = mact.image
    mactDiv.append(image)
}
