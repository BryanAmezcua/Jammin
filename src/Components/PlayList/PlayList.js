import React, { Component } from 'react';
import './PlayList.css';

class PlayList extends Component {
    render() {
        return (
            <div className="Playlist">
                <input value="New Playlist"/>
                {/*<!-- Add a TrackList component -->*/}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList