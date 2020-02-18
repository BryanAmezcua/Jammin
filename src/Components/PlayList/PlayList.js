import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList.js';

class PlayList extends Component {

    constructor(props) {
        super(props);
        
        // function binding
        this.handleNameChange = this.handleNameChange.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    savePlaylist() {
        this.props.onSave();
        this.showModal();
    }

    showModal() {
        document.querySelector(".successModal").style.display = 'block';
    }

    closeModal() {
        document.querySelector(".successModal").style.display = 'none';
    }

    render() {
        return (
            <div className="Playlist">
                <div className="successModal" style={{display: 'none'}}>
                    <h2>New playlist has been created!</h2>
                    <button className="close" onClick={ this.closeModal }>&times;</button>
                </div>
                <input id="Playlist_Name" onChange={ this.handleNameChange } defaultValue="Name this playlist..."/>
                <TrackList 
                    tracks={ this.props.playlistTracks } 
                    canAddSong={ false }
                    onRemove={ this.props.onRemove }
                />
                <button className="Playlist-save" onClick={ this.savePlaylist }>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList