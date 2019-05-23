// How this program works
// 1. Generate a grid of desired size
// 2. Generate 2D array to represent the backend

// Global Variables

let playerTurnCount = 1;
let currentNoughtCross = 'X';

// #1. Generate a grid of determinded size

//Prompts the user
const queryGridQuantity = function() {
  return parseInt( prompt("What size grid do you want to play?") );
}; // End of queryGridQuantity

let desiredGridSize = queryGridQuantity();

// Creates a grid based on the number input earlier
const createGrid = function( gridSize ) {
  let gridCounter = 1;
  let currentRow = 0;
  for(i = 0; i < gridSize; i++) {
    for(y = 0; y < gridSize; y++) {
      $('.grid-container').append(`<div class="grid-item" id="grid${gridCounter}" row="${currentRow}" col="${y}" ></div>`);
      gridCounter++
    }
    currentRow++
  }
  const columnSize = parseInt(gridSize);
  $('.grid-container').css("grid-template-columns", `repeat(${columnSize}, auto)`);
}; // End of createGrid

// Creates the grid you entered
createGrid(desiredGridSize)

// #2. 2D Array of Tic-Tac-Toe values to map to position on grid
  let tttArray = new Array(desiredGridSize);
  for (i=0; i < desiredGridSize; i++){
    tttArray[i] = new Array(desiredGridSize);
  }

// Work out who's turn it is
const whosTurn = function() {
  if (playerTurnCount % 2 == 0) {
    playerTurnCount++;
    currentNoughtCross = "X";
  } else {
    playerTurnCount++;
    currentNoughtCross =  "O";
  }
}; // end of Whos turn function

// Populate cell function
const populateCell = function(x, y, functionElement) {
    tttArray[x][y] = currentNoughtCross;
    const currentMark = tttArray[x][y];
    functionElement.html(tttArray[x][y])
} // End of Populate cell


