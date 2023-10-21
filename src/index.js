// Get the rods element by class
let rods = document.getElementsByClassName('rods');

// Assign the two rod elements to individual variables
let rod1 = rods[0];
let rod2 = rods[1];
let currentPosR1 = rod1.getBoundingClientRect().left;

// Position variable for the rods element
let posX = 0;

// Function used for moving the rods to the left
function moveLeft() {
  // Get current position of the element
  posX = rod1.getBoundingClientRect().left;

  if (rod1.getBoundingClientRect().left >= 0) {
    posX -= 15;
    rod1.style.left = posX + 'px';
    rod2.style.left = posX + 'px';
  } else {
    posX = 0;
  }
}

// Function used for moving the rods to the right
function moveRight() {
  posX = rod1.getBoundingClientRect().left;

  if (window.innerWidth - rod1.getBoundingClientRect().right >= 0) {
    posX += 15;
    rod1.style.left = posX + 'px';
    rod2.style.left = posX + 'px';
  }
}

// Adding event listener for the keydown operation
// We will only be considering 'A' and 'D' key presses
document.addEventListener('keydown', (event) => {
  if (event.key === 'D' || event.key === 'd') {
    moveRight();
  }
  if (event.key === 'A' || event.key === 'a') {
    moveLeft();
  }
});

const ball = document.getElementById('ball');
const windowWidth = window.innerWidth - ball.clientWidth;
const windowHeight =
  window.innerHeight - ball.clientHeight - rod1.clientHeight + 5;

let x = 100; // Initial horizontal position
let y = window.innerHeight-ball.offsetHeight-rod1.offsetHeight-5; //Initial vertical position
let dx = 2; // Horizontal speed
let dy = -2; // Vertical speed
localStorage.setItem('p1', '0'); //Player 1 score
localStorage.setItem('p2', '0'); //Player 2 score
localStorage.setItem('maxscore', '0'); //Max Score
localStorage.setItem('maxWinner', 'Player 1'); //Max Score Player
let p1Won = true;
let animationStarted = false;

function moveBall() {
  x += dx;
  y += dy;

  // Logic to check if the ball is in contact with either of the rods

    let areInContactX = ball.getBoundingClientRect().right >= rod1.getBoundingClientRect().left && ball.getBoundingClientRect().left <= rod1.getBoundingClientRect().right && ball.getBoundingClientRect().left <= rod1.getBoundingClientRect().right && ball.getBoundingClientRect().right >= rod1.getBoundingClientRect().left;

    //Rod2 Vertical Logic
    let areInContactR2 = ball.getBoundingClientRect().bottom >= rod2.getBoundingClientRect().top;

    //Rod1 Vertical Logic
    let areInContactR1 = ball.getBoundingClientRect().top <= rod1.getBoundingClientRect().bottom;

    let ballTop = ball.getBoundingClientRect().top > 20;
    let ballBottom = ball.getBoundingClientRect().bottom < window.innerHeight - 20;

    

    if (x > windowWidth || x < 0) {
    dx = -dx; // Reverse horizontal direction when hitting the edges
     }
    else if (areInContactR2 && areInContactX && ballBottom) {
    dy = -2; // Reverse vertical direction when the ball touches the rods
    let newScoreP2 = parseInt(localStorage.getItem('p2'))+1;
    localStorage.setItem('p2', newScoreP2.toString());
    let maxScore = parseInt(localStorage.getItem('maxscore'));
    //Current Max Score is of Player 2
    if(newScoreP2 > maxScore)
    {
        localStorage.setItem('maxWinner', 'Player 2');
    }
    maxScore = Math.max(maxScore, Math.ceil(newScoreP2/3));
    localStorage.setItem('maxscore', maxScore.toString());
    }
    else if (areInContactR1 && areInContactX && ballTop)
    {   
        dy = 2;
        let newScoreP1 = parseInt(localStorage.getItem('p1'))+1;
        localStorage.setItem('p1', newScoreP1.toString());
        let maxScore = parseInt(localStorage.getItem('maxscore'));
        //Current Max Score is of Player 1
    if(newScoreP1 > maxScore)
    {
        localStorage.setItem('maxWinner', 'Player 1');
    }
    maxScore = Math.max(maxScore, Math.ceil(newScoreP1/3));
    localStorage.setItem('maxscore', maxScore.toString());
    }
  else if (y < 0) {
    // Ball touches the top edge
    let currentScoreP1 = parseInt(localStorage.getItem('p1'));
    let currentScoreP2 = parseInt(localStorage.getItem('p2'));
    let maximum = localStorage.getItem('maxscore');
    //No Player scores, end the game
    if(currentScoreP1  === 0 && currentScoreP2 === 0)
    {
        
        alert("Game Over. "+ localStorage.getItem('maxWinner')+" has maximum score of "+ maximum);
    }
    else{
        alert("Player 2 won with score:"+" "+Math.ceil(currentScoreP2/3) +". "+ localStorage.getItem('maxWinner')+" has maximum score of "+ maximum);
        p1Won = false;
    }
    

       gameOver();

  } else if (y > window.innerHeight - ball.offsetHeight ) {
    // Ball touches the bottom edge and not in contact with the rods
    let currentScoreP1 = parseInt(localStorage.getItem('p1'));
    let currentScoreP2 = parseInt(localStorage.getItem('p2'));
    let maximum = localStorage.getItem('maxscore');
    
    //No Player scores, end the game
    if(currentScoreP1  === 0 && currentScoreP2 === 0)
    {  
        alert("Game Over, Max Score: "+" Current Max Score is of "+ localStorage.getItem('maxWinner')+": "+ maximum);
    }
    else
    alert("Player 1 won with score:"+" "+Math.ceil(currentScoreP1/3) +". "+ localStorage.getItem('maxWinner')+" has maximum score of "+ maximum);
    gameOver();
  }
   function gameOver() { 
         animationStarted = false;

         //If rod1 won then initial start position from rod2
        if(p1Won)
        {
             x = 100; // Initial horizontal position
             y = window.innerHeight-ball.offsetHeight-rod1.offsetHeight -5; //Initial vertical position
             dy = -2;
        }
        //else initial start position of ball from rod1
        if(!p1Won)
        {
            x = 100; // Initial horizontal position
            y = rod1.offsetHeight+ball.offsetHeight+5; //Initial vertical position
            dy = 2;
        }
       
        localStorage.setItem('p1', '0');
        localStorage.setItem('p2', '0');
        // localStorage.setItem('maxscore', '0');
        rod1.style.left = currentPosR1;
        rod2.style.left = currentPosR1;
        return; // Stop the game
        }
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';

  if (!animationStarted) {
    // Display the alert only once, before starting the game
    alert('Click OK to start the game.');
    animationStarted = true;
  }

  //Recursive call the moveBall function with Smooth Animation
  requestAnimationFrame(moveBall);
}

moveBall();