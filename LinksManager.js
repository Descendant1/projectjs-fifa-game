const teamsLink             = 'https://worldcup.sfg.io/teams/';
const groupResultsLink      = 'https://worldcup.sfg.io/teams/group_results';
const countryFifaCodeLink   = 'https://worldcup.sfg.io/matches/country?fifa_code=ARG';
const matchesLink           = 'https://worldcup.sfg.io/matches';
class LinksManager 
{
    constructor()
    {

    }
    static getTeamsLink             () {  return teamsLink;            }
    static getgroupResults          () {  return groupResultsLink;     }
    static getcountryFifaCodeLink   () {  return countryFifaCodeLink;  }
    static getmatchesLink           () {  return matchesLink;          }

}