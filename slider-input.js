// Vairables for input fields
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

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
	}
};

blue.onchange = function(e) {
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

