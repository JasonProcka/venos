import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/drop.css';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Drop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
		const content = (
      <div className="col col-4">
        <div className="drop demo-card-image mdl-card mdl-shadow--2dp" style={{backgroundImage: `url(${this.props.src})`}}>
          <div className="mdl-card__title mdl-card--expand"></div>
          <div className="mdl-card__actions">
            <span className="demo-card-image__filename"><span className="dropName">filename</span><span className="dropExtension">.png</span></span>
            <IconMenu className="dropOptions"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="Sync" />
              <MenuItem primaryText="Share" />
            </IconMenu>
          </div>
        </div>
      </div>
    );
        return (
			<ReactCSSTransitionGroup
		 		transitionName="drop"
		 		transitionEnterTimeout={1500}
		 		transitionLeaveTimeout={1500}
				transitionEnter={true}
      			transitionLeave={true}
				transitionAppear={true}
	 			transitionAppearTimeout={1500}>
				{content}
			</ReactCSSTransitionGroup>
        );
    }

}


export default Drop;
