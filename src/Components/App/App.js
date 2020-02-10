import React, { Component } from 'react';
import './App.css';

// COMPONENT IMPORTS
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>in</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;