//timer object
var time = 0;
var obj = new Timer();

var settings;
var difficulty;
var numTurns; 
var swatchR;
var swatchG;
var swatchB;
var finalScore;

$(document).ready(function() {	
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

	$('#all').hexed();
	//$('#NameOfDiv').hexed();
});

$.fn.hexed = function(options) {
	settings = {
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

	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns: ' + numTurns + '</p>');

	return this.each(function () {
		//This is where we put the HTML that's going to be inserted
		//$(this).html('<p> Difficulty:' + settings.difficulty + " NumTurns:" + settings.numTurns) + '</p>';
	});
};

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

	$('#swatch').css("background-color", '#' + hexColor);	
	//return swatchColor; 
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
    if (score < 0)
    {    	
    	score = 0;
    }

    Math.round(score);
    finalScore += score; 
    numTurns--;

    $('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns: ' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore);

    $('#guessedSwatches').append('<div class="userSwatch"></div>');
    $('.userSwatch:last').append('<div class="userColor"></div>');
    $('.userSwatch:last').append('<p>R:' + percentR + '% off G:' + percentG + '% off B:' + percentB + '% off' +
     ' = ' + score + ' points</p>');
    $('.userColor:last').css('background-color', '#' + userColor);

    if(numTurns == 0)
    {
    	$('#swatch').css('background', 'white');
    	$('#settings').append('<div id="end">End of Game!</p>');
    	document.getElementById('gotItButton').disabled = true;
    	document.getElementById('nextButton').disabled = true;
    	obj.Stop();

    	$('#swatch').css('display', 'none');
    	$('#endOfGame').css('display', 'block');
    }
    else
    {
    	obj.Stop();
    }	
}

function nextClick()
{
	randomColor();
	resetInputs();
	obj.Stop();
	obj.Restart();
	$('#settings').html('<p>Difficulty: ' + difficulty + '</p><p>Number of Turns:' + numTurns + '</p>'
    	+ '<p>Score: ' + finalScore);
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
}
