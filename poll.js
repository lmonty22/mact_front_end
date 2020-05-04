
function showResults(mact, answer){
    
    const factValueDiv = document.querySelector('.fact-value-btn')
    factValueDiv.classList.add('hidden')

    const resultDiv = document.querySelector('.results')
    resultDiv.classList.remove('hidden')

    if(mact.fact_value == answer ){

    const resultH3 = document.getElementById('result-h3')
    resultH3.innerText = "You're Correct!"
    
    } else {

    const resultH3 = document.getElementById('result-h3')
    resultH3.innerText = "You're wrong!"
    }
}