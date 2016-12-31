import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../../actions';
import NavLink from '../../components/nav/NavLink';
import NavLabel from '../../components/nav/NavLabel';

// Icons
import IconHome from 'material-ui/svg-icons/action/home';
import IconFingerprint from 'material-ui/svg-icons/action/fingerprint';
import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconCloud from 'material-ui/svg-icons/file/cloud';
import IconCreate from 'material-ui/svg-icons/content/create';
import IconFolder from 'material-ui/svg-icons/file/folder';
import IconAssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import IconAssignment from 'material-ui/svg-icons/action/assignment';
import IconTrendingUp from 'material-ui/svg-icons/action/trending-up';
import IconLiveHelp from 'material-ui/svg-icons/communication/live-help';
import IconMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import '../../styles/nav.css';

class Nav extends React.Component {
  handleSignout() {
    this.props.signOutUser();
  }

  renderNavContent() {
    console.log('authenticated');
    console.log(this.props.authenticated);
    if (this.props.authenticated) {
      return [
        <ul key={1} className="upper-items smooth">
          <NavLabel>NAVIGATE</NavLabel>
          <NavLink key={1} to="dashboard" icon={<IconHome />}> Dashboard</NavLink>
          <NavLink key={2} to="creations"  icon={<IconFingerprint />}>Creations</NavLink>
          <NavLink key={3}  icon={<IconNotifications />} notifycount="2">Notifications</NavLink>
          <NavLink key={4}  icon={<IconCloud />}>Synced Files</NavLink>
          <NavLink key={5} to="create"  icon={<IconCreate />}>Create Hub</NavLink>
        </ul>,
        <ul key={2} className="upper-items smooth">
          <NavLabel>RECENT</NavLabel>
          <NavLink key={1}  icon={<IconFolder />}>Jason&#39;s Vacation 2016</NavLink>
          <NavLink key={2}  icon={<IconFolder />}>San Haven Roadtrip</NavLink>
          <NavLink key={3}  icon={<IconFolder />}>Bismarck Roadtrip</NavLink>
        </ul>,
        <ul  key={3} className="upper-items smooth">
          <NavLabel>ACCESS</NavLabel>
          <NavLink to="/"  icon={<IconAssignmentReturn />} onClick={() => this.handleSignout()}>Logout</NavLink>
        </ul>,
        <ul key={4} className="upper-items smooth">
          <NavLabel>TRENDING</NavLabel>
          <NavLink key={1}  icon={<IconTrendingUp />}>Shocking HRC Leak</NavLink>
          <NavLink key={2}  icon={<IconTrendingUp />}>WikiLeaks Drop 4</NavLink>
          <NavLink key={3}  icon={<IconTrendingUp />}>Julian Assange Emails</NavLink>
          <NavLink key={4}  icon={<IconTrendingUp />}>Hillary Clinton Emails</NavLink>
          <NavLink key={5}  icon={<IconTrendingUp />}>Leonardo DiCaprio Pics</NavLink>
        </ul>
      ]
    } else {
      return [
        <ul key={1} className="upper-items smooth">
          <NavLabel>NAVIGATE</NavLabel>
          <NavLink to="create" key={1}  icon={<IconHome />}>Create Hub</NavLink>
          <NavLink key={2}  icon={<IconLiveHelp />}>What&#39;s Venos?</NavLink>
          <NavLink key={3}  icon={<IconMailOutline />}>Contact</NavLink>
        </ul>,
        <ul key={2} className="upper-items smooth">
          <NavLabel>ACCESS</NavLabel>
          <NavLink key={1} to="join"  icon={<IconAssignment />}>Join / Register</NavLink>
          <NavLink key={2} to="login"  icon={<IconAccountCircle />}>Login</NavLink>
        </ul>,
        <ul key={3} className="upper-items smooth">
          <NavLabel>TRENDING</NavLabel>
          <NavLink key={1}   icon={<IconTrendingUp />}>Shocking HRC Leak</NavLink>
          <NavLink key={2}  icon={<IconTrendingUp />}>WikiLeaks Drop 4</NavLink>
          <NavLink key={3}  icon={<IconTrendingUp />}>Julian Assange Email</NavLink>
          <NavLink key={4}  icon={<IconTrendingUp />}>Leonardo DiCaprio Pics</NavLink>
        </ul>

      ]
    }
  }

  render() {
    return (
      <div className="nav-custom shadow-light">
        <div className="inner-nav">
          { this.renderNavContent() }
        </div>
        <div className="nav-push-div"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticatedFull
  }
}

export default connect(mapStateToProps, Actions)(Nav);
