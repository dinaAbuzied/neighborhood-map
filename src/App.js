import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Main/>
        )}/>
      </div>
    );
  }
}

export default App;
