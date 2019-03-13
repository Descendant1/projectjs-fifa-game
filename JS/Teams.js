var Codes =  [];

(() => {
	// fill teamsTable
    Ajax.getJSON(LinksManager.getTeamsLink(), (status, response, statustext) => {
        response.map((i)=>{
            Codes.push(i.fifa_code)
        })
        drawCodes(Codes);
    });

})();

var drawCodes = (codes)  => 
{
    var place =  document.getElementById('Codes');
    codes.map((i)=>{
        var div =  document.createElement('div');
        div.classList.add('code');
        div.innerText = i;
        div.onclick = (ev) => {
            console.log(ev.target.innerText);
            Ajax.getJSON(LinksManager.getcountryFifaCodeLink(ev.target.innerText.trim()), (st,response,statustext)=>{
                fillMatchesTable(response);
                tempForCalls = response;
            });
        }
        place.appendChild(div);
    });
}
var fillMatchesTable = (response) => {
	var teamsTable = document.getElementById('teamsTable')
	teamsTable.innerHTML = "<tr><th>Venue</th><th>Location</th><th>Home Team</th><th>Away Team</th><th>Winner</th><th>Score</th><th>Time</th><th>Stage</th></tr>";
	response.map((i) => {
		var tr = document.createElement('tr');
		tr.id = i.fifa_id
		tr.onclick = (event) => {
			var id = event.target.parentElement.id;
			var match = response.filter(i => i.fifa_id == id);
			openStatistics(match[0]);
		}

		var td = document.createElement('td')
		td.innerText = i.venue
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = i.location
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = i.home_team_country
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = i.away_team_country
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = i.winner
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = `${i.home_team.goals} - ${i.away_team.goals}`
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = formatDate(new Date(i.datetime))
		tr.appendChild(td)

		td = document.createElement('td')
		td.innerText = i.stage_name
		tr.appendChild(td)

		teamsTable.appendChild(tr);
	})
}
var openStatistics = (match) => {
	tracker.track('User opened Statistics of match#'+match.fifa_id, 'openStatistics', new Date() )

	document.getElementById('matchStatModal').classList.add('is-active');
	var head = document.getElementById('modalHeader');
	var homeTeam = document.getElementById('homeTeam');
	var awayTeam = document.getElementById('awayTeam');
	clear(homeTeam); clear(awayTeam);

	head.innerHTML = match.home_team_country + ' '
		+ match.home_team_statistics.tactics
		+ '&nbsp; VS &nbsp;'
		+ match.away_team_country + ' '
		+ match.away_team_statistics.tactics
		+ '<br> Winner - ' + match.winner
		+ '<br> Status - ' + match.status;

	//left column
	homeTeam.innerHTML += `<strong>Home Team Events</strong> <br>`;
	for (var ev in match.home_team_events) {
		homeTeam.innerHTML += `${match.home_team_events[ev].player} - ${match.home_team_events[ev].type_of_event} on ${match.home_team_events[ev].time} minute <br>`
	}
	homeTeam.innerHTML += `<strong>Full statistics home team</strong> <br>`;
	for (var prop in match.home_team_statistics) {
		if (prop == 'starting_eleven') {
			homeTeam.innerHTML += `<b> Starting eleven </b><br>`
			match.home_team_statistics[prop].map((i) => {
				homeTeam.innerHTML += `Player ${i.name} #${i.shirt_number}. Position ${i.position}<br>`
			})
		}
		else if (prop == 'substitutes') {
			homeTeam.innerHTML += `<b>Substitutes</b><br>`
			match.home_team_statistics[prop].map((i) => {
				homeTeam.innerHTML += `Player ${i.name} #${i.shirt_number}. Position${i.position}<br>`
			})
		}
		else homeTeam.innerHTML += `${prop} - ${match.home_team_statistics[prop]} <br>`
	}

	//right column
	awayTeam.innerHTML += `<strong>Home Team Events</strong> <br>`;
	for (var ev in match.away_team_events) {
		awayTeam.innerHTML += `${match.away_team_events[ev].player} - ${match.away_team_events[ev].type_of_event} on ${match.away_team_events[ev].time} minute <br>`
	}
	awayTeam.innerHTML += `<strong>Full statistics away team</strong> <br>`;
	for (var prop in match.away_team_statistics) {
		if (prop == 'starting_eleven') {
			awayTeam.innerHTML += `<b> Starting eleven </b><br>`
			match.away_team_statistics[prop].map((i) => {
				awayTeam.innerHTML += `Player ${i.name} #${i.shirt_number}. Position ${i.position}<br>`
			})
		}
		else if (prop == 'substitutes') {
			awayTeam.innerHTML += `<b>Substitutes</b><br>`
			match.away_team_statistics[prop].map((i) => {
				awayTeam.innerHTML += `Player ${i.name} #${i.shirt_number}. Position${i.position}<br>`
			})
		}
		else awayTeam.innerHTML += `${prop} - ${match.away_team_statistics[prop]} <br>`
	}
}

var tempForCalls = null;

var inputKeyDownVenue = (event) => {
	tracker.track('User searched by Venue with parameter -> ' + event.target.value.toLowerCase().trim(), 'inputKeyDownVenue', new Date() );
	fillMatchesTable(tempForCalls.filter(i => i.venue.toLowerCase().startsWith(event.target.value.toLowerCase().trim())));
}
var inputKeyDownWinner = (event) => {
	tracker.track('User searched by Winner with parameter -> ' + event.target.value.toLowerCase().trim(), 'inputKeyDownWinner', new Date() );
	fillMatchesTable(tempForCalls.filter(i => i.winner.toLowerCase().startsWith(event.target.value.toLowerCase().trim())));
}
var inputKeyDownStage = (event) => {
	tracker.track('User searched by Stage with parameter -> ' + event.target.value.toLowerCase().trim(), 'inputKeyDownStage', new Date() );
	fillMatchesTable(tempForCalls.filter(i => i.stage_name.toLowerCase().startsWith(event.target.value.toLowerCase().trim())));
}
var Search = () =>
{
	tracker.track('User searched by Stage with multiple parameters -> 1. ' + document.getElementById('venueSearch').value  
																	+'<br>2. '+document.getElementById('winnerSearch').value
																	+'<br>2. '+document.getElementById('stageSearch').value
	, 'Search', new Date() );	
	let result = tempForCalls
							.filter(i 	=> 	i.venue.toLowerCase()		.startsWith( document.getElementById('venueSearch').value .toLowerCase()  ))
							.filter(i	=>  i.winner.toLowerCase()		.startsWith( document.getElementById('winnerSearch').value.toLowerCase()  ))
							.filter(i	=>  i.stage_name .toLowerCase()	.startsWith( document.getElementById('stageSearch').value .toLowerCase()  ));
	
	fillMatchesTable(result);
}