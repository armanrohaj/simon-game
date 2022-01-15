var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;
function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColor = buttonColors[randomNumber];
  level=level+1;
  $("h1").text("Level "+level);
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(400).fadeIn(400);
  playSound(randomChosenColor);
}

$(document).on("keydown", function(event){
  if(!started){
  $("h1").text("Level "+level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentlevel){
if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
if(userClickedPattern.length===gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);
}

}else{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
