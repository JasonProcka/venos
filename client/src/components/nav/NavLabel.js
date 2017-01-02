import React from 'react';
export default class NavLabel extends React.Component {
  render() {
    return (
      <li {...this.props} className="navLabel">{this.props.children}</li>
    );
  }
}
