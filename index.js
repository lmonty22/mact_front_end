let baseUrl = 'http://localhost:3000'
let mactsUrl = 'http://localhost:3000/macts'
let usersUrl = 'http://localhost:3000/users'

document.addEventListener('DOMContentLoaded', function(){
    console.log('Dom Loaded')

    // const username = document.querySelector('.username')
    // const loginForm = document.querySelector('.login-form')
    // if(!username){
    renderLogin();
    // }else{
    //     loginForm.classList.add('hidden')
    // }
   
});

function hideDivs(){
    const macDiv = document.querySelector('#mact-container')
    macDiv.classList.add('hidden')
    const createForm = document.querySelector('#create-form')
    createForm.classList.add('hidden')
    const loginContainer = document.querySelector('#login-container')
    loginContainer.classList.add('hidden')
    const myMacts = document.querySelector('#my-macts')
    myMacts.classList.add('hidden')
}

function renderLogin(){
   const signUpBtn = document.getElementById('sign-up')
   signUpBtn.addEventListener('click', saveLogin)
}

function saveLogin(e){
    e.preventDefault()
    const usernameInput = document.getElementById('username-field').value
    let userObj = {
        username: usernameInput
    }

    fetch(usersUrl, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then((user)=> renderUsername(user))

    
    hideDivs()
    fetchMact()
   
    const addBtn = document.getElementById('add-btn')
    addBtn.addEventListener('click', toCreateForm)

    const myMactBtn = document.querySelector('#my-macts-btn')
    myMactBtn.addEventListener('click', renderMyMacts)

    const homeBtn = document.querySelector('#home-btn')
    homeBtn.addEventListener('click', fetchMact)
}
function renderUsername(user){

    const header = document.querySelector('.header')
    const a = document.createElement('a')
    a.className = 'text'
    a.classList.add('username')
    a.id = user.id 
    a.innerText = `Username: ${user.username}`
    header.append(a)

}

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
    hideDivs()
    const mactContainer = document.getElementById('mact-container')
    mactContainer.classList.remove('hidden')
    const header = document.querySelector('#default-h1')
    header.style.color = mact.text_color
    const mactDiv = document.querySelector('.mact-viewer')
    // const imageDiv = document.querySelector('.image-div')
    mactDiv.id = mact.id
    const image = document.querySelector('.mact-image')
    image.src = mact.image
    const content = document.querySelector(".mact-content")
    content.innerText = mact.content
    content.style.color = mact.text_color
    const username = document.querySelector(".mact-username")
    username.innerText = `@${mact.user.username}`
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