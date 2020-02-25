//'use strict'

const TIMEINWEEK = 604000000;
let APIKey = 'RGAPI-ba7dfaff-56b6-4ef1-80e5-c6a655e09984';
let summonerData, rankedData, matchHistoryData, championsData, GchampName;
//let matchDataArr = [];
let tempDate = new Date();
let weekAgo = tempDate.getTime() - TIMEINWEEK;
let numberOfGames = -1;
console.log(weekAgo);



async function getSummonerInfo(SummonerName, queueKey, champName){
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

  if (champName && queueKey) {
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?champion=${championsData.data[champName].key}&queue=${queueKey}&beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  } else if (!champName && queueKey){
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?queue=${queueKey}&beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  } else if (champName && !queueKey){
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?champion=${championsData.data[champName].key}&beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  } else {
    let matchHistoryResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?beginTime=${weekAgo}&api_key=${APIKey}`);
    matchHistoryData       = await matchHistoryResult.json();
  }
  
  //  console.log(matchHistoryData)
  if (matchHistoryData.totalGames > 10) {
    numberOfGames = 10; 
  } else {
    numberOfGames = matchHistoryData.totalGames;
  }
  let matchDataArr = [];
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

  document.getElementById("summonerName").innerHTML = `${summonerData.name}`;

  document.getElementById("rankBlock").innerHTML = ` <p>Rank: ${rankedData[rankedIndex].tier} ${rankedData[rankedIndex].rank} ${rankedData[rankedIndex].leaguePoints} LP</p>`
  document.getElementById("lvlBlock").innerHTML = ` <p>Level: ${summonerData.summonerLevel} </p>`
  document.getElementById("winrateBlock").innerHTML = ` <p>Winrate: ${(rankedData[rankedIndex].wins / (rankedData[rankedIndex].losses + rankedData[rankedIndex].wins)) * 100}%</p>`
})
.catch(ErrorCode => {
console.log(`Øv fejlkode (${ErrorCode})`);
document.getElementById("summonerName").innerHTML = `Error : (${ErrorCode})`;
});


function inputFilterData(){
  let searchFilter = {
    queueSearch: document.querySelector('input[name="queue"]:checked').id,
    champSearch: document.getElementById('champName').value,
    summonerNameSearch: document.getElementById('summonerNameInput').value,
  }

  let queueKey = queueSearch(searchFilter.queueSearch);
  console.log(queueKey);

  getSummonerInfo(`${searchFilter.champSearch}`, queueKey, `${searchFilter.champSearch}`)
  console.log(searchFilter);
}

function queueSearch(textQueue){
  switch (textQueue) {
    case "soloQ":
      return 420;
      break;

    case "flexQ":
      return 440;
      break;

    case all:
      return "";
      break;

    default:
      return "";
      break;
  }
}

