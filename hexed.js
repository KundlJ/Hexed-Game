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
	$('#swatch').css("height", 200);
	$('#swatch').css("width", 200);
	$('#swatch').css("background", rgbHex);
	//$('#swatch').html(rString + "\n" + gString + "\n" + bString);
}
