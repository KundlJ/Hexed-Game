$(document).ready(function() {
	randomColor();
});

var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

function isValid(num) {
	return ((isNaN(num)) || (num < 0 || num > 255));
}

//Created by Altan
function randomColor()
{
	var r = Math.floor((Math.random()*255));
	var g = Math.floor((Math.random()*255));
	var b = Math.floor((Math.random()*255));
	var rString = r.toString(16);
	var gString = g.toString(16);
	var bString = b.toString(16); 
	
	if(r < 16)
	{
		rString = "0" + rString;
	}
	if(g < 16)
	{
		gString = "0" + gString;
	}
	if(b < 16)
	{
		bString = "0" + bString; 
	}

	var rgbHex = "#" + rString + gString + bString; 
	
	//Swatch is the ID of the DIV holding the color
	$('#swatch').css("background", rgbHex);
	//$('#swatch').html(rString + "\n" + gString + "\n" + bString);
}


//timer class, object, and code------------------------------------------------

//CLASS
var Timer = function() {
	//EVENTS
	this.Interval = 1000; //1 second intervals
	this.Enable = new Boolean(false); //to start/stop itmer
	this.Tick; //to enact what to do when the timer is going
	//PRIVATE VARIABLES
	var timerId = 0; // to use for setInterval
	var thisObject; //to refer to self
	
	//PUBLIC FUNCTIONS
	// start timer
	this.Start = function() {
		this.Enable = new Boolean(true);
		thisObject = this;
		if (thisObject.Enable) {
			thisObject.timerId = setInterval(function(){thisObject.Tick();},thisObject.Interval);
		}            //setInterval gives what to do at each interval of alotted time
	};

	// stop timer 
	this.Stop = function() {
		thisObject.Enable = new Boolean(false);
		clearInterval(thisObject.timerId);
	};
};

//timer object and code
var time = 0;
var obj = new Timer();
obj.Interval = 1000;
obj.Tick = timer_tick;
function timer_tick() {
	
	if (time < 10) {
		document.getElementById("timer").innerHTML = "Time: " + "0" + time + " sec.";
	}
	else {
		document.getElementById("timer").innerHTML = "Time: " + time + " sec.";
	}
	time = time + 1; //to further the timer
	
};

//problem: make 0 show up before 1 comes up??? --> solved


//---------------------------------------------------------------------------------------------


var difficulty = document.getElementById("diff");
difficulty.value = 5 // default
var turns = document.getElementById("turn");
turns.value = 10; // default
