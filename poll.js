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
    .then(pollResult => handlePollResult(mact, pollResult))
    }else{
        handleExistingResults(mact)
    }
}

function handlePollResult(mact, pollResult){
    mact.poll_results.push(pollResult)
    const updateResults = mact.poll_results
    const correctResults = updateResults.filter(pollResult => pollResult.is_user_correct == true)
    const incorrectResults = updateResults.filter(pollResult => pollResult.is_user_correct == false)
    const pollDiv = document.querySelector('#poll-result')
    pollDiv.classList.remove('hidden')
    

    const correctBarLabel = document.querySelector('.correct-bar-label')
    const numberCorrect = correctResults.length/updateResults.length
    const correctPercentage = numberCorrect * 1000
    correctBarLabel.innerText = `${Math.floor(correctPercentage / 10)}% got this right!`
    const correctBar = document.querySelector('.correct-bar')
    correctBar.value = correctPercentage

    const incorrectBarLabel = document.querySelector('.wrong-bar-label')
    const numberIncorrect = incorrectResults.length/updateResults.length
    const incorrectPercentage = numberIncorrect * 1000
    incorrectBarLabel.innerText = `${Math.floor(incorrectPercentage / 10) }% got this wrong!`
    const incorrectBar = document.querySelector('.wrong-bar')
    incorrectBar.value = incorrectPercentage

    debugger
}

function handleExistingResults(mact){

    const correctResults = mact.poll_results.filter(poll_result => poll_result.is_user_correct == true)
    const incorrectResults = mact.poll_results.filter(poll_result => poll_result.is_user_correct == false)
    
    const pollDiv = document.querySelector('#poll-result')
    pollDiv.classList.remove('hidden')


    const correctBarLabel = document.querySelector('.correct-bar-label')
    const numberCorrect = correctResults.length/mact.poll_results.length
    const correctPercentage = numberCorrect * 1000
    correctBarLabel.innerText = `${Math.floor(correctPercentage / 10 )}% got this right!`
    const correctBar = document.querySelector('.correct-bar')
    correctBar.value = correctPercentage


    const incorrectBarLabel = document.querySelector('.wrong-bar-label')
    const numberIncorrect = incorrectResults.length/mact.poll_results.length
    const incorrectPercentage = numberIncorrect * 1000
    incorrectBarLabel.innerText = `${Math.floor(incorrectPercentage / 10) }% got this wrong!`
    const incorrectBar = document.querySelector('.wrong-bar')
    incorrectBar.value = incorrectPercentage

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