
// Global Variables
const gridContents = $('.grid-item')
const grid = [];
let playerTurnCount = 1;
const player1 = 'X';
const player2 = 'O';

// Put the contents of each cell into an array
for (i = 0; i < gridContents.length; i++) {
  console.log($(gridContents[i]).html());
  grid.push($(gridContents[i]).html())
}

//Finds out what Grid was clicked on
$(".grid-item").on('click', function() {
  const targetID = $(this).attr('id');

  // log different stuff depending on player
  if(whosTurn() === 'player1') {
    $(this).text('X');
  } else {
    $(this).text('O');
  };
  console.log(targetID);
})

// Logic to determine if player has won

// get our current spot
// get all positions in range of win
// see what's in those positions and determine if it's a win 


// Logic to take turns
const whosTurn = function() {
  if (playerTurnCount % 2 == 0) {
    playerTurnCount++;
    return "player2";
  } else {
    playerTurnCount++;
    return "player1";
  }
}; // end of Whos turn function
