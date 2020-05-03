let usersUrl3 = 'http://localhost:3000/users'
let mactsUrl3 = 'http://localhost:3000/macts'

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
