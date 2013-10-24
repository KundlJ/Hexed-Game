//Global variables
var settings = {
	difficulty: 5,
	numTurns: 10
};
var difficulty;
var numTurns; 
var swatchR;
var swatchG;
var swatchB;
var finalScore;
var obj = new Timer();
var time = 0;

$(document).ready(function() 
{	
	$('#all').hexed(
		settings = {
			difficulty: 5,
			numTurns: 3
		});
	//$('#NameOfDiv').hexed();
});

//External code will initiate Hexed plugin by calling this method
$.fn.hexed = function(options) 
{
	//If user passes in options parameter, rewrite the settings variable
	if(options) {
		$.extend(settings, options);
	}

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

	return this.each(function () {
		//This is where we put the HTML that's going to be inserted
		//$(this).html('<p> Difficulty:' + settings.difficulty + " NumTurns:" + settings.numTurns) + '</p>';
	});
};

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

//Onclick method for 'Got It!' button
//Computes user's score based off how % wrong their RGB guesses were. 
//Decreases the number of turns by 1 and displays the users guess along with %'s wrong. 
//Displays new color in the swatch and resets inputs.
function gotItClick()
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
    $('').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns: ' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore);
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
}

//Onclick method for 'Next!' button
//Displays new color in the swatch and decreases the number of turns by 1.
function nextClick()
{
	randomColor();
	numTurns--;

	obj.Restart(); 
	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore + '</p>');
	
	if(numTurns == 0)
	{
		endOfGame();
	}
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