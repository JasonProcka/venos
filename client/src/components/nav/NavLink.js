
// --- Imports ----

// >>> React
import React from 'react';

// >>> React Router
import {Link} from 'react-router';

// >>> Material-UI
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';

// Our customized Link <LI> for the navigation list
export default class NavLink extends React.Component {
    render() {
        return (
            <li className="navLink">
              <Link activeClassName="selected" {...this.props}>
                  <FlatButton className="navLinkButton" label={this.props.notifycount ? <Badge
					  badgeContent={4}
					  primary={true}
					  style={{padding: 0}}
				  >{this.props.children}</Badge> : this.props.children}
					  icon={<this.props.icon />}>

				          </FlatButton>

              </Link>
            </li>

        );
    }
}
//   {this.props.notifycount != null ? `<span class="mdl-badge" data-badge=${this.props.notifycount}>${this.props.children}</span>` : `${this.props.children}`}
