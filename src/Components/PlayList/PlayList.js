import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList.js'
import './PlayList.css';

class PlayList extends Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue='New Playlist' />
                {/*<TrackList/>*/}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList