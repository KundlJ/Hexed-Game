var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

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

