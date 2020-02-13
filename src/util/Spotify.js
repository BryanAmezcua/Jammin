// Misc. API data
const client_id = '66e3b897b75046c398137cbad2900f7e';
const redirect_uri = 'http://localhost:3000/';
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
        if (accessToken) {
            // access token already exists
            return accessToken;
        } else if (window.location.href.indexOf('access_token') !== -1) {
            // access token is in URL, grab it
            let url = window.location.href;
            let data = url.split('&');

            accessToken = data[0].split('#access_token=');
            accessToken = accessToken[1];
            expiresIn = data[2].split("expires_in=");
            expiresIn = expiresIn[1];
            
            // Clear access token from URL and delete it from window history
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            console.log('Access Token Has Been Retrieved');
            return accessToken;
        } else {
            // Redirect user to grant autorization from Spotify
            let endPoint = `${spotifyAuthorizationURL}${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=playlist-modify-public&state=${state}`;
            window.location.replace(endPoint);
        }
    },

    buildAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    async search(term) {
        let token = Spotify.getAccessToken();
        return fetch(`${spotifySearchAPI}?type=track&q=${term}&limit=3`, {headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri

                        }
                    })
                } else {
                    // If search query does not yield any results, return empty array
                    return [];
                }
            })
            .catch(error => console.log(error))
    }
};


export default Spotify;