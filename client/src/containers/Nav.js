import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions';
import NavLink from '../components/NavLink';
import NavLabel from '../components/NavLabel';
import '../styles/nav.css';

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
          <NavLink key={1} to="dashboard" icon="home">Dashboard</NavLink>
          <NavLink key={2} to="creations" icon="fingerprint">Creations</NavLink>
          <NavLink key={3} icon="notifications" notifycount="2">Notifications</NavLink>
          <NavLink key={4} icon="cloud">Synced Files</NavLink>
          <NavLink key={5} to="create" icon="create">Create Hub</NavLink>
        </ul>,
        <ul key={2} className="upper-items smooth">
          <NavLabel>RECENT</NavLabel>
          <NavLink key={1} icon="folder">Jason&#39;s Vacation 2016</NavLink>
          <NavLink key={2} icon="folder">San Haven Roadtrip</NavLink>
          <NavLink key={3} icon="folder">Bismarck Roadtrip</NavLink>
        </ul>,
        <ul  key={3} className="upper-items smooth">
          <NavLabel>ACCESS</NavLabel>
          <NavLink to="/" icon="assignment_return" onClick={() => this.handleSignout()}>Logout</NavLink>
        </ul>,
        <ul key={4} className="upper-items smooth">
          <NavLabel>TRENDING</NavLabel>
          <NavLink key={1} icon="trending_up">Shocking HRC Leak</NavLink>
          <NavLink key={2} icon="trending_up">WikiLeaks Drop 4</NavLink>
          <NavLink key={3} icon="trending_up">Julian Assange Emails</NavLink>
          <NavLink key={4} icon="trending_up">Hillary Clinton Emails</NavLink>
          <NavLink key={5} icon="trending_up">Leonardo DiCaprio Pics</NavLink>
        </ul>
      ]
    } else {
      return [
        <ul  key={1} className="upper-items smooth">
          <NavLabel>NAVIGATE</NavLabel>
          <NavLink to="create" key={1} icon="create">Create Hub</NavLink>
          <NavLink key={2} icon="live_help">What&#39;s Venos?</NavLink>
          <NavLink key={3} icon="mail_outline">Contact</NavLink>
        </ul>,
        <ul key={2} className="upper-items smooth">
          <NavLabel>ACCESS</NavLabel>
          <NavLink key={1} to="join" icon="assignment">Join / Register</NavLink>
          <NavLink key={2} to="login" icon="account_circle">Login</NavLink>
        </ul>,
        <ul  key={3} className="upper-items smooth">
          <NavLabel>TRENDING</NavLabel>
          <NavLink key={1} icon="trending_up">Shocking HRC Leak</NavLink>
          <NavLink key={2}icon="trending_up">WikiLeaks Drop 4</NavLink>
          <NavLink key={3} icon="trending_up">Julian Assange Email</NavLink>
          <NavLink key={4} icon="trending_up">Leonardo DiCaprio Pics</NavLink>
        </ul>

      ]
    }
  }

  render() {
    return (
      <nav className="nav-custom shadow-light">
        <div className="inner-nav">
          { this.renderNavContent() }
        </div>
        <div className="nav-push-div"></div>
      </nav>
    );
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticatedFull
  }
}


export default connect(mapStateToProps, Actions)(Nav);
