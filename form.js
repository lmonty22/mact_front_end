let baseUrl2 = 'http://localhost:3000'
let mactsUrl2 = 'http://localhost:3000/macts'


function toCreateForm(){
    
    const mactContainer = document.querySelector('.mact-container')
    mactContainer.classList.add('hidden')

    const form = document.getElementById('create-form')
    form.classList.remove('hidden')

    const submitBtn = document.getElementById('submit-btn')
    submitBtn.addEventListener('click', (e) =>  handleCreateForm(e, form))


}

function handleCreateForm(e, form){
    e.preventDefault()
    const titleInput = document.getElementById('title-field').value
    const imageUrlInput = document.getElementById('image-url-field').value
    const contentField = document.getElementById('content-field').value
    const fontColorField = document.getElementById('font-color').value

    let mactObj = {
        title: titleInput,
        image: imageUrlInput,
        content: contentField,
        text_color: fontColorField
    }

    fetch(mactsUrl2, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(mactObj)
    })
    .then((response) => {
        return response.json()
    })
    .then (mact => console.log(mact))
    form.classList.add('hidden')
    debugger
}