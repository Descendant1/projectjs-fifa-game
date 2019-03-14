var Codes = [];

(() => {
    // fill teamsTable
    Ajax.getJSON(LinksManager.getTeamsLink(), (status, response, statustext) => {
        response.map((i) => {
            Codes.push(i.fifa_code)
        })
        drawCodes(Codes);
    });

})();

var drawCodes = (codes) => {
    var place = document.getElementById('Codes');
    codes.map((i) => {
        var div = document.createElement('div');
        div.classList.add('code');
        div.innerText = i;
        div.onclick = (ev) => {
            console.log(ev.target.innerText);
            Ajax.getJSON(LinksManager.getcountryFifaCodeLink(ev.target.innerText.trim()), (st, response, statustext) => {
                fillMatchesTable(response);
                tempForCalls = response;
            });
        }
        place.appendChild(div);
    });
}

