'use strict'

const TIMEINWEEK = 604000000;
let APIKey = 'RGAPI-cadd4e9b-c828-40b5-b045-dc5ed3d37b05';
let summonerData, rankedData, matchHistoryData, championsData, GchampName;
let matchDataArr = [];
let tempDate = new Date();
let weekAgo = tempDate.getTime() - TIMEINWEEK;
let numberOfGames = -1;




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

  if (champName) {
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?champion=${championsData.data[champName].key}&queue=420&beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  } else {
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?queue=420&beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  }
  
  //  console.log(matchHistoryData)
  if (matchHistoryData.totalGames > 10) {
    numberOfGames = 10; 
  } else {
    numberOfGames = matchHistoryData.totalGames;
  }

  for (let i = 1; i <= numberOfGames; i++) {
    let matchIndex    = matchHistoryData.totalGames - i;
    console.log(matchIndex);
    let matchResult   = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matches/${matchHistoryData.matches[matchIndex].gameId}?api_key=${APIKey}`);
    let matchData     = await matchResult.json();
    matchDataArr.push(matchData);
  }
  
    console.log(matchDataArr);  
}

getSummonerInfo('FroggenCosplayer')
.then(() => {
  let rankedIndex = -1;
  if(rankedData[0].queueType === "RANKED_SOLO_5x5"){
    rankedIndex = 0;
  } else if (rankedData[1].queueType === "RANKED_SOLO_5x5"){
    rankedIndex = 1;
  }

  console.log(`Summoner ${summonerData.name} is level ${summonerData.summonerLevel}. This account is also ${rankedData[rankedIndex].tier} ${rankedData[rankedIndex].rank}, in Solo q.
  This account has ${rankedData[rankedIndex].leaguePoints} LP, with a winrate of ${(rankedData[rankedIndex].wins / (rankedData[rankedIndex].losses + rankedData[rankedIndex].wins)) * 100}%.
  ${summonerData.name} Has played ${matchHistoryData.totalGames} ranked solo q games in the last 7 days`);  //${GchampName}

  document.getElementById("summonerName").innerHTML = `${summonerData.name}`;

  document.getElementById("rankBlock").innerHTML = ` <p>Rank: ${rankedData[rankedIndex].tier} ${rankedData[rankedIndex].rank} ${rankedData[rankedIndex].leaguePoints} LP</p>`
  document.getElementById("lvlBlock").innerHTML = ` <p>Level: ${summonerData.summonerLevel} </p>`
  document.getElementById("winrateBlock").innerHTML = ` <p>Winrate: ${(rankedData[rankedIndex].wins / (rankedData[rankedIndex].losses + rankedData[rankedIndex].wins)) * 100}%</p>`
})
.catch(ErrorCode => {
  console.log(`Øv fejlkode (${ErrorCode})`);
  document.getElementById("summonerName").innerHTML = `Loading Failed. Error : (${ErrorCode})`;
});


//      <label for="champName">Specific Champion</label><br>
//<input type="text" id="champName" name="champName"><br>