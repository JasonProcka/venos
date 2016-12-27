import React from 'react';
import Nav from '../containers/Nav';
import Footer from '../containers/Footer';


import '../styles/index.css';
import '../styles/components.css';
import '../styles/material.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {
    constructor(props){
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
