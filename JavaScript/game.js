var buttonColors = ["red", "blue", "green", "yellow"];

// array where we gonna store randomly chosen colors
var gamePattern = [];

// array where we gonna store colors which user clicked
var userClickedPattern = [];

// shows the level of the player
var level = 0;

// helps to check if the player pressed the keyboard more than once
var gameStarted = false;

function nextSequence() {

  // gives a random number between 0 and 3
  var randomNumber = Math.floor((Math.random() * 4));

  // gives random chosen color
  var randomChosenColor = buttonColors[randomNumber];

  // adds chosen color to gamePattern array
  gamePattern.push(randomChosenColor);

  // fades chosen color
  $("#" + randomChosenColor).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });

  playSound(randomChosenColor);

  level++;

  userClickedPattern = [];

  $("#level-title1").html("Let's play the game!")

  $("#level-title2").html("Your level is " + level);

  gameStarted = true;
}


// plays the sound of the chosen color
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animating when you click chosen button
function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");

  // setTimeout menen ushuncha ubakyt otkondon kiyin
  // pressed class ty remove kylyp salat
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


// chose all document and when we make a keypress,
// checks wether the game already started or not, to make sure
// that player did not type keyboard more than once,
// then it starts nextSequence. If player presses more than once
// it will be wrong and the game will start from the beginning

$(document).keypress(function() {
  if (gameStarted === false) {
    nextSequence();
  } else {
    gameOver();
  }
});



// compare the answers user wrote and the answer in the gamePattern array

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

// when we click the button it will animate it,
// make a sound as well, and will add that button name
// into the array called userClickedPattern
// then it will check is it correct what player pressed

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  animatePress(userChosenColor);

  playSound(userChosenColor);

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

})


// If player pressed wrong button, the game will be over via this
// function

function gameOver() {
  playSound("wrong");

  gamePattern = [];

  $("#level-title1").html("Game over");

  level = 0;

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title2").html("Press Any Keyboard Key to Restart");

  gameStarted = false;

}
