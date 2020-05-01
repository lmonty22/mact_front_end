const baseUrl = 'http://localhost:3000'
const mactsUrl = 'http://localhost:3000/macts'

document.addEventListener('DOMContentLoaded', function(){
    console.log('Dom Loaded')
    fetchMact();
});

function fetchMact(){
    fetch(`http://localhost:3000/macts`)
    .then(response => response.json())
    .then(mactArray => displayMact(mactArray[0]))
};

function displayMact(mact){
    //     <div class= "mact-container" >
    //     <div class= "mact-viewer">
    //     <h1 id="default-h1">Did you know?</h1>
    //     <figure class="image-div">
    //         <img class="mact-image">
    //         <figcaption class="mact-content"></figcaption>
    //     </figure>
    //     <button id="bwd-arrow">↩</button>
    //     <button id="fwd-arrow">↪</button> 
    //     </div>
    // </div>
    const mactDiv = document.querySelector('.mact-viewer')
    const imageDiv = document.querySelector('.image-div')
    mactDiv.id = mact.id
    const image = document.querySelector('.mact-image')
    image.src = mact.image
    const content = document.querySelector(".mact-content")
    content.innerText = mact.content
    const fwdArrow = document.querySelector('#fwd-arrow')
    const bwdArrow = document.querySelector('#bwd-arrow')

    fwdArrow.addEventListener('click', showNextMact)
    bwdArrow.addEventListener('click', showPreviousMact)

};

function showNextMact(e){

    let id = parseInt(e.target.parentElement.id)
    // fetch next mact from the api 
    // render the new mact to the DOM
    fetch(mactsUrl + `/${id + 1 }`)
    .then((response) => {
        return response.json()
    })
    
    .then((mact) => {
        if(mact.id){
        return displayMact(mact)
        }
        else{ alert('Sorry, outta macts, go make one yourself!')}
    })

}

function showPreviousMact(e){

    let id = parseInt(e.target.parentElement.id)
        // fetch next mact from the api 
        // render the new mact to the DOM
        fetch(mactsUrl + `/${id - 1 }`)
        .then((response) => {
            return response.json()
        })
        
        .then((mact) => {
            if(mact.id){
            return displayMact(mact)
            }
            else{ alert('Sorry, outta macts, go make one yourself!')}
        })
    
    }