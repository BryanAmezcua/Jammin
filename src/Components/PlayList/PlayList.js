import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

class PlayList extends Component {

    constructor(props) {
        super(props);
        
        // function binding
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input id="Playlist_Name" onChange={ this.handleNameChange } defaultValue="Name this playlist..."/>
                <TrackList 
                    tracks={ this.props.playlistTracks } 
                    canAddSong={ false }
                    onRemove={ this.props.onRemove }
                />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList