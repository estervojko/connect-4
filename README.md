-----------------------------------------------------------------------------------------------------------------------
**Play the game here:**

http://great-robin.surge.sh/

## Connect 4

#### Basic description.

The game is played by 2 players, where each player picks a color and they get discs of that color. They insert these discs, one per turn in a grid. The grid has 6 rows and 7 columns. It stands vertically and the players insert the discs from above where the fall to the lowest available space. Players continue to play until one of them wins or the board is full. A player wins when they connect 4 of their pieces either vertically, horizontally, or diagonally.


#### Functional Specifications

-Initially the users see the board on the screen that also displays an option for players to put in their name.
-The player clicks on a column in the grid and depending on which player it is, a red or blue circle appears
on the board in the first empty circle
-A player wins if they connect 4 of their pieces(red or blue) either horizontally, vertically or  diagonally.
-When a player wins a message is displayed on the board that says which player won.
-A button 'Reset' resets the game to the initial state.
-The game ends when a player wins, or the board is full. At that point a message displays who won(if any).

#### MVP

-As an Minimum Viable Product I plan on implementing what I put down in the functional specifications.

#### Post-MVP
-Implementing a drag and drop feature for the discs, and an animation when they fall down the grid.

-----------------------------------------------------------------------------------------------------------------------

**Plan for the day - October 25 2018**

Where Im at:
- functionality fully implemented with UI

To do:
- enhance user interface so that when you click to make a move, the disk slides into the correct position
- enhance and organize the general layout and design of the game.



**Plan for the day - October 24 2018**

Where Im at:
- almost finished the logic of the game, and it works correctly with the tests I run.
- Functions such as makeMove, switchTurns and checkWinner, are fully implemented and work correctly.
- Started to do the layout

To do:

- I plan to get most of the viewing functionality going.
- By the end of today, bith players can click on the board and their respective disks will show up at the board at the
correct place.

-----------------------------------------------------------------------------------------------------------------------
#### Data Structures

As a data structure I plan on using an array of arrays for the grid, each sub-array being a row.

Some functions that will be implemented are:

-makeMove()
-switchTurns()
-checkForWin


-----------------------------------------------------------------------------------------------------------------------
#### Approach

Interesting problem during this project was figuring out how to check for the win. The program checks if a player won
every time a move is made. Initially I figured out I needed to break down the problem in smaller chunks, so I wrote down functions for checking vertically, horizontally, and both diagonals. Having a 2 dimensional array as data structure
for this problem, messing with indexes is fundamental. Below there's a code snipped of checking for one of the diagonals
and a picture explaining the positioning of the indexes, after we've placed a disk at (i,j), i being the row number, and j the column number.

![alt text](https://github.com/estervojko/connect-4/blob/master/images/checkDiagonal.jpg?raw=true)

```javascript
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
```


**Used for test cases:**

//checkHorizontally
board[5][3] = "red";
board[4][3] = "red";
board[3][3] = "red";
board[2][3] = "red";

//checkFirstDiagonal

board[5][1] = "blue";
board[4][2] = "blue";
board[3][3] = "blue";
board[2][4] = "blue";

Answers for the first Diagonal:
>checkFirstDiagonal(4,2)
(3) [true, 2, 4]
>checkFirstDiagonal(5,1)
(3) [true, 2, 4]
>checkFirstDiagonal(4,2)
(3) [true, 2, 4]
>checkFirstDiagonal(3,3)
(3) [true, 2, 4]
>checkFirstDiagonal(2,4)
(3) [true, 2, 4]

//checkSecondDiagonal

board[2][1] = "red"
board[3][2] = "red"
board[4][3] = "red"
board[5][4] = "red"
