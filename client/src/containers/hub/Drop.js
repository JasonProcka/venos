import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../../styles/drop.css';

class Drop extends React.Component {
    constructor(props) {
        super(props);


    }



    render() {
		const content = (<div style={{backgroundImage: `url(${this.props.src})`}} className="drop">
			<div>
				{this.props.children}
			</div>
		</div>);
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
