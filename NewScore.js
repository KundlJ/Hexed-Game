function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function sortByScoreAndDate(array) {
    return array.sort(function(a, b) {
        var xScore = a["score"]; 
        var xDate = a["date"];
        
        var yScore = b["score"]; 
        var yDate = b["date"];
        
        if(xScore < yScore)
        {
          return 1;
        }
        else
        {
          if( xScore > yScore)
          {
            return -1;
          }
          else
          {
            if( xDate < yDate)
            {
              return 1;
            }
            else
            {
              if( xDate > yDate)
              {
                return -1;
              }
              else
              {
                return 0;
              }
            }
          }
        }
        return 0;
    });
}

//Adds a JSON score object to the local storage
function AddNewScoreJS(newScore)
{
  if(supports_html5_storage())
  {
    var ScoresString = localStorage["HexedHighscores"];
    //If Data Exists, add the new value, otherwise handle creating it
    if(ScoresString)
    {
      var Data = JSON.parse(ScoresString);
      var Scores = Data.HighScores;
      Scores.push(newScore);
      //Sort result
      Scores = sortByScoreAndDate(Scores);
      
      Data.HighScores = Scores;
      //Store result
      localStorage["HexedHighscores"] = JSON.stringify(Data);
    }
    else
    {
      var Scores = new Array();
      Scores[0] = newScore;
      var Data = { "HighScores": Scores };
      localStorage["HexedHighscores"] = JSON.stringify(Data);
    }
  }
  else
  {
    alert("Does not support local storage");
  }
}

//Adds a new score to local storage based on elements
//Name: Player name, a simple string
//Difficulty: The difficulty of the game
//Turns: turns taken to complete
//Score
//time: In the form "YEAR-MO-DA, eg 2000-05-30"
function AddNewScore(name, difficulty, turns, score, time)
{
  var NewScore =  {
          "name"        : name,       
          "difficulty"  : difficulty,
          "turns"       : turns,
          "score"       : score,
          "timestamp"   : time    
  };
  AddNewScoreJS(NewScore);
}

  
  
  
  
  
  
  
  