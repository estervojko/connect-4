console.log("connected");

//-----------------------------------------------------------------------------
//View

const column = document.querySelectorAll(".column");
console.log(column);

for(let i=0; i<7; i+=1){
  column[i].addEventListener("click", () => {
    let colData = column[i].dataset.column;
    let cells = column[i].children;               //selects all children of clicked column
    console.log(turn);
    if(turn === "red"){
      if( column[i].lastElementChild.style.backgroundColor === ""){
        column[i].lastElementChild.style.backgroundColor = "red";
        makeMove(Number(colData));
        checkWinState();
      }
      else{
        for(let i=0; i<cells.length; i += 1){
          if( cells[i].style.backgroundColor === "red" || cells[i].style.backgroundColor === "blue"){
            cells[i-1].style.backgroundColor = "red";
            makeMove(Number(colData));
            checkWinState();
            return;
          }
        }
      }
    }
    else if(turn === "blue"){
      if( column[i].lastElementChild.style.backgroundColor === ""){
        column[i].lastElementChild.style.backgroundColor = "blue";
        makeMove(Number(colData));
        checkWinState();
      }
      else{
        for(let i=0; i<cells.length; i += 1){
          if( cells[i].style.backgroundColor === "red" || cells[i].style.backgroundColor === "blue"){
            cells[i-1].style.backgroundColor = "blue";
            makeMove(Number(colData));
            checkWinState();
            return;
          }
        }
      }
    }
  });
}

//checks the winner array if someone won
function checkWinState(){
  if(winner[0] === true){
    displayWin(winner[2],winner[3]);
  }
}


//display
function displayWin(row, column){
  if(winner[1] === "h"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column -= 1;
      cellDiv.style.backgroundColor = "purple";
    }
  }
  else if(winner[1] === "v"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       row -= 1;
      cellDiv.style.backgroundColor = "purple";
    }
  }
  else if(winner[1] === "fd"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column -= 1;
       row += 1;
      cellDiv.style.backgroundColor = "purple";
    }
  }
  else if(winner[1] === "sd"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column += 1;
       row += 1;
      cellDiv.style.backgroundColor = "purple";
    }
  }
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

//store information about a winning state
let winner = [];

//Switches turns between Players
function switchTurns(color){
  if(color === 'blue'){
    turn = 'red';
  }
  else if(color === 'red'){
    turn = 'blue';
  }
}

//makes a move
  function makeMove(column){
   if(turn === 'blue'){
     placeDisk(column, 'blue');
     switchTurns('blue');
   }
   else if(turn === "red"){
    placeDisk(column, 'red');
    switchTurns('red');
    }
  }

//puts the value disk in the array
function placeDisk(column, turn){
  let row = board.length-1;
  if( board[row][column] === null){
    board[row][column] = turn;
    checkWinner(row,column);
    return;
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
    winner = checkH;
    return;
  }
  else if( checkV[0] === true){
    console.log(checkV);
    winner = checkV;
    return;
  }
  else if( checkFirstD[0] === true){
    console.log(checkFirstD);
    winner = checkFirstD;
    return;
  }
  else if( checkSecondD[0] === true){
    console.log(checkSecondD);
    winner = checkSecondD;
    return;
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
          return [true, "h", row, column];
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
          return [true, "v", row, column];
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
            return([true, "fd", row, column]);
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
        return [true, "sd", row, column];
      }
      row -= 1;
      column -= 1;
    }
    return [false];
  }else{
    return [false];
  }
}
