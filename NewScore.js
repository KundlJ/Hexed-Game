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
        
        var yScore = a["score"]; 
        var yDate = a["date"];
        
        if(xScore < yScore)
        {
          return -1;
        }
        else
        {
          if( xScore > yScore)
          {
            return 1;
          }
          else
          {
            if( xDate < yDate)
            {
              return -1;
            }
            else
            {
              if( xDate > yDate)
              {
                return 1;
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
    //TODO
    //Add new element to JSON
    //Sort result
    //Store result
  }
  else
  {
    alert("Does not support local storage");
  }
}