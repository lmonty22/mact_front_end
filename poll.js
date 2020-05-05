 const pollUrl = 'http://localhost:3000/poll_results'

function handleCorrectResult(mact, answer){
    // for this post request to the result_poll we will user_id, mact_id, user_answer,
    // correct_answer and is_user_correct?
    const user_id = document.querySelector(".username").id
    pollObj = {
        mact_id: mact.id,
        user_id: user_id,
        user_answer: answer,
        correct_answer: mact.fact_value,
        is_user_correct: true
    }

    let userPollResult = mact.poll_results.find(result => result.user_id == user_id)

    if(!userPollResult){
        fetch(pollUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(pollObj)
        })
        .then(response=> response.json())
        .then(poll_result => handlePollResult(mact, poll_result))
    }else{
        handleExistingResults(mact)
    }
}

function handleIncorrectResult(mact, answer){
    const user_id = document.querySelector(".username").id
    pollObj = {
        mact_id: mact.id,
        user_id: user_id,
        user_answer: answer,
        correct_answer: mact.fact_value,
        is_user_correct: false
    }

    let userPollResult = mact.poll_results.find(result => result.user_id == user_id)
    
    if(!userPollResult){
    fetch(pollUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pollObj)
    })
    .then(response=> response.json())
    .then(poll_result => handlePollResult(mact, poll_result))
    }else{
        handleExistingResults(mact)
    }
}

function handlePollResult(mact, poll_result){
    mact.poll_results.push(poll_result)
    const update_results = mact.poll_results
    const correct_results = update_results.filter(poll_result => poll_result.is_user_correct == true)
    const incorrect_results = update_results.filter(poll_result => poll_result.is_user_correct == false)
    
    const poll_div = document.querySelector('#poll-result')
    poll_div.innerHTML = ""
    poll_div.classList.remove('hidden')
    const correct_answer_div = document.createElement('div')
    correct_answer_div.classList.add('white')
    const number_correct = correct_results.length
    correct_answer_div.innerText = `${number_correct} got this right!`

    const incorrect_answer_div = document.createElement('div')
    incorrect_answer_div.classList.add('white')
    const number_incorrect = incorrect_results.length
    incorrect_answer_div.innerText = `${number_incorrect} got this wrong!`

    poll_div.append(correct_answer_div, incorrect_answer_div)

}

function handleExistingResults(mact){

    const correct_results = mact.poll_results.filter(poll_result => poll_result.is_user_correct == true)
    const incorrect_results = mact.poll_results.filter(poll_result => poll_result.is_user_correct == false)
    
    const poll_div = document.querySelector('#poll-result')
    poll_div.innerHTML = ""
    poll_div.classList.remove('hidden')
    const correct_answer_div = document.createElement('div')
    correct_answer_div.classList.add('white')
    const number_correct = correct_results.length
    correct_answer_div.innerText = `${number_correct} got this right!`

    const incorrect_answer_div = document.createElement('div')
    incorrect_answer_div.classList.add('white')
    const number_incorrect = incorrect_results.length
    incorrect_answer_div.innerText = `${number_incorrect} got this wrong!`

    poll_div.append(correct_answer_div, incorrect_answer_div)

}

function showResults(mact, answer){
    
    const factValueDiv = document.querySelector('.fact-value-btn')
    factValueDiv.classList.add('hidden')

    const resultDiv = document.querySelector('.results')
    resultDiv.classList.remove('hidden')

    if(mact.fact_value == answer ){
        const resultH3 = document.getElementById('result-h3')
        resultH3.textContent = `You're Correct! The answer was ${answer}.`  
        handleCorrectResult(mact, answer)

    } else {
        const resultH3 = document.getElementById('result-h3')
        resultH3.textContent = `You're wrong! The answer was ${answer}.`
        handleIncorrectResult(mact, answer)
    }
}