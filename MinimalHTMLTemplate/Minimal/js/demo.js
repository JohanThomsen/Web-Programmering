'use strict'

/*async function getSumonnerInfo(SummonerName){
    const result = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data   = await result.json();
    console.log(data);
}

getSumonnerInfo('FroggenCosplayer');
console.log("JS er klar!");*/




async function getSummonerInfo(SummonerName){
  let index = -1;
  let SummmonerResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerName}?api_key=RGAPI-e46ad9d5-d060-4960-a9f2-8ede969513d9`);
  let SummonerData    = await SummmonerResult.json();
  let rankedResult    = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${SummonerData.id}?api_key=RGAPI-e46ad9d5-d060-4960-a9f2-8ede969513d9`);
  let rankedData      = await rankedResult.json();
  console.log(rankedData);
  console.log(SummonerData);

  if(rankedData[0].queueType === "RANKED_SOLO_5x5"){
    index = 0;
  } else if (rankedData[1].queueType === "RANKED_SOLO_5x5"){
    index = 1;
  }

  console.log(`Summoner ${SummonerData.name} is level ${SummonerData.summonerLevel}. This account is also ${rankedData[index].tier} ${rankedData[index].rank}, in Solo q.
  This account has ${rankedData[index].leaguePoints} LP, with a winrate of ${(rankedData[index].losses / rankedData[index].wins) * 100}%.`);
  return SummonerData;
}

getSummonerInfo('FroggenCosplayer');

/*getSumonnerInfo('FroggenCosplayer').then(SummonerData => {
  console.log(`Summoner ${SummonerData.name} is level ${SummonerData.summonerLevel}`);
});*/



/*async function get WeatherInfo(WOEID){
  const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${WOEID}/`);
  const data   = await result.json();
  console.log(data);
  console.log("Hej");
}*/