require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");


var requestType = process.argv[2];
var requestName = process.argv[3];

if (requestType === "my-tweets") {
    myTweets();
} else if (requestType === "spotify-this-song") {
    spotifyThis();
} else if (requestType === "movie-this") {
    pickMovie();
} else if (requestType === "do-what-it-says") {
    pickRequest();
}

// Then run a request to the OMDB API with the movie specified

function myTweets() {
    client.get("https://api.twitter.com/1.1/statuses/home_timeline.json", function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {    
                console.log("Tweet: " + tweets[i].text + " Created At: " + tweets[i].created_at);  
            }  
        }
        else {
            return console.log("Twitter API Error: " + error);
        }
    });

}

function spotifyThis() {
    if (requestName) {
        spotify.search({ type: 'track', query: requestName }, function(err, data) {
            if (err) {
            return console.log('Spotify Error occurred: ' + err);
            }
            else {
                var songInfo = data.tracks.items[0];
                //console.log(songInfo);
                console.log("Artist: " + songInfo.artists[0].name)
                console.log("Song: " + songInfo.name)
                console.log("Preview URL: " + songInfo.preview_url)
                console.log("Album: " + songInfo.album.name) 
            }
        });
    } else {;
        spotify
        .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
        .then(function(data) {
            //console.log(data); 
             var songInfo = data.album;
                console.log("Artist: " + songInfo.artists[0].name)
                console.log("Song: " + songInfo.name)
                console.log("Preview URL: " + data.preview_url)
                console.log("Album: " + data.name)
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err); 
        });
    }
}

function pickMovie() {
    if (requestName){
        var queryUrl = "http://www.omdbapi.com/?t=" + requestName + "&y=&plot=short&apikey=trilogy";
    }else {
        var queryUrl = "http://www.omdbapi.com/?t=mr nobody&y=&plot=short&apikey=trilogy";
    }

        request(queryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            var movieFormat = JSON.parse(body);
            console.log("Title: " + movieFormat.Title);
            console.log("Release Year: " + movieFormat.Year);
            console.log("IMDB Rating: " + movieFormat.imdbRating);

            var rottenTomatoes = "";
            for (var i = 0; i < movieFormat.Ratings.length; i++){
                if (movieFormat.Ratings[i].Source === "Rotten Tomatoes") {
                    rottenTomatoes = movieFormat.Ratings[i].Value;
                }else {
                    rottenTomatoes = "N/A";
                }
            }
            console.log("Rotten Tomatoes Rating: " + rottenTomatoes);

            console.log("Country Produced: " + movieFormat.Country);
            console.log("Language: " + movieFormat.Language);
            console.log("Plot: " + movieFormat.Plot);
            console.log("Actors: " + movieFormat.Actors);
        } 

});

}


function pickRequest() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Split it by commas (to make it more readable)
        var dataArr = data.split(",");
        requestName = dataArr[1];
        spotifyThis();
              
      });
}