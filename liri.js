require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var userCommand = process.argv[2];
var userRequest = process.argv[3];

switch(userCommand) {
  case "concert-this": 
  concertThis(); 
  break;
      
  case "spotify-this-song": 
  spotifyThisSong(); 
  break;
  
  case "movie-this": 
  movieThis(); 
  break;
      
  case "do-what-it-says": 
  doWhatItSays(); 
  break;
      
  // Instructions displayed in terminal to the user if nothing is inputted
default: console.log("");
};



// This function pulls the results for movies  
function movieThis(){

  if(userRequest == null){
    input= 'Mr Nobody';
  }

var movieName = userRequest;
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title  + "\r\n" + 
                "Year: " + response.data.Year + "\r\n" + 
                "Imdb Rating: " + response.data.imdbRating +"\r\n"+
                "Rotten Tomatoes Rating: " + response.data.tomatoRating +"\r\n"+
          "Country: " + response.data.Country +"\r\n"+
          "Language: " + response.data.Language +"\r\n"+
          "Plot: " + response.data.Plot + "\r\n"+
          "Actors: " + response.data.Actors +"\r\n");
          
  }
  
)

};


// This function pulls the results from bands in town

function concertThis(){

  if(userRequest == null){
    input= 'Backstreet Boys';
  }

var artistName = userRequest;
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    for (var i = 0; i < 5 ; i++){

    console.log("Name of the Venue: " + response.data[i].venue.name  + "\r\n" + 
                "Venue Location: " + response.data[i].venue.city + "\r\n" + 
                "Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                "\r\n");
               
  }
}
)};

// This function pulls data from Spotify api

function spotifyThisSong(songName){

var songName = userRequest;
console.log(songName);

spotify.search(
  {
    type: "track",
    query: songName,
    limit: 1

  },
  function (err, data) {
    if (err) {
        console.log("Error occurred: " + err);
        return;
    }
  


var songs = data.tracks.items;

for (var i = 0; i < songs.length; i++) {
  
  console.log("artist(s): " + songs[i].artists[0].name);
  console.log("song name: " + songs[i].name);
  console.log("preview song: " + songs[i].href);
  console.log("album: " + songs[i].album.name);
  console.log("-----------------------------------");
};

})}





 
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    
    if (error) {
      return console.log(error);
    }
  
    
    console.log(data);
  
    
    var dataArr = data.split(",");
  
    
    console.log(dataArr);

    spotifyThisSong(dataArr);
  
  });
  
}

  
function writeFile(){
  
 
fs.appendFile("log.txt", userCommand + userRequest, function(err) {

  
  if (err) {
    return console.log(err);
  }

  
  console.log("log.txt file is updated");

});

}

writeFile();