let posibleArrays = [];
// Gets array of every posible combination
const everyPosibleArray = function(targetRow, targetCol) {
  //right
  const rightArray = [currentNoughtCross]
  for (i = targetCol; i < tttArray.length-1; i++) {
    rightArray.push(tttArray[targetRow][i+1])
  }
  posibleArrays.push(rightArray.join(''));

  //left
  const leftArray = [currentNoughtCross]
  for (i = targetCol; i > 0; i--) {
    leftArray.push(tttArray[targetRow][i-1])
  }
  posibleArrays.push(leftArray.join(''));

  //Top
  const topArray = [currentNoughtCross]
  for (i = targetRow; i > 0; i--) {
    topArray.push(tttArray[i-1][targetCol])
  }
  posibleArrays.push(topArray.join(''));

  //Bottom
  const bottomArray = [currentNoughtCross]
  for (i = targetRow; i < tttArray.length-1; i++) {
    bottomArray.push(tttArray[i+1][targetCol])
  }
  posibleArrays.push(bottomArray.join(''));

  //MiddleHorizontal
  const middleHorizontal = [currentNoughtCross]
  for (i = targetCol; i < tttArray.length-1; i++) {
    middleHorizontal.push(tttArray[targetRow][i+1])
  }
  for (i = targetCol; i > 0; i--) {
    middleHorizontal.push(tttArray[targetRow][i-1])
  }
  posibleArrays.push(middleHorizontal.join(''));

  //MiddleVertical
  const middleVertical = [currentNoughtCross];
  for (i = targetRow; i > 0; i--) {
    middleVertical.push(tttArray[i-1][targetCol])
  }
  for (i = targetRow; i < tttArray.length-1; i++) {
    middleVertical.push(tttArray[i+1][targetCol])
  }
  posibleArrays.push(middleVertical.join(''));

  // #### Diagonal Checks

  const isValidIndex = function( x, y ) {
    if( x >= 0 && y >= 0 && x <= tttArray.length-1 && y <= tttArray.length-1) {
      return true;
      }
    }; //End of isValidIndex

  //twoRightUp;
  // searches right and up by two positions
  const twoRightUp = [currentNoughtCross]
  let rowCounterRU = targetRow;
  for (i = targetCol; i < tttArray.length-1; i++) {
    if(isValidIndex(rowCounterRU-1, i+1)) {
    twoRightUp.push(tttArray[rowCounterRU-1][i+1])
    rowCounterRU--
  }
  }
  posibleArrays.push(twoRightUp.join(''));

  // twoLeftDown;
  // Searches Left and Down
  const twoLeftDown = [currentNoughtCross]
  let rowCounterLD = targetRow;
  for (i = targetCol; i > 0; i--) {
    if(isValidIndex(rowCounterLD+1, i-1)) {
    twoLeftDown.push(tttArray[rowCounterLD+1][i-1])
    rowCounterLD++
  }
  }
  posibleArrays.push(twoLeftDown.join(''));

  //oneWayLeftUp
  // Searches left and up
  const oneWayLeftUp = [currentNoughtCross]
  let rowCounterLU = targetRow;
  for (i = targetCol; i > 0; i--) {
    if(isValidIndex(rowCounterLU-1, i-1)) {
    oneWayLeftUp.push(tttArray[rowCounterLU-1][i-1])
    rowCounterLU--
  }
  }
  posibleArrays.push(oneWayLeftUp.join(''));

  //oneWayRightDown
  // Searches down and right
  const oneWayRightDown = [currentNoughtCross]
  let rowCounterRD = targetRow;
  for (i = targetCol; i < tttArray.length-1; i++) {
    if(isValidIndex(rowCounterRD+1, i+1)) {
    oneWayRightDown.push(tttArray[rowCounterRD+1][i+1])
    rowCounterRD++
  }
  }
  posibleArrays.push(oneWayRightDown.join(''));

  //bothWaysTopRight
  // Searchs boths sides of position starting top right
  const bothWaysTopRight = [currentNoughtCross];
  for (i = 1; i < tttArray.length-1; i++ ) {
    //debugger;
    let upRightRowTR = targetRow;
    let downLeftRowTR = targetRow
    let upRightColumnTR = targetCol;
    let downLeftColumnTR = targetCol;
    if(isValidIndex(upRightRowTR-1, upRightColumnTR+1) && isValidIndex(downLeftRowTR+1, downLeftColumnTR-1)) {
      bothWaysTopRight.push(tttArray[upRightRowTR-1][upRightColumnTR+1])
      bothWaysTopRight.push(tttArray[downLeftRowTR+1][downLeftColumnTR-1])
      upRightRowTR--
      downLeftRowTR++
      upRightColumnTR++
      downLeftColumnTR--
    }
  }// End of for loop
  posibleArrays.push(bothWaysTopRight.join(''));

  //bothWaysTopLeft
  // Searches boths sides of position starting top left
  const bothWaysTopLeft = [currentNoughtCross];
  for (i = 1; i < tttArray.length-1; i++ ) {
    //debugger;
    let upRightRowTL = targetRow;
    let downLeftRowTL = targetRow
    let upRightColumnTL = targetCol;
    let downLeftColumnTL = targetCol;
    if(isValidIndex(upRightRowTL-1, upRightColumnTL-1) && isValidIndex(downLeftRowTL+1, downLeftColumnTL+1)) {
      bothWaysTopLeft.push(tttArray[upRightRowTL-1][upRightColumnTL-1])
      bothWaysTopLeft.push(tttArray[downLeftRowTL+1][downLeftColumnTL+1])
      upRightRowTL--
      downLeftRowTL++
      upRightColumnTL--
      downLeftColumnTL++
    }
  }// End of for loop
  posibleArrays.push(bothWaysTopLeft.join(''));
  //###### Logging possible arrays
  console.log(`posibleArrays ${posibleArrays}`);
  return posibleArrays
};// End of everyPosibleArray();

// Check if there's a winner and spit out which one
const checkIfWinner = function( everyPosibleCombination ) {
  arrayToCheck = everyPosibleCombination;
  const winningCombo = currentNoughtCross.repeat(desiredGridSize);
  for (i = 0; i<arrayToCheck.length; i++) {
    if (arrayToCheck[i] === winningCombo) {
      return true;
      //alert('You won!') // little bug
    }
  }
};

const gameReset = function() {
  // wipe UI
  $('.grid-container').children('div').each(function () {
    $(this).text(""); // "this" is the current element in the loop
  });


};// end of game reset


// Work out which cell we clicked on in reference to the 2D array
$(".grid-item").on('click', function() {
  //debugger;
  const targetID = $(this).attr('id');
  let targetRow = parseInt($(this).attr('row'));
  let targetCol = parseInt($(this).attr('col'));
  let currentMark = null;

  // If the cell is empty run game functions
  if (tttArray[targetRow][targetCol] === undefined) {
    populateCell(targetRow, targetCol, $(this))
    const allPositionsFromClick = everyPosibleArray(targetRow, targetCol)
    //checkIfWinner(allPositionsFromClick)
    if (checkIfWinner(allPositionsFromClick)) {
      //debugger;
      alert('you won!')

      gameReset();

      //let  tttArray = [...Array(desiredGridSize)].map(e => Array(desiredGridSize).fill());

      tttArray = new Array(desiredGridSize);
      for (i=0; i < desiredGridSize; i++) {
        tttArray[i] = new Array(desiredGridSize);
      }

      posibleArrays = [];

    };
    whosTurn();
    // ## Still to do
    // Fucntin for draw
    // reset function
    // add to score if won
  };

});// End of clicked on
