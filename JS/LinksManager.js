const teamsLink             = 'http://worldcup.sfg.io/teams/';
const groupResultsLink      = 'http://worldcup.sfg.io/teams/group_results';
const countryFifaCodeLink   = 'http://worldcup.sfg.io/matches/country?fifa_code=';
const matchesLink           = 'http://worldcup.sfg.io/matches';
class LinksManager 
{
    constructor()
    {

    }
    static getTeamsLink             ()      {  return teamsLink;            }
    static getgroupResults          ()      {  return groupResultsLink;     }
    static getcountryFifaCodeLink   (code)  {  return countryFifaCodeLink+code;  }
    static getMatchesLink           ()      {  return matchesLink;          }

}