import React, { Component } from 'react';
import FileUploader from './FileUploader.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a className="back" href="//app.sharedcare.io/">
            <i className="material-icons" style={{fontSize: 36}}>
            arrow_back
            </i>
          </a>
          <p className="App-title">NSFW Demo</p>
        </header>
        <FileUploader/>
      </div>
    );
  }
}

export default App;
