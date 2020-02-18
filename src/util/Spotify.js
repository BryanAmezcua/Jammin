// Misc. API data
const client_id = '66e3b897b75046c398137cbad2900f7e';
const redirect_uri = 'http://localhost:3000/';//https://createaplaylist.surge.sh
const state = '1234';

// Spotify API URLs
const spotifyAuthorizationURL = 'https://accounts.spotify.com/authorize?client_id=';
const spotifyUserProfileAPI = 'https://api.spotify.com/v1/me';
const spotifySearchAPI = 'https://api.spotify.com/v1/search';

let accessToken = '';
let expiresIn = '';

/* ********************************************************************************************* */ 

const Spotify = {

    getAccessToken() {

        if (window.location.href.indexOf('access_token') !== -1) {

            // access token is in URL, grab it
            let url = window.location.href;
            let data = url.split('&');

            accessToken = data[0].split('#access_token=');
            accessToken = accessToken[1];
            expiresIn = data[2].split("expires_in=");
            expiresIn = expiresIn[1];

            console.log('Access Token Has Been Retrieved...');
            
            // Clear access token from URL and delete it from window history
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else if (accessToken === '') {

            // Redirect user to grant autorization from Spotify
            console.log('Redirecting to Spotify...');
            document.cookie="access=true";
            let endPoint = `${spotifyAuthorizationURL}${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=playlist-modify-public&state=${state}`;
            window.location.href = endPoint;

        } else if (accessToken) {
            return accessToken;
        }
    },

    buildAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    async search(term) {
        document.querySelector(".loader").style.display = 'block'; // show loading wheel before API data is rendered on screen
        return fetch(`${spotifySearchAPI}?type=track&q=${term}&limit=10`, {headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    console.log(jsonResponse.tracks)
                    return jsonResponse.tracks.items.map(track => {
                        document.querySelector(".loader").style.display = 'none' // hide loading wheel - data is ready
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                            preview_url: track.preview_url
                        }
                    })
                } else {
                    // If search query does not yield any results, return empty array
                    return [];
                }
            })
            .catch(error => console.log(error))
    },

    async savePlaylist(playlistName, trackURIs) {
        if (playlistName === '' || (trackURIs === null || trackURIs === undefined)) {
            console.log('Playlist Name is not set OR you have not selected any tracks!')
            return;
        } else {
            let clientID = '';
            // fetch current users Spotify ID
            fetch(spotifyUserProfileAPI, {headers: this.buildAuthorizationHeader()})
                .then(response => response.json())
                .then(jsonResponse => clientID = jsonResponse.id)
                .then(clientID => {

                    let createSpotifyPlaylistAPI = `https://api.spotify.com/v1/users/${clientID}/playlists`;
                    let data = {
                        name: playlistName,
                    }
                    let playlistID = '';

                    fetch(createSpotifyPlaylistAPI, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }

                    }).then(response => response.json()) // TO-DO: Grab playlist ID from all this data and store it in a var to make another API call
                      .then(jsonResponse => playlistID = jsonResponse.id)
                      .then(playlistID => {

                          let addSongsToPlaylistAPI = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`; // URL that will add tracks to the created playlist

                          let data = { // this is where all Track URIs are added
                              'uris': []
                          };

                          trackURIs.forEach(trackURI => { // for each track URI, push it into an array at the end of a pre-determined string
                            data['uris'].push('spotify:track:' + trackURI);
                          })

                          fetch(addSongsToPlaylistAPI, { // this is where songs are added to the newly created playlist
                            method: 'POST',
                            body: JSON.stringify(data['uris']),
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            }

                          }).then(response => console.log(response.json()))
                            .catch(error => console.log(error))
                            
                      }).catch(error => console.log(error))
                })
                .catch(error => console.log(error));    
        }
    }
};


export default Spotify;