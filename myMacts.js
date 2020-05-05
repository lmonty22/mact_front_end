let usersUrl3 = 'http://localhost:3000/users'
let mactsUrl3 = 'http://localhost:3000/macts'

function renderMyMacts(){
    hideDivs()
    const myMacts = document.querySelector('#my-macts')
    myMacts.innerHTML = ""
    myMacts.classList.remove('hidden')
    const user_id = document.querySelector('.username').id
    fetch(usersUrl3 +`/${user_id}`)
    .then(response=> response.json())
    .then(userMacts => {
        if(userMacts.macts.length > 0 ){
        userMacts.macts.forEach(mact=> renderMyMact(mact))
        }else{
            let noMactsDiv = document.getElementById('no-macts-message')      
            noMactsDiv.classList.remove('hidden')
        }
    })
}

function renderMyMact(mact){
    let noMactsDiv = document.getElementById('no-macts-message')      
    noMactsDiv.classList.add('hidden')

    const myMacts = document.querySelector('#my-macts')
    const cardMact = document.createElement('div')
    cardMact.id = `mact-${mact.id}`
    const header = document.createElement('h1')
    header.innerText = "Did you know?"
    const image = document.createElement('img')
    image.src = mact.image
    image.classList.add('my-mact-image')
    const br = document.createElement('br')
    const content = document.createElement('p')
    content.innerText = mact.content
    cardMact.classList.add('card')
    cardMact.classList.add('center')
    cardMact.classList.add('meme-text')
    myMacts.append(cardMact)
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText= "Delete"
    deleteBtn.className = "delete-btn"
    deleteBtn.addEventListener('click', () => confirmDelete(mact, cardMact))
    cardMact.append(header, br, image, content, deleteBtn)
}

function confirmDelete(mact, cardMact){
    const r = confirm('Are you sure you want to delete this Mact?')
    if (r === true){
        deleteMact(mact)
    }
    cardMact.remove()

}

function deleteMact(mact){
    fetch(mactsUrl3 + `/${mact.id}`,{
        method: "DELETE"
    })

 }
