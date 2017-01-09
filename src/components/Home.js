import React, { Component } from 'react';
import './Home.css';
import notes from '../notes.png';

class Home extends Component {
  render() {
    return (
      <div className="Home columns">
        <div className="column has-text-centered hometext">
          <p className="title is-2">Create Notes for free!</p>
          <p className="subtitle is-4">Just register or login</p>
        </div>
        <div className="column">
          <img src={notes} alt="Notes App"/>
        </div>
      </div>
    );
  }
}

export default Home;
