let usersUrl4 = 'http://localhost:3000/users'

function renderMyMacts(){
    hideDivs()
    const myMacts = document.querySelector('#my-macts')
    myMacts.innerHTML =""
    myMacts.classList.remove('hidden')
    const user_id = document.querySelector('.username').id
    fetch(usersUrl4 +`/${user_id}`)
    .then(response=> response.json())
    .then(userMacts => userMacts.macts.forEach(mact=> renderMyMact(mact)))
}

function renderMyMact(mact){
    const myMacts = document.querySelector('#my-macts')
    const cardMact = document.createElement('div')
    const header = document.createElement('h1')
    header.innerText = "Did you know?"
    const image = document.createElement('img')
    image.src = mact.image
    image.classList.add('my-mact-image')
    const br = document.createElement('br')
    const content = document.createElement('p')
    content.innerText = mact.content
    cardMact.classList.add('card')
    myMacts.append(cardMact)
    cardMact.append(header, br, image, content)
}

