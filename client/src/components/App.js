import React from 'react';
import Nav from '../containers/Nav';
import Footer from '../containers/Footer';


import '../styles/index.css';
import '../styles/components.css';
import '../styles/material.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

export default class App extends React.Component {
    constructor(props){
injectTapEventPlugin();
        super(props);

    }
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
        <Footer></Footer>
      </div>
    );
  }
}
