import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

class Main extends Component {
    state = {
      what: "",
      where: "nearest"
    }

    handleChange(event, type) {
      if(type === "what") this.setState({ what: event.target.value });
      else if(type === "where") this.setState({ where: event.target.value === "" ? "nearest" : event.target.value });

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
                value={this.state.what} 
                onChange={ (event) => {
                  this.handleChange(event, "what")
                }} 
                placeholder="What? ex. burger, pizza, icecream"/>
            </div>
            <div className="input-holder where">
              <input 
                type="text" 
                value={this.state.where === "nearest" ? "" : this.state.where} 
                onChange={ (event) => {
                  this.handleChange(event, "where")
                }}
                placeholder="Where? if empty will find nearest."/>
            </div>
            <div className="submit-btn">
              <Link onClick={(e) => {
                if(this.state.what === "") e.preventDefault(); 
                }} 
                className={this.state.what === "" ? "disabled-anchor" : ""}
                to={{
                pathname: "/search",
                search: "?what=" + this.state.what + "&where=" + this.state.where,
                state: { foo: 'bar'}
              }}>Search</Link>
            {/* <Link to="/search" onClick={this.props.onNavigate}>Search</Link> */}
            </div>
          </div>
        </div>
      );
    }
  }
  
export default Main;