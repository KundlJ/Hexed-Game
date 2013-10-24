(function($)
{
	//External code will initiate Hexed plugin by calling this method
	$.fn.hexed = function(options) 
	{
		//Global variables
		var settings = {
			difficulty: 5,
			numTurns: 10
		};

		//If user passes in options parameter, rewrite the settings variable
		if(options) {
			$.extend(settings, options);
		}

		return this.each(function () 
		{
			 $(this).html('<head><meta charset="utf-8"><title>Hexed!</title><link rel="stylesheet" type="text/css" href="hexed.css"><link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/></head><div id="all" onload="obj.Start()"><div id="leftSide"><header><h1>Hexed!</h1><div id="timer"></div><div id="settings"></div></header><div id="swatch"><div id="endOfGame"><p id="endOfGameText">End of Game!</p><div id="scoreName"><p id="finalScore">Final Score: </p><br/><button class="endOfGameButtons" id="playAgain">Play Again</button><br/><p id="name">Name:</p><input type="text" id="nameText"/><button class="endOfGameButtons" id="addScore">Add my score</button></div><form action="Team6Scores.html" method="get"><button class="endOfGameButtons" id="viewScores">View High Scores</button></form></div><br/></div><form><div class="pair"><div class="slider" id="redSlider"></div><div class="input"><input type="text" id="red"><br/></div><div class="badval" id="rbadval"><p>Invalid Input: Requires numeric value in range 0 - 255</p></div></div><div class="pair"><div class="slider" id="greenSlider"></div><div class="input"><input type="text" id="green"><br/></div><div class="badval" id="gbadval"><p>Invalid Input: Requires numeric value in range 0 - 255</p></div></div><div class="pair"><div class="slider" id="blueSlider"></div><div class="input"><input type="text" id="blue"><br/></div><div class="badval" id="bbadval"><p>Invalid Input: Requires numeric value in range 0 - 255</p></div></div></form><button id="gotItButton">Got it!</button><button id="nextButton">Next!</button></div><div id="rightSide"><div id="guessedSwatches"></div></div></div><script src="http://code.jquery.com/jquery-1.9.1.js"></script><script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>');


var difficulty;
var numTurns; 
var swatchR;
var swatchG;
var swatchB;
var finalScore;
var time = 0;

//SCRIPTS	
//Timer class
var Timer = function() 
{
	//EVENTS
	this.Interval = 1000; //1 second intervals
	this.Enable = new Boolean(false); //to start/stop itmer
	this.Tick; //to further the time
	//PRIVATE VARIABLES
	var timerId = 0; // to use for setInterval
	var thisObject; //to refer to self
	
	//PUBLIC FUNCTIONS
	// start timer
	this.Start = function() 
	{
		this.Enable = new Boolean(true);
		thisObject = this;
		if (thisObject.Enable) {
			thisObject.timerId = setInterval(function(){thisObject.Tick();},thisObject.Interval);
		}            //setInterval gives what to do at each interval of alotted time
	};

	// stop timer 
	this.Stop = function() 
	{
		thisObject.Enable = new Boolean(false);
		clearInterval(thisObject.timerId);
	};

	this.Restart = function() 
	{
        thisObject.Enable = new Boolean(true);
        if (thisObject.Enable) 
        {
            time = 0;
    	}
    }

    this.Tick = function() 
    {
    	time = time + 1;
    	if(time < 10)
    	{
    		document.getElementById("timer").innerHTML = "Time: " + "0" + time + " sec";
    	}
    	else
    	{
    		document.getElementById("timer").innerHTML = "Time: " + time + " sec";	
    	}    	 
    }
};

var obj = new Timer();

//High score functionality
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function sortByScoreAndDate(array) {
    return array.sort(function(a, b) {
        var xScore = a["score"]; 
        var xDate = a["date"];
        
        var yScore = b["score"]; 
        var yDate = b["date"];
        
        if(xScore < yScore)
        {
          return 1;
        }
        else
        {
          if( xScore > yScore)
          {
            return -1;
          }
          else
          {
            if( xDate < yDate)
            {
              return 1;
            }
            else
            {
              if( xDate > yDate)
              {
                return -1;
              }
              else
              {
                return 0;
              }
            }
          }
        }
        return 0;
    });
}

//Adds a JSON score object to the local storage
function AddNewScoreJS(newScore)
{
  if(supports_html5_storage())
  {
    var ScoresString = localStorage["HexedHighscores"];
    //If Data Exists, add the new value, otherwise handle creating it
    if(ScoresString)
    {
      var Data = JSON.parse(ScoresString);
      var Scores = Data.HighScores;
      Scores.push(newScore);
      //Sort result
      Scores = sortByScoreAndDate(Scores);
      
      Data.HighScores = Scores;
      //Store result
      localStorage["HexedHighscores"] = JSON.stringify(Data);
    }
    else
    {
      var Scores = new Array();
      Scores[0] = newScore;
      var Data = { "HighScores": Scores };
      localStorage["HexedHighscores"] = JSON.stringify(Data);
    }
  }
  else
  {
    alert("Does not support local storage");
  }
}
//Adds a new score to local storage based on elements
//Name: Player name, a simple string
//Difficulty: The difficulty of the game
//Turns: turns taken to complete
//Score
//time: In the form "YEAR-MO-DA, eg 2000-05-30"
function AddNewScore(name, difficulty, turns, score, time)
{
  var NewScore =  {
          "name"        : name,       
          "difficulty"  : difficulty,
          "turns"       : turns,
          "score"       : score,
          "timestamp"   : time    
  };
  AddNewScoreJS(NewScore);
}

//Getting high scores
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function EraseHighScores() {
  localStorage.removeItem("HexedHighscores");
}

function DisplayHighScores() {
  if(supports_html5_storage())
  {
    /*
      Temporarily force data into local storage
      until can retrieve from game
    */
    var testJSON = { "HighScores": [    
          {
            "name"        : "Jed",
            "difficulty"  : "hard",
            "turns"       : 5,
            "score"       : 9001,
            "timestamp"   : "2013-10-18"
          },     
          {
            "name"        : "Drew",
            "difficulty"  : "easy",
            "turns"       : 10,
            "score"       : 1337,
            "timestamp"   : "2013-10-15"
          }     
      ]
    };
    
    //localStorage.setItem("HexedHighscores", JSON.stringify(testJSON));
      
    //////////////////////////////////////////////////////////////////
    
    if(localStorage["HexedHighscores"])
    {
      var ScoresString = localStorage["HexedHighscores"];
      
      var Data = JSON.parse(ScoresString);
      var Scores = Data.HighScores;
      
      for(var i = 0; i < Scores.length; i++)
      {
        var thisScore = Scores[i];
        
        var nameData = thisScore.name;
        var difficultyData = thisScore.difficulty;
        var turnsData = thisScore.turns;
        var scoreData = thisScore.score;
        var timestampData = thisScore.timestamp;
        
        var newScore = $('<li></li>').appendTo(".HighScores");
        newScore.attr('class', 'Score');
        
        var dataList = $('<ul></ul>').appendTo(newScore);
        dataList.attr('class', 'DataList');
        
        var Name = $('<li>' + nameData + '</li>').appendTo(dataList);
        Name.attr('class', 'Name');
        
        var Score = $('<li>' + scoreData + '</li>').appendTo(dataList);
        Score.attr('class', 'Score');
        
        var Difficulty = $('<li>' + difficultyData + '</li>').appendTo(dataList);
        Difficulty.attr('class', 'Difficulty');
        
        var Turns = $('<li>' + turnsData + '</li>').appendTo(dataList);
        Turns.attr('class', 'Turns');
        
        var Timestamp = $('<li>' + timestampData + '</li>').appendTo(dataList);
        Timestamp.attr('class', 'Timestamp');
      }
    }
    else
    {
      alert("No Saved High Scores");
    }
  }
  else
  {
    alert("Local Data Not Functioning");
  }
}

//Helper method to display new random color in the swatch
function randomColor()
{
	swatchR = Math.floor((Math.random()*255));
	swatchG = Math.floor((Math.random()*255));
	swatchB = Math.floor((Math.random()*255));

	var hexColor = rgbToHex(swatchR,swatchG,swatchB);
	$('#swatch').css("background-color", '#' + hexColor);		
}

	//Helper method to error check RGB user inputs
function isInvalid(num) {
	return ((isNaN(num)) || num < 0 || num > 255);
}
//Helper method to convert RGB value strings into hexadecimal format
function rgbToHex(r, g, b)
{
	var rString = r.toString(16);
	var gString = g.toString(16);
	var bString = b.toString(16);

	if(rString.length == 1) 
	{
		rString = "0" + rString;
	}
	if(gString.length == 1)
	{
		gString = "0" + gString;		
	}
	if(bString.length == 1)
	{
		bString = "0" + bString;
	}	

	return "#" + rString.toUpperCase() + gString.toUpperCase() + bString.toUpperCase();
}


//When number of turns hits 0, display user's score, option to play again, and
//viewing/adding high scores.
function endOfGame()
{
	$('#swatch').css('background', 'white');    	
	document.getElementById('gotItButton').disabled = true;
    document.getElementById('nextButton').disabled = true;
    obj.Stop();
    $('#endOfGame').css('display', 'block');
    $('#finalScore').append(finalScore);
}
//Onclick method for 'Play Again' button
//Restarts the game by hiding scoreboard/play again buttons, resetting score & slider inputs, 
//enabling 'Got It!' and 'Next!' buttons, and putting random color in swatch
function playAgainClick()
{
	numTurns = settings.numTurns; 
	$('#endOfGame').css('display', 'none');
	resetInputs();
	document.getElementById('gotItButton').disabled = false;
    document.getElementById('nextButton').disabled = false;	
	$('#guessedSwatches').html('');	
	finalScore = 0;
	score = 0;
	randomColor();	
	obj.Start();
	obj.Restart();
}
//Adds new score to the table and displays the high scores
function newScore()
{
	var date = new Date(); 
	var year = date.getUTCFullYear();
	var month = date.getUTCMonth() + 1; //0-index based
	var day = date.getUTCDate();		

	AddNewScore($('#nameText').val(),
		difficulty,
		settings.numTurns,
		finalScore,
		year + '-' + month + '-' + day
	);

	$('#viewScores').click();
}
//Resets sliders and textboxes to 128
function resetInputs()
{
	$('#redSlider').slider("value", 128);
	$('#greenSlider').slider("value", 128);
	$('#blueSlider').slider("value", 128);
	$('#red').val(128);
	$('#green').val(128);
	$('#blue').val(128);
}

//Onclick method for 'Got It!' button
//Computes user's score based off how % wrong their RGB guesses were. 
//Decreases the number of turns by 1 and displays the users guess along with %'s wrong. 
//Displays new color in the swatch and resets inputs.
$('#gotItButton').click(function() 
{

	//Check user-entered color compared to existing swatch
	var rInput = parseInt($('#red').val());
	var gInput = parseInt($('#green').val());
	var bInput = parseInt($('#blue').val());

	//Error-check RGB inputs
	if(isInvalid(rInput) || isInvalid(gInput) || isInvalid(bInput))
	{
		alert('One or more of your RGB values is invalid. Must be in the 0-255 range');
		return;
	}

	var userColor = rgbToHex(rInput, gInput, bInput);
	var percentR = Math.round(Math.abs(((swatchR - rInput)) / 255) * 100);
    var percentG = Math.round(Math.abs(((swatchG - gInput)) / 255) * 100);
    var percentB = Math.round(Math.abs(((swatchB - bInput)) / 255) * 100);
    var avgPercent = (percentR + percentG + percentB) / 3; 

    var score = ((15 - difficulty - avgPercent) / (15 - difficulty)) * (15000 - (time - 1) * 1000);
    if (score < 0)
    {    	
    	score = 0; 
    }

    score = Math.round(score);
    finalScore += score; 
    numTurns--;

    //Update score in the HTML and display what the user's guessed color looks like along with error %'s
    $('#guessedSwatches').append('<div class="userSwatch"></div>');
    $('.userSwatch:last').append('<div class="userColor"></div>');
    $('.userSwatch:last').append('<p>R:' + percentR + '% off G:' + percentG + '% off B:' + percentB + '% off' +
     '=' + score + ' points</p>');
    $('.userColor:last').css('background-color', '#' + userColor);
    $('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns: ' + numTurns + '</p>'
		+ '<p>Score: ' + finalScore + '</p>');

    if(numTurns == 0)
    {
		endOfGame();		
    }
    else
    {    	
		randomColor();	
		resetInputs();
		obj.Restart();
    }	
});

//Onclick method for 'Next!' button
//Displays new color in the swatch and decreases the number of turns by 1.
$('#nextButton').click(function() {
	randomColor();
	numTurns--;

	obj.Restart(); 
	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore + '</p>');
	
	if(numTurns == 0)
	{
		endOfGame();
	}
});

$('#playAgain').click(function () {
	playAgainClick();
});

$('#addScore').click(function () {
	newScore();
});

$('#viewScores').click(function () {

});

//Slider & input handling + error checking
var red = $("#red");
var green = $("#green");
var blue = $("#blue");

//Error checking
red.onchange = function (e) {
	var num = $(this).val();
	var errorMessage = document.getElementById('rbadval');
	if((isNaN(num)) || num < 0 || num > 255)
	{		
		errorMessage.style.visibility = 'visible';		
	}
	else
	{
		errorMessage.style.visibility = 'hidden';		
	}
}

green.onchange = function(e) {
	var num = $(this).val();
	var errorMessage = document.getElementById('gbadval');
	if((isNaN(num)) || num < 0 || num > 255)
	{		
		errorMessage.style.visibility = 'visible';		
	}
	else
	{
		errorMessage.style.visibility = 'hidden';		
	}
};

blue.onchange = function(e) {
	var num = $(this).val();
	var errorMessage = document.getElementById('bbadval');
	if((isNaN(num)) || num < 0 || num > 255)
	{		
		errorMessage.style.visibility = 'visible';		
	}
	else
	{
		errorMessage.style.visibility = 'hidden';		
	}
};

//Event listeners for changes via slider
$("#redSlider").on("slide", function(event, ui) {	
	$('#red').val(ui.value);
});

$("#greenSlider").on("slide", function(event, ui) {
	$('#green').val(ui.value);
});

$("#blueSlider").on("slide", function(event, ui) {
	$('#blue').val(ui.value);
});
//=================		

difficulty = settings.difficulty;
numTurns = settings.numTurns; 
finalScore = 0;

//Error check difficulty value
if(difficulty > 10 || difficulty < 0 || isNaN(difficulty)) 
{
	alert('Difficulty has been set to an illegal value. Must be a number in the 0-10 range');
	return null;
}

randomColor();
$('.slider').slider({max: 255});
$('.slider').slider({min: 0});
$('.slider').slider({
	slide: function(event, ui) {}
});	
$('#redSlider').css('background', 'rgb(255,0,0)');
$('#greenSlider').css('background', 'rgb(0,255,0)');
$('#blueSlider').css('background', 'rgb(0,0,255)');
resetInputs();

$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns: ' + numTurns + '</p>'
	+ '<p>Score: --</p>'); 
});
};
})(jQuery);