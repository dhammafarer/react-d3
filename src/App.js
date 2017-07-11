import React, { Component } from 'react';
import MicrogridApp from './components/microgrid/MicrogridApp.js';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <MicrogridApp />
        </div>
      </div>
    );
  }
}

export default App;
