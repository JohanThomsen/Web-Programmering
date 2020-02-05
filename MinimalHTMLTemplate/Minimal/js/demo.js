'use strict'
//SEE: https://javascript.info/strict-mode

console.log("JS er klar!");

let size = 8;
let chessArray = [];

  for(i = 0; i <= size * size; i++)
  {
    if(i % 2)
    {
      chessArray.push("");
    } else {
      chessArray.push("#");
    }
  }

console.log(chessArray);