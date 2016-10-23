import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions';
import NavLink from '../components/NavLink';
import NavLabel from '../components/NavLabel';
import '../styles/footer.css';
class Footer extends React.Component {
  handleSignout() {
    this.props.signOutUser();
  }

  renderFooterContent() {
    if (this.props.authenticated) {
      return [
          <div key={1} className="mdl-mini-footer__left-section">
            <ul className="mdl-mini-footer__link-list">
              <li><p>You are current logged in</p></li>
              <li><Link to="#">Our Mission</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Help</Link></li>
              <li><Link to="#">Privacy and Terms</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>
      ]
    } else {
      return [
        <div key={2} className="mdl-mini-footer__left-section">
          <ul className="mdl-mini-footer__link-list">
            <li><p>You are currently not logged in</p></li>
            <li><Link to="#">Our Mission</Link></li>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Help</Link></li>
            <li><Link to="#">Privacy and Terms</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>

      ]
    }
  }



  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="inner-nav">
          { this.renderFooterContent() }
        </div>
        <div className="nav-push-div"></div>
      </footer>
    );
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}


export default connect(mapStateToProps, Actions)(Footer);
