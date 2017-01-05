// Containers
import CreatedHub from './CreatedHub';

// React

import React from 'react';
import {browserHistory} from 'react-router';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Add-ons

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// >>> React Router

import {Link} from 'react-router';

// Styles

import '../../styles/creations/creations.css';

class Creations extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="creationsWrapper">
        <div className="creationsHeader">
          <h4>Creations</h4>
        </div>
        <div className="createdHubsWrapper">
          <CreatedHub />
        </div>
        <Link to="/create">
          <FloatingActionButton className="createHub" secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

export default connect()(Creations);
