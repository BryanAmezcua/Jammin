import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                    tracks={ this.props.searchResults } 
                    onAdd={ this.props.onAdd }
                    onRemove={ this.props.onRemove }
                    canAddSong={ true }
                />
            </div>
        );
    }
}

export default SearchResults