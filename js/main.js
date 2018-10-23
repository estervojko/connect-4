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
  debugger;
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

function placeDisk(column, turn){
  let j = board.length-1;
  if( board[j][column] === null){
    board[j][column] = turn;
  }
  else{
    for(let i=0; i<board.length; i+=1){
      if(board[i][column] !== null){
        board[i-1][column] = turn;
        return;
      }
    }
  }
}
