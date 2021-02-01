/*----- constants -----*/
//There are 8 ways to win: 3 rows, 3 columns, 2 diagonals
//Array contains the indexes of all paths to victory

const victoryPaths = [
 [0, 1, 2],
 [3, 4, 5],
 [6, 7, 8],
 [0, 3, 6],
 [1, 2, 7],
 [2, 5, 8],
 [0, 4, 8],
 [2, 4, 6]
];


/*----- the app's state (variables) -----*/

//initialize the board
let gameBoard;

//Whose turn is it? A turn means that an event (click) has occurred
//Listen for this event in the "event listeners" section
let turn = 'X';

//initialize the concept of victory
let victory;

/*----- cached element references -----*/

//Array.from() makes an array from all the elements returned by querySelectorAll(). 
//QuerySelectorAll() finds the element with the "Board" id and selects the divs in that element (i.e. the boxes).
const boxes = Array.from(document.querySelectorAll('#board div'));
//we'll pass the boxes to the change() function

//change the h2 element so the right player knows when it's their turn. 
//We'll handle this in the change function, because we change this message when we make a change on the board
const playerTurn = document.querySelector('h2');



/*----- event listeners -----*/
//Here we listen for the click on our game board
//We need to get the HTML element and then chain the event listener on it
//we give two arguments to addEvent Listener, the event to listen for and a callback
//We'll have that turnHandler callback funtion under the "Functions" section

document.getElementById('board').addEventListener('click', turnHandler);


//listener for the reset button
document.getElementById('reset-button').addEventListener('click', startGame);


/*----- functions -----*/

//function to check every turn if that player won
//this function is called in the turnHandler function, as we have to check if they won each turn


function didTheyWin() {

    //initialize victor as null
    let victor = null;
    //loop through the victoryPaths array and check if the player has a winning path of moves on the board
    //two arguments in forEach: element in the array and the index of the element
    //testing if all three moves match a path in the victoryPaths array
    victoryPaths.forEach(function(path, index) {
        //check if there is a mark in the first entry of the victory path
        //and checking if the mark in the first entry of the victory path matches the second
        //and checking if the first mark matches the third
        //if it's true, set victor to the mark in the first entry of the victory path
        if (gameBoard[path[0]] && gameBoard[path[0]] === gameBoard[path[1]] && gameBoard[path[0]] === gameBoard[path[2]]) victor = gameBoard[path[0]];
   });
        
    //check for a tie
    //It's a tie if our gameboard is full and there are no remaining opportunities to win
    // if victor is true, return the victor, if it's false, check if the gameboard includes empty spaces, if not return 'T'
    //if the gameboard still includes spaces, return null because there might not be a victor yet!
    //javascript includes method checks if it includes the entry

   return victor ? victor : gameBoard.includes('') ? null : 'T';

};


//function to handle the turns
//event passed to function is the click, our target is the element where the event took place (the box clicked on)
//findIndex() function finds the index of the box in our array of boxes that matches the box clicked by the user

function turnHandler(event) {
    let boxIndex = boxes.findIndex(function(box) {
        return box === event.target;
    });

//change the board if the box selected is empty, else throw an alert box
if (gameBoard[boxIndex] === ""){
gameBoard[boxIndex] = turn;
//Game logic: If it's X's turn, then assigne the turn to O. If it's not X's turn, assign the turn to X.
//<condition> ? <if condition is true, this> : <else if condition is false, this>
turn = turn === 'X' ? 'O' : 'X';

} else {
    alert("Hey! Someone is already there!");
}

//call didTheyWin and assign the output of didTheyWin to the victory variable
victory = didTheyWin();


//call the change function
change();
};

//start game, make board a series of 3x3 empty arrays
function startGame() {
    gameBoard = [
        '', '', '', 
        '', '', '',
        '', '', ''
    ];

    //call change function
   change();
};
   
   //functionality for a "change", i.e. a move
   function change() {
   //change function iterates over the arrays that make up the gameboard then changes the div to contain the move (X/O)
   //ForEach function accepts a callback function, calling on each element in the array
   gameBoard.forEach(function(move, index) {
   //Set the text inside the box to be the move made on the gameBoard
   //HTML DOM textContent property gets the text content of an element
   boxes[index].textContent = move;

   });

//set the header in the cached elements reference section to the correct player's turn
//set the text content of the element defined in playerTurn to the message
//ternary to update if someone wins
//ternary to update if it's a tie

playerTurn.textContent = victory === 'T' ? `It's a tie, too bad` : victory?  `${victory} wins the game!` : `It's ${turn}'s turn!`
 
   };


   
   //call start game function
   startGame();







