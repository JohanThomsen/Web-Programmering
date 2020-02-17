'use strict'

/*async function getSumonnerInfo(SummonerName){
    const result = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data   = await result.json();
    console.log(data);
}

getSumonnerInfo('FroggenCosplayer');
console.log("JS er klar!");*/




async function getSumonnerInfo(SummonerName){
  const result = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerName}?api_key=RGAPI-e46ad9d5-d060-4960-a9f2-8ede969513d9`);
  const data   = await result.json();
  console.log(data);
}

getSumonnerInfo('FroggenCosplayer');