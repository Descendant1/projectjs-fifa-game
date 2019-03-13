(() => {
    // fill teamsTable
    Ajax.getJSON(LinksManager.getgroupResults(), (status, response, statustext) => {
        fillMatchesTable(response);
    });

})();


var fillMatchesTable = (response) => {
    var groupsTable = document.getElementById('groupsTable')
    groupsTable.innerHTML = "<tr> <th>Group Letter</th><th>Country/Team Name</th><th>Fifa Code</th><th>Games Played</th><th>Goal differential</th><th>Wins</th><th>Losses</th><th>Draws</th><th>Points</th> </tr>";
    response.map((i) => {
        i.ordered_teams.map((team) => {
            var tr = document.createElement('tr');
            var td = document.createElement('td')
            td.innerText = i.letter
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.country
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.fifa_code
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.games_played
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.goal_differential
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.wins
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.losses
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.draws
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = team.points
            tr.appendChild(td)
            groupsTable.appendChild(tr);

        })
    })
}