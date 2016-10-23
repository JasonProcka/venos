import React from 'react';
import Nav from '../containers/Nav';
import { Link } from 'react-router';
import Footer from '../containers/Footer';


import '../styles/index.css';
import '../styles/components.css';
import '../styles/material.min.css';

export default class App extends React.Component {
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
