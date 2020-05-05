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
    const noMactsDiv = document.getElementById('no-macts-message')
    noMactsDiv.classList.add('hidden')
    const leaderBoard = document.getElementById('leaderboard')
    leaderBoard.classList.add('hidden')
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
    .then(mactArray => displayMact(mactArray, 0))
};


function displayMact(mactArray, index){
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

    const factValueDiv = document.querySelector('.fact-value-btn')
    factValueDiv.classList.remove('hidden')

    const resultDiv = document.querySelector('.results')
    resultDiv.classList.add('hidden')
    const poll_div = document.querySelector('#poll-result')
    poll_div.classList.add('hidden')

    const commentsUl= document.querySelector('.comments')
    commentsUl.innerHTML= ''

    const mact = mactArray[index]

    hideDivs()
    fetchTop3()

    const leaderBoard = document.getElementById('leaderboard')
    leaderBoard.classList.remove('hidden')


    const mactContainer = document.getElementById('mact-container')
    mactContainer.setAttribute('index-num', index)
    mactContainer.classList.remove('hidden')
    const header = document.querySelector('#default-h1')
    header.style.color = mact.text_color
    const mactDiv = document.querySelector('.mact-viewer')
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
    // addeventlistener was doing something weird with passing through variables. 
    fwdArrow.onclick = () => showNextMact(mactArray, index)
    bwdArrow.onclick = () => showPreviousMact(mactArray, index)

    const trueBtn = document.getElementById('true-btn')
    const falseBtn = document.getElementById('false-btn')

    trueBtn.onclick = () => showResults(mact , true)
    falseBtn.onclick = () => showResults(mact, false)
    trueBtn.classList.remove('hidden')
    falseBtn.classList.remove('hidden')

    let userId = document.querySelector('.username').id
    let userPollResult = mact.poll_results.find(result => result.user_id == userId)
    
    if(userPollResult){
        trueBtn.classList.add('hidden')
        falseBtn.classList.add('hidden')
        showResults(mact, userPollResult.user_answer)
    }

    if(mact.comments.length > 0){

        const commentsH3 = document.querySelector('.comments-h3')
        commentsH3.innerText = "Comments"

        mact.comments.forEach(comment => renderComments(comment))

    }else{

        const commentsH3 = document.querySelector('.comments-h3')
        commentsH3.innerText = "No Comments"
    }


    
    const commentForm = document.querySelector('.comment-form')
    commentForm.onsubmit = (e) => addComment(e)
    // commentForm.addEventListener('submit', (e) => addComment(e, mact))
  
};

function showNextMact(mactArray, index){
    index++ 

    if (mactArray[index]){

        const commentsUl= document.querySelector('.comments')
        commentsUl.innerHTML= ''

        displayMact(mactArray, index)

        }
        if (!mactArray[index]){
            alert('Sorry, outta macts, go make one yourself!')
        }
    

}
function showPreviousMact(mactArray, index){
    index--

    if (mactArray[index]){

        const commentsUl= document.querySelector('.comments')
        commentsUl.innerHTML= ''

        displayMact(mactArray, index)

        }
        if (!mactArray[index]){
            alert('Sorry, outta macts, go make one yourself!')
        }

}