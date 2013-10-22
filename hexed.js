//timer object
var time = 0;
var obj = new Timer();

var difficulty;
var numTurns; 
var swatchR;
var swatchG;
var swatchB;
var finalScore;

$(document).ready(function() {	
	randomColor();
<<<<<<< HEAD
=======

	$('.slider').slider({max: 255});
	$('.slider').slider({min: 0});
	$('.slider').slider({
		slide: function(event, ui) {}
	});	
	$('#redSlider').css('background', 'rgb(255,0,0)');
	$('#greenSlider').css('background', 'rgb(0,255,0)');
	$('#blueSlider').css('background', 'rgb(0,0,255)');
	resetInputs();

	$('#all').hexed();
>>>>>>> Added timer.js plus other functionality
	//$('#NameOfDiv').hexed();
});

$.fn.hexed = function(options) {
	var settings = {
		difficulty: 5,
		numTurns: 10
	};		

	//If user passes in options parameter, rewrite the settings variable
	if(options) {
		$.extend(settings, options);
	}

	difficulty = settings.difficulty;
	numTurns = settings.numTurns; 
	finalScore = 0; 

	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>');

	return this.each(function () {
		//This is where we put the HTML that's going to be inserted
		//$(this).html('<p> Difficulty:' + settings.difficulty + " NumTurns:" + settings.numTurns) + '</p>';
	});
};

<<<<<<< HEAD
var difficulty = document.getElementById("diff");
difficulty.value = 5 // default
var turns = document.getElementById("turn");
turns.value = 10; // default

//clicking got it button
function gotItClick() {
	obj.Stop(); //stop the timer
	//display color of guessed rgb val
	var r = document.getElementById('#red').value;
	var g = document.getElementById('#green').value;
	var b = document.getElementById('#blue').value;
	var rgbval = rgbToHex(r,g,b);
	$('#guessedSwatch').css("background","red"); //not working when test any color? not sure why?
}

//clicking next button
function nextClick() {
	if (turns.value > 0) {
		obj.Restart(); //restart timer
		//new random color displayed
		--turns.value; //decrement turns
		//restart sliders to zero/default position
	}
	else {  //if turns == 0
		document.getElementById("score").innerHTML = "Final score: "// + finalscore;
		document.getElementById("playAgain").innerHTML = "Play again?";
	}
}

=======
>>>>>>> Added timer.js plus other functionality
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

function isValid(num) {
	return ((isNaN(num)) || (num < 0 || num > 255));
}

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

function randomColor()
{
	swatchR = Math.floor((Math.random()*255));
	swatchG = Math.floor((Math.random()*255));
	swatchB = Math.floor((Math.random()*255));

	var hexColor = rgbToHex(swatchR,swatchG,swatchB);
	//swatchColor = hexColor; 
	//Swatch is the ID of the DIV holding the color
<<<<<<< HEAD
	$('#swatch').css("background", hexColor);	
=======
	$('#swatch').css("background-color", '#' + hexColor);	
	//return swatchColor; 
>>>>>>> Added timer.js plus other functionality
}

function gotItClick()
{
	//Check user-entered color compared to existing swatch
	var rInput = $('#red').val();
	var gInput = $('#green').val();
	var bInput = $('#blue').val();
	var userColor = rgbToHex(parseInt(rInput), parseInt(gInput), parseInt(bInput));

	var percentR = Math.round(Math.abs(((swatchR - rInput)) / 255) * 100);
    var percentG = Math.round(Math.abs(((swatchG - gInput)) / 255) * 100);
    var percentB = Math.round(Math.abs(((swatchB - bInput)) / 255) * 100);
    var avgPercent = (percentR + percentG + percentB) / 3; 
    var score = ((15 - difficulty - avgPercent) / (15 - difficulty)) * (15000 - (time - 1) * 1000);
    if(score < 0)
    {    	
    	score = 0; 
    }

    finalScore += score; 
    numTurns--;

    $('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore);

    $('#guessedSwatches').append('<div class="userSwatch"></div>');
    $('.userSwatch:last').append('<div class="userColor"></div>');
    $('.userSwatch:last').append('<p>R:' + percentR + '% G:' + percentG + '% B:' + percentB + '%' +
     '--' + score + ' points</p>');
    $('.userColor:last').css('background-color', '#' + userColor);

    if(numTurns == 0)
    {
    	$('#swatch').css('background', 'white');
    	$('#swatch').html('<p>End of Game!</p>');
    	document.getElementById('gotItButton').disabled = true;
    	document.getElementById('nextButton').disabled = true;
    	obj.Stop();

    }
    else
    {
    	//get new color on the swatch
		randomColor();

		//reset the sliders
		resetInputs(); 

		obj.Restart();
    }	
}

<<<<<<< HEAD
//timer class, object, and code------------------------------------------------

//CLASS
var Timer = function() {
	//EVENTS
	this.Interval = 1000; //1 second intervals
	this.Enable = new Boolean(false); //to start/stop itmer
	this.Tick; //to further timer
	//PRIVATE VARIABLES
	var timerId = 0; // to use for setInterval
	var thisObject = this; //to refer to self
	
	//PUBLIC FUNCTIONS
	this.Start = function() {
		thisObject.Enable = new Boolean(true);
		if (thisObject.Enable) {
			thisObject.timerId = setInterval(function(){thisObject.Tick();},thisObject.Interval);
		}            //setInterval gives what to do at each interval of alotted time
	};

	this.Stop = function() {
		thisObject.Enable = new Boolean(false);
		clearInterval(thisObject.timerId);
	};

	this.Restart = function() {
		thisObject.Enable = new Boolean(true);
		if (thisObject.Enable) {
			thisObject.timerId = setInterval(function(){thisObject.Tick();},thisObject.Interval);
			time = 0;
		}
	}

	this.Tick = function() {
	    if (time < 10) {
			document.getElementById("timer").innerHTML = "Time: " + "0" + time + " sec.";
		}
		else {
			document.getElementById("timer").innerHTML = "Time: " + time + " sec.";
		}
		time = time + 1; //to further the timer
	}
};

//timer object
var time = 0;
var obj = new Timer();
//---------------------------------------------------------------------------------------------
=======
function nextClick()
{
	randomColor();
	numTurns--;
	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore);
	if(numTurns == 0)
	{
		document.getElementById('gotItButton').disabled = true;
    	document.getElementById('nextButton').disabled = true;
	}
}


function resetInputs()
{
	$('#redSlider').slider("value", 128);
	$('#greenSlider').slider("value", 128);
	$('#blueSlider').slider("value", 128);
	$('#red').val(128);
	$('#green').val(128);
	$('#blue').val(128);
}
>>>>>>> Added timer.js plus other functionality
