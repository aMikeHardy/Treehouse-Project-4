// START SCREEN ELEMENTS
const startScreen = document.getElementById('start');
const btnStartGame = document.querySelector(".button");

// GAME BOARD ELEMENTS
const gameBoard = document.getElementById('board');
const player1Indicator = document.getElementById('player1');
const player2Indicator = document.getElementById('player2');

const boxes = document.querySelector('.boxes');
const boardBoxes = document.querySelectorAll('.boxes li');

// FINISH SCREEN ELEMENTS
const finishScreen = document.getElementById('finish');
const btnNewGame = document.querySelector('#finish a');
const message = document.querySelector('.message');
const startH1 = document.querySelector('#start h1');

// PLAYER OBJECTS
const player1 = {
  player: 'player1',
  isTurn: true,
}

const player2 = {
  player: 'player1',
  isTurn: false,
}

//hide finish screen onload
finishScreen.style.display = 'none';

// START BUTTON EVENT
btnStartGame.addEventListener('click', (e)=>{
  resetBoard();
  playGame();
});

// NEW GAME BUTTON EVENT
btnNewGame.addEventListener('click', (e)=>{
  resetBoard();
  playGame();
});

// This function handles indicating turns, symbols on squares and calling checkForWin function
function playGame(){
  startScreen.style.display = 'none';    // hide start screen

  // Highlight Player 1 indicator and unhighlight Player 2 indicator
  if (player1.isTurn === true){
      player1Indicator.className = 'players active';
      player2.isTurn = false;
      player2Indicator.className = 'players';

      // Show Player symbols over empty squares (unmarked = has 'box' class)
      boxes.addEventListener('mouseover', (e)=>{
        const box = e.target;
        if(player1.isTurn === true && e.target.className !== 'box box-filled-1' && e.target.className !== 'box box-filled-2'){
          e.target.style.backgroundImage = "url(img/o.svg)";
        }else if(player2.isTurn === true && e.target.className !== 'box box-filled-1' && e.target.className !== 'box box-filled-2'){
          e.target.style.backgroundImage = "url(img/x.svg)";
        }
      });

      boxes.addEventListener('mouseout', (e)=>{
        const box = e.target;
        e.target.style.backgroundImage = "";
      });

      // Identify Occupied Squares with Player Symbol
      boxes.addEventListener('click', (e)=>{
        if(player1.isTurn === true && e.target.className !== 'box box-filled-1' && e.target.className !== 'box box-filled-2'){
          e.target.className = "box box-filled-1";
          player1Indicator.className = 'players';
          player2Indicator.className = 'players active';
          player1.isTurn = false;
          player2.isTurn = true;
          checkForWin(e.target);    // check for win scenario or a tie after each turn
        }else if(player2.isTurn === true && e.target.className !== 'box box-filled-1' && e.target.className !== 'box box-filled-2'){
          e.target.className = "box box-filled-2";
          player2Indicator.className = 'players';
          player1Indicator.className = 'players active';
          player2.isTurn = false;
          player1.isTurn = true;
          checkForWin(e.target);    // check for win scenario or a tie after each turn
        }
      });
  } //end if statement
}//end playGame()

// check for win scenario or a tie
function checkForWin(box){
  checkPlayer1Win();
  checkPlayer2Win();

  //check for a tie
  let counter = 0
  for (let i = 0; i < boardBoxes.length; i +=1){
    if(boardBoxes[i].className != 'box'){
      counter += 1;
    }
  }
  if(counter === 9){  // if all 9 boxes are taken, show start screen and announce tie
    startScreen.style.display = 'block';
    startH1.textContent = "It's a tie!";
  }
}

