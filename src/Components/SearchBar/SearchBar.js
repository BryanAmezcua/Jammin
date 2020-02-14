import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        //function binding
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleTermChange(event) { // get the value inside of the input field and pass is to the "search Spotify" function inside of App.js
        let term = document.querySelector('#searchTerm').value;
        return term;
    }

    search() {
        this.props.onSearch(this.handleTermChange());
    }

    render() {
        return (
            <div>
                <div className="container">
                    <input type="text" id="searchTerm" onChange={ this.handleTermChange } placeholder="Search Artist, Songs or Albums" />
                    <div className="search"></div>
                </div>
                <div>
                    <button className="SearchButton" onClick={ this.search }>SEARCH</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;