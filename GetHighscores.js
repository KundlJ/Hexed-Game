function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function EraseHighScores()
{
  localStorage.removeItem("HexedHighscores");
}

function DisplayHighScores()
{
  if(supports_html5_storage())
  {
    /*
      Temporarily force data into local storage
      until can retrieve from game
    */
    var testJSON = { "HighScores": [    
          {
            "name"        : "Jed",
            "difficulty"  : "hard",
            "turns"       : 5,
            "score"       : 9001,
            "timestamp"   : "2013-10-18"
          },     
          {
            "name"        : "Drew",
            "difficulty"  : "easy",
            "turns"       : 10,
            "score"       : 1337,
            "timestamp"   : "2013-10-15"
          }     
      ]
    };
    
    //localStorage.setItem("HexedHighscores", JSON.stringify(testJSON));
      
    //////////////////////////////////////////////////////////////////
    
    if(localStorage["HexedHighscores"])
    {
      var ScoresString = localStorage["HexedHighscores"];
      
      var Data = JSON.parse(ScoresString);
      var Scores = Data.HighScores;
      
      for(var i = 0; i < Scores.length; i++)
      {
        var thisScore = Scores[i];
        
        var nameData = thisScore.name;
        var difficultyData = thisScore.difficulty;
        var turnsData = thisScore.turns;
        var scoreData = thisScore.score;
        var timestampData = thisScore.timestamp;
        
        var newScore = $('<li></li>').appendTo(".HighScores");
        newScore.attr('class', 'Score');
        
        var dataList = $('<ul></ul>').appendTo(newScore);
        dataList.attr('class', 'DataList');
        
        var Name = $('<li>' + nameData + '</li>').appendTo(dataList);
        Name.attr('class', 'Name');
        
        var Score = $('<li>' + scoreData + '</li>').appendTo(dataList);
        Score.attr('class', 'Score');
        
        var Difficulty = $('<li>' + difficultyData + '</li>').appendTo(dataList);
        Difficulty.attr('class', 'Difficulty');
        
        var Turns = $('<li>' + turnsData + '</li>').appendTo(dataList);
        Turns.attr('class', 'Turns');
        
        var Timestamp = $('<li>' + timestampData + '</li>').appendTo(dataList);
        Timestamp.attr('class', 'Timestamp');
      }
    }
    else
    {
      alert("No Saved High Scores");
    }
  }
  else
  {
    alert("Local Data Not Functioning");
  }
}