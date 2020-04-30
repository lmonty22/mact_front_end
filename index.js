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
    const imageDiv = document.createElement('div')
    const defaultH1Overlay = document.getElementById('default-h1')
    const image = document.createElement('img')
    image.className = "image"
    image.src = mact.image
    const content = document.createElement('p')
    content.innerText = mact.content
    const br = document.createElement('br')
    const br2 = document.createElement('br')
    mactDiv.append(defaultH1Overlay)
    defaultH1Overlay.append(imageDiv, br2)
    imageDiv.append(image, br, content)

}
