import React from 'react';
import Nav from '../containers/Nav';
import { Link } from 'react-router';
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
        <Link to="/signin">Link</Link>
      </div>
    );
  }
}
