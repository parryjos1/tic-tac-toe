
// Global Variables
const grid = [];
let playerTurnCount = 1;
const player1 = 'X';
const player2 = 'O';
let currentDetermineWinner = null;

// 2D Array of Tic-Tac-Toe values
let tttArray=new Array(3);
for (i=0; i <3; i++)
tttArray[i]=new Array(3)

// ### EVENTS when clicked on //
//Finds out what Grid was clicked on
$(".grid-item").on('click', function() {
  const targetID = $(this).attr('id');
  let targetRow = parseInt($(this).attr('row'));
  let targetCol = parseInt($(this).attr('col'));

  // Logic to determine which player's turn it is and set appropriate varaibles
  // Sets the value of the current cell depending on player turn
  let currentMark = null;
  if(whosTurn() === 'player1') {
    tttArray[targetRow][targetCol] = 'X';
    // Check to see there is free position
    if($(this).html() === '') {
      $(this).html(tttArray[targetRow][targetCol]);
    } else {
      // runs again to keep player's turn
      whosTurn()
    }
    currentMark = 'X'
    currentDetermineWinner = 'XXX';
  } else {
    tttArray[targetRow][targetCol] = 'O';
    if($(this).html() === '') {
      $(this).html(tttArray[targetRow][targetCol]);
    } else {
      whosTurn()
    }
    currentMark = 'O'
    currentDetermineWinner = 'OOO';
  };

  // Gets all posible positions from clicked on squares
  // and returns an array of posible combinations
  const arraysInRange = function() {
    let posibleArrays = [];

    //right
    const rightArray = [currentMark]
    for (i = targetCol; i < tttArray.length-1; i++) {
      rightArray.push(tttArray[targetRow][i+1])
    }
    posibleArrays.push(rightArray.join(''));

    //left
    const leftArray = [currentMark]
    for (i = targetCol; i > 0; i--) {
      leftArray.push(tttArray[targetRow][i-1])
    }
    posibleArrays.push(leftArray.join(''));

    //Top
    const topArray = [currentMark]
    for (i = targetRow; i > 0; i--) {
      topArray.push(tttArray[i-1][targetCol])
    }
    posibleArrays.push(topArray.join(''));

    // Bottom
    const bottomArray = [currentMark]
    for (i = targetRow; i < tttArray.length-1; i++) {
      bottomArray.push(tttArray[i+1][targetCol])
    }
    posibleArrays.push(bottomArray.join(''));

    //middleLeftRight
    const middleLeftRight = [currentMark]
    //pushes right
    middleLeftRight.push(tttArray[targetRow][targetCol+1])
    //pushes left
    middleLeftRight.push(tttArray[targetRow][targetCol-1])
    posibleArrays.push(middleLeftRight.join(''));

    //middleUpDown
    const middleUpDown = [currentMark];
      if (targetRow === 1) {
        middleUpDown.push(tttArray[targetRow-1][targetCol])
        middleUpDown.push(tttArray[targetRow+1][targetCol])
        posibleArrays.push(middleUpDown.join(''));
      };

    // #####DIAGONAL -- involves 6 checks

    //Function to check if a suggested index is valid
    const isValidIndex = function( x, y ) {
      if( x >= 0 && y >= 0 && x <= tttArray.length-1 && y <= tttArray.length-1) {
      return true;
      console.log('its true');
    }
    }; //End of isValidIndex

    //twoRightUp;
    // searches right and up by two positions
    const twoRightUp = [currentMark]
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
    const twoLeftDown = [currentMark]
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
    const oneWayLeftUp = [currentMark]
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
    const oneWayRightDown = [currentMark]
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
    const bothWaysTopRight = [currentMark];
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
    const bothWaysTopLeft = [currentMark];
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

    // DONT DELETE: Logs all posible positions relative to clicked square
    console.log(`posible Arrays finals: ${posibleArrays}`);
    return posibleArrays
  } // end of array's in range function

  const checkIfWinner = function( array ) {
    arrayToCheck = array;
    console.log(arrayToCheck);
    for (i = 0; i<arrayToCheck.length; i++) {
      if (arrayToCheck[i] === currentDetermineWinner) {
        alert("You won!")
      }
    }
    if(squaresUsed) = 9)
  }; // End of Check if Winner()

  allPotentialSquares = arraysInRange()
  checkIfWinner(allPotentialSquares)

}) // End of clicked on


// Logic to figure out / keep track of which player's turn it is
const whosTurn = function() {
  if (playerTurnCount % 2 == 0) {
    playerTurnCount++;
    return "player2";
  } else {
    playerTurnCount++;
    return "player1";
  }
}; // end of Whos turn function
