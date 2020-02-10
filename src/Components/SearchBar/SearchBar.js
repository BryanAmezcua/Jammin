import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
    render() {
        return (
            <div className="container">
                <input type="text" placeholder="Search Artist, Songs or Albums" />
                <div className="search"></div>
                <button className="SearchButton">SUBMIT</button>
            </div>   
        );
    }
}

export default SearchBar