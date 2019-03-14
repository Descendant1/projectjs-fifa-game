
//This func is filling matches.
//Placed here to use in both pages
var openStatistics = (match) => {
	//tracker.track('User opened Statistics of match#' + match.fifa_id, 'openStatistics', new Date(),document.location.href)

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
	var details = document.createElement('details');
	var summary = document.createElement('summary');
	summary.innerText = 'Home Team Events';
	details.appendChild(summary);
	for (var ev in match.home_team_events) {
		var p = document.createElement('p');
		p.innerHTML += `${match.home_team_events[ev].player} - ${match.home_team_events[ev].type_of_event} on ${match.home_team_events[ev].time} minute <br>`;
		details.appendChild(p);
	}
	homeTeam.appendChild(details);

	var details = document.createElement('details');
	var summary = document.createElement('summary');
	summary.innerText = 'Full statistics home team';
	details.appendChild(summary);

	for (var prop in match.home_team_statistics) {
		if (prop == 'starting_eleven') {

			var details = document.createElement('details');
			var summary = document.createElement('summary');
			summary.innerText = 'Starting eleven';
			details.appendChild(summary);
			match.home_team_statistics[prop].map((i) => {
				var p = document.createElement('p');
				p.innerHTML = `Player ${i.name} #${i.shirt_number}. Position ${i.position} <br>`;
				details.appendChild(p)
			});
			homeTeam.appendChild(details);
		}
		else if (prop == 'substitutes') {
			var details = document.createElement('details');
			var summary = document.createElement('summary');
			summary.innerText = 'Substitutes';
			details.appendChild(summary);

			match.home_team_statistics[prop].map((i) => {
				var p = document.createElement('p');
				p.innerHTML = `Player ${i.name} #${i.shirt_number}. Position ${i.position} <br>`;
				details.appendChild(p)
			})
			homeTeam.appendChild(details);
		}
		else {
			var p = document.createElement('p');
			p.innerHTML += `${prop} - ${match.home_team_statistics[prop]} <br>`
			details.appendChild(p);
		}
		homeTeam.appendChild(details);
	}

	//right column
	var details = document.createElement('details');
	var summary = document.createElement('summary');
	summary.innerText = 'Away Team Events';
	details.appendChild(summary);
	for (var ev in match.away_team_events) {
		var p = document.createElement('p');
		p.innerHTML += `${match.away_team_events[ev].player} - ${match.away_team_events[ev].type_of_event} on ${match.away_team_events[ev].time} minute <br>`
		details.appendChild(p);
	}
	awayTeam.appendChild(details);
	
	var details = document.createElement('details');
	var summary = document.createElement('summary');
	summary.innerText = 'Full statistics away team';
	details.appendChild(summary);

	for (var prop in match.away_team_statistics) {
		if (prop == 'starting_eleven') {

			var details = document.createElement('details');
			var summary = document.createElement('summary');
			summary.innerText = 'Starting eleven';
			details.appendChild(summary);
			match.away_team_statistics[prop].map((i) => {
				var p = document.createElement('p');
				p.innerHTML = `Player ${i.name} #${i.shirt_number}. Position ${i.position} <br>`;
				details.appendChild(p)
			});
			awayTeam.appendChild(details);
		}
		else if (prop == 'substitutes') {
			var details = document.createElement('details');
			var summary = document.createElement('summary');
			summary.innerText = 'Substitutes';
			details.appendChild(summary);

			match.away_team_statistics[prop].map((i) => {
				var p = document.createElement('p');
				p.innerHTML = `Player ${i.name} #${i.shirt_number}. Position ${i.position} <br>`;
				details.appendChild(p)
			})
			awayTeam.appendChild(details);
		}
		else {
			var p = document.createElement('p');
			p.innerHTML += `${prop} - ${match.away_team_statistics[prop]} <br>`
			details.appendChild(p);
		}
		awayTeam.appendChild(details);
	}
	addOnclickToDetails(match.fifa_id);
}


var fillMatchesTable = (response) => {
	var teamsTable = document.getElementById('matchesTable')
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

var addOnclickToDetails = (matchId) =>{
    Array.from(document.querySelectorAll('summary')).map((i) => {
        i.onclick = (event) => {
			var target = event.target;
			//without timeout cant get open prop
            setTimeout(() => {
				isOpen = target.parentNode.open;
				isOpen ? tracker.track('User opened :'+ target.innerText + ' of Match#'+matchId, 'openStatistics', new Date(), document.location.href) : null;
				console.log(tracker.getTrackItems())
			}, 100);
			
        }
    });
}