// check if Player 1 meets any win senarios
function checkPlayer1Win(){
  // Player 1 -- Horizonal Wins
  if(boardBoxes[0].className === 'box box-filled-1' && boardBoxes[1].className === 'box box-filled-1' && boardBoxes[2].className === 'box box-filled-1'){
    winnerO();
  }else if(boardBoxes[3].className === 'box box-filled-1' && boardBoxes[4].className === 'box box-filled-1' && boardBoxes[5].className === 'box box-filled-1'){
    winnerO();
  }else if(boardBoxes[6].className === 'box box-filled-1' && boardBoxes[7].className === 'box box-filled-1' && boardBoxes[8].className === 'box box-filled-1'){
    winnerO();
  }

  // Player 1 -- Vertical Wins
  if(boardBoxes[0].className === 'box box-filled-1' && boardBoxes[3].className === 'box box-filled-1' && boardBoxes[6].className === 'box box-filled-1'){
    winnerO();
  }else if(boardBoxes[1].className === 'box box-filled-1' && boardBoxes[4].className === 'box box-filled-1' && boardBoxes[7].className === 'box box-filled-1'){
    winnerO();
  }else if(boardBoxes[2].className === 'box box-filled-1' && boardBoxes[5].className === 'box box-filled-1' && boardBoxes[8].className === 'box box-filled-1'){
    winnerO();
  }

  // Player 1 -- Diagonal Wins
  if(boardBoxes[0].className === 'box box-filled-1' && boardBoxes[4].className === 'box box-filled-1' && boardBoxes[8].className === 'box box-filled-1'){
    winnerO();
  }else if(boardBoxes[2].className === 'box box-filled-1' && boardBoxes[4].className === 'box box-filled-1' && boardBoxes[6].className === 'box box-filled-1'){
    winnerO();
  }
}

// check if Player 2 meets any win senarios
function checkPlayer2Win(){
  if(boardBoxes[0].className === 'box box-filled-2' && boardBoxes[1].className === 'box box-filled-2' && boardBoxes[2].className === 'box box-filled-2'){
    winnerX();
  }else if(boardBoxes[3].className === 'box box-filled-2' && boardBoxes[4].className === 'box box-filled-2' && boardBoxes[5].className === 'box box-filled-2'){
    winnerX();
  }else if(boardBoxes[6].className === 'box box-filled-2' && boardBoxes[7].className === 'box box-filled-2' && boardBoxes[8].className === 'box box-filled-2'){
    winnerX();
  }

  // Player 2 -- Vertical Wins
  if(boardBoxes[0].className === 'box box-filled-2' && boardBoxes[3].className === 'box box-filled-2' && boardBoxes[6].className === 'box box-filled-2'){
    winnerX();
  }else if(boardBoxes[1].className === 'box box-filled-2' && boardBoxes[4].className === 'box box-filled-2' && boardBoxes[7].className === 'box box-filled-2'){
    winnerX();
  }else if(boardBoxes[2].className === 'box box-filled-2' && boardBoxes[5].className === 'box box-filled-2' && boardBoxes[8].className === 'box box-filled-2'){
    winnerX();
  }

  // Player 2 -- Diagonal Wins
  if(boardBoxes[0].className === 'box box-filled-2' && boardBoxes[4].className === 'box box-filled-2' && boardBoxes[8].className === 'box box-filled-2'){
    winnerX();
  }else if(boardBoxes[2].className === 'box box-filled-2' && boardBoxes[4].className === 'box box-filled-2' && boardBoxes[6].className === 'box box-filled-2'){
    winnerX();
  }
}

// Function to display Player 1 as the winner
function winnerO(){
  boxes.style.display = 'none';
  player1Indicator.style.display = 'none';
  player2Indicator.style.display = 'none';
  gameBoard.className = "screen screen-win";
  finishScreen.style.display = 'block';
  finishScreen.className = "screen screen-win-one";
  message.textContent = "Winner";
}
// Function to display Player 2 as the winner
function winnerX(){
  boxes.style.display = 'none';
  player1Indicator.style.display = 'none';
  player2Indicator.style.display = 'none';
  gameBoard.className = "screen screen-win";
  finishScreen.style.display = 'block';
  finishScreen.className = "screen screen-win-two";
  message.textContent = "Winner";
}

// function to reset the board for a new game
function resetBoard(){
    startH1.textContent = "Tic Tac Toe";  //reset start screen heading
    finishScreen.style.display = 'none'; // hide finish screen
    boxes.style.display = 'block';  // show 9 boxes
    player1Indicator.style.display = 'block';
    player2Indicator.style.display = 'block';
    gameBoard.className = "board"; // show board div
    for(let i = 0; i < boardBoxes.length; i += 1){  // reset boxes to 'empty' squares
      boardBoxes[i].className = 'box';
    }
    player1.isTurn = true;
}
