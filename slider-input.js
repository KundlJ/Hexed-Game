<<<<<<< HEAD
// Vairables for input fields
=======
// Vairables for text input fields
>>>>>>> Added timer.js plus other functionality
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

<<<<<<< HEAD
red.value = 0;
green.value = 0;
blue.value = 0;

// Variables for warning messages
var foo = document.getElementById("rbadval");
foo.style.visibility = 'hidden';

var foo = document.getElementById("gbadval");
foo.style.visibility = 'hidden';

var foo = document.getElementById("bbadval");
foo.style.visibility = 'hidden';

// Functions for if value is changed in the input field
red.onchange = function(e) {
	var num = $("#red").val(); 

	if ((isNaN(num)) || (num < 0 || num > 255)){
		var foo = document.getElementById("rbadval");
		foo.style.visibility = 'visible';
	}

	else {
		$("#redslider").slider("value", num);
		var foo = document.getElementById("rbadval");
		foo.style.visibility = 'hidden';
	}
};

green.onchange = function(e) {
	var num = $("#green").val(); 

	if ((isNaN(num)) || (num < 0 || num > 255)){
		var foo = document.getElementById("gbadval");
		foo.style.visibility = 'visible';
	}

	else {
		$("#greenslider").slider("value", num);
		var foo = document.getElementById("gbadval");
		foo.style.visibility = 'hidden';
=======
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
>>>>>>> Added timer.js plus other functionality
	}
};

blue.onchange = function(e) {
<<<<<<< HEAD
	var num = $("#blue").val(); 

	if ((isNaN(num)) || (num < 0 || num > 255)){
		var foo = document.getElementById("bbadval");
		foo.style.visibility = 'visible';
	}

	else {
		$("#blueslider").slider("value", num);
		var foo = document.getElementById("bbadval");
		foo.style.visibility = 'hidden';
	}
};

// Functions for if the value is changed using the slider

$( "#redslider" ).on( "slidechange", function( event, ui ) {
	num = ui.value;
	red.value = num;
} );

$( "#greenslider" ).on( "slidechange", function( event, ui ) {
	num = ui.value;
	green.value = num;
} );

$( "#blueslider" ).on( "slidechange", function( event, ui ) {
	num = ui.value;
	blue.value = num;
} );
=======
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
>>>>>>> Added timer.js plus other functionality

