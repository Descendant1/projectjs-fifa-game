
// To avoid links in the code 
class LinksManager 
{
    static teamsLink             = 'http://worldcup.sfg.io/teams/';
    static groupResultsLink      = 'http://worldcup.sfg.io/teams/group_results';
    static countryFifaCodeLink   = 'http://worldcup.sfg.io/matches/country?fifa_code=';
    static matchesLink           = 'http://worldcup.sfg.io/matches';

    static getTeamsLink             ()      {  return this.teamsLink;            }
    static getgroupResults          ()      {  return this.groupResultsLink;     }
    static getcountryFifaCodeLink   (code)  {  return this.countryFifaCodeLink+code;  }
    static getMatchesLink           ()      {  return this.matchesLink;          }

}