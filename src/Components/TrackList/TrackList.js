import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js'

class TrackList extends Component {

    render() {

        console.log(this.props.tracks);


        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} key={track.id}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList