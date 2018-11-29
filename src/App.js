import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchResults from './SearchResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <SearchResults/>
        )}/>
      </div>
    );
  }
}

export default App;
