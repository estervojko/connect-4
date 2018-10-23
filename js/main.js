console.log("connected");



//Initialized the board with null values
function buildBoard(){
  let board = [];
  for(let i=0; i<6; i+=1){
    let row = [];
    for(let j=0; j<7; j+=1){
    row[j] = null;
    }
    board[i] = row;
  }
  return board;
}

//initialize the board
const board = buildBoard();

//initialize the turn
let turn = 'blue';

//Switches turns between Players
function switchTurns(color){
  if(color === 'blue'){
    turn = 'red';
  }
  else if(color === 'red'){
    turn = 'blue';
  }
}

//makes a move. Takes a parameter that means which columns he's gonna put the disc
function makeMove(column){
 if(turn === 'blue'){
   switch(column){
     case 0 : placeDisk(0, 'blue');
              switchTurns('blue');
              break;
     case 1 : placeDisk(1, 'blue');
              switchTurns('blue');
              break;
     case 2 : placeDisk(2, 'blue');
              switchTurns('blue');
              break;
     case 3 : placeDisk(3, 'blue');
              switchTurns('blue');
              break;
     case 4 : placeDisk(4, 'blue');
              switchTurns('blue');
              break;
     case 5 : placeDisk(5, 'blue');
              switchTurns('blue');
              break;
     case 6 : placeDisk(6, 'blue');
              switchTurns('blue');
              break;
   }
 }
 else if(turn === "red"){
   switch(column){
     case 0 : placeDisk(0, 'red');
              switchTurns('red');
              break;
     case 1 : placeDisk(1, 'red');
              switchTurns('red');
              break;
     case 2 : placeDisk(2, 'red');
              switchTurns('red');
              break;
     case 3 : placeDisk(3, 'red');
              switchTurns('red');
              break;
     case 4 : placeDisk(4, 'red');
              switchTurns('red');
              break;
     case 5 : placeDisk(5, 'red');
              switchTurns('red');
              break;
     case 6 : placeDisk(6, 'red');
              switchTurns('red');
              break;
   }
 }
}

//puts the value disk in the array
function placeDisk(column, turn){
  let row = board.length-1;
  if( board[row][column] === null){
    board[row][column] = turn;
    checkWinner(row,column);
  }
  else{
    for(let i=0; i<board.length; i+=1){
      if(board[i][column] !== null){
        board[i-1][column] = turn;
        checkWinner(i-1, column);
        return;
      }
    }
  }
}

//checks if 4 of the same in a row
function checkWinner(row, column){
  let checkHorizontally = checkHorizontally(row, column);
  // let checkVertically = checkVertically(row, column);
  if( checkHorizontally[0] === true){
    return checkHorizontally;
  }
  // else if( checkVertically[0] === true){
  //   return checkVertically;
  // }

}

//checks if coordinates surrounding (row, column) are inside the board
// function isInBoard(row, column){
//   if( row-3 >= 0 && row+3 <=5 && column-3 >= 0 && column+3 <= 6){
//     return true;
//   }
//   else{
//     return false;
//   }
// }

//checks horizontally left and right
//if it doesnt work implement cases when its null
function checkHorizontally(row, column){
  //check left
  if( column-3 >= 0 &&
    board[row][column] === board[row][column-1] &&
    board[row][column-1] === board[row][column-2] &&
    board[row][column-2] === board[row][column-3]) {
      return [true, "left"];
    }
  else if( column+3 <= 6 &&
    board[row][column] === board[row][column+1] &&
    board[row][column+1] === board[row][column+2] &&
    board[row][column+2] === board[row][column+3])
  {
    return [true, "right"];
  }
  else{
    return [false];
  }
}


//checks vertically
function checkVertically(row, column){
  //check up
  if( row-3 >= 0 &&
    board[row][column] === board[row-1][column] &&
    board[row-1][column] === board[row-2][column] &&
    board[row-2][column] === board[row-3][column]) {
      return [true, "up"];
    }
    //check down
  else if( row+3 <= 5 &&
    board[row][column] === board[row+1][column] &&
    board[row+1][column] === board[row+2][column] &&
    board[row+2][column] === board[row+3][column])
  {
    return [true, "down"];
  }
  else{
    return [false];
  }
}

function checkFirstDiagonal(row, column){
  debugger;
  if(board[row][column] === null){
    return [false];
  }
  //check up
  else if( row-3 >= 0 && column+3 <= 6 &&
    board[row][column] === board[row-1][column+1] &&
    board[row-1][column+1] === board[row-2][column+2] &&
    board[row-2][column+2] === board[row-3][column+3]) {
      return [true, "up"];
    }
  else if( row+3 <= 5 && column-3 >= 0 &&
    board[row][column] === board[row+1][column-1] &&
    board[row+1][column-1] === board[row+2][column-2] &&
    board[row+2][column-2] === board[row+3][column-3])
  {
    return [true, "down"];
  }
  else{
    return [false];
  }
}
