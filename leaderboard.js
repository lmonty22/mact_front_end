function fetchTop3(){
    console.log('top3')
    fetch('http://localhost:3000/poll_results')
    .then(response => response.json())
    .then(pollResultsArray => {
        const correct_answers = pollResultsArray.filter(pollResult => pollResult.is_user_correct == true)
        const correct_usernames = correct_answers.map(ca => ca.user.username)
        const leaderboard = {};
        correct_usernames.forEach(function(x) {
        leaderboard[x] = (leaderboard[x] || 0) + 1;})
        
        var sortable = [];
        for (var user in leaderboard) {
            sortable.push([user, leaderboard[user]]);
        }
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        const top3 = sortable.splice(-3).reverse()
        let x = 1
        for(let i = 0; i < top3.length; i++){
            displayLeaders(top3[i], x)
            x++
        }
    })
}

function displayLeaders(userScore, x) {
    const ulNode = document.querySelector("#leaderboard-ul")
    const liNode = document.createElement('li')
   
    liNode.classList.add('leaderboard')
    liNode.innerText = `${x}. @${userScore[0]} - with ${userScore[1]} correct answers`
    ulNode.append(liNode)
}
