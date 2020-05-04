let baseUrl2 = 'http://localhost:3000'
let mactsUrl2 = 'http://localhost:3000/macts'


function toCreateForm(){
    
    hideDivs()
    const form = document.getElementById('create-form')
    form.classList.remove('hidden')

    const submitBtn = document.getElementById('submit-btn')
    submitBtn.onclick = (e) => handleCreateForm(e, form)
    
}

function handleCreateForm(e, form){
    e.preventDefault()
    const titleInput = document.getElementById('title-field').value
    const imageUrlInput = document.getElementById('image-url-field').value
    const contentField = document.getElementById('content-field').value
    const fontColorField = document.getElementById('font-color').value
    const user_id = document.querySelector('.username').id
    let mactObj = {
        title: titleInput,
        image: imageUrlInput,
        content: contentField,
        text_color: fontColorField,
        user_id: user_id
    }

    fetch(mactsUrl2, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(mactObj)
    })
    .then((response) => {
        return response.json()
    })
    //after form submission render my macts div
    .then(mact => renderMyMact(mact))
    
    renderMyMacts()
            
    
    form.classList.add('hidden') 

    //& reset form 
    form.reset()
}