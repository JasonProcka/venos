import React from 'react';
import Drop from './Drop';
import Waypoint from 'react-waypoint';

class DropList extends React.Component{
	constructor(props){
		super(props);
		this.loadMore = this.loadMore.bind(this);
		this.state = {
			loadedItems: 50
		}

	}
	loadMore() {
		console.log('loading');

			this.setState({loadedItems: this.state.loadedItems + 50})

	}
	render(){
		console.log('render');
		const drops = this.props.drops.slice(0, this.state.loadedItems).map((drop, index) => {
			if(this.state.loadedItems-20 === index)
				return <Waypoint key={index} onEnter={this.loadMore}>
					<Drop
						key={index}
						src={drop.src}
					/>
				</Waypoint>
			return <Drop
						key={index}
						src={drop.src}
					/>
		});

		return (
			<div className="drop-list clearfix">{drops}</div>
		);


	}
};

export default DropList;
