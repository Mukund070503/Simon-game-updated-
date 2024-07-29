var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function playSound(name){
    var audio = new Audio("./"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
        },100);
}

    $(document).keydown(function(){
        if (level === 0){
            nextSequence();
        }
    });
function nextSequence(){
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    console.log(gamePattern);
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length - 1));
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        startOver();

    }
}
function startOver(){
    $("body").addClass("game-over");
    level = 0;
    gamePattern = [];
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key or click somewhere to Restart");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}
$(document).click(function(){
    if (level === 0){
        nextSequence();
    }
});