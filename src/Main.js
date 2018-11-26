import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

class Main extends Component {
    state = {
      name: "",
      location: "nearest"
    }

    handleChange(event, type) {
      if(type === "name") this.setState({ name: event.target.value });
      else if(type === "location") this.setState({ location: event.target.value === "" ? "nearest" : event.target.value });

    //   this.setState(function(prevState, props){
    //     return {showForm: !prevState.showForm}
    //  });
    }

    render() {
      return (
        <div className="main">
          <div className="bg-overlay"></div>
          <div className="container">
            <div className="input-holder what">
              <input 
                type="text" 
                value={this.state.name} 
                onChange={ (event) => {
                  this.handleChange(event, "name")
                }} 
                placeholder="What? ex. burger, pizza, icecream"/>
            </div>
            <div className="input-holder where">
              <input 
                type="text" 
                value={this.state.location === "nearest" ? "" : this.state.location} 
                onChange={ (event) => {
                  this.handleChange(event, "location")
                }}
                placeholder="Where? if empty will find nearest."/>
            </div>
            <div className="submit-btn">
              <Link onClick={(e) => {
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