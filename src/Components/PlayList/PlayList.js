import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

class PlayList extends Component {
    render() {
        return (
            <div className="Playlist">
                <input value={this.props.onNameChange.value} defaultValue="Name this playlist..."/>
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