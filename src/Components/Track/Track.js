import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

    renderAction() {
        {
            if (this.props.isRemoval) {
                return "-";
            } else {
                return "+";
            }
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{/*<!-- + or - will go here -->*/}</button>
            </div>
        );
    }
}

export default Track