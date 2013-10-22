//timer class, object, and code------------------------------------------------
//CLASS
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
            thisObject.timerId = setInterval(function(){thisObject.Tick();},thisObject.Interval);
            time = 0;
    	}
    }

    this.Tick = function() 
    {
    	if(time < 10)
    	{
    		 document.getElementById("timer").innerHTML = "Time: " + "0" + time + " sec.";
    	}
    	else
    	{
    		document.getElementById("timer").innerHTML = "Time: " + time + " sec.";	
    	}

    	time = time + 1; 
    }
};