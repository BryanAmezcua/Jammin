import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        //function binding
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
        this.checkLogIn = this.checkLogIn.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleTermChange(event) { // get the value inside of the input field and pass is to the "search Spotify" function inside of App.js
        let term = document.querySelector('#searchTerm').value;
        return term;
    }

    search() {
        this.props.onSearch(this.handleTermChange());
    }

    checkLogIn() {
        if (this.props.isLoggedIn) {
            return <button className="SearchButton" onClick={ this.search }>SEARCH</button>
        } else {
            return <button className="SearchButton" style={{ width: "9rem", left: "42%"}} onClick={ this.logIn }>Log in to Spotify</button>
        }
    }

    logIn() {
        this.props.logIn();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <input type="text" id="searchTerm" onChange={ this.handleTermChange } placeholder="Search Artist, Songs or Albums" />
                    <div className="search"></div>
                </div>
                <div>
                    { this.checkLogIn() }
                </div>
            </div>
        );
    }
}

export default SearchBar;