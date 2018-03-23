import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Aggregate extends Component {
  render() {
    return(
      <div>
        <h2>
          Number Text
        </h2>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tittle</h1>
        <Aggregate />
      </div>
    );
  }
}

export default App;
