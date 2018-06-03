import React, { Component } from 'react';
import './App.css';

class Scores extends Component {

  render() {
    return (
      <div style={{margin: 20}}>
        <label style={{margin: 50}}>SFW score: {this.props.sfw}</label>
        <label style={{margin: 50}}>NSFW score: {this.props.nsfw}</label>
      </div>
    )
  }
}

export default Scores;