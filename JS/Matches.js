
(() => {
	Ajax.getJSON(LinksManager.getMatchesLink(), (status, response, statustext) => {
		fillMatchesTable(response);
		tempForCalls = response;
	});
})();