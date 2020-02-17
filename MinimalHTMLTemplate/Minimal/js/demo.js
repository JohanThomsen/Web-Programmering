'use strict'

/*async function getSumonnerInfo(SummonerName){
    const result = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data   = await result.json();
    console.log(data);
}

getSumonnerInfo('FroggenCosplayer');
console.log("JS er klar!");*/




async function getSummonerInfo(SummonerName){
  const SummmonerResult = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerName}?api_key=RGAPI-e46ad9d5-d060-4960-a9f2-8ede969513d9`);
  const SummonerData    = await SummmonerResult.json();
  const rankedResult    = await fetch(`https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/8gYVa5UY42YCmqjIfl8bV_WcUSkwug_oLEu4m9faBFQ-DGE?api_key=RGAPI-e46ad9d5-d060-4960-a9f2-8ede969513d9`);
  const rankedData      = await rankedResult.json();
  console.log(rankedData);
  console.log(SummonerData);
  console.log(`Summoner ${SummonerData.name} is level ${SummonerData.summonerLevel}. This account is also ${rankedData[1].tier} ${rankedData[1].rank}.
  This account has ${rankedData[1].leaguePoints} LP, with a winrate of ${(rankedData[1].losses / rankedData[1].wins) * 100}%.`);
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