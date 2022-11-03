var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

//click on start/reset button
document.getElementById("startreset").addEventListener("click", function () {
  //if we are playing
  if (playing === true) {
    //reload the page
    location.reload();
    //if we are not playing
  } else {
    //change mode to playing
    playing = true;
    //set the score to 0
    score = 0;
    //change the html element to the variable result
    document.getElementById("scorevalue").innerHTML = score;
    //show the time remaining element on html
    show("timeremaining");
    //Set timeRemaining's value, in this case is 60
    timeRemaining = 60;
    //Change the HTML element to the timeRemaining value
    document.getElementById("timeremainingbox").innerHTML = timeRemaining;
    //Hide game over box
    hide("gameOver");

    //change the inner HTML of the Start Game button to reset game
    document.getElementById("startreset").innerHTML = "Reset Game";
    //Start countdown
    startCountdown();

    //Generate a new Questions and Answers
    //Call the function we created
    generateQA();
  }
});

//Clicking the answers

for( i = 1; i < 5; i++){
    document.getElementById('box'+i).onclick = function(){
        //check if we are playing
        if(playing == true){
            //we check the answer on html and compare it to the variable correctAnswer
            //we can use the keyword this has it referres to the element we clicked
            if(this.innerHTML == correctAnswer){
                //icrease the score
                score++;
                //change it in HTML
                document.getElementById('scorevalue').innerHTML = score;
                //show the correct box and hide wrong box
                hide('wrong');
                show('correct');
                //once we show the correct box, we wait 1 second and hide it
                setTimeout(function(){
                    hide('correct');
                }, 1000);
    
                //Generate a new question
                generateQA();
    
            } else { //if we have a wrong answer
                hide('correct');
                show('wrong');
                //once we show the wrong box, we wait 1 second and hide it
                setTimeout(function(){
                    hide('wrong');
                }, 1000);
            }
        }
    }
}



//******************* FUNCTIONS **********************************************************************

//Define startCountdown function
function startCountdown() {
  //Use the function setInterval to count down
  //setInvertal takes 2 parameters; a function and duration in miliseconds
  action = setInterval(function () {
    //reduce the variable timeRemaining by one
    timeRemaining -= 1;
    //After the timeRemaining value is reduced, the innerHTML is updated
    document.getElementById("timeremainingbox").innerHTML = timeRemaining;
    //We need to check when the counter reaches 0, otherwise it will going into negative numbers
    if (timeRemaining === 0) {
      //Game Over
      //Use the function clearInterval to stop the counting, the parameter is the same as the one used to set the interval
      //the clearInterval() is set inside the function we create bellow as there are other actions included in stopCountdown
      //function we want to see done
      //call stopCountdown function()
      stopCountdown();
      //Once we stop the countdown we want to show the modal with game over and score
      show("gameOver");
      //change the innerHTML of the gameOver element
      document.getElementById("gameOver").innerHTML = `
      <p>Game Over!</p>
      <p>Your Score is ${score}</p>
      `;
      //once the game is over we want the timebox to disapear
      hide("timeremaining");
      //And hide the try again flag
      hide("wrong");
      //And the correct flag
      hide("correct");
      //And change the play mode to not playing
      playing = false;
      //Change the Reset Game button to Start Game
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//Set stopCountdown function
function stopCountdown() {
  clearInterval(action);
}

//because we use the display property often we create a function to reduce code
//set a function to hide element
function hide(id) {
  document.getElementById(id).style.display = "none";
}

//set a function to show element
function show(id) {
  document.getElementById(id).style.display = "block";
}

//set a function to generate the questions and answers
function generateQA() {
  //Get a random number between 1 and 10(math.round will round the math.random to a full number between 0 and 1)
  //then multiplied by 9 gives a number between 0 and 9, lastly we add 1 to make the random number to be between
  //1 and 10
  var x = Math.round(Math.random() * 9) + 1;
  //Get a second number between 1 and 10
  var y = Math.round(Math.random() * 9) + 1;
  //Save the product of x and y to a new variable
  //because we're gonna need this variable result out of this function, we declare it outside (on the top)
  //and change it's value inside the function
  correctAnswer = x * y;
  //change the innerHTML of the question box
  document.getElementById("question").innerHTML = `${x} X ${y}`;
  //get a random position to place the correct answer in HTML
  //we need a number between 1 and 4 has we have 4 multiple choice boxes in HTML
  var correctPosition = Math.round(Math.random() * 3) + 1;
  //place the randomly chosen number in the corrensponding box
  document.getElementById(`box${correctPosition}`).innerHTML = correctAnswer;

  //the array bellow will make sure the answers inside the 4 boxes are not the same, because every time we do a 
  //do while loop, we will check if the generated answer is already inside this array
  var answers = [correctAnswer]

  //fill the other boxes with wrong answers
  for (var i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      var wrongAnswer;
      //we generate a do while loop to make sure the wrong answers are not equal, if they are a new answer is generated
      //we keep generating wrong answers while the wrong answer is equal to the correct answer 
      do{
        wrongAnswer =
        (Math.round(Math.random() * 9) + 1) *
        (Math.round(Math.random() * 9) + 1);
      }
      //until the index of wrongAnswer is higher than -1 it keeps generating answers
      //meaning if the answer is already in the array answers it keeps giving new answers
      while (answers.indexOf(wrongAnswer) > -1);
      //place the wrong answer in the box that is not the correct answer
      document.getElementById(`box${i}`).innerHTML = wrongAnswer;
      //before moving to the next box we push this answer into the array
      answers.push(wrongAnswer);
    }
  }
}
