import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Main from './Main';
import SearchResults from './SearchResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Main/>
        )}/>
        <Route path="/search" component={SearchResults}/>
      </div>
    );
  }
}

export default App;
