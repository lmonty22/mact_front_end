let commentsUrl = 'http://localhost:3000/comments'
let usersUrl2 = 'http://localhost:3000/users'



function renderComments(comment){

    let id = comment.user_id

    fetch(usersUrl + `/${id}` , {
        method: 'GET',
        headers: {"Content-Type":"application/json"}
    })
    .then((response) => {
        return response.json()
    })
    .then((user) => renderUserComment(user, comment))


 
  function  renderUserComment(user, comment){
      
        let commentsContainer = document.querySelector('.comments-container')
        let commentsUl= document.querySelector('.comments')
        let commentLi = document.createElement('li')
        commentLi.innerText = `${comment.text}` 

        let br = document.createElement('br')
        let timestampP = document.createElement('p')
        timestampP.className= 'timestamp'
        let timestamp = new Date(comment.created_at).toDateString()
                                
        timestampP.innerText = `${timestamp} - @${user.username}`
        commentLi.append(br, timestampP)
        commentsUl.append(commentLi)

        
  }
}

function addComment(e){
    e.preventDefault()

      let mactIdInput = e.target.parentElement.children[0].id
      let textInput = document.getElementById('comment-field').value
      let userId = document.querySelector('.username').id

      let commentObj = {
          //updating the value of comments to reflect the newly added comment
            user_id: userId,
            mact_id:  mactIdInput,
            text: textInput
      }

      fetch(commentsUrl, {
          method: 'POST',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(commentObj)
      })
      .then((response) => response.json())
      .then((comment) => renderComments(comment))

      //clears form text area for better user experience
      document.querySelector('.comment-form').reset()

}