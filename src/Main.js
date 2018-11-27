import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

class Main extends Component {
    state = {
      name: "",
      location: "nearest"
    }

    /**
     * @description whenever the user type into any of the input fields this function 
     *              is invoked to save the value of the field to be posted to the search url
     * @param event sent by the event listener, used to get the value of the input
     * @param {string} type defines which input was invoked
     */
    handleChange(event, type) {
      if(type === "name") this.setState({ name: event.target.value });
      else if(type === "location") this.setState({ location: event.target.value === "" ? "nearest" : event.target.value });
    }

    render() {
      return (
        <div className="main">
          <div className="bg-overlay"></div>
          <div className="container">
            <div className="input-holder what">
              <input tabIndex="0" 
                type="text" 
                value={this.state.name} 
                onChange={ (event) => {
                  this.handleChange(event, "name")
                }} 
                placeholder="What? ex. burger, pizza, icecream"/>
            </div>
            <div className="input-holder where">
              <input tabIndex="0" 
                type="text" 
                value={this.state.location === "nearest" ? "" : this.state.location} 
                onChange={ (event) => {
                  this.handleChange(event, "location")
                }}
                placeholder="Where? if empty will find nearest."/>
            </div>
            <div className="submit-btn">
              <Link tabIndex="0" onClick={ //when user clicks on the search button, the link redirects the page 
                              //to the search page and adds the name and location to the url
                (e) => {
                if(this.state.name === "") e.preventDefault(); 
                }} 
                className={this.state.name === "" ? "disabled-anchor" : ""}
                to={{
                pathname: "/search",
                search: "?name=" + this.state.name + "&location=" + this.state.location
              }}>Search</Link>
            </div>
          </div>
        </div>
      );
    }
  }
  
export default Main;