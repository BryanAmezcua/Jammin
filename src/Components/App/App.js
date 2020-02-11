import React, { Component } from 'react';
import './App.css';

// COMPONENT IMPORTS
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Song Name',
          artist: 'Drake',
          album: "Drake's Album",
          id: 1
        },
        {
          name: 'Song Name 2',
          artist: 'Future',
          album: 'Future Album',
          id: 2
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>in</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;