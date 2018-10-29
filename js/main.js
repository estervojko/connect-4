//-----------------------------------------------------------------------------
//View

//checks the players names and greets them
//Global state player names
let player1Name = "Blue";
let player2Name = "Red";

let player1Input = document.querySelector('#player1value')
player1Input.addEventListener("keydown", (e) => {
  player1Name = document.querySelector('#player1value').value;
  if(e.keyCode === 13 && player1Name !== "") {
    let inputDiv = document.querySelector(".input-name");
    inputDiv.style.display = "none";
    let greetDiv = document.querySelector(".greet");
    let greetDivP = document.createElement("p")
    greetDivP.setAttribute("id", "greet-person");
    greetDivP.innerText = `Hello, ${player1Name}!`;
    greetDiv.appendChild(greetDivP);
  }
});

let player2Input = document.querySelector("#player2value");
player2Input.addEventListener("keydown", (e) => {
  player2Name = document.querySelector("#player2value").value;
  if(e.keyCode === 13 && player2Name !== ""){
    let inputDiv = document.querySelector(".input-name2");
    inputDiv.style.display = "none";
    let greetDiv = document.querySelector(".greet2");
    let greetDivP = document.createElement("p");
    greetDivP.innerText = `Hello, ${player2Name}!`;
    greetDivP.setAttribute("id", "greet-person2");
    greetDiv.appendChild(greetDivP)
  }
})

const column = document.querySelectorAll(".column");

for(let i=0; i<7; i+=1){
  column[i].addEventListener("click", function handler(){
    let colData = column[i].dataset.column;
    let cells = column[i].children;               //selects all children of clicked column
    //Remove event listener if game is finished
    if(winner[0] === true){
      for(let i=0; i<7; i+=1){
        column[i].removeEventListener("click", handler);
        return;
      }
    }
    if(turn === "red"){
      if( column[i].lastElementChild.style.backgroundColor === ""){
        column[i].lastElementChild.style.backgroundColor = "#EA9674";
        makeMove(Number(colData));
        checkWinState();
        }
      else{
        for(let i=0; i<cells.length; i += 1){
          if( cells[i].style.backgroundColor !== ""){
            cells[i-1].style.backgroundColor = "#EA9674";
            makeMove(Number(colData));
            checkWinState();
            return;
          }
        }
      }
    }
    else if(turn === "blue"){
      if( column[i].lastElementChild.style.backgroundColor === ""){
        column[i].lastElementChild.style.backgroundColor = "#526C86";
        makeMove(Number(colData));
        checkWinState();
        }
      else{
        for(let i=0; i<cells.length; i += 1){
          if( cells[i].style.backgroundColor !== ""){
            cells[i-1].style.backgroundColor = "#526C86"
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
    displayWinMessage();
  }
}

function displayWinMessage(){
  let winDiv = document.querySelector(".win-overlay");
  let winMsgDiv = document.querySelector(".win-message");
  if(board[winner[2]][winner[3]] === "blue"){
    winMsgDiv.innerText = `${player1Name} WINS`;
  }
  else if(board[winner[2]][winner[3]] === "red"){
    winMsgDiv.innerText = `${player2Name} WINS`;
  }
  winDiv.appendChild(winMsgDiv);
  winDiv.style.display = "block";
  player1Name = "Blue";
  player2Name = "Red";
}

//display
function displayWin(row, column){
  if(winner[1] === "h"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column -= 1;
      cellDiv.classList.add("animated");
    }
  }
  else if(winner[1] === "v"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       row -= 1;
      cellDiv.classList.add("animated");
    }
  }
  else if(winner[1] === "fd"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column -= 1;
       row += 1;
      cellDiv.classList.add("animated");
    }
  }
  else if(winner[1] === "sd"){
    for(let i=0; i<4; i+=1){
      let colDiv = document.querySelector(".container").children[column];
      let cellDiv = colDiv.children[row];
       column += 1;
       row += 1;
      cellDiv.classList.add("animated");
    }
  }
}

//Gets the reset button and resets the resetGame
let resetDiv = document.querySelector('.reset button');
resetDiv.addEventListener("click", () => {
  resetGame();
});

//resets the game to initial state
function resetGame(){
  board = buildBoard();
  turn = 'blue';
  winner = [];
  resetView();
}

//resets the view to initial state
function resetView(){
  let cells = document.querySelectorAll(".cell");
  console.log(cells.children);
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
    cell.classList.remove("animated");
  });

  //resets the view screen
  let winDiv = document.querySelector(".win-overlay");
  winDiv.style.display = "none";

  //resets the player name entry for both player 1 and 2
  let greetDiv = document.getElementById("greet-person");
  if(greetDiv !== null) {
    greetDiv.parentNode.removeChild(greetDiv);
  }
  let greetDiv2 = document.getElementById("greet-person2");
  if(greetDiv2 !== null){
    greetDiv2.parentNode.removeChild(greetDiv2);
  }

  //reset display of the input box for player 1 and 2
  let inputNameParentDiv = document.querySelector(".input-name");
  let inputDiv = document.querySelector("#player1value");
  inputDiv.value = "";
  inputNameParentDiv.style.display = "block";

  let inputNameParentDiv2 = document.querySelector(".input-name2");
  let inputDiv2 = document.querySelector("#player2value");
  inputDiv2.value = "";
  inputNameParentDiv2.style.display = "block";
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
let board = buildBoard();

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
    winner = checkH;
    return;
  }
  else if( checkV[0] === true){
    winner = checkV;
    return;
  }
  else if( checkFirstD[0] === true){
    winner = checkFirstD;
    return;
  }
  else if( checkSecondD[0] === true){
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
