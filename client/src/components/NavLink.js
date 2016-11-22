import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class NavLink extends React.Component {
  render() {
      var test = this.props.icon;
      
    return (
      <li className="link smooth">
        <Link activeClassName="selected" {...this.props}>
            <FlatButton className="learn" label={this.props.children} style={{color: "green"}} icon={test} ></FlatButton>


        </Link>
      </li>
    );
  }
}
    //   {this.props.notifycount != null ? `<span class="mdl-badge" data-badge=${this.props.notifycount}>${this.props.children}</span>` : `${this.props.children}`}
