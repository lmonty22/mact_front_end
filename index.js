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
    const mactDiv = document.querySelector('.mact-container')
    // const imageDiv = document.createElement('div')
    const imageDiv = document.querySelector('.image-div')
    imageDiv.innerHTML = ''
    imageDiv.id = mact.id
    const defaultH1Overlay = document.getElementById('default-h1')
    // clearing this element and leaving only preferred text
    // to prevent repeating on new fetch requests
    defaultH1Overlay.innerHTML = 'Did you know? '
    const image = document.createElement('img')
    image.className = "image"
    image.src = mact.image
    const content = document.createElement('p')
    content.innerText = mact.content
    const br = document.createElement('br')
    const br2 = document.createElement('br')
    mactDiv.append(defaultH1Overlay)
    defaultH1Overlay.append(imageDiv, br2)
    const fwdArrow = document.createElement('button')
    fwdArrow.innerText = '↪'
    fwdArrow.id = 'fwd-arrow'
    const bwdArrow = document.createElement('button')
    bwdArrow.innerText = '↩'
    bwdArrow.id = 'bwd-arrow'
    imageDiv.append(image, content, bwdArrow, fwdArrow)
   
    //mactDiv holds defaultH1Overlay
    //defaultH1Overlay holds imageDiv and br2
    //imageDiv holds image, br, content, bwdArrow, fwdArrow

    //     <div class= "mact-container" id="mact-viewer">
    //         <h1 id="default-h1">Did you know?</h1>
                    //br2
    //         <div class = "image-div">
                    //image     
                    //br 
                    //content
                    //bwdArrow
                    //fwdArrow
    //         </div>
    //     </div>


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