
(() => {
  // fill teamsTable
  getJSON(LinksManager.getTeamsLink(), (status, response, statustext) => {
    console.log('Teams');
    console.log(response);

    var teamsTable = document.getElementById('teamsTable')

    response.map((i) => {
      var tr = document.createElement('tr');
      for (var prop in i) {
        var td = document.createElement('td')
        td.innerText = i[prop]
        tr.appendChild(td)
      }
      teamsTable.appendChild(tr);
    })

  });
   // fill teamsTable
   getJSON(LinksManager.getgroupResults(), (status,response,statustext) => 
   { 
     console.log('groups'); 
     console.log(response); 
     var teamsTable = document.getElementById('groupTable')

     response.map((i) => {
       var tr = document.createElement('tr');
       for (var prop in i) {
         var td = document.createElement('td')
         if(prop == 'ordered_teams' )
         {
           i[prop].map((i)=>{
              var p = document.createElement('p');

              p.innerHTML = `${i.country} &nbsp; Wins ${i.wins} &nbsp; Goals Diff ${i.goal_differential}  `  ;
              td.appendChild( p );

           })
         }  

         else td.innerText = i[prop]


         tr.appendChild(td)
       }
       teamsTable.appendChild(tr);
     });

   })
   
   getJSON(LinksManager.getcountryFifaCodeLink("BEL"), (status,response,statustext) => 
   { 
     console.log('getcountryFifaCodeLink'); 
     console.log(response); 
   })
   getJSON(LinksManager.getmatchesLink(), (status,response,statustext) => 
   { 
     console.log('getmatchesLink'); 
     console.log(response); 
   })

})();



// static getcountryFifaCodeLink   (code)  {  return countryFifaCodeLink+code;  }
// static getmatchesLink   