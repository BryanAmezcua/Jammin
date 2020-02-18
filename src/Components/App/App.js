import React, { Component } from 'react';
import './App.css';

// COMPONENT IMPORTS
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

// Spotify
import Spotify from '../../util/Spotify.js';

class App extends Component {
  /*
    *
    * Constructor
    * 
  */ 
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      isLoggedIn: false
    };

    // Binding Functions
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.logIn = this.logIn.bind(this);
  }
  /*
    *
    * This function checks to see if a song from the search results already exists in the playlist. If it does exist DO NOT add it. If the song does not currently exist in the playList, add it.
    * 
  */
  addTrack(track) {
    if (this.state.playlistTracks.every(song => song.id !== track.id)) {
      let tempPlaylist = this.state.playlistTracks;
      tempPlaylist.push(track);

      this.setState({ playlistTracks: tempPlaylist });
    }
  }

  removeTrack(track) {
    let newplayList = this.state.playlistTracks.filter(song => song.id !== track.id);

    this.setState({ playlistTracks: newplayList });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
    console.log(this.state.playlistName)
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.id));

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => { // Pass search term to API call
      this.setState({ searchResults: tracks}); // Store resulting data into "SearchResults" array
    });
  }

  logIn() {
    if (this.state.isLoggedIn === false) {
      this.setState({ isLoggedIn: true });
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>in</h1>
        <div className="App">
          <SearchBar 
            onSearch={ this.searchSpotify }
            onSave = { this.savePlaylist }
            isLoggedIn = { this.state.isLoggedIn }
            logIn = { this.logIn }
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={ this.state.searchResults } 
              onAdd={ this.addTrack }
            />
            <PlayList 
              playlistName={ this.state.playlistName } 
              playlistTracks={ this.state.playlistTracks }
              onRemove={ this.removeTrack }
              onNameChange={ this.updatePlaylistName }
              onSave = { this.savePlaylist }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;