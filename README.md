# liri-node-app

### Overview

LIRI is a command line node app that takes in parameters and gives you back data.  You can type in the following commands.

### LIRI Commands

###### `node liri.js my-tweets`

  * This will pull the last 20 tweets and when they were created at in your terminal/bash window.

###### `node liri.js spotify-this-song 'song name here'`

  * This will show the following information about the song in your terminal/bash window
    
    ```
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
    ```

  * If no song is provided then it will default to "The Sign" by Ace of Base.

###### `node liri.js movie-this '<movie name here>'`

  * This will output the following information to your terminal/bash window:

    ```
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    ```

  * If you don't type a movie in, the program will output data for the movie 'Mr. Nobody.'

###### `node liri.js do-what-it-says`

  * It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

### Additional Info Needed to Run the App

  * Get your own Twitter API keys by visiting <https://apps.twitter.com/app/new>.

  * Get your own Spotify API keys by visiting <https://developer.spotify.com/my-applications/#!/>

  * You will need to create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

  ```js
  # Spotify API keys

  SPOTIFY_ID=your-spotify-id
  SPOTIFY_SECRET=your-spotify-secret

  # Twitter API keys

  TWITTER_CONSUMER_KEY=your-twitter-consumer-key
  TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
  TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
  TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

  ```

  * This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node.
