import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timelog from './Timelog/Timelog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timelog />
      </div>
    );
  }
}

export default App;
