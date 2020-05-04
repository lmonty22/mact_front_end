let baseUrl2 = 'http://localhost:3000'
let mactsUrl2 = 'http://localhost:3000/macts'


function toCreateForm(){
    const errorsDiv = document.getElementById('errors-div')
    errorsDiv.innerHTML = ''
    
    hideDivs()
    const form = document.getElementById('create-form')
    form.classList.remove('hidden')

    const submitBtn = document.getElementById('submit-btn')
    // submitBtn.onclick = (e) => handleCreateForm(e, form)
    submitBtn.onclick = (e) => validateForm(e, form)
    
}

function validateForm(e, form){
    e.preventDefault()

    const errorsDiv = document.getElementById('errors-div')
    errorsDiv.innerHTML = ''

    const titleInput = document.getElementById('title-field').value
    const imageUrlInput = document.getElementById('image-url-field').value
    const contentField = document.getElementById('content-field').value
    const fontColorField = document.getElementById('font-color').value

    if(titleInput == ''){
        let errorP = document.createElement('p')
        errorP.innerText = 'title cant be blank'
        errorsDiv.append(errorP)
    } if(imageUrlInput == ''){
        let errorImage = document.createElement('p')
        errorImage.innerText = 'image cant be blank'
        errorsDiv.append(errorImage)
    }if(contentField.length > 180 || contentField.length < 30){       
        let errorContent = document.createElement('p')
        errorContent.innerText = 'Fact must be between 30 and 180 characters'
        errorsDiv.append(errorContent)
    }if(!imageUrlInput.includes('.jpg') && !imageUrlInput.includes('.png')){       
        let errorImage2 = document.createElement('p')
        errorImage2.innerText = 'Image must be in jpg or png format'
        errorsDiv.append(errorImage2)
    }else{
        return handleCreateForm(e, form)
    }
}

function handleCreateForm(e, form){
   
    const titleInput = document.getElementById('title-field').value
    const imageUrlInput = document.getElementById('image-url-field').value
    const contentField = document.getElementById('content-field').value
    const fontColorField = document.getElementById('font-color').value
    const user_id = document.querySelector('.username').id
    const factValue = document.getElementById('fact-value').value

    let mactObj = {
        title: titleInput,
        image: imageUrlInput,
        content: contentField,
        text_color: fontColorField,
        user_id: user_id,
        fact_value: factValue
    }

    fetch(mactsUrl2, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(mactObj)
    })
    .then((response) => response.json())
    //after form submission render my macts div
    .then(mact => renderMyMact(mact))
    renderMyMacts()

    //& reset form 
    form.reset()
}
