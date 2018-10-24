console.log("connected");

//-----------------------------------------------------------------------------
//View

const column = document.querySelectorAll(".column");
console.log(column);

for(let i=0; i<7; i+=1){
  column[i].addEventListener("click", () => {
    let colData = column[i].dataset.column;
    let cells = column[i].children;               //selects all children of clicked column
    column[i].lastElementChild.style.backgroundColor === "red";
    console.log(column[i].lastElementChild.style.backgroundColor);
    if(column[i].lastElementChild.style.backgroundColor == null){
      column[i].lastElementChild.style.backgroundColor === "red";
    }
    for(let i=0; i<cells.length; i += 1){
      if( cells[i].style.backgroundColor === "red" || cells[i].style.backgroundColor === "blue"){
        cells[i-1].style.backgroundColor = "blue";
      }
    }
    makeMove(Number(colData));
    });
}



//-----------------------------------------------------------------------------
//Logical part

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
  let checkH = checkHorizontally(row, column);
  let checkV = checkVertically(row, column);
  let checkFirstD = checkFirstDiagonal(row, column);
  let checkSecondD = checkSecondDiagonal(row, column);

  if( checkH[0] === true){
    console.log(checkH);
    return checkH;
  }
  else if( checkV[0] === true){
    console.log(checkV);
    return checkV;
  }
  else if( checkFirstD[0] === true){
    console.log(checkFirstD);
    return checkFirstD;
  }
  else if( checkSecondD[0] === true){
    console.log(checkSecondD);
    return checkSecondD;
  }
  else{
    return [false];
  }
}

//checks horizontally left and right
//if it doesnt work implement cases when its null
function checkHorizontally(row, column){
  if( board[row][column] !== null){
    for(let i=0; i<4; i+=1){
      if( column-3 >= 0 &&
        board[row][column] === board[row][column-1] &&
        board[row][column-1] === board[row][column-2] &&
        board[row][column-2] === board[row][column-3]) {
          return [true, column];
        }
      column += 1;
      console.log(row, column, column-1, column-2, column-3);
    }
    return [false];
  }else{
    return [false];
  }
}

//checks vertically
function checkVertically(row, column){
  if( board[row][column] !== null){
    for(let i=0; i<4; i+=1){
      if( row-3 >= 0 && row <=5 &&
        board[row][column] === board[row-1][column] &&
        board[row-1][column] === board[row-2][column] &&
        board[row-2][column] === board[row-3][column]) {
          return [true, column];
        }
      row += 1;
      console.log(row-3, row-2, row-1,row, column);
    }
    return [false];
  }else{
    return [false];
  }
}

//checks first diagonal
function checkFirstDiagonal(row, column){
  if(board[row][column] !== null){
    for(let i=0; i<4; i+=1){
      if( row+3 <= 5 && column-3 >= 0 && row >= 0 && column >= 0 &&
        board[row][column] === board[row+1][column-1] &&
        board[row+1][column-1] === board[row+2][column-2] &&
        board[row+2][column-2] === board[row+3][column-3]){
            return([true, row, column]);
    }
      row -= 1;
      column += 1;
    }
    return [false];
  }else{
    return[false];
  }
}

//checks second diagonal
function checkSecondDiagonal(row, column){
  if(board[row][column] !== null){
    for(let i=0; i<4; i+=1){
      if( row+3 <= 5 && column+3 <= 6 &&row >= 0 && column >= 0 &&
        board[row][column] === board[row+1][column+1] &&
        board[row+1][column+1] === board[row+2][column+2] &&
        board[row+2][column+2] === board[row+3][column+3])
      {
        return [true, row, column];
      }
      row -= 1;
      column -= 1;
    }
    return [false];
  }else{
    return [false];
  }
}
