import React from 'react';
import { Link } from 'react-router';
export default class NavLink extends React.Component {
  render() {
    return (
      <li className="link smooth">
        <Link activeClassName="selected" {...this.props} className="mdl-js-ripple-effect mdl-js-button">
          <i className="material-icons">
            {this.props.icon}
          </i>
          {this.props.notifycount != null ? `<span class="mdl-badge" data-badge=${this.props.notifycount}>${this.props.children}</span>` : `${this.props.children}`}
        </Link>
      </li>
    );
  }
}
