$(document).ready(function() {	
	randomColor();
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

	return this.each(function () {
		//This is where we put the HTML that's going to be inserted
		//$(this).html('<p> Difficulty:' + settings.difficulty + " NumTurns:" + settings.numTurns) + '</p>';
	});
};

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
	
	rString = rString.toUpperCase();
	gString = gString.toUpperCase();
	bString = bString.toUpperCase(); 

	return "#" + rString + gString + bString; 
}

function randomColor()
{
	var r = Math.floor((Math.random()*255));
	var g = Math.floor((Math.random()*255));
	var b = Math.floor((Math.random()*255));

	var hexColor = rgbToHex(r,g,b);
	
	//Swatch is the ID of the DIV holding the color
	$('#swatch').css("background", hexColor);	
}


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