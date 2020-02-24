'use strict'

const TIMEINWEEK = 604000000;
let APIKey = 'RGAPI-01e23e57-d6d2-4893-bdb0-d502793a6f2c';
let summonerData, rankedData, matchHistoryData, championsData, GchampName;
let matchDataArr = [];
let tempDate = new Date();
let weekAgo = tempDate.getTime() - TIMEINWEEK;




async function getSummonerInfo(SummonerName, champName){
  GchampName = champName;

  let championsResult    = await fetch(`../Champions.json`);
      championsData      = await championsResult.json();
  //  console.log(championsData);
  let summonerResult     = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerName}?api_key=${APIKey}`);
      summonerData       = await summonerResult.json();
  //  console.log(summonerData);
  let rankedResult       = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${APIKey}`);
      rankedData         = await rankedResult.json();
  //  console.log(rankedData);
  let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?champion=${championsData.data[champName].key}&queue=420&beginTime=${weekAgo}&api_key=${APIKey}`);
      matchHistoryData   = await matchHistoryResult.json();
  //  console.log(matchHistoryData)
  for (let i = 1; i <= 10; i++) {
    let matchIndex    = matchHistoryData.totalGames - i;
    console.log(matchIndex);
    let matchResult   = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matches/${matchHistoryData.matches[matchIndex].gameId}?api_key=${APIKey}`);
    let matchData     = await matchResult.json();
    matchDataArr.push(matchData);
  }
  
    console.log(matchDataArr);  
}

getSummonerInfo('FroggenCosplayer', 'Anivia')
.then(() => {
  let rankedIndex = -1;
  if(rankedData[0].queueType === "RANKED_SOLO_5x5"){
    rankedIndex = 0;
  } else if (rankedData[1].queueType === "RANKED_SOLO_5x5"){
    rankedIndex = 1;
  }

  console.log(`Summoner ${summonerData.name} is level ${summonerData.summonerLevel}. This account is also ${rankedData[rankedIndex].tier} ${rankedData[rankedIndex].rank}, in Solo q.
  This account has ${rankedData[rankedIndex].leaguePoints} LP, with a winrate of ${(rankedData[rankedIndex].wins / (rankedData[rankedIndex].losses + rankedData[rankedIndex].wins)) * 100}%.
  ${summonerData.name} Has played ${matchHistoryData.totalGames} ranked solo q games in the last 7 days with ${GchampName}`);
})
.catch(ErrorCode => {
console.log(`Øv fejlkode (${ErrorCode})`);
});