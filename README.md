
Connect 4

Basic description.

The game is played by 2 players, where each player picks a color and they get discs of that color. They insert these discs, one per turn in a grid. The grid has 6 rows and 7 columns. It stands vertically and the players insert the discs from above where the fall to the lowest available space. Players continue to play until one of them wins or the board is full. A player wins when they connect 4 of their pieces either vertically, horizontally, or diagonally.


Functional Specifications

-Initially the users see the board on the screen that displays the turn and player's name.
-The game starts when you PRESS start on the screen.
-The player clicks on a column in the grid and depending on which player it is, a red or blue circle appears
on the board in the first empty circle
-A player wins if they connect 4 of their pieces(red or blue) either horizontally, vertically or  diagonally.
-When a player wins a message is displayed on the board that says which player won.
-A button 'Reset' resets the game to the initial state.
-The game ends when a player wins, or the board is full. At that point a message displays who won(if any).

MVP

-As an Minimum Viable Product I plan on implementing what I put down in the functional specifications.

Post-MVP
-Implementing a drag and drop feature for the discs, and an animation when they fall down the grid.


-----------------------------------------------------------------------------------------------------------------------

As a data structure I plan on using an array of arrays for the grid, each sub-array being a row.

Some functions that will be implemented are:

-makeMove()
-switchTurns()
-checkForWin


-----------------------------------------------------------------------------------------------------------------------

Used for test cases:

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
