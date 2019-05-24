// How this program works
// 1. Generate a grid of desired size
// 2. Generate 2D array to represent the backend

// Global Variables
let playerTurnCount = 1;
let currentNoughtCross = 'X';
let player1WinCount = 0;
let player2WinCount = 0;
let squaresUsed = 0;

// #1. Generate a grid of determinded size

//Prompts the user
const queryGridQuantity = function() {
  return parseInt( prompt("What size grid do you want to play? E.g. 3 = 3x3") );
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
  console.log(`From inside WhosTurn currentNoughtCross: ${currentNoughtCross}`);
}; // end of Whos turn function

// Populate cell function
const populateCell = function(x, y, functionElement) {
    tttArray[x][y] = currentNoughtCross;
    currentMark = tttArray[x][y];
    functionElement.html(tttArray[x][y])
} // End of Populate cell


let posibleArrays = [];
// Gets array of every posible combination
const everyPosibleArray = function(targetRow, targetCol, cross) {

  let currentNoughtCross = cross;

  console.log(`currentNoughtCross is: ${currentNoughtCross}`);
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
  console.log(`The winning combo is: ${winningCombo}`);
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
  // Reset the grid
  tttArray = new Array(desiredGridSize);
  for (i=0; i < desiredGridSize; i++) {
    tttArray[i] = new Array(desiredGridSize);
  }
  posibleArrays = [];
  squaresUsed = 0;
};// end of game reset

const displayScore = function( currentMark ) {
  if(currentNoughtCross === 'X') {
    player1WinCount++
    $('#player1Score').text(player1WinCount);
  } else {
    player2WinCount++
    $('#player2Score').text(player2WinCount);
    whosTurn()
  };
    whosTurn();
};

const isDraw = function( squaresUsed ) {
  if (squaresUsed === (desiredGridSize * desiredGridSize)) {
    whosTurn()
    return true
  }
}; // End of isDraw()

const dumbAI = function() {
  // get free spaces
  let currentCoordinates = [];
  if (squaresUsed !== 0) {
    let freeSpacesInGrid = [];
    for (i=0; i<tttArray.length; i++) {
      for (y=0; y<tttArray.length; y++) {
        if (tttArray[i][y] === undefined) {
          freeSpacesInGrid.push(`[${i}, ${y}]`);
        }
      }
    }
    // get a random number to choose from the grid
    const randomNumberForGrid = Math.floor(Math.random()*freeSpacesInGrid.length);

    // given a random number - update this with whoever's turn it is
    const randomSquare = freeSpacesInGrid[randomNumberForGrid];
    tttArray[randomSquare[1]][randomSquare[4]] = currentNoughtCross;
    currentMark = currentNoughtCross;
    $(`.grid-item[row="${randomSquare[1]}"][col="${randomSquare[4]}"]`).html(currentNoughtCross)
    currentCoordinates.push(randomSquare[1]);
    currentCoordinates.push(randomSquare[4]);
    squaresUsed++
    //return freeSpacesInGrid
  }
  whosTurn();
  console.log(`currentCoordinates ${currentCoordinates}`);
  return currentCoordinates
}; // End of dumbAI()

// Work out which cell we clicked on in reference to the 2D array
$(".grid-item").on('click', function() {
  //debugger;
  const targetID = $(this).attr('id');
  let targetRow = parseInt($(this).attr('row'));
  let targetCol = parseInt($(this).attr('col'));
  let currentMark = null;

  // If the cell is empty run game functions if clicked on
  if (tttArray[targetRow][targetCol] === undefined) {
    populateCell(targetRow, targetCol, $(this))
    const allPositionsFromClick = everyPosibleArray(targetRow, targetCol, 'X')
    squaresUsed++
    posibleArrays = [];
    //checkIfWinner(allPositionsFromClick)
    if (checkIfWinner(allPositionsFromClick)) {
      //debugger;
      alert(`${currentNoughtCross} wins this round!`)
      gameReset();
      displayScore(currentMark)
      whosTurn(); //~~~~~~~~~~ Needs to be turned on for single player ~~~~~~~~~~~~~
    };
    if(isDraw(squaresUsed)) {
      gameReset();
      alert("It's a draw")
      whosTurn();
    }
    whosTurn();
  };

  // ~~~~~~~ A.I ~~~~~~~~~~~

  if(isDraw(squaresUsed)) {
    gameReset();
    alert("It's a draw")
  } else {
    //debugger;
    const dumbAIRun = dumbAI();

    const aiX = parseInt(dumbAIRun[0])
    const aiY = parseInt(dumbAIRun[1])
    //currentNoughtCross = 'O';
    const allAIPositions = everyPosibleArray(aiX, aiY, 'O');
    console.log(`allAIPositions ${allAIPositions}`);

    const checkifAIHasWon = function( array ) {

      for (i=0; i<array.length; i++) {

        if (array[i] === 'OOO') {
          return true;
          // posibleArrays = [];
          // gameReset();
          // displayScore(currentMark)
        }
      }

    }

    if(checkifAIHasWon(allAIPositions)) {
      player2WinCount++
      $('#player2Score').html(player2WinCount);
      alert('O wins this round!')
      gameReset();
    }

  }
});// End of clicked on
