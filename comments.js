let commentsUrl = 'http://localhost:3000/comments'



function renderComments(comment){
//    console.log('reached')
//    debugger

    let commentsContainer = document.querySelector('.comments-container')
    let commentsUl= document.querySelector('.comments')
    let commentLi = document.createElement('li')
    commentLi.innerText = `${comment.text}` 

    let br = document.createElement('br')
    let timestampP = document.createElement('p')
    timestampP.className= 'timestamp'
    let timestamp = new Date(comment.created_at).toDateString()
                                        //comment.user.username relationshop not working
    timestampP.innerText = `${timestamp} - @some_user`

    
    commentLi.append(br, timestampP)
    commentsUl.append(commentLi)

}

function addComment(e, mact){
    e.preventDefault()
    console.log('reached')

    // let commentsContainer = document.querySelector('.comments-container')
    // let commentsUl= document.querySelector('.comments')
    // let commentLi = document.createElement('li')
    // commentLi.innerText = document.getElementById('comment-field').value

    // let br = document.createElement('br')
    // let timestampP = document.createElement('p')
    // timestampP.className= 'timestamp'
    // let timestamp = new Date (Date.now()).toDateString()
    //                                         //comment.user.username relationshop not working
    // timestampP.innerText = `${timestamp} - @some_user`

    // commentLi.append(br, timestampP)
    // commentsUl.append(commentLi)

      //Persist review with fetch PATCH request


      let mactIdInput = e.target.parentElement.children[0].id
      let textInput = document.getElementById('comment-field').value
    //   let userId = How do I access this?
  
      let commentObj = {
          //updating the value of comments to reflect the newly added comment
            user_id: userId,
            mact_id:  mactIdInput,
            text: textInput
      }

      fetch(commentsUrl + `/${id}`, {
          method: 'POST',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(commentObj)
      })
      .then((response) => response.json())
      .then((comment) => console.log(comment))

      renderComments()
      
      //clears form text area submission for better user experience
    //   document.getElementById('comment-field').reset()

}