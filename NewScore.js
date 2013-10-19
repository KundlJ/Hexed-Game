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

function AddNewScore(newScore)
{
  if(supports_html5_storage())
  {
    var ScoresString = localStorage["HexedHighscores"];
    
    var Data = JSON.parse(ScoresString);
    var Scores = Data.HighScores;
  
    //Add new element to JSON
    Scores.push(newScore);
    //Sort result
    Scores = sortByScoreAndDate(Scores);
    //Store result
    localStorage["HexedHighscores"] = JSON.stringify(Scores);
  }
  else
  {
    alert("Does not support local storage");
  }
}

/*
var TestScore =  {
          "name"        : "derp",
          "difficulty"  : "medium",
          "turns"       : 10,
          "score"       : 9001,
          "timestamp"   : "2013-11-19"
};

AddNewScore(TestScore);
*/
  
  
  
  
  
  
  
  