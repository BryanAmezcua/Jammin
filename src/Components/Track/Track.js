import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

    constructor(props) {
        super(props);
        // function binding
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        if (this.props.canAddSong) {
            return <button className="Track-action" onClick={ this.addTrack }>+</button>
        } else {
            return <button className="Track-action" onClick={ this.removeTrack }>-</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio
                        controls
                        src={this.props.track.preview_url}>
                    </audio>
                </div>
                { this.renderAction() }
            </div>
        );
    }
}

export default Track